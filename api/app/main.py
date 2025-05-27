from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from . import models, database

app = FastAPI()

models.Base.metadata.create_all(bind=database.engine)

@app.get("/")
def read_root():
    return {"mensaje": "API de Restaurantes activa"}
