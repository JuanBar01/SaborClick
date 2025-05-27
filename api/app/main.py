from fastapi import FastAPI, Depends, HTTPException, File, UploadFile, Form
from sqlalchemy.orm import Session
from app import models, crud, database
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from typing import List
import os
import shutil
from pydantic import BaseModel, Field, EmailStr

app = FastAPI()

# Crear tablas
models.Base.metadata.create_all(bind=database.engine)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Montar archivos estáticos para logos
app.mount("/logos", StaticFiles(directory="logos"), name="logos")

# Dependencia para base de datos
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Pydantic models
class UserLogin(BaseModel):
    name: str
    email: EmailStr

class RestaurantOut(BaseModel):
    id: int
    nombre: str
    direccion: str
    descripcion: str
    calificacion: float
    logo_path: str
    class Config:
        from_attributes = True

# Rutas de usuario
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
        return {
            "message": "Login correcto",
            "user": {"name": db_user.name, "email": db_user.email}
        }
    else:
        created_user = crud.create_user(db, user.name, user.email)
        return {
            "message": "Usuario creado",
            "user": {"name": created_user.name, "email": created_user.email}
        }

# Rutas de restaurantes
@app.post("/restaurants/", response_model=RestaurantOut)
async def create_restaurant(
    nombre: str = Form(...),
    direccion: str = Form(...),
    descripcion: str = Form(...),
    calificacion: float = Form(...),
    logo: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    if logo.content_type not in ["image/png", "image/jpeg"]:
        raise HTTPException(status_code=400, detail="Solo se permiten archivos PNG o JPEG")

    logo_dir = "logos"
    os.makedirs(logo_dir, exist_ok=True)

    save_path = os.path.join(logo_dir, logo.filename)
    with open(save_path, "wb") as buffer:
        shutil.copyfileobj(logo.file, buffer)

    logo_url = f"http://localhost:8000/logos/{logo.filename}"

    return crud.create_restaurant(
        db,
        nombre=nombre,
        direccion=direccion,
        descripcion=descripcion,
        calificacion=calificacion,
        logo_path=logo_url
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
