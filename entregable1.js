class ProductManager {
  constructor() {
    this.products = []; // Arreglo para almacenar los productos
  }

  getProducts() {
    return this.products; // Devuelve el arreglo de productos
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    if (this.isCodeRepeated(code)) {
      throw new Error('El código del producto ya está repetido.');
    }

    const id = this.generateId(); // Genera un ID único para el nuevo producto

    const newProduct = {
      id,
      title,
      description,
      price,
      thumbnail,
      code,
      stock
    };

    this.products.push(newProduct); // Agrega el nuevo producto al arreglo de productos
  }

  generateId() {
    const id = Math.random().toString(36).substr(2, 9); // Genera un ID aleatorio
    const existingProduct = this.products.find(product => product.id === id);

    // Si el ID generado ya existe, se vuelve a generar hasta obtener uno único
    if (existingProduct) {
      return this.generateId();
    }

    return id;
  }

  isCodeRepeated(code) {
    return this.products.some(product => product.code === code); // Verifica si hay algún producto con el mismo código
  }

  getProductById(id) {
    const product = this.products.find(product => product.id === id);

    if (!product) {
      throw new Error('No se encontró ningún producto con el ID proporcionado.');
    }

    return product;
  }
}

// Crear una instancia de la clase ProductManager
const productManager = new ProductManager();

// Obtener los productos (debe devolver un arreglo vacío)
console.log(productManager.getProducts()); // []

// Agregar un producto
productManager.addProduct(
  "producto prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc123",
  25
);

// Obtener los productos nuevamente (debe aparecer el producto recién agregado)
console.log(productManager.getProducts());

// Intentar agregar un producto con el mismo código (debe arrojar un error)
try {
  productManager.addProduct(
    "producto prueba",
    "Este es un producto prueba",
    200,
    "Sin imagen",
    "abc123",
    25
  );
} catch (error) {
  console.error(error.message);
}

// Obtener un producto por su ID (debe devolver el producto o arrojar un error si no se encuentra)
try {
  const product = productManager.getProductById("nonexistent-id");
  console.log(product);
} catch (error) {
  console.error(error.message);
}