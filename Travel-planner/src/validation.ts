// Define the ValidationResult interface
interface ValidationResult {
    isValid: boolean;
    message: string;
}

// Function to validate destination field
function validateDestination(destination: HTMLInputElement): ValidationResult {
    if (destination.value.trim() === '') {
        return { isValid: false, message: 'Destination cannot be empty.' };
    }
    return { isValid: true, message: '' };
}

// Function to validate dates (start and end)
function validateDates(startDate: HTMLInputElement, endDate: HTMLInputElement): ValidationResult {
    if (startDate.value === '' || endDate.value === '') {
        return { isValid: false, message: 'Travel dates cannot be empty.' };
    }

    if (new Date(startDate.value) >= new Date(endDate.value)) {
        return { isValid: false, message: 'Start date must be earlier than end date.' };
    }

    return { isValid: true, message: '' };
}

// Function to validate the preferences (dropdown selection)
function validatePreferences(preferences: HTMLSelectElement): ValidationResult {
    if (preferences.value === '') {
        return { isValid: false, message: 'Please select a preference.' };
    }
    return { isValid: true, message: '' };
}

// Function to validate the form
function validateForm(destination: HTMLInputElement, startDate: HTMLInputElement, endDate: HTMLInputElement, preferences: HTMLSelectElement): ValidationResult {
    // Validate each field individually
    const destinationResult = validateDestination(destination);
    if (!destinationResult.isValid) return destinationResult;

    const dateResult = validateDates(startDate, endDate);
    if (!dateResult.isValid) return dateResult;

    const preferencesResult = validatePreferences(preferences);
    if (!preferencesResult.isValid) return preferencesResult;

    return { isValid: true, message: '' };
}

// Function to handle displaying error messages
function showError(errorMessage: HTMLElement, result: ValidationResult): void {
    if (!result.isValid) {
        errorMessage.style.display = 'block';
        errorMessage.textContent = result.message;
    } else {
        errorMessage.style.display = 'none';
    }
}

// Function to render the summary section
function renderSummary(destination: string, startDate: string, endDate: string, preferences: string, comments: string | null, summarySection: HTMLElement): void {
    const existingSummaryContent = summarySection.querySelector(".summary-content");
    if (existingSummaryContent) {
        existingSummaryContent.remove();
    }

    const summaryContent = document.createElement("div");
    summaryContent.classList.add("summary-content");

    const destinationParagraph = document.createElement("p");
    destinationParagraph.textContent = `Destination: ${destination}`;
    summaryContent.appendChild(destinationParagraph);

    const startDateParagraph = document.createElement("p");
    startDateParagraph.textContent = `Start Date: ${startDate}`;
    summaryContent.appendChild(startDateParagraph);

    const endDateParagraph = document.createElement("p");
    endDateParagraph.textContent = `End Date: ${endDate}`;
    summaryContent.appendChild(endDateParagraph);

    const preferencesParagraph = document.createElement("p");
    preferencesParagraph.textContent = `Preferences: ${preferences}`;
    summaryContent.appendChild(preferencesParagraph);

    const commentsParagraph = document.createElement("p");
    commentsParagraph.textContent = `Comments: ${comments || "No comments provided."}`;
    summaryContent.appendChild(commentsParagraph);

    // Append the new summary content to the summary section
    summarySection.appendChild(summaryContent);
    summarySection.style.display = 'block';
}

// Event listener for DOMContentLoaded
document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('travel-form') as HTMLFormElement;
    const destination = document.getElementById('destination') as HTMLInputElement;
    const startDate = document.getElementById('startDate') as HTMLInputElement;
    const endDate = document.getElementById('endDate') as HTMLInputElement;
    const preferences = document.getElementById('preferences') as HTMLSelectElement;
    const comments = document.getElementById('comments') as HTMLTextAreaElement;
    const submitButton = document.getElementById('submit-button') as HTMLButtonElement;
    const errorMessage = document.getElementById('error-message') as HTMLElement;
    const summarySection = document.getElementById('summary') as HTMLElement;
    
    // Live character count for comments (optional)
    const charCount = document.getElementById('char-count') as HTMLElement;

    if (comments && charCount) {
        comments.addEventListener('input', function() {
            charCount.textContent = `${comments.value.length} characters`;
        });
    }

    form.addEventListener('input', function() {
        const result = validateForm(destination, startDate, endDate, preferences);
        showError(errorMessage, result);
        submitButton.disabled = !result.isValid;
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const result = validateForm(destination, startDate, endDate, preferences);
        if (result.isValid) {
            renderSummary(destination.value, startDate.value, endDate.value, preferences.value, comments.value, summarySection);
        } else {
            showError(errorMessage, result);
        }
    });
});
