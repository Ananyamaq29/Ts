const buyNowBtn = document.getElementById('buy-now-btn') as HTMLButtonElement;
const contactForm = document.getElementById('contact-form') as HTMLFormElement;
const nameInput = document.getElementById('name') as HTMLInputElement;
const emailInput = document.getElementById('email') as HTMLInputElement;
const messageInput = document.getElementById('message') as HTMLTextAreaElement;
const showMoreDetails = document.getElementById('show-more-details') as HTMLParagraphElement;
const moreDetails = document.getElementById('more-details') as HTMLDivElement;

buyNowBtn.addEventListener('click', () => {
    const agree: boolean = confirm("Do you want to buy this product?");
    if (agree) {
        alert("Thanks for purchasing");
    } else {
        alert("Purchase cancelled");
    }
});

contactForm.addEventListener('submit', (event: Event) => {
    event.preventDefault();

    const name: string = nameInput.value;
    const email: string = emailInput.value;
    const message: string = messageInput.value;

    if (!name || !email || !message) {
        alert('Fill all the fields before submitting.');
        return;
    }

    alert('Message received');
    contactForm.reset();  
});

showMoreDetails.addEventListener('click', () => {
    if (moreDetails.style.display === "none") {
        moreDetails.style.display = "block";
        showMoreDetails.innerText = "Show Less Details";
    } else {
        moreDetails.style.display = "none";
        showMoreDetails.innerText = "Show More Details";
    }
});
