'use strict';


const todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed');

 
let toDoData = localStorage.getItem('toDoData') ?
    JSON.parse(localStorage.getItem('toDoData')) : [];


const render = function () {

     todoCompleted.innerHTML = '';
     todoList.innerHTML = '';
    
    toDoData.forEach((item, id) => {
       
       
        const li = document.createElement('li');
        li.classList.add('todo-item');
        // console.log(li);
        li.innerHTML = '<span class = "text-todo" >' + item.text + '</span>' +
            '<div class = "todo-buttons" >' +
            '<button class = "todo-remove" > </button>' +
            '<button class = "todo-complete" > </button>' +
            '</div>';

       

        localStorage.setItem('toDoData', JSON.stringify(toDoData));

        if (item.completed) {
            todoCompleted.append(li);
        } else {
            todoList.append(li);
        }

        li.querySelector('.todo-complete').addEventListener('click', () => {
            item.completed = !item.completed;
            render();
        });
        
        li.querySelector('.todo-remove').addEventListener('click', () => {
            toDoData.splice(id, 1);
            render();
        });
    });

};


todoControl.addEventListener('submit', function (e) {
    e.preventDefault();

    const newToDo = {
        
        text: headerInput.value,
        completed: false
    };
    if (headerInput.value !== ''){
        toDoData.push(newToDo);
       
    }
     headerInput.value = '' ;
    render();
});

