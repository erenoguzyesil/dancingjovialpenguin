const sidebarDiv = document.getElementById("sidebar");
const aboutSection = document.getElementById("about");
const imagesUl = document.getElementById("images");

function placeImages() {
  let screenWidth = window.innerWidth;

  if (screenWidth <= 900) {
    aboutSection.insertBefore(imagesUl, aboutSection.children[2]);
  } else {
    sidebarDiv.appendChild(imagesUl);
  }
}

placeImages();

const firstHeadingH3 = document.getElementById("first-heading");

function changeFirstHeading() {
  let screenWidth = window.innerWidth;

  if (screenWidth <= 900) {
    firstHeadingH3.textContent = "dancing jovial penguin ♡ ";
  } else {
    firstHeadingH3.textContent = "welcome ⭑.ᐟ";
  }
}

changeFirstHeading();

window.addEventListener("resize", placeImages);
window.addEventListener("resize", changeFirstHeading);
