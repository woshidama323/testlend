import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import { eosio } from 'eosjs'; 

import './main.html';

var borrowerVar = "eos";
var lenderVar = "eos";

Eos = require('eosjs'); // Eos = require('./src')

eos = Eos.Localnet({httpEndpoint: 'http://192.168.43.18:8888'});// 127.0.0.1:8888

eos.info();
/* Eos and Scatter Setup */
const network = {
  blockchain: "eos",
  host: 'dev.cryptolions.io',
  port: 18888
}

document.addEventListener('scatterLoaded', scatterExtension => {
  clearTimeout(scatterDetection)
  scatter = window.scatter
  window.scatter = null

  scatter.suggestNetwork(network)

  app.ports.setScatterInstalled.send(true)

  if (scatter.identity) {

    const user = {
        eosAccount: scatter.identity.accounts[0].name,
        publicKey: scatter.identity.publicKey
    }

    app.ports.setScatterIdentity.send(user)
  }
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

