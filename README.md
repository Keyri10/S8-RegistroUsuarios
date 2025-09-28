# Registro de Productos - Fastify + PostgreSQL + Frontend

## Descripción
Aplicación simple para registrar, listar y eliminar productos.
-Backend: Fastify + PostgreSQL (migraciones).
- Frontend: HTML + JS (fetch).

## Estructura
- backend/
- frontend/
- docker-compose.yml
- .env.example
- README.md

## Requisitos
- Docker
- Docker Compose

## Levantar (desde la raíz)
1. `docker-compose down`
2. `docker-compose up --build`
3. Frontend: `http://localhost:3001/` 
4. Backend API: `http://localhost:3000` 

## Endpoints
- `POST /productos`  
  Body JSON: `{ "nombre":"string", "precio": number }`

- `GET /productos`  
  Devuelve lista de productos.

- `DELETE /productos/:id`  
  Elimina producto por id.


