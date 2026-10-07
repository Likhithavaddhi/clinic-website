// ================= MOBILE MENU =================

const menuBtn = document.getElementById("menuBtn");
const navbar = document.querySelector(".navbar");

if (menuBtn && navbar) {

    menuBtn.addEventListener("click", () => {
        navbar.classList.toggle("show");
    });

    const navLinks = document.querySelectorAll(".navbar a");

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            navbar.classList.remove("show");
        });
    });

}
// ================= APPOINTMENT FORM =================

const appointmentForm = document.getElementById("appointmentForm");
const formMessage = document.getElementById("formMessage");

if (appointmentForm) {
    appointmentForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const phone = document.getElementById("phone").value;
        const email = document.getElementById("email").value;
        const date = document.getElementById("date").value;
        const time = document.getElementById("time").value;
        const service = document.getElementById("service").value;
        const message = document.getElementById("message").value;

        const appointmentData = {
            name,
            phone,
            email,
            date,
            time,
            service,
            message
        };

        try {
            formMessage.textContent = "Sending appointment request...";
            formMessage.style.color = "#4c817b";

            const response = await fetch(
                "/api/appointments",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(appointmentData)
                }
            );

            const result = await response.json();

            if (response.ok) {
                formMessage.textContent =
                    "Appointment request submitted successfully!";

                appointmentForm.reset();

                console.log("Backend response:", result);
            } else {
                formMessage.textContent =
                    "Something went wrong. Please try again.";
            }

        } catch (error) {
            console.error("Error:", error);

            formMessage.textContent =
                "Unable to connect to the server. Please try again.";
        }
    });
}
// ================= SCROLL ANIMATION =================

const revealElements = document.querySelectorAll(
    ".section-heading, .service-card, .why-card, .team-card, .process-item, .testimonial-card, .contact-card"
);

revealElements.forEach((element) => {
    element.classList.add("reveal");
});

const revealOnScroll = () => {

    revealElements.forEach((element) => {

        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (elementTop < windowHeight - 80) {
            element.classList.add("active");
        }

    });

};

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();