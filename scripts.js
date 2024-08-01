// Ensure the DOM is fully loaded before running the script
document.addEventListener("DOMContentLoaded", () => {
  // Get the login form element by its ID
  const loginForm = document.getElementById("login_form");

  // Check if the login form exists
  if (loginForm) {
    // Add an event listener to handle form submission
    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault(); // Prevent the default form submission behavior

      // Get the email and password values from the form inputs
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      try {
        // Call the loginUser function to make the API request
        await loginUser(email, password);
      } catch (error) {
        console.error("Error during login:", error); // Log error to the console
        alert("Login failed: " + error.message); // Show an alert with the error message
      }
    });
  }

  // Function to make the login API request
  async function loginUser(email, password) {
    // Send a POST request to the login endpoint with the email and password
    const response = await fetch("http://127.0.0.1:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }), // Convert the email and password to a JSON string
    });

    if (response.ok) {
      const data = await response.json();
      Cookies.set("token", data.access_token, { path: "/" });
      window.location.href = "index.html";
    } else {
      alert("Login failed: " + response.statusText);
    }
  }

  // here the closing of the event of the dom
});
