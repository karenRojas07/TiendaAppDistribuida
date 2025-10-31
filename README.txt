importante levantar con 
docker-compose up --build
=========================
📘 DOCUMENTACIÓN DE ENDPOINTS
=========================

🔧 USUARIOS

1. Registrar usuario
--------------------
Método: POST
URL: http://localhost/api/users/register
Body (JSON):
{
  "name": "andres",
  "email": "andres@andres.com",
  "password": "andres"
}
Descripción: Crea un nuevo usuario con contraseña hasheada.

2. Iniciar sesión
-----------------
Método: POST
URL: http://localhost/api/users/login
Body (JSON):
{
  "email": "andres@andres.com",
  "password": "andres"
}
Descripción: Verifica credenciales y devuelve datos del usuario.

3. Obtener todos los usuarios
-----------------------------
Método: GET
URL: http://localhost/api/users/
Descripción: Devuelve una lista de todos los usuarios registrados.

🛒 PRODUCTOS

4. Crear producto
-----------------
Método: POST
URL: http://localhost/api/products/
Body (JSON):
{
  "name": "CARNE",
  "price": 650,
  "stock": 5,
  "estado": "activo"
}
Descripción: Registra un nuevo producto en el sistema.

5. Obtener producto por ID
--------------------------
Método: GET
URL: http://localhost/api/products/:id
Ejemplo: http://localhost/api/products/2
Descripción: Devuelve los datos del producto con el ID especificado.

📦 ÓRDENES

6. Crear orden
--------------
Método: POST
URL: http://localhost/api/orders
Body (JSON):
{
  "product_id": 2,
  "quantity": 3
}
Descripción: Crea una orden. El total se calcula automáticamente (quantity * price). También actualiza el stock del producto.

7. Obtener orden por ID
-----------------------
Método: GET
URL: http://localhost/api/orders/:id
Ejemplo: http://localhost/api/orders/1
Descripción: Devuelve los datos de la orden con el ID especificado.

8. Obtener todas las órdenes
----------------------------
Método: GET
URL: http://localhost/api/orders
Descripción: Devuelve todas las órdenes registradas.