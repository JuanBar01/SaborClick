from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_create_restaurant():
    response = client.post("/restaurants/", json={
        "nombre": "La Casa del Taco",
        "direccion": "Calle 123",
        "descripcion": "Comida mexicana auténtica",
        "calificacion": 4.5
    })
    assert response.status_code == 200
    data = response.json()
    assert data["nombre"] == "La Casa del Taco"
    assert "id" in data

def test_read_restaurants():
    response = client.get("/restaurants/")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)

def test_delete_restaurant():
    # Crear un restaurante para eliminarlo
    create_response = client.post("/restaurants/", json={
        "nombre": "Restaurante Temporal",
        "direccion": "Temporal 123",
        "descripcion": "Temporal para eliminar",
        "calificacion": 3.5
    })
    assert create_response.status_code == 200
    restaurant_id = create_response.json()["id"]

    delete_response = client.delete(f"/restaurants/{restaurant_id}")
    assert delete_response.status_code == 200
    assert delete_response.json() == {"message": "Restaurante eliminado"}

def test_login_or_create_user():
    payload = {
        "name": "Test User",
        "email": "testuser@example.com"
    }
    response = client.post("/login_or_create/", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "message" in data
    assert "user" in data
    assert data["user"]["email"] == "testuser@example.com"
