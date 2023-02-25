/* 
  File Name:     /scripts/app.js
  Student Name:  Yuen Kwan LI
  Student ID:    301228849
  Date:          05-FEB-2023 
*/

(function () {
  function start() {
      console.log("App Started...");
      let deleteButton = document.querySelectorAll('.btn-danger')
      for (button of deleteButton)
      {
          button.addEventListener('click', (event) => {
              if (!confirm("Are you sure")) {
                  event.preventDefault();
                  window.location.assign('/bookList');
              }
          });
          }
  }
  window.addEventListener("load", start);
})();