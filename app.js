class Guest{
    constructor(title,name,address){
        this.title=title
        this.name=name
        this.address=address
    }
}
class UI{
    addGuestList(guest){

        const list=document.getElementById('guest-list');
    // create new row element
    const row=document.createElement('tr');
    row.innerHTML=`
    <td>${guest.title}</td>
    <td>${guest.name}</td>
    <td>${guest.address}</td>
    <td><a href="#" class="delete">X</a></td>
    `
    // add the new row to the list
    list.appendChild(row)
    //console.log(row)
    }
  
    clearInputValue(){
      // clear text fields
    document.getElementById('title').value='';
    document.getElementById('name').value='';
    document.getElementById('address').value='';
    }
  
    showAlert(msg,className){
       // create a new div element
    const divCont=document.createElement('div');
    divCont.className=`alert ${className}`;
    divCont.appendChild(document.createTextNode(msg));
  
    //place the div container before the form page
    const container=document.querySelector('.container');
    const form=document.querySelector('#guest-form');
  
    container.insertBefore(divCont,form);
    //console.log(divCont)
  
    // set timeout
    setTimeout(function(){
      document.querySelector('.alert').remove()
    },3000);
    }
    removeGuests(target){
      if(target.className==='delete'){
        target.parentElement.parentElement.remove();
      }
    }
  }
  
  class Store{
    static getGuests(){
    let guests;
    if(localStorage.getItem('guests')===null){
      guests=[];
    }else{
      guests=JSON.parse(localStorage.getItem('guests'));
    }
    return guests;
    }
    static storeGuests(guest){
      const guests=Store.getGuests();
      guests.push(guest);
      localStorage.setItem('guests', JSON.stringify(guests));
    }
    static displayGuests(){
      const guests=Store.getGuests();
  
      
     guests.forEach(function(guest){
      const ui=new UI();
      ui.addGuestList(guest);
      localStorage.setItem('guests',JSON.stringify(guests));
     })
  
  
    }
    static removeGuests(address){
  
      const guests=Store.getGuests();
      guests.forEach(function(guest,index){
        if(guest.address===address){
          guests.splice(index,1)
        }
       
      })
      localStorage.setItem('guests',JSON.stringify(guests));
    }
  }
  document.addEventListener('DOMContentLoaded',Store.displayGuests)
  
  // Add event listener to submit button
  const formWrapper=document.getElementById('guest-form').addEventListener('submit',function(e){
  
    //get value of title,name and address
    const titleVal=document.getElementById('title').value,
          nameVal=document.getElementById('name').value,
          addressVal=document.getElementById('address').value;
    
    // instatitate Guest constructor
    const guest=new Guest(titleVal,nameVal,addressVal);
  
    // instantiate UI constructor
    const ui=new UI();
  
    //validate input field
    if(titleVal==='' || nameVal==='' || addressVal===''){
      ui.showAlert('Please fill in the fields','error');
    }
    else{
      // add guest list
    ui.showAlert('Guests successfully submitted','success')
    ui.addGuestList(guest);
    // add to local storage
    Store.storeGuests(guest);
    //display
  
    //console.log(ui)
    ui.clearInputValue();
    
    }
    e.preventDefault();
  })
  
  // remove book event listener
  document.querySelector('#guest-list').addEventListener('click',function(e){
    
    const ui=new UI();
    ui.removeGuests(e.target);
    Store.removeGuests(e.target.parentElement.previousElementSibling.textContent);
    ui.showAlert('Guest successfully removed!','success');
    e.preventDefault();
  })
