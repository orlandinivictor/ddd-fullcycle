import { Address } from "./domain/entity/address";
import { Customer } from "./domain/entity/customer";
import { Order } from "./domain/entity/order";
import { OrderItem } from "./domain/entity/order-item";

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
