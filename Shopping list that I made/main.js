// one way easy and dirty
const input = document.querySelector('.first-form input');
const ul = document.querySelector('ul');
const btn = document.querySelector('.first-form button');
const clearAll = document.querySelector('.Clear-All');
const filter = document.querySelector('.filter');
const filterInput = document.querySelector('.filter input')
let isEditMode = false;

// Get the value or text from the localStorage and it put the value or text in element or elements.
function display() {
    const items = LS();
    items.forEach( item => {
        const li = document.createElement('li');
            li.innerHTML = (`${item} 
                <img src="images/note.png" alt="">`
            );
            ul.appendChild(li);
    } )
    
    checkUl();
}

function onBtn(e) {
    e.preventDefault();

    const inputValue = input.value;

    // Check the input that it has value, if it has not it show a window (Please enter the value).
    if (inputValue === ''){
        alert('Please enter the value');
    }  
    
    // Check for edit mode
    if  (isEditMode) {  
      const itemToEdit = ul.querySelector('.edit');
      removeItemFromStorage(itemToEdit.textContent.trim());
      itemToEdit.classList.remove('edit');
      itemToEdit.remove();
      isEditMode = false;
    } else {
        if (childIfItemISExist(inputValue)){
            alert('That item already exist!');
            return;
        }
    }

    // add item to DOM
    ADM(inputValue.trim());
    
    // add item to localStorage
    AddItemToLocalS(inputValue.trim());
  
    checkUl();
}

// Check the value is exist 
function childIfItemISExist(item){
    const items = LS();
    return items.includes(item);
}

// add to DOM
function ADM(item) {
    if (item.length >= 1){
        const li = document.createElement('li');
        li.innerHTML = (`${item} <img src="images/note.png" alt="">`);
        ul.appendChild(li);
    }
}

// Clear all items form the ul or list items
function clear() {
    if (confirm('Are you sure delete all!')){
        ul.innerHTML = '';
    }
    // while(ul.firstChild){
    //     ul.firstChild.remove();
    // }
    localStorage.clear();
    checkUl();
}

// Remove single element 
function clearContainer(e) {

    if (e.target.parentElement.tagName === 'LI'){  
        if (confirm('Are you sure!')){
            // Remove item form DOM
            e.target.parentElement.remove();    

            let item = e.target.parentElement;

            // Remove item from the localStorage
            removeItemFromStorage(item.textContent.trim());
            checkUl();
        }
    } else {
        if (e.target.parentElement.tagName === 'UL'){
            editItem(e.target);
        }
    }
    
}

// Edit items
function editItem(item){
    isEditMode = true;

    ul.querySelectorAll('li').forEach(i => {
        i.classList.remove('edit');
    });
    item.classList.add('edit');
    input.value = item.textContent.trim();
    btn.style.backgroundColor = '#228B22';
    btn.innerHTML = `<img src="images/pluse.png" alt=""> Update`;

}

// remove item form the localStorage and re-set to localStorage
function removeItemFromStorage(item) {
    let itemsFromStorage = LS();
    // Filter out item to be removed
    itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

    // Re-set to localstorage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}


// Check if no item it does not show the filter input and clear all button
function checkUl(){
    input.value = '';

    const items = document.querySelectorAll('UL LI');
    if (items.length === 0) {
        clearAll.style.display = 'none';
        filter.style.display = 'none';
    } else {
        clearAll.style.display = 'block';
        filter.style.display = 'block';
    }

    btn.innerHTML = '<img src="images/pluse.png" alt=""> Add item';
    btn.style.backgroundColor = 'black';
    isEditMode = false;
}

// filter items
function filters(e){
    const items = document.querySelectorAll('li');
    const text = e.target.value.toLowerCase();
   
    items.forEach((item) => {
        const itemName = item.firstChild.textContent.toLowerCase();
        if (itemName.indexOf(text) == -1){
            item.style.display = 'none';            
        } else {
            item.style.display = 'flex';
        }
    })
}

// localStorage
// localStorage.setItem('name', 'Faridoon');
// console.log(localStorage.getItem('name'));
// localStorage.removeItem('items');
// localStorage.clear();

// add item in localStorage
function AddItemToLocalS(item) {
    let itemslocalFrom = LS() ;
    if (itemslocalFrom === null){
        alert('please enter value');
    } else {
        if (item.length >= 1){
            itemslocalFrom.push(item);      
        }
    }

    localStorage.setItem('items', JSON.stringify(itemslocalFrom));
}

// Get all values in localStorage
function LS() {
    let itemslocalFrom;
    
    if (localStorage.getItem('items') === null){
        itemslocalFrom = [];
    } else {
        itemslocalFrom = JSON.parse(localStorage.getItem('items'));
    }

    return itemslocalFrom;
}


ul.addEventListener('click', clearContainer)
clearAll.addEventListener('click', clear);
filterInput.addEventListener('input', filters);
document.addEventListener('DOMContentLoaded', display);
btn.addEventListener('click', onBtn);
checkUl();


