import {Address} from './Address';
import {Name} from './Name';
import {Phone} from './Phone';

export class Payer {
  address: Address;
  email: string;
  name: Name;
  payer_id: string;
  phone: Phone;


  constructor(address: Address, email: string, name: Name, payer_id: string, phone: Phone) {
    this.address = address;
    this.email = email;
    this.name = name;
    this.payer_id = payer_id;
    this.phone = phone;
  }
}
