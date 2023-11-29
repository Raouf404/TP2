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
add.addEventListener('click', function() {
    let todo = text.value;
    if (todo != '') {
        let new_li = document.createElement('li');
        new_li.innerHTML = todo;
        new_li.classList.add('new_li');
        list.appendChild(new_li);
    }
    update_num();
})

save.addEventListener('click', function() {
    let saved_li = document.getElementsByClassName('new_li');

    Array.from(saved_li).forEach(function(li) {
        li.classList.remove('new_li');
    });
    
    update_num();
})

clear.addEventListener('click', function() {
    list.innerHTML = '';
    update_num();
})