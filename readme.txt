les explico como funciona:
https://e-commerce-back-production-de3f.up.railway.app/producto (GET)
https://e-commerce-back-production-de3f.up.railway.app/productoCrear (POST)
https://e-commerce-back-production-de3f.up.railway.app/usuarios (GET)
https://e-commerce-back-production-de3f.up.railway.app/usuariosCrear (POST)
lo mismo va para categorias o sea categorias para el get y categoriasCrear para el post n.n
*luego de esto hagan el post primero para darle un valor a sus bases de datos (o sea un POST) por ej: 
{
  "nombreproducto": "Nombre del producto",
  "descproducto": "Descripción del producto",
  "colorproducto": "Color del producto",
  "fotoprinc": "URL de la foto principal",
  "precioproducto": "Precio del producto",
  "disponibproducto": "Disponibilidad del producto",
  "fotosecund": "URL de la foto secundaria",
  "categoria": "Categoría del producto"
}
de ahi estan habilitados para hacer el GET de este mismo producto.
*el producto por Id la route es /producto/:id 
USERS
*para usuario tienen que poner esto en el post: /usuariosCrear
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
