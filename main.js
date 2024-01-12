"use strict";
const middleSatusDiv = document
  .querySelector(".status-div__middle-div")
  .cloneNode(true);

function initializeFilterDiv() {
  if (window.innerWidth >= 768) {
    const desktopStatusDiv = document.querySelector(".middle-div");
    // we can update the class of cloned element in two different methods:
    // - First method:
    // middleSatusDiv.classList.remove('status-div__middle-div')
    // middleSatusDiv.classList.add('status-div__middle-div--flex')
    // - Second method by overriding original class name:
    middleSatusDiv.className = "status-div__middle-div--flex";
    desktopStatusDiv.appendChild(middleSatusDiv);
  }
}

function removeFilterDiv() {
  if (window.innerWidth < 768) {
    if (middleSatusDiv) {
      middleSatusDiv.remove();
    }
  }
}

window.addEventListener("resize", initializeFilterDiv);
window.addEventListener("resize", removeFilterDiv);

initializeFilterDiv();
