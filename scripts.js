document.addEventListener("DOMContentLoaded", () => {
  // Get the login form element by its ID
  const loginForm = document.getElementById("login_form");

  if (loginForm) {
    // Check if the login form exists
    // Add an event listener to handle form submission
    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault(); // Prevent the default form submission behavior

      // Get the email and password values from the form inputs
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      // Check if either email or password fields are empty
      if (!email || !password) {
        alert("Please fill in all fields"); // Show an alert if any field is empty
        return; // Exit the function if fields are empty
      }

      try {
        // Call the loginUser function to make the API request
        const response = await loginUser(email, password);

        if (response.ok) {
          // Check if the response status is OK (successful login)
          const data = await response.json();
          // Store the JWT token in a cookie
          document.cookie = `token=${data.access_token}; path=/;`;
          window.location.href = "index.html"; // Redirect to the main page
        } else {
          const errorData = await response.json(); // Parse the error response data as JSON
          alert("Login failed: " + (errorData.message || response.statusText)); // Show an alert with the error message
        }
      } catch (error) {
        console.error("Error:", error); // Log the error to the console
        alert("An error occurred. Please try again."); // Show a generic error alert
      }
    });
  }
});

// Function to make the login API request
async function loginUser(email, password) {
  // Send a POST request to the login endpoint with the email and password
  const response = await fetch("http://127.0.0.1:5000/login", {
    method: "POST", // Use the POST method
    headers: {
      "Content-Type": "application/json", // Set the Content-Type header to JSON
    },
    body: JSON.stringify({ email, password }), // Convert the email and password to a JSON string
  });

  return response; // Return the response object
}
