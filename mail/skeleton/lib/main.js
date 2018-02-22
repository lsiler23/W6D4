const Router = require('./router.js')

document.addEventListener('DOMContentLoaded', () => {
  let elements = document.querySelectorAll('.sidebar-nav li');
  elements.forEach((el) => {
    el.addEventListener('click', (e) => {

      let text = el.innerText.toLowerCase();
      window.location.hash = text;
    });
    
  });
  let freshRoute = new Router(document.querySelector('.content'));
  freshRoute.start();
});