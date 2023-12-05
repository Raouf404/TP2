"use strict";

// Global Variables

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
    return count.innerHTML;
}

function addTodo(todo) {
    if (todo !== "") {
        // Create new elements for the todo item
        let new_p = document.createElement("p");
        let new_li = document.createElement("li");
        let deleteButton = document.createElement("button")

        // Set the inner HTML and the id of the paragraph and append it alongside the button to the list item
        new_p.innerHTML = todo;
        new_p.onclick = function() {
            editable(this);
        };
        new_li.appendChild(new_p);
        new_li.appendChild(deleteButton);
        new_li.id = `todo_${updateCount()}`;

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
});
text.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        // Preventing default behavior
        event.preventDefault();

        let todo = text.value;
        addTodo(todo);
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

    // Down list item
})

// Editing list elemtn s text


// --------------------------
// Program Execution
// --------------------------

// Call the main function to start the program
mainFunction();
