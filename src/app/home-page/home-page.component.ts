import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {IPayPalConfig, ICreateOrderRequest} from 'ngx-paypal';
import {PlaceOrderService} from '../place-order.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  public payPalConfig ?: IPayPalConfig;
  afuConfig: any;

  payPalComponentShow = false;

  shippingCost = 100;

  paperCost = 0;
  fileUploaderShow = true;

  constructor(private http: HttpClient, public placeOrderService: PlaceOrderService) {
  }

  ngOnInit(): void {
    this.initPaypalConfig();
    this.initUploadConfig();
  }

  DocUpload(event: any): void {
    // this.payPalComponentShow = event.status === 200;

    if (event.status === 200) {
      this.payPalComponentShow = true;
    } else {
      this.payPalComponentShow = false;
    }
    this.fileUploaderShow = false;
  }

  private initPaypalConfig(): void {
    const iCreateOrder: ICreateOrderRequest = {
      intent: 'CAPTURE',
      purchase_units: [{
        amount: {
          currency_code: this.placeOrderService.printDetails.value.currencyCode,
          value: this.placeOrderService.printDetails.value.totalAmount,
          breakdown: {
            item_total: {
              currency_code: this.placeOrderService.printDetails.value.currencyCode,
              value: this.placeOrderService.printDetails.value.totalAmount
            }
          }
        },
        items: [{
          name: 'Enterprise Subscription',
          quantity: '1',
          category: 'DIGITAL_GOODS',
          unit_amount: {
            currency_code: this.placeOrderService.printDetails.value.currencyCode,
            value: this.placeOrderService.printDetails.value.totalAmount,
          },
        }]
      }]
    };

    this.payPalConfig = {
      currency: this.placeOrderService.printDetails.value.currencyCode,
      clientId: 'sb',


      createOrderOnClient: (data: any) => iCreateOrder,


      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then((details: any) => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
          this.savePayerDetails(details.payer);

        });

      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        // this.showSuccess = true;
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
        // this.showCancel = true;
        location.reload();
      },
      onError: err => {
        console.log('OnError', err);
        // this.showError = true;
        location.reload();

      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
        // this.resetStatus();
      },
    };
  }

  initUploadConfig(): void {
    this.afuConfig = {
      multiple: true,
      // formatsAllowed: '.jpg,.png,.pdf,.docx',
      maxSize: 10,
      uploadAPI: {
        url: 'http://localhost:8080/document/uploadFile',
        params: {
          page: '1',
          printType: this.placeOrderService.printDetails.value.printType,
          singleDoubleSide: this.placeOrderService.printDetails.value.singleDoubleSide,
          numberOfCopies: this.placeOrderService.printDetails.value.numberOfCopies,
          pageSize: this.placeOrderService.printDetails.value.pageSize

        },
        responseType: 'blob'
      },
      replaceTexts: {
        attachPinBtn: 'Attach Files...',
        afterUploadMsg_success: 'Successfully Uploaded !',
        afterUploadMsg_error: 'Upload Failed !',
        sizeLimit: 'Size Limit of the file'
      }
    };

    this.placeOrderService.printDetails.value.totalAmount = this.priceCalculation().toString();
    this.initPaypalConfig();

  }


  savePayerDetails(payerDetails: any): void {
    const headers = new HttpHeaders(({Authorization: 'Basic ' + btoa('user' + ':' + 'password')}));
    this.http.post<any>('http://localhost:8080/document/savePayerDetails', payerDetails, {
      observe: 'response',
      headers
    }).subscribe(response => {
      alert('Item added successfully');
    }, error => {
      console.log(error);
      alert('error');
    });
  }

  priceCalculation(): number {

    if (this.placeOrderService.printDetails.value.pageSize === 'Letter') {
      if (this.placeOrderService.printDetails.value.pageSize === 'black_and_white') {
        if (this.placeOrderService.printDetails.value.pageSize === 'single_side') {
          this.paperCost = 2;
        } else {
          this.paperCost = 3;

        }
      } else {
        if (this.placeOrderService.printDetails.value.pageSize === 'single_side') {
          this.paperCost = 5;
        } else {
          this.paperCost = 8;

        }
      }

    } else if (this.placeOrderService.printDetails.value.pageSize === 'Executive') {
      if (this.placeOrderService.printDetails.value.pageSize === 'black_and_white') {
        if (this.placeOrderService.printDetails.value.pageSize === 'single_side') {
          this.paperCost = 2;
        } else {
          this.paperCost = 3;

        }
      } else {
        if (this.placeOrderService.printDetails.value.pageSize === 'single_side') {
          this.paperCost = 4;
        } else {
          this.paperCost = 6;

        }
      }
    } else if (this.placeOrderService.printDetails.value.pageSize === 'Legal') {
      if (this.placeOrderService.printDetails.value.pageSize === 'black_and_white') {
        if (this.placeOrderService.printDetails.value.pageSize === 'single_side') {
          this.paperCost = 2;
        } else {
          this.paperCost = 3;

        }
      } else {
        if (this.placeOrderService.printDetails.value.pageSize === 'single_side') {
          this.paperCost = 5;
        } else {
          this.paperCost = 6;

        }
      }
    } else if (this.placeOrderService.printDetails.value.pageSize === 'Statement') {
      if (this.placeOrderService.printDetails.value.pageSize === 'black_and_white') {
        if (this.placeOrderService.printDetails.value.pageSize === 'single_side') {
          this.paperCost = 3;
        } else {
          this.paperCost = 5;

        }
      } else {
        if (this.placeOrderService.printDetails.value.pageSize === 'single_side') {
          this.paperCost = 4;
        } else {
          this.paperCost = 7;

        }
      }
    } else if (this.placeOrderService.printDetails.value.pageSize === 'Tabloid') {
      if (this.placeOrderService.printDetails.value.pageSize === 'black_and_white') {
        if (this.placeOrderService.printDetails.value.pageSize === 'single_side') {
          this.paperCost = 2;
        } else {
          this.paperCost = 4;

        }
      } else {
        if (this.placeOrderService.printDetails.value.pageSize === 'single_side') {
          this.paperCost = 3;
        } else {
          this.paperCost = 6;

        }
      }
    } else if (this.placeOrderService.printDetails.value.pageSize === 'A3') {
      if (this.placeOrderService.printDetails.value.pageSize === 'black_and_white') {
        if (this.placeOrderService.printDetails.value.pageSize === 'single_side') {
          this.paperCost = 4;
        } else {
          this.paperCost = 7;

        }
      } else {
        if (this.placeOrderService.printDetails.value.pageSize === 'single_side') {
          this.paperCost = 4;
        } else {
          this.paperCost = 8;

        }
      }
    } else if (this.placeOrderService.printDetails.value.pageSize === 'A4') {
      if (this.placeOrderService.printDetails.value.pageSize === 'black_and_white') {
        if (this.placeOrderService.printDetails.value.pageSize === 'single_side') {
          this.paperCost = 3;
        } else {
          this.paperCost = 6;

        }
      } else {
        if (this.placeOrderService.printDetails.value.pageSize === 'single_side') {
          this.paperCost = 3;
        } else {
          this.paperCost = 5;

        }
      }
    } else if (this.placeOrderService.printDetails.value.pageSize === 'A5') {
      if (this.placeOrderService.printDetails.value.pageSize === 'black_and_white') {
        if (this.placeOrderService.printDetails.value.pageSize === 'single_side') {
          this.paperCost = 4;
        } else {
          this.paperCost = 5;

        }
      } else {
        if (this.placeOrderService.printDetails.value.pageSize === 'single_side') {
          this.paperCost = 2;
        } else {
          this.paperCost = 6;

        }
      }
    } else if (this.placeOrderService.printDetails.value.pageSize === 'B4') {
      if (this.placeOrderService.printDetails.value.pageSize === 'black_and_white') {
        if (this.placeOrderService.printDetails.value.pageSize === 'single_side') {
          this.paperCost = 2;
        } else {
          this.paperCost = 3;

        }
      } else {
        if (this.placeOrderService.printDetails.value.pageSize === 'single_side') {
          this.paperCost = 3;
        } else {
          this.paperCost = 6;

        }
      }
    } else if (this.placeOrderService.printDetails.value.pageSize === 'B5') {
      if (this.placeOrderService.printDetails.value.pageSize === 'black_and_white') {
        if (this.placeOrderService.printDetails.value.pageSize === 'single_side') {
          this.paperCost = 3;
        } else {
          this.paperCost = 3;

        }
      } else {
        if (this.placeOrderService.printDetails.value.pageSize === 'single_side') {
          this.paperCost = 5;
        } else {
          this.paperCost = 8;

        }
      }
    }
    return this.paperCost + this.shippingCost;
  }

  testAbc(): void {
    console.log('------------------------------------------------');
    console.log(this.placeOrderService.printDetails.value);
    console.log('------------------------------------------------');
  }
}
