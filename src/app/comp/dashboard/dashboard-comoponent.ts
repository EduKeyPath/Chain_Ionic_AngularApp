import { Component, OnInit } from '@angular/core';/* 
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts/ngx'; */



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard-component.html'
})
export class DashboardComponent implements OnInit {

    constructor(/* private contacts: Contacts */) { }
    
    ngOnInit() {  
        /* let contact: Contact = this.contacts.create(); 
        contact.name = new ContactName(null, 'Smith', 'John');
        contact.phoneNumbers = [new ContactField('mobile', '6471234567')];
        contact.save().then(
        () => console.log('Contact saved!', contact),
        (error: any) => console.error('Error saving contact.', error)
        ); */
    }

    
}

   
