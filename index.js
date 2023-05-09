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