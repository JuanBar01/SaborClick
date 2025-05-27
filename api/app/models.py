from sqlalchemy import Column, Integer, String
from .database import Base

class Restaurante(Base):
    __tablename__ = "restaurantes"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100), unique=True, index=True)
    direccion = Column(String(200))
