const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');

function additem(e){
    const newitem = itemInput.value;
    e.preventDefault();
    if (newitem === '') {
        alert('Please add an item');
        return
    }
    // Create a list Item
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(newitem));
    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button);
    itemList.appendChild(li);
    itemInput.value = '';
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
//EventListeners
itemForm.addEventListener('submit', additem);
