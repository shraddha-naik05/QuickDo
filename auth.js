function signup() {
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;
  const message = document.getElementById("signupMessage");

  if (!email || !password) {
    message.textContent = "Please fill in both fields.";
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || {};
  if (users[email]) {
    message.textContent = "User already exists!";
    return;
  }

  users[email] = { password };
  localStorage.setItem("users", JSON.stringify(users));
  message.style.color = "green";
  message.textContent = "Signup successful! Redirecting...";

  setTimeout(() => {
    window.location.href = "index.html";
  }, 1500);
}

function login() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  const message = document.getElementById("loginMessage");

  if (!email || !password) {
    message.textContent = "Please enter both fields.";
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || {};
  if (!users[email] || users[email].password !== password) {
    message.textContent = "Invalid email or password.";
    return;
  }

  localStorage.setItem("loggedInUser", email);
  message.style.color = "green";
  message.textContent = "Login successful! Redirecting...";

  setTimeout(() => {
    window.location.href = "todo.html";
  }, 1000);
}

