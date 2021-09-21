const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let picturesArray = [];

// Unsplash API
const count = 30;
const apiKey = "R4OAGjYuxbkEPiccRmxmCFEsIElaOAxjhHDtV2KEzt0";
const query = "dog";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}&query=${query}&orientation=landscape`;

function areImagesLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Elements for links and pictures - add to DOM
function displayPictures() {
  imagesLoaded = 0;
  totalImages = picturesArray.length;
  // run function for each object in picturesArray
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
    // event listener for when finished loading
    img.addEventListener("load", areImagesLoaded);
    // put <img> inside <a> and put both inside imageContainer
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

async function getPicturesFromApi() {
  try {
    const response = await fetch(apiUrl);
    picturesArray = await response.json();
    displayPictures();
  } catch (error) {
    // catch error
  }
}

// Check if approaching bottom of page - Load more
window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false;
    getPicturesFromApi();
  }
});

// On load
getPicturesFromApi();
