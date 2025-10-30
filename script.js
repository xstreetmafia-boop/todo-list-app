// Get references to the HTML elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// --- 1. Load data when the page opens ---
document.addEventListener('DOMContentLoaded', loadTasks);

// Function to save the current task list to LocalStorage
function saveTasks() {
    // LocalStorage only stores strings, so convert the list HTML to a string
    localStorage.setItem('data', taskList.innerHTML);
}

// Function to load tasks from LocalStorage
function loadTasks() {
    // Get the saved string and insert it back into the <ul> element
    const savedData = localStorage.getItem('data');
    if (savedData) {
        taskList.innerHTML = savedData;
        // Re-attach event listeners to the loaded tasks (crucial step!)
        attachEventListeners();
    }
}

// Function to re-attach click and delete listeners to all list items
function attachEventListeners() {
    const listItems = taskList.querySelectorAll('li');
    listItems.forEach(listItem => {
        // Re-attach the click listener for marking complete
        listItem.addEventListener('click', toggleComplete);
        
        // Find the delete button and re-attach its listener
        const deleteButton = listItem.querySelector('button');
        if (deleteButton) {
            deleteButton.addEventListener('click', deleteTask);
        }
    });
}

// Event handler to toggle 'completed' status
function toggleComplete(event) {
    // 'this' refers to the <li> element
    this.classList.toggle('completed');
    saveTasks(); // Save changes after completion status is toggled
}

// Event handler to delete a task
function deleteTask(event) {
    // Stop the click from bubbling up to the listItem (which would mark it complete)
    event.stopPropagation(); 
    // Remove the parent <li> element from the <ul>
    const listItem = event.target.closest('li');
    if (listItem) {
        taskList.removeChild(listItem);
        saveTasks(); // Save changes after deletion
    }
}

// Function to create a new list item (task)
function createNewTask(taskText) {
    // 1. Create the new list item element (<li>)
    const listItem = document.createElement('li');
    listItem.textContent = taskText;

    // 2. Attach event listener to toggle 'completed' status
    listItem.addEventListener('click', toggleComplete);

    // 3. Create a delete button (❌)
    const deleteButton = document.createElement('button');
    deleteButton.textContent = '❌';
    deleteButton.style.border = 'none';
    deleteButton.style.background = 'none';
    deleteButton.style.cursor = 'pointer';
    deleteButton.style.marginLeft = '10px';

    // 4. Attach event listener to delete the task
    deleteButton.addEventListener('click', deleteTask);

    // 5. Append the delete button to the list item
    listItem.appendChild(deleteButton);

    // 6. Add the new list item to the main list
    taskList.appendChild(listItem);
    
    // 7. --- Save after adding a new task ---
    saveTasks(); 
}

// Event Listener for the 'Add Task' button click
addTaskBtn.addEventListener('click', function() {
    const taskText = taskInput.value.trim();

    if (taskText !== "") { 
        createNewTask(taskText);
        taskInput.value = "";
        taskInput.focus();
    } else {
        alert("Please enter a task!");
    }
});

// Optional: Allow adding tasks by pressing the 'Enter' key
taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTaskBtn.click();
    }
});
