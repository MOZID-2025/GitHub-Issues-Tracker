document
  .getElementById("login-btn")
  .addEventListener("click", function (event) {
    event.preventDefault();
    const usernameInput = document.getElementById("username");
    const username = usernameInput.value;

    console.log(username);

    const passwordInput = document.getElementById("password");
    const password = passwordInput.value;

    if (username == "admin" && password == "admin123") {
      alert("Login success");
      window.location.replace("/main.html");
    } else {
      alert("Login failed");
      return;
    }
    console.log(password);
  });
