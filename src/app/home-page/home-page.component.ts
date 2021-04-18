import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  printType = 'black_and_white';
  singleDoubleSide = 'single_side';
  numberOfCopies = '1';
  pageSize = 'A4';

  afuConfig = {
    multiple: true,
    // formatsAllowed: '.jpg,.png,.pdf,.docx',
    maxSize: 100,
    uploadAPI: {
      url: 'http://localhost:8080/document/uploadFile',
      params: {
        page: '1',
        printType: this.printType,
        singleDoubleSide: this.singleDoubleSide,
        numberOfCopies: this.numberOfCopies,
        pageSize: this.pageSize

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


  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {

  }


  testUrl(): void {
    const headers = new HttpHeaders(({Authorization: 'Basic ' + btoa('user' + ':' + 'password')}));

    this.http.post<any>('http://localhost:8080/document/aaa', {}, {
      observe: 'response',
      headers
    }).subscribe(response => {

      },
      error => {
        alert('error');
      });

  }

  DocUpload(event: any): void {

    alert('hello world');
  }

  selectPaperSize(event: any): void {
    console.log(event.target.value);
  }

}
