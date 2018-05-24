import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

var borrowerVar = "eos";
var lenderVar = "eos";

document.addEventListener('scatterLoaded', scatterExtension => {
  // Scatter will now be available from the window scope.
  // At this stage the connection to Scatter from the application is 
  // already encrypted. 
  const scatter = window.scatter;
  
  // It is good practice to take this off the window once you have 
  // a reference to it.
  window.scatter = null;
   
  // If you want to require a specific version of Scatter
  scatter.requireVersion(3.0);
  
  //...
})


//------------------borrower----------------------------------
Template.borrower.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.change = new ReactiveVar(19);
  
});

Template.borrower.helpers({
  change() {
    return Template.instance().change.get();
  },
});



Template.borrower.events({
  'submit form'(event) {
  	event.preventDefault();
    var form_hello = event.target.firstname.value;
    //var form_select = event.target.elend.value;
    console.log("wjat");
    console.log(form_hello);
  },
});


Template.borrower.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.change.set(instance.change.get() + 1);
    // var form_hello = event.target.firstname.value;
    // console.log(form_hello);
  },
});

Template.borrower.events({
  'change select'(event) {
    event.preventDefault();
   borrowerVar = event.target.value;
    console.log("hello bor:" + borrowerVar);
  },
});

//------------------lender----------------------------------
Template.lender.events({
  'change select'(event) {
    event.preventDefault();
   lenderVar = event.target.value;
    console.log(lenderVar);
  },
});

