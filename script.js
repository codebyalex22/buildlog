const startButton = document.querySelector("#startButton");
const message = document.querySelector("p");

startButton.addEventListener("click", () => {
  message.textContent =
    "День 1 розпочато. Сьогодні я вивчаю HTML, CSS і JavaScript.";

  startButton.textContent = "Навчання розпочато ✓";
  startButton.disabled = true;
});