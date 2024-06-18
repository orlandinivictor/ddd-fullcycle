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
    const item1 = new OrderItem("1", "Curso de Programação", 3000);
    const item2 = new OrderItem("2", "Curso de Arquitetura de Software", 4500);
    const order = new Order("1", "1", [item1, item2]);

    expect(order.total()).toBe(7500);
  });
});
