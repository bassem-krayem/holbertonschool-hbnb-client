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
      document.cookie = `token=${data.access_token};`;
      window.location.href = "index.html";
    } else {
      alert("Login failed: " + response.statusText);
    }
  }

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  }

  function checkAuthentication() {
    let token = getCookie("token");
    let loginLink = document.getElementById("login-link");

    if (token) {
      loginLink.style.display = "none";
      fetchPlaces(token);
    } else {
      loginLink.style.display = "block";
    }
  }
  checkAuthentication();

  async function fetchPlaces(token) {
    try {
      const response = await fetch("http://127.0.0.1:5000/places", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const places = await response.json();
        displayPlaces(places);
        populateCountryFilter(places);
        // Default to showing all places initially
        filterPlaces("All", places);
      } else {
        console.error("Failed to fetch places");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  function displayPlaces(places) {
    const placesList = document.getElementById("places-list");
    if (placesList) {
      placesList.innerHTML = "";

      places.forEach((place) => {
        const div = document.createElement("div");
        div.className = "place-card";
        div.innerHTML = `
          <h2>${place.id}</h2>
          <p><strong>Description:</strong> ${place.description}</p>
          <p><strong>City:</strong> ${place.city_name}</p>
          <p class="country"><strong>Location:</strong> ${place.country_name}</p>
        `;
        placesList.appendChild(div);
      });
    }
  }

  function populateCountryFilter(places) {
    const countryFilter = document.getElementById("country-filter");
    const countries = [...new Set(places.map((place) => place.country_name))];

    // Add "All" option at the beginning
    const allOption = document.createElement("option");
    allOption.value = "All";
    allOption.textContent = "All Countries";
    countryFilter.appendChild(allOption);

    countries.forEach((country) => {
      const option = document.createElement("option");
      option.value = country;
      option.textContent = country;
      countryFilter.appendChild(option);
    });

    countryFilter.addEventListener("change", (event) => {
      filterPlaces(event.target.value, places);
    });
  }

  function filterPlaces(selectedCountry, places) {
    const placeCards = document.querySelectorAll(".place-card");

    placeCards.forEach((card) => {
      const location = card.querySelector(".country").textContent;
      if (location.includes(selectedCountry) || selectedCountry === "All") {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  }

  // closing of the dom event
});
