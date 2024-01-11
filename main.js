'use strict'

const middleSatusDiv = document.querySelector('.status-div__middle-div').cloneNode(true)
const desktopStatusDiv = document.querySelector('.middle-div')
middleSatusDiv.classList.remove('status-div__middle-div')
middleSatusDiv.classList.add('status-div__middle-div--flex')
desktopStatusDiv.appendChild(middleSatusDiv)