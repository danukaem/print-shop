import {Injectable} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PlaceOrderService {

  printDetails: FormGroup = new FormGroup({
    printType: new FormControl('black_and_white'),
    singleDoubleSide: new FormControl('single_side'),
    numberOfCopies: new FormControl('1'),
    pageSize: new FormControl('A4'),
    totalAmount: new FormControl('0'),
    currencyCode: new FormControl('USD'),
  });


}
