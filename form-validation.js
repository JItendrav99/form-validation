
const form = document.querySelector("form");
const button = document.querySelector("button");

const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const companyName = document.getElementById("companyName");
const emailId = document.getElementById("emailId");
const phoneNumber = document.getElementById("phoneNumber");
const topicAddress = document.getElementById("topicAddress");
const emailConsent = document.getElementById("emailConsent");
const fieldError = document.querySelectorAll(".error");

firstName.addEventListener("blur", inputShowError);
firstName.addEventListener("input", inputShowError);

lastName.addEventListener("blur", inputShowError);
lastName.addEventListener("input", inputShowError);

companyName.addEventListener("blur", inputShowError);
companyName.addEventListener("input", inputShowError);

emailId.addEventListener("blur", inputShowError);
emailId.addEventListener("input", inputShowError);

phoneNumber.addEventListener("blur", inputShowError);
phoneNumber.addEventListener("input", inputShowError);

topicAddress.addEventListener("blur", inputShowError);
topicAddress.addEventListener("input", inputShowError);

emailConsent.addEventListener("input", inputShowError);

button.addEventListener("submit", submitOnclick);

function inputShowError() {
    const formGroup = this.closest(".form-group");
    const err = formGroup.querySelector('.error');
    if (this.validity.valueMissing) {
        err.classList.add("show");
    } else {
        err.classList.remove("show");
    }

    if (this.type === "email") {
        const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;

        if (!this.value.match(emailRegex)) {
            err.classList.add("show");
            err.textContent = "Entered value needs to be an email address.";
        } else if (emailId.validity.tooShort) {
            err.classList.add("show")
            err.textContent = `Email should be at least ${emailId.minLength} characters, you entered ${emailId.value.length}.`;
        } else {
            err.classList.remove("show");
        }
    }

    if (this.type === "tel") {
        this.value = this.value.replace(/[^0-9+()\- ]/g, '');
    }

    if (this.type === "checkbox") {
        if (this.checked == true) {
            err.classList.remove("show");
        } else {
            err.classList.add("show");
        }
    }

    checkButton();
}

function checkButton() {
    if (form.checkValidity()) {
        button.disabled = false;
    } else {
        button.disabled = true;
    }
}

async function sendData() {
    const formData = new FormData(form);

    try {
        const response = await fetch("send_email.php", {
            method: "POST",
            mode: "no-cors",
            body: formData,
        });
        console.log(await response.json());
        if (result.success) {
            // Show success message if email was sent
            document.querySelector(".thank-you").classList.add("active");
        } else {
            // Show error if email failed
            console.error(result.message || "Something went wrong");
        }
    } catch (e) {
        console.log(e);
    }
}

// Take over form submission
form.addEventListener("submit", (event) => {
    event.preventDefault();
    sendData();
    document.querySelector(".thank-you").classList.add("active");
    form.reset();
    checkButton();
});

function submitOnclick(event) {
    event.preventDefault();
}
