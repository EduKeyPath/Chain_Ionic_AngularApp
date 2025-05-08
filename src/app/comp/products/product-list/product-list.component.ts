import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../depe/services/product.service';
import { CartService } from '../../../depe/services/cart.service';
import { ErrorService } from '../../../depe/services/error.service';
import { AlertService } from '../../../depe/services/alert.service';

declare var window;
declare var cordova;
declare var Environment;

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {

  totalCartItems:any = 0;
  shareWMList = [];
  productDetails = [];
  vendorId:number;
  vendorName;
  brandName = '';
  brandCode = '';
  multipleCode = 0;
  imagePath;
  thumbnailPath;
  showloader = false;
  noData:boolean = false;
  productDetailsPopup = false;
  vendorDPopup = false;
  pageLoading = false;

  constructor(
    private eS:ErrorService,
    private pS:ProductService, 
    private cartService:CartService, 
    private router:Router, 
    private aR:ActivatedRoute,
    private alertS:AlertService
  ) {
      this.cartService.totalCartItems$.subscribe(totalItems => this.totalCartItems = totalItems); 
  }


  ngOnInit(): void {
    this.aR.params.subscribe((item) => {
      this.vendorId = item.id;
      this.vendorName = item.name;
      this.brandName = item.bn;
      //console.log('this.vendorName', this.vendorName, 'this.brandName', this.brandName)
    });
    this.getPSWithMe();
  }

  hideProductDetails(){
    this.productDetailsPopup = false;
    this.productDetails = [];
    this.multipleCode = 0;
  }

  showproductDetails(pId, multi, bCode){
    let self = this;
    self.productDetailsPopup = true;
    self.multipleCode = multi;
    self.brandCode = bCode;
    self.showloader = true;
    try {
      self.pS.getProductsDetails(pId).subscribe(
        data => {
          //console.log(data);
          let resData = data['status'];
          if(resData == "true"){
            self.showloader = false;
            self.productDetails   =   data['result']['list'] || [];
            self.imagePath        =   data['result']['imagePath'];
            self.thumbnailPath    =   data['result']['thumbnailPath'];
            //console.log('productDetails', this.productDetails);
          }else{
            self.noData = true;
            self.showloader = false;
            let error = data['error'];
            self.alertS.errAlert(error);
            self.eS.errorFunc(error);
          }
        }
      );
    }
    catch(err) {
      self.showloader = false;
      self.alertS.errAlert(err.message);
    }   
  }
  
  storedCartItems = localStorage.getItem('cart');
  //cartItems:any = this.cartService.cartItems;
  vId : any = (this.storedCartItems)?JSON.parse(this.storedCartItems).vendorId:'';

  addToCart(product, multiCode, iPath, bCode){
    let self = this;
    //console.log('this.vId', this.vId, 'this.vendorId', this.vendorId, 'bCode', bCode)
    if(!!this.vId && this.vId !== this.vendorId && this.totalCartItems > 0){
      if(confirm('This item is from differrent vendor, do you want clear your cart')){
        this.cartService.emptyCart();
        this.cartService.addToCart(product, multiCode, iPath, this.vendorId, bCode);
        self.alertS.succAlert('Product has been added successfully in your cart.');
      }
    }else {
      this.cartService.addToCart(product, multiCode, iPath, this.vendorId, bCode);
      self.alertS.succAlert('Product has been added successfully in your cart.');
    }    
  }
  buyNow(product, multiCode, iPath, bCode){
    if(!!this.vId && this.vId !== this.vendorId && this.totalCartItems > 0){
      if(confirm('This item is from differrent vendor, do you want clear your cart')){
        this.cartService.emptyCart();
        this.cartService.addToCart(product, multiCode, iPath, this.vendorId, bCode);
        this.router.navigate(['/Products/Cart']);
      }
    }else {
      this.cartService.addToCart(product, multiCode, iPath, this.vendorId, bCode);
      this.router.navigate(['/Products/Cart']);
    }    
  }

  saveImage(pData){
    if(confirm('Do you want save all products in your wall')){
      let productIds = [];
      let pId = pData.map(item => {
        return productIds.push(item.id)
      })
      //console.log(pIds);
      let self = this;
      self.pageLoading = true;
      try {
        self.pS.downloadImages(productIds).subscribe(
          data => {
            let resData = data['status'];
            //console.log(data);
            if(resData == "true"){
              self.pageLoading = false;
              let msg = data['result']['message'];
              self.alertS.succAlert(msg);
              self.router.navigate(['/Dashboard']);  
            }else{
              self.pageLoading = false;
              let error = data['error'];
              self.alertS.errAlert(error);
              self.eS.errorFunc(error);
            }
          }
        )
      }
      catch(err) {
        self.pageLoading = false;
        self.alertS.errAlert(err.message);
      }
    }
  }  

  downloadAll(prodData) {
    let self  = this;
    self.pageLoading = true;
    let count = 0;
    let fileTransfer = new window.FileTransfer();
    prodData.forEach((prod, i) => {
      let uri = encodeURI(this.imagePath + prod.image);
      //alert(uri);
      let fileURL = cordova.file.applicationStorageDirectory + prod.image;
      //alert(fileURL);

      fileTransfer.download(
        uri,
        fileURL,
        function(entry) {
            count++;
            //alert("download complete: " + count);
            if(prodData.length === count){
              let msg = 'Image Downloaded';
              self.alertS.succAlert(msg);
            }
            /* if(prodData.length === (i+1)){
              self.pageLoading = false;
              let msg = 'Image Downloaded';
              self.statusSucMsg = msg;
              self.snackSucAlert = true;
              setTimeout(function(){ 
                self.snackSucAlert = false;
                self.statusSucMsg = '';
              }, 3000);
            } */
            self.saveImageToGallery(fileURL);
        },
        function(error) {
          count++;
          //alert("download error source " + error.source);
          //alert("download error target " + error.target);
          //alert("download error code" + error.code);
        },
        false,
        {
            headers: {
                "Authorization": ""
            }
        }
      );
    })
    setTimeout(function(){ 
      self.pageLoading = false;
    }, 3000);
  }

  saveImageToGallery(fileURL) {
    let self  = this;
    //var url = 'file:///storage/emulated/0/path/to/file/Chain/' + prod.image;
    let url = fileURL;
    var album = 'Chain';
    //alert(fileURL);
    cordova.plugins.photoLibrary.saveImage(url, album, 
        function (libraryItem) {
          //alert('--------------success');
        }, 
        function () {
          //alert('--------------error');
          cordova.plugins.photoLibrary.requestAuthorization(
            function () {
              self.saveImageToGallery(fileURL);
            },
            function (err) {
                alert('Permission Denied : Unable to save image');
            }, // if options not provided, defaults to {read: true}.
            {
                read: true,
                write: true
            }
          );
        }
    );
  }

  shareSocial(prod){
    let self = this;
    self.pageLoading = true;
    setTimeout(function(){ 
      self.pageLoading = false;
    }, 7000);
    let price = self.multipleCode * prod.price;
    let code  =  self.brandCode + prod.price;
    let imgP = self.imagePath + prod.image;
    let url = '';

    let message = 'Code:'+ code.toString() + ', INR'+price.toString()+'\n';
    let subject = price.toString();
    let files = imgP.toString();
    let wurl = url;
    let chooserTitle = 'CHAIN';

    var options = { message: message, subject: subject, files: [files], url: wurl, chooserTitle: chooserTitle }
    var onSuccess = function(result) {
      self.pageLoading = false;
      //alert("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
      //alert("Shared to app: " + result.app); // On Android result.app is currently empty. On iOS it's empty when sharing is cancelled (result.completed=false)
    }
     
    var onError = function(msg) {
      self.pageLoading = false;
      //alert("Sharing failed with message: " + msg);
    }
     
    window.plugins.socialsharing.shareWithOptions(options, onSuccess, onError);
  }

  shareAllSocial(prodData){
    let self = this;
    self.pageLoading = true;
    setTimeout(function(){ 
      self.pageLoading = false;
    }, 15000);
    let imgArr = []
    prodData.forEach((prod) => {
      let imgFile = self.imagePath + prod.image
      imgArr.push(imgFile);
    })
    //console.log(imgArr)
    var options = { 
      message: 'CHAIN', 
      subject: 'CHAIN', 
      files: [...imgArr], 
      url: '',
      chooserTitle: 'CHAIN' 
    }
    var onSuccess = function(result) {
      self.pageLoading = false;
      //alert("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
      //alert("Shared to app: " + result.app); // On Android result.app is currently empty. On iOS it's empty when sharing is cancelled (result.completed=false)
    }
     
    var onError = function(msg) {
      self.pageLoading = false;
      //alert("Sharing failed with message: " + msg);
    }
    window.plugins.socialsharing.shareWithOptions(options, onSuccess, onError);     
  }

  showVendorDPopup(){
    this.vendorDPopup = true;
  }
  hideVendorDPopup(){
    this.vendorDPopup = false;
  }

}
