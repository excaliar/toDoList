
//holds all to-do items
let toDoList = [];


function toDoItem(title, dueDate, project) {
    this.title = title;
    this.dueDate = dueDate;
    this.project = project;

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
        newDate.textContent = toDo.dueDate;
        newToDo.appendChild(newDate);
    })
}

function addNewItemDOM() {
    let clickNew = document.querySelector('.newItem');

    let tasks = document.querySelector('.tasks');

    let today = document.querySelector('.today');

    let week = document.querySelector('.week');

    clickNew.addEventListener('click', () => {
        let projectButts = document.querySelectorAll('.projectButton')

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
            let proName = undefined
            if (inputTask.value != "" && inputDate.value != "") {
                projectButts.forEach(project => {
                    if (project.classList.contains('select')) {
                        proName = project.textContent;
                    } 
                })
                new toDoItem(inputTask.value, inputDate.value, proName);
                saveLocalStorage();
                if (proName != undefined) {
                    displayProject();
                } else {
                    if (today.classList.contains('select')) {
                        displayTodayList()
                    } else if (week.classList.contains('select')) {
                        displayWeekList()
                    } else {
                        displayProject()
                    }
                }
            }
        })
    })
}

function checkOff() {
    let too = document.querySelector('.tasks')

    let inbo = document.querySelector('.inbox')
    let tod = document.querySelector('.today')
    let week = document.querySelector('.week')

    too.addEventListener('click', (e) => {
        if (e.target.matches('.finish')) {
            let dad = e.target.parentNode; 
            let task = dad.querySelector('.task').textContent;

            toDoList.forEach((toDo, index) => {
                if (toDo.title == task) {
                    toDoList.splice(index, 1);
                    localStorage.clear()
                    for (let i = 0; i < toDoList.length; i++) {
                        localStorage.setItem(`${i}`, JSON.stringify(toDoList[i]))
                    }
                }
            })
            if (inbo.classList.contains('select')) {
                displayToDoList();
            } else if (tod.classList.contains('select')) {
                displayTodayList();
            } else if (week.classList.contains('select')) {
                displayWeekList();
            } else {
                displayProject();
            }
        }
    })
}

Date.prototype.getWeek = function() {
    var onejan = new Date(this.getFullYear(),0,1);
    return Math.ceil((((this - onejan) / 86400000) + onejan.getDay())/7);
}

function displayWeekList() {
    const too = document.querySelector('.tasks');
    const now = new Date();
    too.textContent = ''

    toDoList.forEach(toDo => {
        let today = new Date(toDo.dueDate)

        if (today.getWeek() == now.getWeek() && today.getFullYear() == now.getFullYear()) {
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
            newDate.textContent = toDo.dueDate;
            newToDo.appendChild(newDate);
        }
    })

}

function thisWeek() {
    let week = document.querySelector('.week')
    let btns = document.querySelectorAll('.sideBar button')
    week.addEventListener('click', () => {
        btns.forEach(btn => {
            btn.classList.add('deselect');
            btn.classList.remove('select');
        })
        week.classList.remove('deselect');
        week.classList.add('select');

        displayWeekList();
        
    })
}

function displayTodayList() {
    const too = document.querySelector('.tasks');
    const now = new Date();
    too.textContent = ''

    toDoList.forEach(toDo => {
        let today = new Date(toDo.dueDate)

        if (today.getDate() + 1 == now.getDate() && today.getMonth() + 1 == now.getMonth() + 1 && today.getFullYear() == now.getFullYear()) {
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
            newDate.textContent = toDo.dueDate;
            newToDo.appendChild(newDate);
        }
    })
}

function today() {

    let daily = document.querySelector('.today')
    let btns = document.querySelectorAll('.sideBar button')
    daily.addEventListener('click', () => {
        btns.forEach(btn => {
            btn.classList.add('deselect');
            btn.classList.remove('select');
        })
        daily.classList.remove('deselect');
        daily.classList.add('select');

        displayTodayList();
    })
}

function selectInbox() {
    let inbox = document.querySelector('.inbox')
    let btns = document.querySelectorAll('.sideBar button')
    inbox.addEventListener('click', () => {
        btns.forEach(btn => {
            btn.classList.add('deselect');
            btn.classList.remove('select')
        })
        inbox.classList.remove('deselect');
        inbox.classList.add('select');
        displayToDoList();
    })
}

function createNewProjectDOM() {
    let addProject = document.querySelector('.addProject');
    const sideBar = document.querySelector('.sideBar');

    addProject.addEventListener('click', () => {
        let newProject = document.createElement('input');
        newProject.setAttribute('type', 'text');
        newProject.classList.add('newProject');
        sideBar.appendChild(newProject);

        newProject.addEventListener('keypress', function (e) {
            if (e.key === "Enter" && newProject.value != '') {
                let content = newProject.value
                let newProjectAdd = document.createElement('button');
                newProjectAdd.textContent = content;
                newProjectAdd.classList.add('deselect');
                newProjectAdd.classList.add('projectButton')

                sideBar.appendChild(newProjectAdd)
                sideBar.removeChild(newProject);

            }
        })
    })
}

function displayProject() {
    const too = document.querySelector('.tasks');
    too.textContent = ''

    let projectButts = document.querySelectorAll('.projectButton')

    let selector = ''

    projectButts.forEach(project => {
        if (project.classList.contains('select')) {
            selector = project.textContent;
        } 
    })

    toDoList.forEach(toDo => {

        if (toDo.project == selector) {
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
            newDate.textContent = toDo.dueDate;
            newToDo.appendChild(newDate);
        }
    })
}

function selectProject() {
    const sideBar = document.querySelector('.sideBar')
    let btns = document.querySelectorAll('.mainBut')
    const too = document.querySelector('.tasks');
    
    sideBar.addEventListener('click', (e) => {
        if (e.target.matches('.projectButton')) {
            let dad = e.target;
            let granddad = dad.parentNode;
            let projects = granddad.querySelectorAll('.projectButton')
            projects.forEach(project => {
                project.classList.add('deselect');
                project.classList.remove('select');
            })
            dad.classList.add('select')
            dad.classList.remove('deselect')

            displayProject()
            
           btns.forEach(btn => {
            btn.classList.add('deselect')
            btn.classList.remove('select')

            btn.addEventListener('click', () => {
                dad.classList.add('deselect')
                dad.classList.remove('select')
            
            })
           })
        }
    })
}

function saveLocalStorage() {
    localStorage.setItem(`${localStorage.length}`, JSON.stringify(toDoList[localStorage.length]))
}

function getLocalStorage() {
    if (localStorage.length > 0) {
        for (let i = 0; i < localStorage.length; i++) {
            toDoList.push(JSON.parse(localStorage.getItem(`${i}`)))
        }
        displayToDoList()
    }
} 

function localStorageProjectsDOM() {
    projects = []
    const sideBar = document.querySelector('.sideBar');
    for (let i = 0; i < toDoList.length; i++) {
        if (toDoList[i].project != undefined && !projects.includes(toDoList[i].project)) {
            projects.push(toDoList[i].project)
        }
    }
    for (let j = 0; j < projects.length; j++) {
        let content = projects[j];
        let newProjectAdd = document.createElement('button');
        newProjectAdd.textContent = content;
        newProjectAdd.classList.add('deselect');
        newProjectAdd.classList.add('projectButton');

        sideBar.appendChild(newProjectAdd);
    }
    
}


getLocalStorage()
localStorageProjectsDOM()
addNewItemDOM()
checkOff()
thisWeek()
today() 
selectInbox()
createNewProjectDOM()
selectProject()



