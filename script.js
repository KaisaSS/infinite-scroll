// Unsplash API
const count = 10;
const apiKey = "5nRRGqWQPZBMl9QpMPppLn6_3HbVzP2x6RwacsJDUSM";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Get pictures from API
async function getPictures() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    // catch error
  }
}

// On load
getPictures();
