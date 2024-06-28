import { Address } from "../value-object/address";
import { CustomerFactory } from "./customer.factory";

describe("Customer factory unit tests", () => {
  it("should create a customer", () => {
    const customer = CustomerFactory.create("Victor");
  
    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("Victor");
    expect(customer.address).toBeUndefined();
  })

  it("should create a customer with an address", () => {
    const address = new Address("Main", 123, "12345", "Florida")
    const customer = CustomerFactory.createWithAddress("Victor", address);
  
    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("Victor");
    expect(customer.address).toBe(address);
  })
})