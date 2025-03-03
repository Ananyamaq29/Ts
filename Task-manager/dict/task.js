var _a;
// Adding event listener to the form
(_a = document.getElementById('task-form')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', function (event) {
    event.preventDefault();
    if (!validateForm()) {
        return;
    }
    addTask();
    // Reset the form after submitting
    var form = this;
    form.reset();
});
// Form Validation Function
function validateForm() {
    var title = document.getElementById('title').value;
    var dueDate = document.getElementById('due-date').value;
    if (title.trim() === '' || dueDate.trim() === '') {
        displayError('Title and Due Date are required.');
        return false;
    }
    clearError();
    return true;
}
// Displaying error messages
function displayError(message) {
    var errorMessage = document.getElementById('error-message');
    if (!errorMessage) {
        var errorDiv = document.createElement('div');
        errorDiv.id = 'error-message';
        errorDiv.style.color = 'red';
        errorDiv.textContent = message;
        document.getElementById('task-input').appendChild(errorDiv);
    }
    else {
        errorMessage.textContent = message;
    }
}
// Clearing error messages
function clearError() {
    var errorMessage = document.getElementById('error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}
// Adding a new task
function addTask() {
    var title = document.getElementById('title').value;
    var description = document.getElementById('description').value;
    var dueDate = document.getElementById('due-date').value;
    var priority = document.getElementById('priority').value;
    // Validate task fields before adding
    if (title.trim() === '' || dueDate.trim() === '') {
        console.error("Form is not valid.");
        return;
    }
    var taskList = document.getElementById('tasks');
    var taskItem = document.createElement('li');
    taskItem.className = priority;
    var taskContent = document.createElement('div');
    taskContent.innerHTML = "\n        <h3>".concat(title, "</h3>\n        <p>").concat(description, "</p>\n        <p>Due: ").concat(dueDate, "</p>\n        <p>Priority: ").concat(priority.charAt(0).toUpperCase() + priority.slice(1), "</p>\n    ");
    // Delete button to remove the task
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function () {
        taskList.removeChild(taskItem);
    });
    // Complete checkbox to mark the task as done
    var completeCheckbox = document.createElement('input');
    completeCheckbox.type = 'checkbox';
    completeCheckbox.addEventListener('change', function () {
        if (this.checked) {
            taskItem.style.textDecoration = 'line-through';
        }
        else {
            taskItem.style.textDecoration = 'none';
        }
    });
    // Append elements to the task item
    taskItem.appendChild(taskContent);
    taskItem.appendChild(completeCheckbox);
    taskItem.appendChild(deleteButton);
    // Add the new task item to the task list
    taskList.appendChild(taskItem);
}
