// This code runs when the DOM content is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Get the login form element
  const loginForm = document.getElementById("login_form");

  // Add event listener for login form submission
  if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault(); // Prevent the default form submission behavior
      const email = document.getElementById("email").value; // Get the email value
      const password = document.getElementById("password").value; // Get the password value
      try {
        await loginUser(email, password); // Attempt to log in the user
      } catch (error) {
        console.error("Error during login:", error);
        alert("Login failed: " + error.message); // Show an alert if login fails
      }
    });
  }

  // Function to log in the user
  async function loginUser(email, password) {
    const response = await fetch("http://127.0.0.1:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      document.cookie = `token=${data.access_token};`; // Save the token in a cookie
      window.location.href = "index.html"; // Redirect to the main page
    } else {
      alert("Login failed: " + response.statusText); // Show an alert if login fails
    }
  }

  // Function to get a cookie value by name
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  }

  // Function to check if the user is authenticated
  function checkAuthentication() {
    const token = getCookie("token"); // Get the token from cookies
    const loginLink = document.getElementById("login-link");
    if (token) {
      loginLink.style.display = "none"; // Hide the login link if authenticated
      fetchPlaces(token); // Fetch places data
    } else {
      loginLink.style.display = "block"; // Show the login link if not authenticated
    }
  }
  checkAuthentication();

  // Function to fetch places data
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
        displayPlaces(places); // Display places
        populateCountryFilter(places); // Populate country filter
        filterPlaces("All", places); // Filter places by "All"
      } else {
        console.error("Failed to fetch places");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  // Function to display places
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
          <button class="details-button" data-id="${place.id}">View Details</button>
        `;
        placesList.appendChild(div);
      });

      // Add event listeners to detail buttons
      const detailsButtons = document.querySelectorAll(".details-button");
      detailsButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
          const placeId = event.target.getAttribute("data-id");
          window.location.href = `place.html?id=${placeId}`; // Redirect to place details page
        });
      });
    }
  }

  // Function to populate the country filter dropdown
  function populateCountryFilter(places) {
    const countryFilter = document.getElementById("country-filter");
    const countries = [...new Set(places.map((place) => place.country_name))];
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

    // Add event listener to the country filter dropdown
    countryFilter.addEventListener("change", (event) => {
      filterPlaces(event.target.value, places); // Filter places based on selected country
    });
  }

  // Function to filter places based on the selected country
  function filterPlaces(selectedCountry, places) {
    const placeCards = document.querySelectorAll(".place-card");
    placeCards.forEach((card) => {
      const location = card.querySelector(".country").textContent;
      if (location.includes(selectedCountry) || selectedCountry === "All") {
        card.style.display = "block"; // Show the card if it matches the filter
      } else {
        card.style.display = "none"; // Hide the card if it doesn't match the filter
      }
    });
  }

  // Function to get the place ID from the URL
  function getPlaceIdFromUrl() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get("id");
  }

  // Function to check authentication for place details
  function checkAuthenticationForPlaceDetails() {
    const token = getCookie("token");
    const addReviewSection = document.getElementById("add-review");
    const placeId = getPlaceIdFromUrl();

    if (!token) {
      addReviewSection.style.display = "none"; // Hide the add review section if not authenticated
    } else {
      addReviewSection.style.display = "block"; // Show the add review section if authenticated
      fetchPlaceDetails(token, placeId); // Fetch place details
    }
  }
  checkAuthenticationForPlaceDetails();

  // Function to fetch place details
  async function fetchPlaceDetails(token, placeId) {
    try {
      const headers = {
        "Content-Type": "application/json",
      };
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
      const response = await fetch(`http://127.0.0.1:5000/places/${placeId}`, {
        method: "GET",
        headers,
      });

      if (response.ok) {
        const placeDetails = await response.json();
        displayPlaceDetails(placeDetails); // Display place details
      } else {
        console.error("Failed to fetch place details");
      }
    } catch (error) {
      console.error("Error fetching place details:", error);
    }
  }

  // Function to display place details
  function displayPlaceDetails(placeDetails) {
    const placeSection = document.getElementById("place-details");
    placeSection.innerHTML = `
      <h1>${placeDetails.id}</h1>
      <p><strong>Host name:</strong> ${placeDetails.host_name}</p>
      <p><strong>Description:</strong> ${placeDetails.description}</p>
      <p><strong>Number of rooms:</strong> ${placeDetails.number_of_rooms}</p>
      <p><strong>Number of bathrooms:</strong> ${placeDetails.number_of_bathrooms}</p>
      <p><strong>Max guests:</strong> ${placeDetails.max_guests}</p>
      <p><strong>Price per night:</strong> ${placeDetails.price_per_night}</p>
      <p><strong>Location:</strong><br> City: ${placeDetails.city_name}<br> Country: ${placeDetails.country_name}</p>
      <p><strong>Amenities:</strong> ${placeDetails.amenities}</p>
    `;

    const reviewsSection = document.getElementById("reviews");
    reviewsSection.innerHTML = "";
    reviewsSection.innerHTML = `<h2>Reviews</h2>`;
    placeDetails.reviews.forEach((review) => {
      const reviewDiv = document.createElement("div");
      reviewDiv.className = "review-card";
      reviewDiv.innerHTML = `
        <p><strong>Rating:</strong> ${review.rating}</p>
        <p><strong>Review:</strong> ${review.comment}</p>
        <p><strong>User:</strong> ${review.user_name}</p>
      `;
      reviewsSection.appendChild(reviewDiv);
    });

    const addReviewSection = document.getElementById("add-review");
    addReviewSection.innerHTML = "";

    const addReviewButton = document.createElement("button");
    addReviewButton.textContent = "Add a review";
    addReviewButton.addEventListener("click", () => {
      window.location.href = `add_review.html?id=${placeDetails.id}`; // Redirect to add review page
    });
    addReviewSection.appendChild(addReviewButton);
  }

  // Add event listener for the review form submission
  const reviewForm = document.getElementById("review-form");
  if (reviewForm) {
    reviewForm.addEventListener("submit", async (event) => {
      event.preventDefault(); // Prevent the default form submission behavior
      const rating = document.getElementById("rating").value; // Get the rating value
      const review = document.getElementById("review-text").value; // Get the review text
      const token = getCookie("token");
      const placeId = getPlaceIdFromUrl();

      // Function to submit a review
      async function submitReview(token, placeId, rating, review) {
        try {
          const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          };
          const response = await fetch(
            `http://127.0.0.1:5000/places/${placeId}/reviews`,
            {
              method: "POST",
              headers,
              body: JSON.stringify({ rating, review }),
            }
          );

          if (response.ok) {
            alert("Review submitted successfully!");
            reviewForm.reset(); // Reset the review form
          } else {
            alert("Failed to submit review");
          }
        } catch (error) {
          console.error(error);
        }
      }
      await submitReview(token, placeId, rating, review); // Submit the review
    });
  }

  // closing
});
