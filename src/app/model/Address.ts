export class Address {

  address_line_1: string;
  admin_area_1: string;
  admin_area_2: string;
  country_code: string;
  postal_code: string;

  constructor(address_line_1: string, admin_area_1: string, admin_area_2: string, country_code: string, postal_code: string) {
    this.address_line_1 = address_line_1;
    this.admin_area_1 = admin_area_1;
    this.admin_area_2 = admin_area_2;
    this.country_code = country_code;
    this.postal_code = postal_code;
  }
}
