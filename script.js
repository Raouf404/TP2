'use strict'
let num = document.getElementById('num'),
    add = document.getElementById('add'),
    adding = document.getElementById('adding'),
    text = document.getElementById('text'),
    buttons = document.getElementById('buttons'),
    clear = document.getElementById('clear'),
    save = document.getElementById('save'),
    list = document.getElementById('list');
    
function update_num() {
    let n = list.childElementCount;
    num.innerHTML = n;
}

function addTodo(todo) {
    if (todo !== '') {
        let new_p = document.createElement('p');
        let new_li = document.createElement('li');
        new_p.onclick = function() {
            makeEditable(this);
        };
        new_p.innerHTML = todo;
        new_li.setAttribute('data-editable', true);
        new_li.appendChild(new_p);
        new_li.classList.add('new_li');
        list.appendChild(new_li);
        text.value = '';
        text.setAttribute('focus');
        
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

list.addEventListener('click', function(event){
    if (event.target.tagName === 'IMG') {
        // Get the parent node of the clicked image (container div)
        var parent = event.target.parentNode;

        // Remove the clicked image from the DOM
        parent.remove();
        update_num();
}})

save.addEventListener('click', function() {
    let saved_li = document.getElementsByClassName('new_li');

    Array.from(saved_li).forEach(function(li) {
        let x_image = document.createElement("img");
        x_image.src = 'images/delete.png';
        x_image.classList.add("deleteButton")
        let reference_node = li.firstChild;
        li.insertBefore(x_image,reference_node);
        li.classList.remove('new_li');
        li.classList.add('delete');
        li.setAttribute('data-editable', false);

    });
    
    update_num();
})

clear.addEventListener('click', function() {
    list.innerHTML = '';
    update_num();
})

function backToP(inpt) {
    // Replace the <input> element with a new <p> element
    let newParagraph = document.createElement("p");
    newParagraph.onclick = function() {
        makeEditable(this);
    };
    newParagraph.innerText = inpt.value;
    inpt.parentNode.replaceChild(newParagraph, inpt);
}

function makeEditable(element) {
    let attr = element.parentNode.getAttribute('data-editable');
    console.log(attr)
    if (attr== 'true'){
        let inpt = document.createElement("input");
        inpt.type = "text";
        inpt.value = element.innerHTML;

        // Replace the p with input text in the parent node
        element.parentNode.replaceChild(inpt, element);

        inpt.focus();

        inpt.addEventListener("blur", function() {
            backToP(inpt);
        });

        inpt.addEventListener("keypress", function(event) {
            if (event.key === 'Enter') {
                backToP(inpt);
            }
        });};
}



// Program here

update_num();
