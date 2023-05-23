//Menu
const menuButton = document.querySelector(".menu-button");
const menu = document.querySelector(".menu");

menuButton.addEventListener("click", () => {
	menuButton.classList.toggle("active");
	menu.classList.toggle("active");
})

document.querySelectorAll(".menu-item").forEach(n => n.addEventListener("click", () => {
	menuButton.classList.remove("active");
	menu.classList.remove("active");
}))


//Project tiles and buttons
const prevButton = document.querySelector(".previous");
const nextButton = document.querySelector(".next");

prevButton.addEventListener("click", () =>{
	changeTile(-1);
})

nextButton.addEventListener("click", () =>{
	changeTile(1);
})

const tiles = document.getElementsByClassName("project-tile");
let tileIndex = 0;
showTile(tileIndex);

function changeTile(diff) {
  tiles[tileIndex].style.display = "none";
  showTile(tileIndex += diff);
}

function showTile(num) {
  if (num > tiles.length-1) {tileIndex = tileIndex % tiles.length}
  if (num < 0) {tileIndex = tiles.length-1}
  tiles[tileIndex].style.display = "flex";
  let string = (tileIndex + 1) + "/" + tiles.length;
  document.getElementById("project-number-text").innerHTML = string;
}


//Animation control for section dividers
function makeObs(slider) {
  let obs = new IntersectionObserver(elements => {
    elements.forEach(ele => {
      if (ele.isIntersecting) {
        slider.classList.add("active");
        return;
      }

      slider.classList.remove("active");
    });
  });

  obs.observe(slider);
}

makeObs(document.querySelector(".projects"));
makeObs(document.querySelector(".contact"));
makeObs(document.querySelector(".resume"));


//Image cycling for project tiles
function nextImage(element) {
  let currentFrame = document.getElementById(element);
  let currentImage = currentFrame.style.backgroundImage;
  
  if(currentImage == "url(\"./images/stmspokane_1.png\")") {
    currentFrame.style.backgroundImage = "url(\"./images/stmspokane_2.png\")";
    return;
  }
  if(currentImage == "url(\"./images/stmspokane_2.png\")") {
    currentFrame.style.backgroundImage = "url(\"./images/stmspokane_3.png\")";
    return;
  }
  if(currentImage == "url(\"./images/stmspokane_3.png\")") {
    currentFrame.style.backgroundImage = "url(\"./images/stmspokane_1.png\")";
    return;
  }

  if(currentImage == "url(\"./images/PON_HA_1.png\")") {
    currentFrame.style.backgroundImage = "url(\"./images/PON_HA_2.png\")";
    return;
  }
  if(currentImage == "url(\"./images/PON_HA_2.png\")") {
    currentFrame.style.backgroundImage = "url(\"./images/PON_HA_1.png\")";
    return;
  }

  if(currentImage == "url(\"./images/EPM_1.png\")") {
    currentFrame.style.backgroundImage = "url(\"./images/EPM_2.png\")";
    return;
  }
  if(currentImage == "url(\"./images/EPM_2.png\")") {
    currentFrame.style.backgroundImage = "url(\"./images/EPM_1.png\")";
    return;
  }
}