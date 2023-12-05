"use strict";

// Global Variables

let id_counter = 0; // When using the server change this
let count = document.getElementById("count"),

    adding_form = document.getElementById("adding"),
    add = document.getElementById("add"),
    text = document.getElementById("text"),

    list = document.getElementById("list"),

    clear_save_form = document.getElementById("clear-save"),
    clear = document.getElementById("clear"),
    save = document.getElementById("save");

// --------------------------
// Helper Functions
// --------------------------

function updateCount() {
    count.innerHTML = list.childElementCount;
}

function addTodo(todo) {
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
        new_li.id = `todo_${id_counter++}`;

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
}

function editable(element) {
    let inpt = document.createElement("textarea");
    inpt.setAttribute("wrap", "soft");
    inpt.value = element.innerHTML;

    // Replace the p with input text in the parent node
    element.parentNode.replaceChild(inpt, element);

    // inpt.classList.add("actve_li");
    inpt.focus();

    // Event listeners for blur and Enter key to save changes
    inpt.addEventListener("blur", function() {
        noneEditable(inpt);
    });

    inpt.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            noneEditable(inpt);
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
    new_p.parentNode.classList.add("new_li");
}

function upDownCheck () {
    // let first = list.firstElementChild.querySelector(".up");
    // let last = list.lastElementChild.querySelector(".down");

    // if (first != undefined) {
    //     first.classList.remove("up");
    // }
    // if (last != undefined) {
    //     last.classList.remove("down");
    // }

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
            

            console.log("up");
        }
        if (list_items[i].querySelector(".down") === null) {

            let downButton = document.createElement("button");
            downButton.classList.add("down");
            list_items[i].append(downButton);
            let deleteButton = list_items[i].querySelector(".delete");
            // Inserting down before delete
            list_items[i].insertBefore(downButton, deleteButton);

            console.log("down");
        }
    }

    // Removes up for the first and down for the last
    let first = list_items[0].querySelector(".up");
    let last = list_items[list_items.length - 1].querySelector(".down");

    list_items[0].removeChild(first);
    list_items[list_items.length - 1].removeChild(last);
}

// --------------------------
// Main Functionality
// --------------------------

// Initializing the counter

function mainFunction() {
    updateCount();
}

// --------------------------
// Event Listeners
// --------------------------

// Adding a todo
add.addEventListener("click", function(event) {
    // Preventing default behavior
    event.preventDefault();
    
    let todo = text.value;
    addTodo(todo);
    upDownCheck();
});
text.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        // Preventing default behavior
        event.preventDefault();

        let todo = text.value;
        addTodo(todo);
        upDownCheck();
    }
});

// Saving
save.addEventListener("click", function(event) {
    // Preventing default behavior
    event.preventDefault();

    // Code here

    updateCount();
})

// Clearing the list
clear.addEventListener("click", function() {
    list.innerHTML = "";
    updateCount();
})

// Manipulating the list items
list.addEventListener("click", function(event) {
    // Deleting a list item
    if (event.target.classList.contains("delete")) {
        let parent = event.target.parentNode;
        parent.remove();
        updateCount();
    }

    // Up list item
    if (event.target.classList.contains("up")) {
        let parent = event.target.parentNode;
        console.log(`move ${parent.id} up`);
    }

    // Down list item
    if (event.target.classList.contains("down")) {
        let parent = event.target.parentNode;
        console.log(`move ${parent.id} down`);
    }

})

// Editing list elemtn s text


// --------------------------
// Program Execution
// --------------------------

// Call the main function to start the program
mainFunction();
