import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxImageCompressService } from 'ngx-image-compress';
import * as _ from 'lodash';
import { FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import { ProductService } from '../../../depe/services/product.service';
import { ContactService } from '../../../depe/services/contact.service';
import { ErrorService } from '../../../depe/services/error.service';
import { AlertService } from '../../../depe/services/alert.service';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html'
})
export class AddProductsComponent implements OnInit {
  groupList;
  submitted = false;
  btnDisable = false;
  loading = false;
  //pageLoading = false;
  priceChecked: boolean = true;
  images:any = [];
  imageProcess = false;
  url:any;
  imgResultAfterCompress:string;  
  sizeOfOriginalImage;
  localCompressedURl;
  imageError: string;
  upoladProductsForm : FormGroup;

  constructor(
    private eS:ErrorService, 
    private imageCompress: NgxImageCompressService, 
    private router:Router, 
    private cS : ContactService, 
    private fB:FormBuilder, 
    private pS:ProductService,
    private alertS:AlertService
  ) { }

  ngOnInit() {
    this.upoladProductsForm = this.fB.group({
      groupId : ['0'/* , Validators.required */],
      file: new FormControl('', [Validators.required]),
      fileSource: new FormControl('', [Validators.required])
    })
    this.getContactGroupList();
    //console.log('this.imageProcess 1 F', this.imageProcess)
  }

  get aPF(){
    return this.upoladProductsForm.controls;
  }

  changeChbxValue(value) {
    this.priceChecked = !value;
    //console.log(this.priceChecked)
  }

  onFileChange(event: any) {
    this.imageError = null;
    if (event.target.files && event.target.files[0]) {
        //Size Filter Bytes
        const max_size = 2000000;
        const allowed_types = ['image/png', 'image/jpg', 'image/jpeg'];
        const max_height = 10240000;
        const max_width = 10240000;

        if (event.target.files[0].size > max_size) {
            this.imageError = 'Maximum size allowed is ' + max_size / 1000000 + 'Mb';
            return false;
        }
        if (!_.includes(allowed_types, event.target.files[0].type)) {
            this.imageError = 'Only Images are allowed ( JPG | PNG )';
            return false;
        }

        var filesAmount = event.target.files.length;
        //this.imageProcess = true;
        //console.log('this.imageProcess 2 T', this.imageProcess)
        for (let i = 0; i < filesAmount; i++) {
          const reader = new FileReader();
          reader.onload = (event: any) => {
              const image = new Image();
              image.src = event.target.result;
              image.onload = rs => {
                  const img_height = rs.currentTarget['height'];
                  const img_width = rs.currentTarget['width'];
                  if (img_height > max_height && img_width > max_width) {
                      this.imageError =
                          'Maximum dimentions allowed ' +
                          max_height +
                          '*' +
                          max_width +
                          'px';
                      this.imageProcess = false;
                      return false;
                  } else {
                    let self = this;
                    self.url = event.target.result;
                    if(img_width > 800){
                      self.compressFile(self.url);
                    }else{
                      //this.images.push(this.url);
                      self.images.push({imgUrl : self.url, price : 0});
                      self.upoladProductsForm.patchValue({
                        fileSource: self.images
                      });
                    }                    
                  }
              };
          };
          reader.readAsDataURL(event.target.files[i]);
        }
        //this.imageProcess = false;
        //console.log('this.imageProcess 3 F', this.imageProcess)
        //this.btnDisable = false;
    }
  }  

  compressFile(image) {
    var orientation = -1;
    //this.sizeOfOriginalImage = this.imageCompress.byteCount(image)/(1024*1024);
    this.imageCompress.compressFile(image, orientation, 50, 50).then(
      result => {
      this.imgResultAfterCompress = result;      
      this.localCompressedURl = result;
      this.images.push({imgUrl : this.localCompressedURl, price : 0}); 
      this.upoladProductsForm.patchValue({
        fileSource: this.images
      });
    });
  }

  uploadProducts(){
    let self = this;
    //console.log('this.images', this.images)
    try {
      if(self.upoladProductsForm.valid){
        self.loading = true;
        //self.pageLoading = true;
        self.submitted = true;     
        let productImgValue = this.upoladProductsForm.value;
        let formData = {
          groupId : productImgValue.groupId, 
          images : {
            file : productImgValue.file, 
            fileSource:productImgValue.fileSource
          }
        }
        self.pS.uploadProducts(formData).subscribe(
          data => {
            let resData = data['status'];
            //console.log(data);
            if(resData == "true"){
              let msg = data['result']['message'];
              self.alertS.succAlert(msg);
              self.loading = false;
              self.router.navigate(['/Dashboard']);
              //self.pageLoading = false;
            }else{
              self.loading = false;
              //self.pageLoading = false;
              let error = data['error'];
              self.alertS.errAlert(error);
              self.eS.errorFunc(error);
            }
          }
        )
      }
    }
    catch(err) {
      self.loading = false;
      self.alertS.errAlert(err.message);
    }    
  }

  
}
