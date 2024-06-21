/*
  Entidade - Guarda regras de negócio
  Entidade Anemica - Guarda apenas dados

  * Uma entidade por padrão sempre deve se auto-validar

  ORM vs DDD
  DDD -> Entidade focada em negocio;
  ORM -> Entidade focada em persistencia;

  Domain
  - Entity
    - customer.ts(regras de negocio)

  ORM - Infra
  - Entity / Model
    - customer.ts(get,set)
*/

import { Address } from "./address";

export class Customer {
  private _id: string;
  private _name: string = "";
  private _address!: Address;
  private _active: boolean = false;
  private _rewardPoints: number = 0;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;

    this.validate();
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }

  isActive(): boolean {
    return this._active;
  }

  validate() {
    if (this._id.length === 0) {
      throw new Error("Id is required");
    }

    if (this._name.length === 0) {
      throw new Error("Name is required");
    }
  }

  changeName(name: string) {
    this._name = name;

    this.validate();
  }

  activate() {
    if (this._address === undefined) {
      throw new Error("Address is mandatory to activate a customer");
    }

    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points;
  }

  set Address(address: Address) {
    this._address = address;
  }
}
