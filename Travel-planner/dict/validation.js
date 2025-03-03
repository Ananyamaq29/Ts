// Function to validate destination field
function validateDestination(destination) {
    if (destination.value.trim() === '') {
        return { isValid: false, message: 'Destination cannot be empty.' };
    }
    return { isValid: true, message: '' };
}
// Function to validate dates (start and end)
function validateDates(startDate, endDate) {
    if (startDate.value === '' || endDate.value === '') {
        return { isValid: false, message: 'Travel dates cannot be empty.' };
    }
    if (new Date(startDate.value) >= new Date(endDate.value)) {
        return { isValid: false, message: 'Start date must be earlier than end date.' };
    }
    return { isValid: true, message: '' };
}
// Function to validate the preferences (dropdown selection)
function validatePreferences(preferences) {
    if (preferences.value === '') {
        return { isValid: false, message: 'Please select a preference.' };
    }
    return { isValid: true, message: '' };
}
// Function to validate the form
function validateForm(destination, startDate, endDate, preferences) {
    // Validate each field individually
    var destinationResult = validateDestination(destination);
    if (!destinationResult.isValid)
        return destinationResult;
    var dateResult = validateDates(startDate, endDate);
    if (!dateResult.isValid)
        return dateResult;
    var preferencesResult = validatePreferences(preferences);
    if (!preferencesResult.isValid)
        return preferencesResult;
    return { isValid: true, message: '' };
}
// Function to handle displaying error messages
function showError(errorMessage, result) {
    if (!result.isValid) {
        errorMessage.style.display = 'block';
        errorMessage.textContent = result.message;
    }
    else {
        errorMessage.style.display = 'none';
    }
}
// Function to render the summary section
function renderSummary(destination, startDate, endDate, preferences, comments, summarySection) {
    var existingSummaryContent = summarySection.querySelector(".summary-content");
    if (existingSummaryContent) {
        existingSummaryContent.remove();
    }
    var summaryContent = document.createElement("div");
    summaryContent.classList.add("summary-content");
    var destinationParagraph = document.createElement("p");
    destinationParagraph.textContent = "Destination: ".concat(destination);
    summaryContent.appendChild(destinationParagraph);
    var startDateParagraph = document.createElement("p");
    startDateParagraph.textContent = "Start Date: ".concat(startDate);
    summaryContent.appendChild(startDateParagraph);
    var endDateParagraph = document.createElement("p");
    endDateParagraph.textContent = "End Date: ".concat(endDate);
    summaryContent.appendChild(endDateParagraph);
    var preferencesParagraph = document.createElement("p");
    preferencesParagraph.textContent = "Preferences: ".concat(preferences);
    summaryContent.appendChild(preferencesParagraph);
    var commentsParagraph = document.createElement("p");
    commentsParagraph.textContent = "Comments: ".concat(comments || "No comments provided.");
    summaryContent.appendChild(commentsParagraph);
    // Append the new summary content to the summary section
    summarySection.appendChild(summaryContent);
    summarySection.style.display = 'block';
}
// Event listener for DOMContentLoaded
document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById('travel-form');
    var destination = document.getElementById('destination');
    var startDate = document.getElementById('startDate');
    var endDate = document.getElementById('endDate');
    var preferences = document.getElementById('preferences');
    var comments = document.getElementById('comments');
    var submitButton = document.getElementById('submit-button');
    var errorMessage = document.getElementById('error-message');
    var summarySection = document.getElementById('summary');
    // Live character count for comments (optional)
    var charCount = document.getElementById('char-count');
    if (comments && charCount) {
        comments.addEventListener('input', function () {
            charCount.textContent = "".concat(comments.value.length, " characters");
        });
    }
    form.addEventListener('input', function () {
        var result = validateForm(destination, startDate, endDate, preferences);
        showError(errorMessage, result);
        submitButton.disabled = !result.isValid;
    });
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        var result = validateForm(destination, startDate, endDate, preferences);
        if (result.isValid) {
            renderSummary(destination.value, startDate.value, endDate.value, preferences.value, comments.value, summarySection);
        }
        else {
            showError(errorMessage, result);
        }
    });
});
