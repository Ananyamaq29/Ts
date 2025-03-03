document.addEventListener('DOMContentLoaded', function () {
    loadEvents();
    var currentEditEvent = null;
    document.getElementById('form-section').addEventListener('submit', function (e) {
        e.preventDefault();
        var name = document.getElementById('name').value.trim();
        var description = document.getElementById('Description').value.trim();
        var dateTime = document.getElementById('datetime-local').value;
        if (name === '' || description === '' || dateTime === '') {
            alert('All fields are required!');
            return;
        }
        var event = {
            name: name,
            description: description,
            dateTime: dateTime,
        };
        if (currentEditEvent) {
            updateEvent(currentEditEvent, event);
        }
        else {
            addToTable(event);
            addToLocalStorage(event);
        }
        document.getElementById('form-section').reset(); // Reset the form
        currentEditEvent = null; //for reset
    });
    function loadEvents() {
        var events = JSON.parse(localStorage.getItem('events') || '[]');
        events.forEach(function (event) { return addToTable(event); });
    }
    function addToTable(event) {
        var tableBody = document.getElementById('tbody');
        var row = document.createElement('tr');
        row.innerHTML = "\n            <td>".concat(event.name, "</td>\n            <td>").concat(event.description, "</td>\n            <td>").concat(event.dateTime, "</td>\n            <td><button class=\"edit-btn\">Edit</button></td>\n            <td><button class=\"delete-btn\">Delete</button></td>\n        ");
        tableBody.appendChild(row);
        row.querySelector('.delete-btn').addEventListener('click', function () {
            row.remove();
            removeFromLocalStorage(event);
        });
        row.querySelector('.edit-btn').addEventListener('click', function () {
            editEvent(event, row);
        });
    }
    function addToLocalStorage(event) {
        var events = JSON.parse(localStorage.getItem('events') || '[]');
        events.push(event);
        localStorage.setItem('events', JSON.stringify(events));
    }
    function removeFromLocalStorage(event) {
        var events = JSON.parse(localStorage.getItem('events') || '[]');
        var updatedEvents = events.filter(function (e) { return e.name !== event.name || e.dateTime !== event.dateTime; });
        localStorage.setItem('events', JSON.stringify(updatedEvents));
    }
    function updateEvent(oldEvent, updatedEvent) {
        var tableBody = document.getElementById('tbody');
        var rows = tableBody.querySelectorAll('tr');
        rows.forEach(function (row) {
            var nameCell = row.querySelector('td:nth-child(1)');
            var dateTimeCell = row.querySelector('td:nth-child(3)');
            if (nameCell.textContent === oldEvent.name && dateTimeCell.textContent === oldEvent.dateTime) {
                nameCell.textContent = updatedEvent.name;
                row.querySelector('td:nth-child(2)').textContent = updatedEvent.description;
                dateTimeCell.textContent = updatedEvent.dateTime;
            }
        });
        var events = JSON.parse(localStorage.getItem('events') || '[]');
        var updatedEvents = events.map(function (e) {
            return e.name === oldEvent.name && e.dateTime === oldEvent.dateTime ? updatedEvent : e;
        });
        localStorage.setItem('events', JSON.stringify(updatedEvents));
    }
    function editEvent(event, row) {
        currentEditEvent = event;
        document.getElementById('name').value = event.name;
        document.getElementById('Description').value = event.description;
        document.getElementById('datetime-local').value = event.dateTime;
    }
});
