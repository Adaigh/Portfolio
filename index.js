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
}