import { v4 as uuid } from "uuid";

import { Customer } from "../domain/entity/customer";
import { Order } from "../domain/entity/order";
import { OrderItem } from "../domain/entity/order-item";

export class OrderService {
  static total(orders: Order[]): number {
    return orders.reduce((total, order) => total + order.total(), 0);
  }

  static placeOrder(customer: Customer, items: OrderItem[]): Order {
    if (items.length === 0) {
      throw new Error("Order must have at least one item");
    }

    const order = new Order(uuid(), customer.id, items);
    customer.addRewardPoints(order.total() / 2);

    return order;
  }
}