(function () {
  var navToggle = document.getElementById("navToggle");
  var siteNav = document.getElementById("siteNav");
  if (navToggle && siteNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = siteNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", isOpen);
    });
  }

  document.querySelectorAll(".signup-form").forEach(function (mailingForm) {
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
          var success = mailingForm.querySelector(".form-success");
          if (success) success.style.display = "block";
        })
        .catch(function () {
          alert("Something went wrong submitting the form. Please try again.");
        });
    });
  });

  var modal = document.getElementById("signupModal");
  if (modal) {
    var openModal = function (e) {
      e.preventDefault();
      modal.hidden = false;
      document.body.style.overflow = "hidden";
    };
    var closeModal = function () {
      modal.hidden = true;
      document.body.style.overflow = "";
    };
    document.querySelectorAll(".js-join-trigger").forEach(function (btn) {
      btn.addEventListener("click", openModal);
    });
    modal.querySelectorAll("[data-modal-close]").forEach(function (el) {
      el.addEventListener("click", closeModal);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !modal.hidden) closeModal();
    });
  }
})();
