import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../depe/services/product.service';
import { ContactService } from '../../../depe/services/contact.service';
import { ErrorService } from '../../../depe/services/error.service';
import { AlertService } from '../../../depe/services/alert.service';

declare var window;
declare var cordova;
declare var Environment;

@Component({
  selector: 'app-shared-by-me',
  templateUrl: './shared-by-me.component.html'
})
export class SharedByMeComponent implements OnInit {
  brannC;
  pageLoading = false;  
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
  sharedByMePDPopup = false;
  sbyMeGId = '';
  sbyMeMulti;

  productSharedByMeList = [];
  productSharedByMeData;
  sharedByMeProductDetails;


  constructor(
    private eS : ErrorService, 
    private cS : ContactService,
    private pS:ProductService,
    private alertS:AlertService
  ) { }

  ngOnInit() {
    this.brannC = (!!localStorage.getItem('brandCode'))?localStorage.getItem('brandCode'):'';
    this.getPSByMe();
  }

  getPSByMe(){
    let self = this;
    self.showloader = true;
    try {
      self.pS.getProductSharedByMe().subscribe((data) => {
        //console.log(data);
        if(data['status'] == 'true' && !!data['result']['list'] && data['result']['list'].length > 0){
          self.showloader = false;
          self.productSharedByMeData      =   data['result']['list'];
          self.imagePath                  =   data['result']['imagePath'];
          self.thumbnailPath              =   data['result']['thumbnailPath'];
          self.productSharedByMeList      =   self.productSharedByMeData;  
          //console.log('this.productSharedByMeList', this.productSharedByMeList);         
          /* let createdDate = this.productSharedByMeList[0].createdOn;
          let timz = 'Asia/Kolkata' //this.productSharedByMeList[0].timezone;
          let form = moment.tz(parseInt(createdDate)*1000, timz).format( 'DD-MM-YYYY h:m:s A');
          //moment.tz(createdDate, timz).format('yyyy-mm-dd'); 
          console.log(createdDate, timz, form); */
          //this.productsList = [];
          //this.productSharedByVendorsList = [];
        }else{
          self.showloader = false;
          self.noData = true;
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
        numbers: num.join(',')   
      }) */
      //console.log(this.selectedContactData);
    }
    //console.log('selectGroup', this.selectGroup);
  }  

  hideSharedByMePDPopup(){
    this.sharedByMePDPopup = false;
    //this.sharedByMeProductDetails = [];
    this.checkImg = false;
    this.sbyMeGId = '';
    this.sbyMeMulti = '';
    this.selectedImgCheck = false;
    this.selectedImg = [];
  }

  shareSocial(prod, sbyMeMulti){
    let self = this;
    self.pageLoading = true;
    setTimeout(function(){ 
      self.pageLoading = false;
    }, 7000);
    let price = sbyMeMulti * prod.price;
    let code  =  self.brannC + prod.price;
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
}
