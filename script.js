"use strict";

// Global Variables

let id_counter;
let count = document.getElementById("count"),

    add = document.getElementById("add"),
    text = document.getElementById("text"),

    list = document.getElementById("list"),

    clear = document.getElementById("clear"),
    save = document.getElementById("save");

// ------------------------------------------------------------------------------
// Helper Functions
// ------------------------------------------------------------------------------

function updateCount() {
    count.innerHTML = list.childElementCount;
}

function addTodo(todo, todo_id) {
    if (todo !== "") {
        // Create new elements for the todo item
        let new_p = document.createElement("p");
        let new_li = document.createElement("li");
        let deleteButton = document.createElement("button");
        let upButton = document.createElement("button");
        let downButton = document.createElement("button");

        // Set the inner HTML and the id of the paragraph and append it alongside the buttons to the list item
        new_p.innerHTML = todo;
        new_p.onclick = function() {
            editable(this);
        };
        new_li.appendChild(new_p);
        new_li.appendChild(upButton);
        new_li.appendChild(downButton);
        new_li.appendChild(deleteButton);
        new_li.id = `todo_${todo_id}`;

        new_li.setAttribute("draggable", "true");

        upButton.classList.add("up");
        downButton.classList.add("down");
        deleteButton.classList.add("delete");

        // Add classes and append the new list item to the list
        new_li.classList.add("new_li");
        list.appendChild(new_li);

        // Clear the input field and set focus
        text.value = "";
        text.setAttribute("focus", true);
    }
    // Update the count of todo items
    updateCount();
    saveCheck();
}



function editable(element) {
    let inpt = document.createElement("textarea");
    inpt.setAttribute("wrap", "soft");
    inpt.setAttribute("spellcheck", "false");
    inpt.value = element.innerHTML;
    
    // Set the textarea size to match the size of the paragraph
    inpt.style.width = element.offsetWidth + 'px';
    inpt.style.height = element.offsetHeight + 'px';

    
    inpt.addEventListener('input', function () {
        inpt.style.height = inpt.scrollHeight + 'px';
        
    });

    // Replace the p with input text in the parent node
    element.parentNode.replaceChild(inpt, element);

    // inpt.classList.add("actve_li");
    inpt.focus();

    // Event listeners for blur and Enter key to save changes
    inpt.addEventListener("blur", function() {
        const edited_p = noneEditable(inpt);
        if (element.innerHTML != edited_p.innerHTML) {
            edited_p.parentNode.classList.add("new_li");
            saveCheck();
        }
    });

    inpt.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            const edited_p = noneEditable(inpt);
            if (element.innerHTML != edited_p.innerHTML) {
                edited_p.parentNode.classList.add("new_li");
                saveCheck();
            }
        }
    });
}

function noneEditable(element) {
    let new_p = document.createElement("p");
    new_p.onclick = function() {
        editable(this);
    };
    new_p.innerHTML = element.value;
    element.parentNode.replaceChild(new_p, element);
    // new_p.parentNode.classList.add("new_li");
    return new_p;
}

function upDownCheck () {
    if (list.childElementCount != 0) {
        // Give all of the items up and down class
        let list_items = Array.from(list.children);
        for (let i = 0; i < list_items.length; i++) {
            if (list_items[i].querySelector(".up") === null) {

                let upButton = document.createElement("button");
                upButton.classList.add("up");
                list_items[i].append(upButton);
                let deleteButton = list_items[i].querySelector(".delete");
                // Inserting up before delete
                list_items[i].insertBefore(upButton, deleteButton);
            }
            if (list_items[i].querySelector(".down") === null) {

                let downButton = document.createElement("button");
                downButton.classList.add("down");
                list_items[i].append(downButton);
                let deleteButton = list_items[i].querySelector(".delete");
                // Inserting down before delete
                list_items[i].insertBefore(downButton, deleteButton);
            }
            let upButton = list_items[i].querySelector(".up");
            let downButton = list_items[i].querySelector(".down");
            list_items[i].insertBefore(upButton, downButton);
        }

        // Removes up for the first and down for the last
        let first = list_items[0].querySelector(".up");
        let last = list_items[list_items.length - 1].querySelector(".down");
        
        list_items[0].removeChild(first);
        list_items[list_items.length - 1].removeChild(last);
    }
}

function saveCheck() {
    const savedList = localStorage.getItem("list");

    if (savedList !== list.innerHTML) {
        save.classList.add("save-check");
    }

}

function generateId() {
    id_counter++;
    return id_counter;
}

// ------------------------------------------------------------------------------
// Main Functionality
// ------------------------------------------------------------------------------

function mainFunction() {
    if (localStorage.getItem("id_counter") != undefined) {
        id_counter = localStorage.getItem("id_counter");
    } else {
        id_counter = 0;
    }

    const savedList = localStorage.getItem("list");
    if (savedList !== null) {
        list.innerHTML = savedList;
    }

    let list_items = Array.from(list.children);
    for (let i = 0; i < list_items.length; i++) {
        list_items[i].classList.remove("new_li");
        list_items[i].querySelector("p").onclick = function() {
            editable(this);
        };
    }

    updateCount();
}

// ------------------------------------------------------------------------------
// Event Listeners
// ------------------------------------------------------------------------------

// Adding a todo
add.addEventListener("click", function(event) {
    // Preventing default behavior
    event.preventDefault();
    
    let todo = text.value;
    addTodo(todo, generateId());
    upDownCheck();
    saveCheck();
});
text.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        // Preventing default behavior
        event.preventDefault();

        let todo = text.value;
        addTodo(todo, generateId());
        upDownCheck();
        saveCheck();
    }
});

// Saving
save.addEventListener("click", function(event) {
    // Preventing default behavior
    event.preventDefault();

    localStorage.setItem("id_counter", id_counter);
    localStorage.setItem("list", list.innerHTML);
    save.classList.remove("save-check");
    let list_items = Array.from(list.children);
    for (let i = 0; i < list_items.length; i++) {
        list_items[i].classList.remove("new_li");
    }

    updateCount();
});

// Clearing the list
clear.addEventListener("click", function() {
    list.innerHTML = "";
    id_counter = 0;
    updateCount();
    saveCheck();
});

// Manipulating the list items
list.addEventListener("click", function(event) {
    // Deleting a list item
    if (event.target.classList.contains("delete")) {
        let parent = event.target.parentNode;
        parent.remove();
        updateCount();
        saveCheck();
    }

    // Up list item
    else if (event.target.classList.contains("up")) {
        let parent = event.target.parentNode;

        list.insertBefore(parent, parent.previousSibling);
        saveCheck();
    }

    // Down list item
    else if (event.target.classList.contains("down")) {
        let parent = event.target.parentNode;

        list.insertBefore(parent.nextElementSibling, parent);
        saveCheck();
    }
    upDownCheck();
});

// Dragging items
// list.addEventListener("dragstart", (event)=> {
//     setTimeout(() => event.target.classList.add("dragging"), 0);
// });
// list.addEventListener("dragend", (event)=> {
//     event.target.classList.remove("dragging");
// });

// const initSortableList = (e) => {
//     e.preventDefault();
//     const draggingItem = list.querySelector(".dragging");
//     const siblings = [...list.querySelectorAll("li:not(.dragging)")];

//     // let nextSibling = siblings.find(sibling => {
//     //     return e.clientY <= sibling.offsetTop + sibling.offsetHeight / 2 ;
//     // });

//     let nextSibling = siblings.find(sibling => {
//         // Calculate the midpoint of the sibling element, accounting for scroll position
//         const siblingMidpoint = sibling.getBoundingClientRect().top + window.scrollY + sibling.offsetHeight / 2;
    
//         // Check if the mouse's Y-coordinate is above the midpoint
//         return e.clientY <= siblingMidpoint;
//     });

//     console.log(e.clientY);
//     list.insertBefore(draggingItem, nextSibling);
//     upDownCheck();
//     saveCheck();
// }

// list.addEventListener("dragover", initSortableList);
// list.addEventListener("dragenter", e => e.preventDefault());

// --------------------------
// Program Execution
// --------------------------

// Call the main function to start the program
mainFunction();
