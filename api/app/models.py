from sqlalchemy import Column, Integer, String, Float
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), index=True)
    email = Column(String(50), unique=True, index=True)

class Restaurant(Base):
    __tablename__ = "restaurants"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100), index=True)
    direccion = Column(String(200))
    descripcion = Column(String(300))
    calificacion = Column(Float)
    logo_path = Column(String(255))