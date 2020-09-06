"use strict";

//Create an IIFE to close the app off from the global scope
(function(){
// check fields and hide the submit button
document.addEventListener('DOMContentLoaded', function(){
    const display = new Display();
    display.checkFields();
    display.hideSubmit();
});
//add customer on submit
document.getElementById('customer-form').addEventListener('submit', function(event){
    event.preventDefault();

    const First Name = this.querySelector('.First Name');
    const Last Name = this.querySelector('.Last Name');
    const email = this.querySelector('.email');
    const Mobile = this.querySelector('.Mobile');

    const customer = new Customer(First Name.value, Last Name.value, email.value, Mobile.value);
    const display = new Display();

    display.feedback(customer);
    display.clearFields();

});

//display
function Display(){
    this.First Name = document.getElementById('First Name');
    this.Last Name = document.getElementById('Last Name');
    this.email = document.getElementById('email');
    this.Mobile = document.getElementById('.Mobile')
    this.customers = document.querySelector('.customer-list');
}

//check fields
Display.prototype.checkFields = function(){
    // console.log(this.name);
    this.First Name.addEventListener('blur', this.validateField);
    this.Last Name.addEventListener('blur', this.validateField);
    this.email.addEventListener('blur', this.validateField);
    this.Mobile.addEventListener('blur', this.validateField);

};
//validate each field
Display.prototype.validateField = function(){
    // console.log(this);
    if (this.value === ''){
        this.classList.remove('complete');
        this.classList.add('fail');
    } else {
        this.classList.add('complete');
        this.classList.remove('fail');
    }

    const complete = document.querySelectorAll('.complete');

    if(complete.length === 3){
        document.querySelector('.submitBtn').disabled = false;
    } else {
        document.querySelector('.submitBtn').disabled = true;
    }
};
//disable submit button
Display.prototype.hideSubmit = function(){
    const btn = document.querySelector('.submitBtn');
    btn.disabled = true;
};
//show loading and feedback
Display.prototype.feedback = function (customer) {
    const feedback = document.querySelector('.feedback');
    const loading = document.querySelector('.loading');

    feedback.classList.add('showItem', 'alert', 'alert-danger');
    loading.classList.add('showItem');

    const self = this;
    self.hideSubmit();

    setTimeout(function(){
        feedback.classList.remove('showItem', 'alert', 'alert-danger');
        loading.classList.remove('showItem');
        self.addCustomer(customer);

    }, 3000);
};

Display.prototype.addCustomer = function(customer){

    const random = this.getRandom();

    const div = document.createElement('div');
     div.classList.add('col-11', 'mx-auto', 'col-md-6', 'my-3', 'col-lg-4');
     div.innerHTML = `<div class="card text-left">
     <img src="./img/cust-${random}.jpg" class="card-img-top" alt="">
     <div class="card-body">
      <!-- customer name -->
      <h6 class="text-capitalize "><span class="badge badge-warning mr-2">name :</span><span id="customer-name">${customer.name}</span></h6>
      <!-- end of customer name -->
      <!-- customer name -->
      <h6 class="text-capitalize my-3"><span class="badge badge-success mr-2">course :</span><span id="customer-course">
        ${customer.course}
       </span></h6>
      <!-- end of customer name -->
      <!-- customer name -->
      <h6 class="text-capitalize"><span class="badge badge-danger mr-2">author :</span><span id="course-author">${customer.author}</span></h6>
      <!-- end of customer name -->
     </div>
    </div>`
    this.customers.appendChild(div);
}
//random number
Display.prototype.getRandom = function(){
    let random = Math.floor(Math.random()*5+1);
    return random;
};

Display.prototype.clearFields = function(){
    this.First Name.value = '';
    this.Last Name.value = '';
    this.email.value = '';
    this.Mobile.value = '';

    this.First Name.classList.remove('complete', 'fail');
    this.Last Name.classList.remove('complete', 'fail');
    this.email.classList.remove('complete', 'fail');
    this.Mobile.classList.remove('complete', 'fail');
};

//customer constructor function
function Customer(First Name, Last Name, email, Mobile){
    this.First Name = First Name;
    this.Last Name = Last Name;
    this.email = email;
    this.Mobile = Mobile;
};

})()
