interface EventDetails {
    name: string;
    description: string;
    dateTime: string;
}

document.addEventListener('DOMContentLoaded', function () {
    loadEvents(); 

    let currentEditEvent: EventDetails | null = null;  

    document.getElementById('form-section')!.addEventListener('submit', function (e) {
        e.preventDefault();
         
        const name = (document.getElementById('name') as HTMLInputElement).value.trim();
        const description = (document.getElementById('Description') as HTMLInputElement).value.trim();
        const dateTime = (document.getElementById('datetime-local') as HTMLInputElement).value;

        if (name === '' || description === '' || dateTime === '') {
            alert('All fields are required!');
            return;
        }

        const event: EventDetails = {
            name: name,
            description: description,
            dateTime: dateTime,
        };

        if (currentEditEvent) {
            updateEvent(currentEditEvent, event);
        } else {
            addToTable(event);
            addToLocalStorage(event);
        }

        (document.getElementById('form-section') as HTMLFormElement).reset();  // Reset the form
        currentEditEvent = null; //for reset
    });
    
    function loadEvents() {  
        const events: EventDetails[] = JSON.parse(localStorage.getItem('events') || '[]');
        events.forEach(event => addToTable(event));
    }

    function addToTable(event: EventDetails) {
        const tableBody = document.getElementById('tbody')!;
        
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${event.name}</td>
            <td>${event.description}</td>
            <td>${event.dateTime}</td>
            <td><button class="edit-btn">Edit</button></td>
            <td><button class="delete-btn">Delete</button></td>
        `;

        tableBody.appendChild(row);

        row.querySelector('.delete-btn')!.addEventListener('click', function () {
            row.remove();
            removeFromLocalStorage(event);
        });

        row.querySelector('.edit-btn')!.addEventListener('click', function () {
            editEvent(event, row);
        });
    }

    function addToLocalStorage(event: EventDetails) {
        const events: EventDetails[] = JSON.parse(localStorage.getItem('events') || '[]');
        events.push(event);
        localStorage.setItem('events', JSON.stringify(events));
    }

    function removeFromLocalStorage(event: EventDetails) {
        const events: EventDetails[] = JSON.parse(localStorage.getItem('events') || '[]');
        const updatedEvents = events.filter(e => e.name !== event.name || e.dateTime !== event.dateTime);
        localStorage.setItem('events', JSON.stringify(updatedEvents));
    }

    function updateEvent(oldEvent: EventDetails, updatedEvent: EventDetails) {
        const tableBody = document.getElementById('tbody')!;
        const rows = tableBody.querySelectorAll('tr');
        
        rows.forEach(row => {
            const nameCell = row.querySelector('td:nth-child(1)')!;
            const dateTimeCell = row.querySelector('td:nth-child(3)')!;
            if (nameCell.textContent === oldEvent.name && dateTimeCell.textContent === oldEvent.dateTime) {
                nameCell.textContent = updatedEvent.name;
                row.querySelector('td:nth-child(2)')!.textContent = updatedEvent.description;
                dateTimeCell.textContent = updatedEvent.dateTime;
            }
        });

        const events: EventDetails[] = JSON.parse(localStorage.getItem('events') || '[]');
        const updatedEvents = events.map(e => 
            e.name === oldEvent.name && e.dateTime === oldEvent.dateTime ? updatedEvent : e
        );
        localStorage.setItem('events', JSON.stringify(updatedEvents));
    }

    function editEvent(event: EventDetails, row: HTMLTableRowElement) {
        currentEditEvent = event;  
        (document.getElementById('name') as HTMLInputElement).value = event.name;
        (document.getElementById('Description') as HTMLInputElement).value = event.description;
        (document.getElementById('datetime-local') as HTMLInputElement).value = event.dateTime;
    }
});
