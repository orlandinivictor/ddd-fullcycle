import { Address } from "./domain/customer/value-object/address";
import { Customer } from "./domain/customer/entity/customer";
import { Order } from "./domain/checkout/entity/order";
import { OrderItem } from "./domain/checkout/entity/order-item";

// Agregados diferentes referenciam-se por ID;
// Agregados iguais referenciam o próprio valor;

// Agregado de Customer
let customer = new Customer("1", "Victor Orlandini");
const address = new Address("Rua Paulino Félix", 99, "63560-970", "Acopiara");
customer.changeAddress(address);
customer.activate();

// Agregado de Order
const item1 = new OrderItem("1", "Curso de Programação", 3000, "1", 1);
const item2 = new OrderItem("2", "Curso de Arquitetura", 4500, "2", 1);
new Order("1", "1", [item1, item2]);
