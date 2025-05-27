from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from app import models, crud, database
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, EmailStr
from typing import List

app = FastAPI()

models.Base.metadata.create_all(bind=database.engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

# --- Modelos Pydantic ---
class RestaurantIn(BaseModel):
    nombre: str
    direccion: str
    descripcion: str
    calificacion: float = Field(..., ge=1.0, le=5.0)

class RestaurantOut(RestaurantIn):
    id: int
    class Config:
        from_attributes = True

class UserLogin(BaseModel):
    name: str
    email: EmailStr

# --- Usuarios ---
@app.post("/users/")
def create_user(name: str, email: str, db: Session = Depends(get_db)):
    return crud.create_user(db, name, email)

@app.get("/users/")
def read_users(db: Session = Depends(get_db)):
    return crud.get_users(db)

@app.post("/login_or_create/")
def login_or_create(user: UserLogin, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, user.email)
    if db_user:
        return {"message": "Login correcto", "user": {"name": db_user.name, "email": db_user.email}}
    else:
        created_user = crud.create_user(db, user.name, user.email)
        return {"message": "Usuario creado", "user": {"name": created_user.name, "email": created_user.email}}

# --- Restaurantes ---
@app.post("/restaurants/", response_model=RestaurantOut)
def create_restaurant(r: RestaurantIn, db: Session = Depends(get_db)):
    return crud.create_restaurant(
        db,
        nombre=r.nombre,
        direccion=r.direccion,
        descripcion=r.descripcion,
        calificacion=r.calificacion
    )

@app.get("/restaurants/", response_model=List[RestaurantOut])
def read_restaurants(db: Session = Depends(get_db)):
    return crud.get_restaurants(db)

@app.delete("/restaurants/{restaurant_id}")
def delete_restaurant(restaurant_id: int, db: Session = Depends(get_db)):
    success = crud.delete_restaurant(db, restaurant_id)
    if not success:
        raise HTTPException(status_code=404, detail="Restaurante no encontrado")
    return {"message": "Restaurante eliminado"}
