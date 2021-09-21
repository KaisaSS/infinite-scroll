const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let picturesArray = [];

// Unsplash API
const count = 10;
const apiKey = "5nRRGqWQPZBMl9QpMPppLn6_3HbVzP2x6RwacsJDUSM";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Helperfunction to set attributes
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Elements for links and pictures - add to DOM
function displayPictures() {
  // run functino for each object in picturesArray
  picturesArray.forEach((picture) => {
    // create <a> to link to unsplash
    const item = document.createElement("a");
    setAttributes(item, {
      href: picture.links.html,
      target: "_blank",
    });
    // create <img> for picture
    const img = document.createElement("img");
    setAttributes(img, {
      src: picture.urls.regular,
      alt: picture.alt_description,
      title: picture.alt_description,
    });
    // put <img> inside <a> and put both inside imageContainer
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get pictures from API
async function getPictures() {
  try {
    const response = await fetch(apiUrl);
    picturesArray = await response.json();
    displayPictures();
  } catch (error) {
    // catch error
  }
}

// On load
getPictures();
