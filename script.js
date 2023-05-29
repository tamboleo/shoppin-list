const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');
let formBtn = itemForm.querySelector('button');
let isEditMode = false;
function displayItems() {
    const itemsFromStorage = getItemfromStorage();
    itemsFromStorage.forEach((item) => {
        addItemtoDom(item);
    });
    checkUI();
}

function onaddItemSubmit(e){
    const newitem = itemInput.value;
    e.preventDefault();
    if (newitem === '') {
        alert('Please add an item');
        return
    }
    //Create item dom element
    addItemtoDom(newitem);
    //add item to local storage
    addItemToStorage(newitem);
    checkUI();
    itemInput.value = '';
}
function addItemtoDom(item) {
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(item));
    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button);
    //Add li to the DOM
    itemList.appendChild(li);
}
function addItemToStorage(item) {
    const itemsFromStorage = getItemfromStorage();
    itemsFromStorage.push(item);
    // Convert to JSON string and set to Local storage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function getItemfromStorage() {
    let itemsFromStorage;
    if (localStorage.getItem('items') === null) {
       itemsFromStorage = [];
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }
    return itemsFromStorage;
}
function createButton(classes) {
    const button = document.createElement('button');
    button.className = classes;
    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon);
    return button;
}
function createIcon(classes) {
    const icon = document.createElement('i');
    icon.className = classes;
    return icon
}
function onClickItem(e) {
    if (e.target.parentElement.classList.contains('remove-item')) {
        console.log('click');
        removeItem(e.target.parentElement.parentElement);
     } else{
    setItemToEdit(e.target);
     }
}
function setItemToEdit(item) {
    isEditMode = true;
    item.classList.add('edit-mode');
    formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item';
}
function removeItem(item) {
    if (confirm('Are you sure?')) {
        //Remove Item from DOM
        item.remove();
        //Remove item from Local Storage
        removeItemFromStorage(item.textContent);
    }
    checkUI();
}
function removeItemFromStorage(item) {
    let itemsFromStorage = getItemfromStorage();
    //Filter out item to be removed
    itemsFromStorage = itemsFromStorage.filter((i) => i !== item);
    localStorage.setItem('items',JSON.stringify(itemsFromStorage));
}
function clearItems() {
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild)
    }
    localStorage.removeItem('items');
    checkUI();
}
function checkUI() {
    const items = itemList.querySelectorAll('li');
    if (items.length === 0) {
        clearBtn.style.display = 'none';
        itemFilter.style.display = 'none';
    }else{
        clearBtn.style.display = 'block';
        itemFilter.style.display = 'block';
    }
}
function filterItems(e) {
    const value = e.target.value.toLowerCase();
    console.log(value);
    const li = document.querySelectorAll("li");
    li.forEach((item) => {
        if (!(item.firstChild.textContent.includes(value))) {
            item.style.display = 'none';
        }
        else{
            item.style.display = 'block';
        }
    })
}

function init() {
    //EventListeners
itemForm.addEventListener('submit', onaddItemSubmit);
itemList.addEventListener('click', onClickItem);
clearBtn.addEventListener('click', clearItems);
itemFilter.addEventListener('input', filterItems);
document.addEventListener('DOMContentLoaded', displayItems);
checkUI();
}
init();

