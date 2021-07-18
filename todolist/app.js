let userInput = document.getElementById('userInput');
let buttonEnter = document.getElementById('enter');
let ul = document.querySelector('ul');

let items = [];

function inputIsNotEmpty() {
    return userInput.value.length > 0;
}

function createTodo(text, isDone = false) {
    items.push(
        {text: text, isDone: isDone}
        );
    userInput.value = '';
    showItems();
}

function changeListAfterKeyPress(event) {
    if (inputIsNotEmpty() && event.which == 13) {
        createTodo(userInput.value);
    }
}

function changeListAfterButtonPress(event) {
    if (inputIsNotEmpty()) {
        createTodo(userInput.value);
    }
}

function showItems() {
    ul.innerHTML = "";
    for (var i = 0; i < items.length; i++) {
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(items[i].text));
        if (items[i].isDone) li.classList.toggle('done');
        ul.appendChild(li);

        li.addEventListener('click', function() {
            li.classList.toggle('done');
            collectItems();
        })

        li.addEventListener('animationend', function() {
            li.remove();
            collectItems();
        });

        let deleteButton = document.createElement('button');
        deleteButton.appendChild(document.createTextNode('X'));
        li.appendChild(deleteButton);
        deleteButton.addEventListener('click', deleteTodoItem);

        function deleteTodoItem() {
            li.classList.add('delete');
        }
    }
}

function localStorageClear() {
    localStorage.setItem("items", "");
}

function collectItems() {
    items = [];
    collectedItems = document.getElementsByTagName('li');
    for (var i = 0; i < collectedItems.length; i++) {
        let itemText = collectedItems[i].childNodes.item(0).textContent;
        let itemIsDone = collectedItems[i].classList.contains('done');
        items.push({text: itemText, isDone: itemIsDone});
    }
}

userInput.addEventListener('keypress', changeListAfterKeyPress);
buttonEnter.addEventListener('click', changeListAfterButtonPress);

var retrievedItems = JSON.parse(localStorage.getItem("items"));
for (var i = 0; i < retrievedItems.length; i++) {
    items.push({text: retrievedItems[i].text, isDone: retrievedItems[i].isDone});
}
showItems();

function OnUnload() {
    collectItems();
    localStorage.setItem("items", JSON.stringify(items));
}
