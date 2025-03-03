// Interface for Task
interface Task {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    priority: string;
    completed: boolean;
}

// Adding event listener to the form
document.getElementById('task-form')?.addEventListener('submit', function(event: Event): void {
    event.preventDefault(); 
    if (!validateForm()) {
        return;
    }
    addTask();
    // Reset the form after submitting
    const form = this as HTMLFormElement;
    form.reset();
});

// Form Validation Function
function validateForm(): boolean {
    const title: string = (document.getElementById('title') as HTMLInputElement).value;
    const dueDate: string = (document.getElementById('due-date') as HTMLInputElement).value;
    if (title.trim() === '' || dueDate.trim() === '') {
        displayError('Title and Due Date are required.');
        return false;
    }
    clearError();
    return true;
}

// Displaying error messages
function displayError(message: string): void {
    const errorMessage: HTMLElement | null = document.getElementById('error-message');
    if (!errorMessage) {
        const errorDiv: HTMLDivElement = document.createElement('div');
        errorDiv.id = 'error-message';
        errorDiv.style.color = 'red';
        errorDiv.textContent = message;
        (document.getElementById('task-input') as HTMLElement).appendChild(errorDiv);
    } else {
        errorMessage.textContent = message;
    }
}

// Clearing error messages
function clearError(): void {
    const errorMessage: HTMLElement | null = document.getElementById('error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

// Adding a new task
function addTask(): void {
    const title: string = (document.getElementById('title') as HTMLInputElement).value;
    const description: string = (document.getElementById('description') as HTMLInputElement).value;
    const dueDate: string = (document.getElementById('due-date') as HTMLInputElement).value;
    const priority: string = (document.getElementById('priority') as HTMLSelectElement).value;

    // Validate task fields before adding
    if (title.trim() === '' || dueDate.trim() === '') {
        console.error("Form is not valid.");
        return;
    }

    const taskList: HTMLElement = document.getElementById('tasks') as HTMLElement;
    const taskItem: HTMLElement = document.createElement('li');
    taskItem.className = priority;

    const taskContent: HTMLDivElement = document.createElement('div');
    taskContent.innerHTML = `
        <h3>${title}</h3>
        <p>${description}</p>
        <p>Due: ${dueDate}</p>
        <p>Priority: ${priority.charAt(0).toUpperCase() + priority.slice(1)}</p>
    `;

    // Delete button to remove the task
    const deleteButton: HTMLButtonElement = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function(): void {
        taskList.removeChild(taskItem);
    });

    // Complete checkbox to mark the task as done
    const completeCheckbox: HTMLInputElement = document.createElement('input');
    completeCheckbox.type = 'checkbox';
    completeCheckbox.addEventListener('change', function(): void {
        if (this.checked) {
            taskItem.style.textDecoration = 'line-through';
        } else {
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
