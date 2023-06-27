les explico como funciona:
* primero que nada crear la bdd configurar el .env a gusto de cada uno de ahi conectense.
* npm install
* npm start
*luego de esto hagan el post primero para darle un valor a sus bases de datos (o sea un POST) por ej: 
{
  "nombreproducto": "Nombre del producto",
  "descproducto": "Descripción del producto",
  "colorproducto": "Color del producto",
  "fotoprinc": "URL de la foto principal",
  "precioproducto": "Precio del producto",
  "disponibproducto": "Disponibilidad del producto",
  "fotosecund": "URL de la foto secundaria",
  "categori": "Categoría del producto"
}
de ahi estan habilitados para hacer el GET de este mismo producto.
*el producto por Id la route es /producto/:id 
USERS
*para usuario tienen que poner esto en el post: /usuario
{
  "login": "john.doe",
  "username": "John Doe",
  "password": "secretpassword",
  "rol": "2"
}
para el user por id es lo mismo que el de producto. /usuarios/:id
para el PUT /usuarios/:id
{
  "login": "john.olaolaola",
  "username": "John Doe",
  "password": "secretpassword",
  "rol": "1"
}
y bueno el delete seria lo mismo pero por id /usuarios/:id 
Categorias:
{
  "nombrecat": "Electrónica",
  "desccat": "Productos electrónicos"
}
