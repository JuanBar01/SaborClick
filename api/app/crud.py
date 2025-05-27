from sqlalchemy.orm import Session
from app.models import User, Restaurant

# Usuarios
def create_user(db: Session, name: str, email: str):
    db_user = User(name=name, email=email)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_users(db: Session):
    return db.query(User).all()

def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

# Restaurantes
def create_restaurant(db: Session, nombre: str, direccion: str, descripcion: str, calificacion: float):
    db_restaurant = Restaurant(
        nombre=nombre,
        direccion=direccion,
        descripcion=descripcion,
        calificacion=calificacion
    )
    db.add(db_restaurant)
    db.commit()
    db.refresh(db_restaurant)
    return db_restaurant

def get_restaurants(db: Session):
    return db.query(Restaurant).all()

def delete_restaurant(db: Session, restaurant_id: int):
    restaurant = db.query(Restaurant).filter(Restaurant.id == restaurant_id).first()
    if restaurant:
        db.delete(restaurant)
        db.commit()
        return True
    return False
