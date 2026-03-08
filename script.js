const loginForm = document.getElementById("loginForm");
const messageBox = document.getElementById("messageBox");
const submitBtn = document.getElementById("submitBtn");

// Credentials
const VALID_USER = "admin";
const VALID_PASS = "admin123";

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const userValue = document.getElementById("username").value.trim();
  const passValue = document.getElementById("password").value.trim();

  // Loading state
  submitBtn.innerText = "Verifying...";
  submitBtn.disabled = true;

  setTimeout(() => {
    if (userValue === VALID_USER && passValue === VALID_PASS) {
      // Success Message
      showResponse("Login Successful! Redirecting...", "success");

      // Redirecting to main.html after 1 second
      setTimeout(() => {
        window.location.href = "main.html";
      }, 1000);
    } else {
      // Error Message
      showResponse("Invalid username or password.", "error");
      submitBtn.innerText = "Sign In";
      submitBtn.disabled = false;
    }
  }, 800);
});

function showResponse(text, type) {
  messageBox.innerText = text;
  messageBox.className = "mb-4 p-3 rounded-lg text-sm text-center border block";

  if (type === "error") {
    messageBox.classList.add("bg-red-50", "text-red-600", "border-red-100");
  } else {
    messageBox.classList.add(
      "bg-green-50",
      "text-green-600",
      "border-green-100",
    );
  }
}

// search

const searchInput = document.getElementById("searchInput");

const cards = document.querySelectorAll(".grid > div");

searchInput.addEventListener("input", (e) => {
  const searchTerm = e.target.value.toLowerCase();

  cards.forEach((card) => {
    const title = card.querySelector("h3").innerText.toLowerCase();
    const description = card.querySelector("p").innerText.toLowerCase();

    if (title.includes(searchTerm) || description.includes(searchTerm)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});
