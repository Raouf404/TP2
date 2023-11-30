'use strict'
let num = document.getElementById('num'),
    add = document.getElementById('add'),
    adding = document.getElementById('adding'),
    text = document.getElementById('text'),
    buttons = document.getElementById('buttons'),
    clear = document.getElementById('clear'),
    save = document.getElementById('save'),
    list = document.getElementById('list');

update_num();
function update_num() {
    let n = list.childElementCount;
    num.innerHTML = n;
}

function addTodo(todo) {
    if (todo !== '') {
        let new_p = document.createElement('p');
        let new_li = document.createElement('li');
        new_p.innerHTML = todo;
        new_li.appendChild(new_p);
        new_li.classList.add('new_li');
        list.appendChild(new_li);
    }
    update_num();
}
// Add the todo when clicking enter
text.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        let todo = text.value;
        addTodo(todo);
    }
})
add.addEventListener('click', function() {
    let todo = text.value;
    addTodo(todo);
})

save.addEventListener('click', function() {
    let saved_li = document.getElementsByClassName('new_li');

    Array.from(saved_li).forEach(function(li) {
        li.classList.remove('new_li');
        li.classList.add('delete');

    });
    
    update_num();
})

clear.addEventListener('click', function() {
    list.innerHTML = '';
    update_num();
})