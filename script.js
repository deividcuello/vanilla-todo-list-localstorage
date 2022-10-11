window.addEventListener("load", () => {
    const taskForm = document.querySelector('#task-form');
    const taskInput = document.querySelector('#task-input');
    const addTask = document.querySelector('#add-task');
    const saveTask = document.querySelector('#save-task');
    const tableTasks = document.querySelector('#table-tasks');
    const deleteAll = document.querySelector('#deleteAll-tasks');
    const counter = document.querySelector('#counter');
    let tasksArray = [];
    let newTask = '';
    let savedIndex = '';

    const localTask = localStorage.getItem("localtask");
    
    taskInput.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        if(window.getComputedStyle(addTask).display != 'none'){
            addTask.click();
        }
        else if(window.getComputedStyle(saveTask).display != 'none'){
            saveTask.click();
        }
    }
});

    if(localTask){
        tasksArray = JSON.parse(localTask);
        showTasks();
    }

    addTask.addEventListener("click", () => {
        newTask = taskInput.value;
        if(newTask != ''){
            tasksArray.push(newTask);
            localStorage.setItem("localtask", JSON.stringify(tasksArray));
            showTasks();
            
            taskInput.value = '';
        }
        
    })

    function showTasks(){
        let html = '';
        tasksArray.slice(0).reverse().forEach((item, index) => {
            html += 
            `
            <tr>
                <td>${item}</td>
                <td><button type="button" class="edit" index="${tasksArray.length - 1 - index}">Editar</button></td>
                <td><button type="button" class="delete" index="${tasksArray.length - 1 - index}">Eliminar</button></td>
            </tr>
            `;
        })
        tableTasks.innerHTML = html;
        counter.innerHTML = `The <span class="black-tag">Black</span> Counter: ${tasksArray.length}`
        
        tableTasks.querySelectorAll('button.edit').forEach((btn, index) => {
            btn.addEventListener('click', (e) =>{
                savedIndex = e.target.getAttribute('index');
                taskInput.value = tasksArray[savedIndex];
                saveTask.style.display = 'inline-block'
                addTask.style.display = 'none'
                taskInput.focus();
            })
        })
        
        tableTasks.querySelectorAll('button.delete').forEach((btn, index) => {
            btn.addEventListener('click', (e) =>{
                savedIndex = e.target.getAttribute('index');
                tasksArray.splice(savedIndex, 1);
                localStorage.setItem("localtask", JSON.stringify(tasksArray));
                showTasks();
            })
        })
    }

    saveTask.addEventListener('click', (e) => {
        console.log(savedIndex);
        tasksArray[savedIndex] = taskInput.value;
        localStorage.setItem("localtask", JSON.stringify(tasksArray));
        saveTask.style.display = 'none';
        addTask.style.display = 'inline-block';
        taskInput.value = '';
        showTasks();   
    })

    deleteAll.addEventListener('click', (e) => {
        if(localTask){
            tasksArray = [];
            localStorage.setItem("localtask", JSON.stringify(tasksArray));
            showTasks();
    }

    })
    const searchTask = document.querySelector('#search-task');
    searchTask.addEventListener('input', function(){
        let trlist = document.querySelectorAll('tr');
        Array.from(trlist).forEach(function(item){
            let searchedtext = item.getElementsByTagName('td')[0].innerText;
            let searchtextboxval = searchTask.value;
            let re = new RegExp(searchtextboxval, 'gi');
            if(searchedtext.match(re)){
                item.style.display='table-row';
            }
            else{
                item.style.display='none';
            }
        })
    })

});