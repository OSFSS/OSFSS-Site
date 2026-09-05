(function () {
  var navToggle = document.getElementById("navToggle");
  var siteNav = document.getElementById("siteNav");
  if (navToggle && siteNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = siteNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", isOpen);
    });
  }

  var mailingForm = document.getElementById("mailingListForm");
  if (mailingForm) {
    mailingForm.addEventListener("submit", function (e) {
      if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
        return;
      }
      e.preventDefault();
      var data = new FormData(mailingForm);
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data).toString(),
      })
        .then(function () {
          mailingForm.reset();
          var success = document.getElementById("formSuccess");
          if (success) success.style.display = "block";
        })
        .catch(function () {
          alert("Something went wrong submitting the form. Please try again.");
        });
    });
  }
})();
