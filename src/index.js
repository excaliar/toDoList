
//holds all to-do items
let toDoList = [];


function toDoItem(title, dueDate) {
    this.title = title;
    this.dueDate = dueDate;
    this.project = ''

    toDoList.push(this)
}

function displayToDoList() {
    const too = document.querySelector('.tasks');
    too.textContent = ''
    toDoList.forEach(toDo => {
        let newToDo = document.createElement('div');
        newToDo.classList.add("doItNow");
        too.appendChild(newToDo);

        let newFinish = document.createElement('button');
        newFinish.classList.add('finish');
        newToDo.appendChild(newFinish);

        let newTask = document.createElement('div');
        newTask.classList.add('task');
        newTask.textContent = toDo.title;
        newToDo.appendChild(newTask);

        let newDate = document.createElement('div');
        newDate.classList.add('date');
        newDate.textContent = `Due: ${toDo.dueDate}`;
        newToDo.appendChild(newDate);
    })
}

function addNewItemDOM() {
    let clickNew = document.querySelector('.newItem');

    let tasks = document.querySelector('.tasks');

    clickNew.addEventListener('click', () => {
        let inputContainer = document.createElement('div');
        inputContainer.classList.add('doItNow');
        tasks.appendChild(inputContainer);

        let formm = document.createElement('form')
        formm.classList.add('formm')
        inputContainer.appendChild(formm)

        let taskPlaceholder = document.createElement('label')
        taskPlaceholder.textContent = "Task"
        taskPlaceholder.classList.add('taskPlaceHolder')
        formm.appendChild(taskPlaceholder);

        let inputTask = document.createElement('input');
        inputTask.setAttribute("type", 'text');
        inputTask.setAttribute("maxlength", 90);
        inputTask.classList.add('inputTask')
        formm.appendChild(inputTask);

        let datePlaceholder = document.createElement('label')
        datePlaceholder.classList.add('datePlaceholder')
        datePlaceholder.textContent = "Do By:" 
        formm.appendChild(datePlaceholder);

        let inputDate = document.createElement('input');
        inputDate.setAttribute('type', 'date');
        inputDate.classList.add('inputDate');
        formm.appendChild(inputDate);


        let submitTask = document.createElement('button');
        submitTask.classList.add('submitTask')
        formm.appendChild(submitTask);
        submitTask.textContent = '✓'

        submitTask.addEventListener('click', (e) => {
            e.preventDefault();
            if (inputTask.value != "" && inputDate.value != "") {
                new toDoItem(inputTask.value, inputDate.value);
                displayToDoList();
            }
        })
    })
}

function checkOff() {
    let too = document.querySelector('.tasks')

    too.addEventListener('click', (e) => {
        if (e.target.matches('.finish')) {
            let dad = e.target.parentNode; 
            let task = dad.querySelector('.task').textContent;

            toDoList.forEach((toDo, index) => {
                if (toDo.title == task) {
                    toDoList.splice(index, 1);
                    displayToDoList();
                }
            })
        }
    })
}

let yas = new toDoItem('wh the dishes', '2023-07-22')
let pirate = new toDoItem('wash the dishes', '2023-09-14')
let mom = new toDoItem('wash dishes', '2023-07-07')

displayToDoList()
addNewItemDOM()
checkOff()







