import { Order } from "../entity/order";
import { OrderItem } from "../entity/order-item";
import { OrderService } from "./order.service";

describe("Order service unit tests", () => {
  it("should get total of all orders", () => {
    const orderItem1 = new OrderItem("1", "Programação", 10, "1", 2);
    const orderItem2 = new OrderItem("2", "Arquitetura", 20, "1", 1);
    const orderItem3 = new OrderItem("3", "DevOps", 5, "1", 3);
    const orderItem4 = new OrderItem("4", "DB", 5, "1", 4);

    const order1 = new Order("1", "1", [orderItem1, orderItem2]); // 40
    const order2 = new Order("1", "1", [orderItem3, orderItem4]); // 35
    const order3 = new Order("1", "1", [orderItem2, orderItem3]); // 35

    const total = OrderService.total([order1, order2, order3]);

    expect(total).toBe(110);
  });
});
