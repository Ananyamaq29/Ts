var buyNowBtn = document.getElementById('buy-now-btn');
var contactForm = document.getElementById('contact-form');
var nameInput = document.getElementById('name');
var emailInput = document.getElementById('email');
var messageInput = document.getElementById('message');
var showMoreDetails = document.getElementById('show-more-details');
var moreDetails = document.getElementById('more-details');
buyNowBtn.addEventListener('click', function () {
    var agree = confirm("Do you want to buy this product?");
    if (agree) {
        alert("Thanks for purchasing");
    }
    else {
        alert("Purchase cancelled");
    }
});
contactForm.addEventListener('submit', function (event) {
    event.preventDefault();
    var name = nameInput.value;
    var email = emailInput.value;
    var message = messageInput.value;
    if (!name || !email || !message) {
        alert('Fill all the fields before submitting.');
        return;
    }
    alert('Message received');
    contactForm.reset();
});
showMoreDetails.addEventListener('click', function () {
    if (moreDetails.style.display === "none") {
        moreDetails.style.display = "block";
        showMoreDetails.innerText = "Show Less Details";
    }
    else {
        moreDetails.style.display = "none";
        showMoreDetails.innerText = "Show More Details";
    }
});
