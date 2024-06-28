import { Sequelize } from "sequelize-typescript";
import { CustomerModel } from "./customer.model";
import { Customer } from "../../../../domain/customer/entity/customer";
import { CustomerRepository } from "./customer.repository";
import { Address } from "../../../../domain/customer/value-object/address";

describe("Customer repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);

    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: "1" } });
    expect(customerModel.toJSON()).toStrictEqual({
      id: "1",
      name: "Customer 1",
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
      street: customer.address.street,
      number: customer.address.number,
      zipcode: customer.address.zip,
      city: customer.address.city,
    });
  });

  it("should update a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);

    await customerRepository.create(customer);

    customer.changeName("Customer 2");
    await customerRepository.update(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: "1" } });
    expect(customerModel.toJSON()).toStrictEqual({
      id: "1",
      name: "Customer 2",
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
      street: customer.address.street,
      number: customer.address.number,
      zipcode: customer.address.zip,
      city: customer.address.city,
    });
  });

  it("should throw an error when customer is not fount", async () => {
    const customerRepository = new CustomerRepository();

    expect(async () => {
      await customerRepository.find("123");
    }).rejects.toThrow("Customer not found");
  });

  it("should find a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);

    await customerRepository.create(customer);

    const customerResult = await customerRepository.find(customer.id);

    expect(customerResult).toStrictEqual(customer);
  });

  it("should find all customers", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Customer 1");
    const customer2 = new Customer("2", "Customer 2");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    customer2.changeAddress(address);

    await customerRepository.create(customer);
    await customerRepository.create(customer2);

    const customerResult = await customerRepository.findAll();
    const customers = [customer, customer2];

    expect(customerResult).toStrictEqual(customers);
  });
});
