const addMessage = document.querySelector('.message');
const addButton = document.querySelector('.add');
const todo = document.querySelector('.todo');
const searchbtn = document.querySelector('.searchbtn');
const search = document.querySelector('#searchbyname')

let todoList = {};

if (localStorage.getItem('todo')) {
    todoList = JSON.parse(localStorage.getItem('todo'));
    displayMessages();
}
function newToDoHandler() {
    if (!addMessage.value) return;
    let newTodo = {
        todo: addMessage.value,
        bg: 'grey',
    };

    todoList[Date.now()] = newTodo;
    displayMessages();
    localStorage.setItem('todo', JSON.stringify(todoList));
    addMessage.value = ''
}
addMessage.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        newToDoHandler();
    }
});
addButton.addEventListener('click', newToDoHandler);



function selectToDo(id) {
    document.querySelector('#identify').value = id;
    document.querySelector('#edit').value = todoList[id].todo;
}
function deleteToDo() {
    let id = document.querySelector('#identify').value;
    delete todoList[id];
    displayMessages();
    localStorage.setItem('todo', JSON.stringify(todoList));
}
function editToDo() {
    let id = document.querySelector('#identify').value;
    let update = document.querySelector('#edit').value;
    todoList[id].todo = update;
    displayMessages();
    localStorage.setItem('todo', JSON.stringify(todoList));
}
function todoStart() {
    let id = document.querySelector('#identify').value;
    todoList[id].bg = 'blue';
    displayMessages();
    localStorage.setItem('todo', JSON.stringify(todoList));
}
function todoFinish() {
    let id = document.querySelector('#identify').value;
    todoList[id].bg = 'green';
    displayMessages();
    localStorage.setItem('todo', JSON.stringify(todoList));
}
function searchByName() {
    let search = document.querySelector('#searchbyname').value;
    Object.keys(todoList).forEach(key => {
        if (todoList[key].todo === search) {
            selectToDo(key);
        }
    });
}
search.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        searchByName();
    }
});
searchbtn.addEventListener('click', searchByName);

function displayMessages() {
    let displayMessage = '';
    if (Object.keys(todoList).length === 0) todo.innerHTML = '';
    Object.keys(todoList).forEach(key => {
        let item = todoList[key];
        displayMessage += `
    <li onclick=selectToDo(${key}) style=background-color:${item.bg}>
  ${item.todo}
    </li>
    `;
        todo.innerHTML = displayMessage

    });
    document.querySelector('#identify').value = "";
    document.querySelector('#edit').value = "";

}

todo.addEventListener('change', function (event) {
    let valueLabel = todo.querySelector('[for=' + event.target.getAttribute('id') + ']').innerHTML;

    todoList.forEach(function (item) {
        if (item.todo === valueLabel) {
            localStorage.setItem('todo', JSON.stringify(todoList));
        }
    });

});