# HBnB Evolution: Part 3 (Client)

## Overview

This project is the third part of the HBnB Evolution series. In this phase, you’ll focus on the front-end development of your application using HTML5, CSS3, and JavaScript ES6. The goal is to design and implement an interactive user interface that connects with the back-end services developed in the previous parts of the project.

## Objectives

- Develop a user-friendly interface following provided design specifications.
- Implement client-side functionality to interact with the back-end API.
- Ensure secure and efficient data handling using JavaScript.
- Apply modern web development practices to create a dynamic web application.

## Learning Goals

- Understand and apply HTML5, CSS3, and JavaScript ES6 in a real-world project.
- Learn to interact with back-end services using AJAX/Fetch API.
- Implement authentication mechanisms and manage user sessions.
- Use client-side scripting to enhance user experience without page reloads.

## Tasks Breakdown

### 1. Design (Task 1)

- Complete provided HTML and CSS files to match the given design specifications.
- Create pages for Login, List of Places, Place Details, and Add Review.

### 2. Login (Task 2)

- Implement login functionality using the back-end API.
- Store the JWT token returned by the API in a cookie for session management.

### 3. List of Places (Task 3)

- Implement the main page to display a list of all places.
- Fetch places data from the API and implement client-side filtering based on country selection.
- Ensure the page redirects to the login page if the user is not authenticated.

### 4. Place Details (Task 4)

- Implement the detailed view of a place.
- Fetch place details from the API using the place ID.
- Provide access to the add review form if the user is authenticated.

### 5. Add Review (Task 5)

- Implement the form to add a review for a place.
- Ensure the form is accessible only to authenticated users, redirecting others to the index page.

## Resources

- [HTML5 Documentation](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [CSS3 Documentation](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [JavaScript ES6 Features](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [Handling Cookies in JavaScript](https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie)
- [Client-Side Form Validation](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation)

## Testing the Frontend with a Mock API

- To test your frontend with the backend, you can use this Mock API if yours (from part 2) doesn’t work.
- This Mock API should allow you to make API calls and test all the frontend functionalities that you will implement in this project.
- You will know how to use it if you entered to the directory of the api and check the readme.md there.

## Tasks

### Task 0: Design

**Objectives**

- Complete the provided HTML and CSS files to match the given design specifications.
- Create the following pages:
  - Login Form
  - List of Places
  - Place Details
  - Add Review Form

**Requirements**

- Use the provided HTML and CSS files as a starting point.
- Follow the design specifications closely to achieve the intended look and feel.

**Instructions**

1. Download the Provided Files:
   - Obtain the HTML and CSS files provided as the starting point for this task. -> GitHub Repo
2. Complete the HTML Structure:
   - Use semantic HTML5 elements to structure the content of each page.
   - Ensure the structure matches the design specifications provided below.
3. Apply CSS Styles:
   - Use the provided CSS file and add necessary styles to achieve the desired design.
4. Pages to Complete:
   - Login Form: Create a login form with fields for email and password.
   - List of Places: Design a page to display a list of places with basic information.
   - Place Details: Create a detailed view for a specific place, including images and detailed information.
   - Add Review Form: Design a form for adding a review to a place, accessible only to authenticated users.

### Task 1: Implementation - Login

**Objectives**

- Implement login functionality using the back-end API.
- Store the JWT token returned by the API in a cookie for session management.

**Requirements**

- Use the existing login form provided in login.html.
- Make an AJAX request to the login endpoint of your API when the user submits the login form.
- If the login is successful, store the JWT token in a cookie.
- Redirect the user to the main page (index) after a successful login.
- Display an error message if the login fails.

**Instructions**

1. Setup Event Listener for Login Form:
   - Add an event listener to the login form to handle the form submission.
   - Use preventDefault to prevent the default form submission behavior.
2. Make AJAX Request to API:
   - Use the Fetch API to send a POST request to the login endpoint with the email and password entered by the user.
   - Set the Content-Type header to application/json.
   - Send the email and password in the request body as a JSON object.
3. Handle API Response:
   - If the login is successful, store the returned JWT token in a cookie.
   - Redirect the user to the main page (index.html).
   - If the login fails, display an error message to the user.

### Task 2: Implementation - Index (List of Places)

**Objectives**

- Implement the main page to display a list of all places.
- Fetch places data from the API and implement client-side filtering based on country selection.
- Show the login link only if the user is not authenticated.

**Requirements**

- Use the provided HTML structure in index.html to display the list of places.
- Make an AJAX request to the API to fetch the list of places.
- Populate the places list dynamically using JavaScript.
- Implement a client-side filter to allow users to filter places by country without reloading the page.
- Show or hide the login link based on user authentication.

**Instructions**

1. Check User Authentication:
   - On page load, check if the user is authenticated by verifying the presence of the JWT token in cookies.
   - If the token is not found, show the login link.
   - If the token is found, hide the login link.
   - Tip: Use a function to get the value of a cookie by its name.
2. Fetch Places Data:
   - Use the Fetch API to send a GET request to the endpoint that returns the list of places.
   - Ensure the request includes the JWT token for authentication if available.
   - Tip: Include the token in the Authorization header of your request.
3. Populate Places List:
   - Dynamically create HTML elements to display each place’s information (e.g., name, description, location).
   - Append these elements to the #places-list section.
   - Tip: Use document.createElement and element.innerHTML to build the place elements.
4. Implement Client-Side Filtering:
   - Add an event listener to the country filter dropdown.
   - Filter the displayed places based on the selected country.
   - Ensure the filtering works without reloading the page.
   - Tip: Use element.style.display to show or hide places based on the filter.

### Task 3: Implementation - Place Details

**Objectives**

- Implement the detailed view of a place.
- Fetch place details from the API using the place ID.
- Display detailed information about the place, including name, description, location, and images.
- If the user is authenticated, provide access to the form for adding a review.

**Requirements**

- Use the provided HTML structure in place.html to display the detailed information of a place.
- Make an AJAX request to the API to fetch the details of the selected place.
- Populate the place details dynamically using JavaScript.
- Show the add review form only if the user is authenticated.

**Instructions**

1. Get Place ID from URL:
   - Extract the place ID from the URL query parameters.
   - Tip: Use window.location.search to get the query string.
2. Check User Authentication:
   - On page load, check if the user is authenticated by verifying the presence of the JWT token in cookies.
   - Store the token in a variable for later use in API requests.
3. Fetch Place Details:
   - Use the Fetch API to send a GET request to the endpoint that returns the details of the place.
   - Ensure the request includes the JWT token for authentication if available.
   - Tip: Include the token in the Authorization header of your request.
4. Populate Place Details:
   - Dynamically create HTML elements to display the place’s detailed information (e.g., name, description, location, images).
   - Append these elements to the #place-details section.
5. Show Add Review Form:
   - If the user is authenticated, display the add review form.
   - Hide the form if the user is not authenticated.

### Task 4: Implementation - Add Review

**Objectives**

- Implement the form to add a review for a place.
- Ensure only authenticated users can submit reviews.
- Redirect unauthenticated users to the index page.
- Send the review data to the API endpoint and handle the response.

**Requirements**

- Use the provided HTML structure in add_review.html to create the review form.
- Make an AJAX request to the API to submit the review data.
- If the user is not authenticated, redirect them to the index page.
- Display a success message upon successful submission and handle errors appropriately.

**Instructions**

1. Check User Authentication:
   - On page load, check if the user is authenticated by verifying the presence of the JWT token in cookies.
   - If the token is not found, redirect the user to the index page.
2. Setup Event Listener for Review Form:
   - Add an event listener to the review form to handle the form submission.
   - Use preventDefault to prevent the default form submission behavior.
3. Make AJAX Request to API:
   - Use the Fetch API to send a POST request to the endpoint that handles adding reviews.
   - Ensure the request includes the JWT token for authentication.
   - Set the Content-Type header to application/json.
   - Send the review data (e.g., place ID, review text, rating) in the request body as a JSON object.
4. Handle API Response:
   - If the review submission is successful, display a success message to the user.
   - If the review submission fails, display an error message to the user.
   - Tip: Use response.json() to parse the API response and handle different status codes appropriately.

## Conclusion

By completing these tasks, you will have developed the client-side of the HBnB application, creating a dynamic and interactive user interface that seamlessly interacts with the back-end services. This project will help you solidify your understanding of modern web development practices, including front-end design, client-server communication, and secure data handling. Good luck, and happy coding!

## Author

**Bassem krayem** - _Initial work_ - [Github](https://github.com/bassem-krayem)
