import { Order } from "./order";
import { OrderItem } from "./order-item";

describe("Order unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      new Order("", "1", []);
    }).toThrow("Id is required");
  });

  it("should throw error when customer id is empty", () => {
    expect(() => {
      new Order("1", "", []);
    }).toThrow("Customer Id is required");
  });

  it("should throw error when items is empty", () => {
    expect(() => {
      new Order("1", "1", []);
    }).toThrow("At least one item is required");
  });

  it("should calculate total", () => {
    const item1 = new OrderItem("1", "Curso de Programação", 3000, "1", 1);
    const item2 = new OrderItem("2", "Curso de Arquitetura", 4500, "2", 2);
    const order = new Order("1", "1", [item1, item2]);

    expect(order.total()).toBe(12000);
  });

  it("should throw error when the item quantity is less or equal than 0", () => {
    expect(() => {
      const item1 = new OrderItem("1", "Curso de Programação", 3000, "1", 0);
      new Order("1", "1", [item1]);
    }).toThrow("Quantity must be greater than 0");
  });
});
