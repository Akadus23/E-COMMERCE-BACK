CREATE OR REPLACE FUNCTION insertar_en_prodxcateg()
  RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO prodxcateg ("categoriumId", "productoId", "createdAt", "updatedAt")
  SELECT "id", NEW.id, NOW(), NOW()
  FROM categoria
  WHERE categoria.id = NEW.idcategoria;  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Crear el TRIGGER en la tabla 'productos'
CREATE TRIGGER insertar_prodxcateg
AFTER INSERT ON productos
FOR EACH ROW
EXECUTE FUNCTION insertar_en_prodxcateg();
