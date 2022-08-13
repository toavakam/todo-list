/* Задаем переменные и методом querySelector ищем их во всем документе первый элемент
 с заданным классом(например .message) или айди(#searchbbyname) */
const addMessage = document.querySelector('.message');
const addButton = document.querySelector('.add');
const todo = document.querySelector('.todo');
const searchbtn = document.querySelector('.searchbtn');
const search = document.querySelector('#searchbyname');

//Задаем пустой объект todoList

let todoList = {};

/* Проверяем наличие 'todo' в localStorage и в случае, если он там есть,
то конвертируем его из JSON в JS объект и вызываем функцию displayMessages */

if (localStorage.getItem('todo')) {
    todoList = JSON.parse(localStorage.getItem('todo'));
    displayMessages();
}

// Описываем функцию newToDoHandler, которая добавляет новый элемент todo 

function newToDoHandler() {
    if (!addMessage.value) return; // Проверяем, что поле ввода нового todo не пустое
    // Создаем новый объект todo, у которого есть 2 атрибута : todo - описание, bg - цвет статуса
    let newTodo = {
        todo: addMessage.value,
        bg: '#A9A9A9',
    };
    // Добавляем новый todo в todoList используя текущее время как идентификатор.
    todoList[Date.now()] = newTodo;
    localStorage.setItem('todo', JSON.stringify(todoList)); //Обновляем todoList в LocaStorage
    addMessage.value = '' //Очищаем поле ввода для нового todo
    displayMessages(); // Обращаемся к функции displayMessages, которая визуально обновит список todo
}

// Добавляем возможность добавления нового todo при нажатии клавиши Enter в поле ввода
addMessage.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        newToDoHandler();
    }
});
addButton.addEventListener('click', newToDoHandler); // При нажатии на кнопку "Добавить" так же добавляется новый todo


// Задаем функцию selectToDo, которая переносит данные(идентификатор и описание todo) в форму редактирования при нажатии на этот todo
function selectToDo(id) {
    document.querySelector('#identify').value = id; // Записываем айди выбранного todo в скрытое поле identify 
    document.querySelector('#edit').value = todoList[id].todo; /* По айди выбираем из todoList выбранный todo элемент 
    и получаем значение его атрибута todo, которое перемещаем в поле "Редактировать" */
}

// Задаем функцию deleteTodo, которая дает возможность удалять элементы из списка

function deleteToDo() {
    let id = document.querySelector('#identify').value; // Получаем айди выбранного todo из скрытого поля identify
    delete todoList[id]; // Удаляем todo из todoList по айди
    localStorage.setItem('todo', JSON.stringify(todoList)); //Обновляем данные в localStorage
    displayMessages(); // Обращаемся к функции displayMessages, которая визуально обновит список todo
}

//Задаем функцию editToDo, которая дает возможность обновить описание выбранного todo элемента

function editToDo() {
    let id = document.querySelector('#identify').value; // Получаем айди выбранного todo из скрытого поля identify
    let update = document.querySelector('#edit').value; // Получаем новое описание todo из скрытого поля edit
    todoList[id].todo = update; // Перезаписываем описание у выбранного todo
    localStorage.setItem('todo', JSON.stringify(todoList)); //Обновляем данные в localStorage
    displayMessages(); // Обращаемся к функции displayMessages, которая визуально обновит список todo
}

//Задаем функцию todoStart, которая меняет фон у выбранного todo элемента

function todoStart() {
    let id = document.querySelector('#identify').value; // Получаем айди выбранного todo из скрытого поля identify
    todoList[id].bg = '#6495ED'; // Меняем цвет у выбранного todo 
    localStorage.setItem('todo', JSON.stringify(todoList)); //Обновляем данные в localStorage
    displayMessages(); // Обращаемся к функции displayMessages, которая визуально обновит список todo
}

//Задаем функцию todoStart, которая меняет фон у выбранного todo элемента

function todoFinish() {
    let id = document.querySelector('#identify').value; // Получаем айди выбранного todo из скрытого поля identify
    todoList[id].bg = '#228B22'; // Меняем цвет у выбранного todo 
    localStorage.setItem('todo', JSON.stringify(todoList)); //Обновляем данные в localStorage
    displayMessages(); // Обращаемся к функции displayMessages, которая визуально обновит список todo
}

//Задаем функцию searchByName, которая дает возможность поиска todo по имени

function searchByName() {
    let search = document.querySelector('#searchbyname').value; // Получить значение поиска из поля ввода 
    Object.keys(todoList).forEach(key => { //Итерируем каждый атрибут todoList
        if (todoList[key].todo === search) { //Выбираем текущий todo по айди и сравниваем описание todo с искомым значением
            selectToDo(key); //Если искомое значение совпадает с описанием текущего todo, тогда выбираем 
        }
    });
}

// Добавляем возможность поиска  todo при нажатии клавиши Enter в поле ввода

search.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        searchByName();
    }
});
searchbtn.addEventListener('click', searchByName); // При нажатии на кнопку "Добавить" так же добавляется новый todo

//Задаем фукнцию displayMessages, которая дает возможность выводить todo на экран

function displayMessages() {
    let displayMessage = ''; //Задаем пустую строку переменной displayMessage 
    //Итерируем каждый атрибут todoList 
    Object.keys(todoList).forEach(id => {
        let item = todoList[id]; //Выбираем текущий todo по айди
        //Формируем добавленные todo как элемент списка. И добавляем возможность выбирать todo для дальнейшего редактирования. 
        displayMessage += `<li onclick=selectToDo(${id}) style=background-color:${item.bg}>${item.todo}</li>`;
    });
    todo.innerHTML = displayMessage; //Переносим данные из переменной в HTML странцу
    document.querySelector('#identify').value = ""; //Занлуяем значине в скрытом поле identify
    document.querySelector('#edit').value = ""; //Зануляем значение в скрытом поле edit
}

/*Делаем возможность изменять размеры колонки взаимодействия с списком ToDo
 Задаем переменные и методом querySelector ищем их во всем документе первый элемент
 с заданным классом(например .container)*/
const BORDER_SIZE = 10; // Размер границы, которая позволяет изменять размер.
const panel = document.querySelector(".container");
const editor = document.querySelector(".editor");

let m_pos; //Создаем переменную, в которой будет храниться текущее положение мышки по оси Х
function resize(e) { // Задаем функцию resize, которая меняет размер панели редактирования
    const dx = m_pos - e.x; // Вычисляем разинцу между текущем положением мыши(e.x) и положением мыши в момент когда тянем за границу
    m_pos = e.x; // Обновляем текущее положение мыши в переменной m_pos
    panel.style.width = (parseInt(getComputedStyle(panel, '').width) - dx) + "px"; //Изменяем ширину панели редактирования на dx пикселей
}

panel.addEventListener("mousedown", function (e) { //Отслеживаем нажатие мыши по панели изменения ширины панели редактирования
    if (panel.offsetWidth - e.offsetX < BORDER_SIZE) { //Проверяем, что нажатие произошло в зоне правой границы редактирования 
        m_pos = e.x; //Обновляем текущее положение мыши в переменной m_pos
        document.addEventListener("mousemove", resize, false); //Вызываем метод resize, при сдвиге мыши
    }
}, false);

document.addEventListener("mouseup", function () { //По окончанию клика убрать отслеживание сдвига мыши
    document.removeEventListener("mousemove", resize, false);
}, false);