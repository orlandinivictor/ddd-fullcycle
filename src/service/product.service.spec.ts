import { Product } from "../entity/product";
import { ProductService } from "./product.service";

describe("Product service unit tests", () => {
  it("should change the prices of all products", () => {
    const product1 = new Product("1", "Programação", 100);
    const product2 = new Product("2", "Arquitetura de Software", 150);
    const product3 = new Product("3", "DevOps", 50);

    const products = [product1, product2, product3];

    ProductService.increasePrice(products, 100);

    expect(product1.price).toBe(200);
    expect(product2.price).toBe(300);
    expect(product3.price).toBe(100);
  });
});
