import { Sequelize } from "sequelize-typescript";

import { CustomerModel } from "../db/sequelize/model/customer.model";
import { OrderItemModel } from "../db/sequelize/model/order-item.model";
import { OrderModel } from "../db/sequelize/model/order.model";
import { ProductModel } from "../db/sequelize/model/product.model";

import { Address } from "../../domain/entity/address";
import { Customer } from "../../domain/entity/customer";
import { OrderItem } from "../../domain/entity/order-item";
import { Order } from "../../domain/entity/order";
import { Product } from "../../domain/entity/product";

import { CustomerRepository } from "./customer.repository";
import { ProductRepository } from "./product.repository";
import { OrderRepository } from "./order.repository";

describe("Customer repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a new order", async () => {
    const customerRepository = new CustomerRepository();
    const productRepository = new ProductRepository();
    const orderRepository = new OrderRepository();

    const customer = new Customer("1", "Victor");
    const address = new Address("Street 1", 1, "12345-678", "São Paulo");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const product = new Product("1", "DDD", 100);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      1
    );

    const order = new Order("1", customer.id, [orderItem]);
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: "1",
      customer_id: "1",
      total: order.total,
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          product_id: orderItem.productId,
          order_id: "1",
        },
      ],
    });
  });

  it("should update a order", async () => {
    const customerRepository = new CustomerRepository();
    const productRepository = new ProductRepository();
    const orderRepository = new OrderRepository();

    const customer = new Customer("1", "Victor");
    const address = new Address("Street 1", 1, "12345-678", "São Paulo");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const product = new Product("1", "DDD", 100);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      1
    );

    const order = new Order("1", customer.id, [orderItem]);
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: "1",
      customer_id: "1",
      total: order.total,
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          product_id: orderItem.productId,
          order_id: "1",
        },
      ],
    });

    const product2 = new Product("2", "Clean Architecture", 200);
    await productRepository.create(product2);
    const orderItem2 = new OrderItem(
      "2",
      product2.name,
      product2.price,
      product2.id,
      1
    );
    order.updateItems([orderItem, orderItem2]);

    await orderRepository.update(order);

    const orderModelUpdated = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModelUpdated.toJSON()).toStrictEqual({
      id: "1",
      customer_id: "1",
      total: order.total,
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          product_id: orderItem.productId,
          order_id: "1",
        },
        {
          id: orderItem2.id,
          name: orderItem2.name,
          price: orderItem2.price,
          quantity: orderItem2.quantity,
          product_id: orderItem2.productId,
          order_id: "1",
        },
      ],
    });
  });

  it("should find a order", async () => {
    const customerRepository = new CustomerRepository();
    const productRepository = new ProductRepository();
    const orderRepository = new OrderRepository();

    const customer = new Customer("1", "Victor");
    const address = new Address("Street 1", 1, "12345-678", "São Paulo");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const product = new Product("1", "DDD", 100);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      1
    );

    const order = new Order("1", customer.id, [orderItem]);
    await orderRepository.create(order);

    const foundOrder = await orderRepository.find(order.id);

    expect(foundOrder).toStrictEqual(order);
  });

  it("should find all orders", async () => {
    const customerRepository = new CustomerRepository();
    const productRepository = new ProductRepository();
    const orderRepository = new OrderRepository();

    const customer = new Customer("1", "Victor");
    const address = new Address("Street 1", 1, "12345-678", "São Paulo");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const product = new Product("1", "DDD", 100);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      1
    );
    const orderItem2 = new OrderItem(
      "2",
      product.name,
      product.price,
      product.id,
      1
    );

    const order = new Order("1", customer.id, [orderItem]);
    await orderRepository.create(order);
    const order2 = new Order("2", customer.id, [orderItem2]);
    await orderRepository.create(order2);

    const foundOrders = await orderRepository.findAll();

    expect(foundOrders).toStrictEqual([order, order2]);
  });
});
