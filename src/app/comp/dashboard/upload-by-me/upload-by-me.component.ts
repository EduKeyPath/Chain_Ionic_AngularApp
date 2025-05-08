import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../depe/services/product.service';
import { ContactService } from '../../../depe/services/contact.service';
import { ErrorService } from '../../../depe/services/error.service';
import { AlertService } from '../../../depe/services/alert.service';

declare var window;
declare var cordova;
declare var Environment;

@Component({
  selector: 'app-upload-by-me',
  templateUrl: './upload-by-me.component.html'
})
export class UploadByMeComponent implements OnInit {
  brannC;
  pageLoading = false;
  productsList = [];
  productDetails;
  productsListData;  
  imagePath;
  thumbnailPath;
  showloader:boolean = false;
  loading = false;
  noData:boolean = false;
  checkImg = false;
  showGroupPopup = false;
  groupList;
  selectGroup = [];
  selectedImg = [];
  selectedImgCheck = false;
  uploadPDPopup = false;
  sbyMeGId = ''; 

  updatePPriceDiv = false;
  updatePPriceData = {
    id : '', 
    price : ''
  };

  constructor(
    private eS : ErrorService, 
    private cS : ContactService,
    private pS:ProductService,
    private alertS:AlertService
  ) { }

  ngOnInit() {
    this.brannC = (!!localStorage.getItem('brandCode'))?localStorage.getItem('brandCode'):'';
    this.getProducts();   
  }


  getProducts(){
    let self = this;
    self.showloader = true;
    try {
      self.pS.getProductsList().subscribe((data) => {   
        //console.log(data);     
        if(data['status'] == 'true' && !!data['result'] && data['result']['list'].length > 0){
          self.showloader = false;          
          self.productsListData     =   data['result']['list'];
          self.imagePath            =   data['result']['imagePath'];
          self.thumbnailPath        =   data['result']['thumbnailPath'];
          self.productsList         =   self.productsListData;
          //console.log('this.productsList', this.productsList);
          //this.productSharedByMeList = [];
          //this.productSharedByVendorsList = [];
        }else{
          self.noData = true;
          self.showloader = false;
          let error = data['error'];
          self.alertS.errAlert(error);
          self.eS.errorFunc(error);
        }
      })
    }
    catch(err) {
      self.showloader = false;
      self.alertS.errAlert(err.message);
    }
  }

  clickedImg(){
    this.checkImg = !this.checkImg;
    this.selectedImgCheck = !this.selectedImgCheck;
  } 

  selectImg(i) {
    if(this.selectedImg.includes(i)){
      let index   = this.selectedImg.indexOf(i);
      this.selectedImg.splice(index,1);
      //console.log(this.selectedImg);
    }else {
      this.selectedImg.push(i);
      //console.log(this.selectedImg);
    }
    //console.log('selectedImg', this.selectedImg);
  }

  shareGroupPop(){
    let self = this;
    if(self.selectedImg.length < 1){
      self.alertS.errAlert('Please select any product');
      return false;
    }
    this.showGroupPopup = true;
    this.getContactGroupList();
  }
  hideGroupPopup(){
    this.showGroupPopup = false;
    this.selectGroup = [];
  }


  selectGroupForShare(id) {
    if(this.selectGroup.includes(id)){
      //console.log('selectItem', i);
      let index   = this.selectGroup.indexOf(id);
      this.selectGroup.splice(index,1);
    }else {
      this.selectGroup.push(id);
      //console.log('selectConArr', this.selectContact)
      /* let data  = this.selectGroup[i];
      let num = data['phoneNumbers'].map((item) => item.value); */
      //console.log(data);
      //console.log(num);

      /* this.selectedContactData.push({
        name: data['displayName'],
        numbers: num.join(',')   //"9073264158/ 9073264157/ 9073264156/ 9073264155"
      }) */
      //console.log(this.selectedContactData);
    }
    //console.log('selectGroup', this.selectGroup);
  }  

  showUploadPDPopup(pId){
    let self = this;    
    try {
      self.uploadPDPopup = true;
      self.showloader = true;
      self.pS.getProductsDetails(pId).subscribe(
        data => {
          //console.log(data);
          let resData = data['status'];
          if(resData == "true"){
            self.showloader = false;
            self.productDetails   =   data['result']['list'];
            self.imagePath        =   data['result']['imagePath'];
            self.thumbnailPath    =   data['result']['thumbnailPath'];
            //console.log('productDetails', this.productDetails);
          }else{
            self.noData = true;
            self.showloader = false;
            let error = data['error'];
            self.alertS.errAlert(error);
            self.eS.errorFunc(error);
            //alert(error);
          }
        }
      );
    }
    catch(err) {
      self.showloader = false;
      self.alertS.errAlert(err.message);
    }    
  }
  deleteProducts(){
    let self = this;
    if(this.selectedImg.length < 1){
      self.alertS.errAlert('Please select any product');
      return false;
    }
    let formData = {productIds : this.selectedImg}
    try {
      if(confirm('Are sure want to delete this products')){
        self.pageLoading = true;
        self.pS.deleteProduct(formData).subscribe(
          data => {
            let resData = data['status'];
            //console.log(data);
            if(resData == "true"){
              self.pageLoading = false;
              self.selectedImg = [];
              //self.showGroupPopup = false;
              //self.uploadPDPopup = false;
              self.checkImg = false;
              self.selectedImgCheck = false;
              let msg = data['result']['message'];
              self.alertS.succAlert(msg);
            }else{
              self.pageLoading = false;
              let error = data['error'];
              self.alertS.errAlert(error);
              self.eS.errorFunc(error);
            }
          }
        )        
      }
    }
    catch(err) {
      self.pageLoading = false;
      self.alertS.errAlert(err.message);
    }    
  }

  showUPPriceDiv(data){
    this.updatePPriceData = {
      id : data.id,
      price : data.price
    }
    //console.log(this.updatePPriceData);
  }

  shareSocial(prod){
    let self = this;
    self.pageLoading = true;
    setTimeout(function(){ 
      self.pageLoading = false;
    }, 7000);
    /* let price = self.multipleCode * prod.price;
    let code  =  self.brandCode + prod.price; */
    let imgP = self.imagePath + prod.image;
    let url = '';

    let message = 'CHAIN';
    let subject = 'CHAIN';
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

  
}
