// Get references to the HTML elements we need
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Function to create a new list item (task)
function createNewTask(taskText) {
    // 1. Create the new list item element (<li>)
    const listItem = document.createElement('li');
    listItem.textContent = taskText;

    // 2. Add an event listener to toggle 'completed' status
    listItem.addEventListener('click', function() {
        // Toggles the 'completed' class on the list item
        listItem.classList.toggle('completed');
    });

    // 3. Create a delete button (❌)
    const deleteButton = document.createElement('button');
    deleteButton.textContent = '❌';
    
    // Style the delete button (optional, but good practice)
    deleteButton.style.border = 'none';
    deleteButton.style.background = 'none';
    deleteButton.style.cursor = 'pointer';
    deleteButton.style.marginLeft = '10px';

    // 4. Add an event listener to delete the task
    deleteButton.addEventListener('click', function(event) {
        // Stop the click from bubbling up to the listItem and marking it complete
        event.stopPropagation(); 
        // Remove the parent <li> element from the <ul>
        taskList.removeChild(listItem);
    });

    // 5. Append the delete button to the list item
    listItem.appendChild(deleteButton);

    // 6. Add the new list item to the main list
    taskList.appendChild(listItem);
}


// Event Listener for the 'Add Task' button click
addTaskBtn.addEventListener('click', function() {
    const taskText = taskInput.value.trim(); // Get text and remove leading/trailing spaces

    if (taskText !== "") { // Check if the input is not empty
        createNewTask(taskText);
        taskInput.value = ""; // Clear the input field after adding
        taskInput.focus(); // Keep the cursor in the input field
    } else {
        alert("Please enter a task!");
    }
});

// Optional: Allow adding tasks by pressing the 'Enter' key
taskInput.addEventListener('keypress', function(event) {
    // Check if the key pressed is the 'Enter' key (key code 13 or 'Enter')
    if (event.key === 'Enter') {
        addTaskBtn.click(); // Programmatically click the add button
    }
});