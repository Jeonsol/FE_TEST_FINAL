import MainController from "./controllers/MainController.js"

const main = new MainController();

document.addEventListener('DOMContentLoaded', function () {
  main.start();
});
