window.addEventListener('load', start);
let taskLenght = document.getElementById('task-le');
let globalTasks = new Array ('Clique para editar');
let inputTask = null;
let isEditing = false;
let currentIndex = null;


function start(){
    inputTask = document.getElementById('inputText');
    preventFormSubmit();
    activateInput();
    render();

}

function preventFormSubmit(){
    function handleFormSubmit(event){
        event.preventDefault();
    }

    let form = document.querySelector('form');
    form.addEventListener('submit', handleFormSubmit);
}

function activateInput(){
    function insertTasks(newTaks){
        globalTasks.push(newTaks);
        render();
    }
    
    function updateTask(newTasks){
        globalTasks[currentIndex] = newTasks;
        render();
    }

    function handleTyping(event){
        if (event.key == 'Enter'){
            if(isEditing){
                updateTask(event.target.value);
            }else {
                insertTasks(event.target.value);
            }
            isEditing = false;
            clearInput();
        }
    }
    inputTask.focus();
    inputTask.addEventListener('keyup', handleTyping);

}

function render(){
    function createDeleteButton(index){
        function deleteTask(){
            globalTasks.splice(index, 1);
            render();
        }
        let button = document.createElement('button');
        button.textContent = 'x';
        button.classList.add('deleteButton');
        button.addEventListener('click', deleteTask);
        return button;
    }
    
    function createSpan(task, index){
        function editItem(){
            inputTask.value = task;
            inputTask.focus();
            isEditing = true;
            currentIndex = index;
        }
        let span = document.createElement('span');
        
        span.textContent = task;
        span.classList.add('clickable');
        span.addEventListener('click', editItem);

        return span
    }

    function clear(){
        globalTasks.length = 0;
        render()
    }
    let clearAll = document.getElementById('clear');
    clearAll.addEventListener('click', clear)

    taskLenght.innerHTML = `<p>${globalTasks.length} items left</p>`
    let divTasks = document.querySelector('#tasks')
    divTasks.innerHTML = '';
    let ul = document.createElement('ul');
    
    for( i = 0; i < globalTasks.length; i++ ){
        let currentTask = globalTasks[i];
        let button = createDeleteButton(i);
        let li = document.createElement('li')
        let span = createSpan(currentTask, i)

        li.appendChild(button);
        li.appendChild(span);
        ul.appendChild(li);
    }
    divTasks.appendChild(ul);
    clearInput();
}

function clearInput(){
    inputTask.value = '';
    inputTask.focus();
}