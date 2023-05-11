let tileIndex = 1;
showWTile(tileIndex);

// Next/previous controls
function plusWTile(n) {
  showWTile(tileIndex += n);
}

// Thumbnail image controls
function currentWTile(n) {
  showWTile(tileIndex = n);
}

function showWTile(n) {
  let i;
  let tiles = document.getElementsByClassName("web-tile");
  let dots = document.getElementsByClassName("dot");
  if (n > tiles.length) {tileIndex = 1}
  if (n < 1) {tileIndex = tiles.length}
  for (i = 0; i < tiles.length; i++) {
    tiles[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  tiles[tileIndex-1].style.display = "flex";
  dots[tileIndex-1].className += " active";
}

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