document.addEventListener('DOMContentLoaded', () => {
    const nameField = document.getElementById('usr');
    const emailField = document.getElementById('eml');
    const phoneField = document.getElementById('phn');
    const messageField = document.getElementById('comment');
    const submitButton = document.querySelector('#messagebtn button');

    // Function to validate email using regex
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    // Function to validate phone number (10 digits)
    function validatePhone(phone) {
        const re = /^\d{10}$/;
        return re.test(phone);
    }

    // Function to validate name (must not be empty)
    function validateName(name) {
        return name.trim() !== '';
    }

    // Function to validate message (must not be empty)
    function validateMessage(message) {
        return message.trim() !== '';
    }

    submitButton.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent form submission

        // Reset previous error messages
        nameField.classList.remove('is-invalid');
        emailField.classList.remove('is-invalid');
        phoneField.classList.remove('is-invalid');
        messageField.classList.remove('is-invalid');

        // Validate each field
        let isValid = true;

        if (!validateName(nameField.value)) {
            nameField.classList.add('is-invalid');
            isValid = false;
        }
        if (!validateEmail(emailField.value)) {
            emailField.classList.add('is-invalid');
            isValid = false;
        }
        if (!validatePhone(phoneField.value)) {
            phoneField.classList.add('is-invalid');
            isValid = false;
        }
        if (!validateMessage(messageField.value)) {
            messageField.classList.add('is-invalid');
            isValid = false;
        }

        if (isValid) {
            alert("Form submitted successfully!");
            // Optionally: Perform form submission logic here
        } else {
            alert("Please correct the errors in the form.");
        }
    });
});
function toggleReadMore() {
    const extraText = document.getElementById('extraText');
    const readMoreBtn = document.getElementById('readMoreBtn');

    if (extraText.style.display === 'none') {
        // Show the extra text
        extraText.style.display = 'inline';
        readMoreBtn.textContent = 'Read Less'; // Change button text
    } else {
        // Hide the extra text
        extraText.style.display = 'none';
        readMoreBtn.textContent = 'Read More...'; // Revert button text
    }
}

// JavaScript's fetch API to send form data to the backend.
document.querySelector("#messagebtn button").addEventListener("click", async () => {
    const name = document.getElementById("usr").value;
    const email = document.getElementById("eml").value;
    const phone = document.getElementById("phn").value;
    const message = document.getElementById("comment").value;
  
    try {
        const response = await fetch("http://localhost:5000/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, phone, message }),
        });
  
        if (response.ok) {
            const result = await response.json();
            alert(result.message); // Show success message
          
            // Clear form fields after successful submission
            document.getElementById("usr").value = '';
            document.getElementById("eml").value = '';
            document.getElementById("phn").value = '';
            document.getElementById("comment").value = '';
        } else {
            alert("Error submitting the form. Please try again.");
        }
    } catch (error) {
        console.error("Error during fetch:", error);
        alert("There was a problem with the request.");
    }
});








 





