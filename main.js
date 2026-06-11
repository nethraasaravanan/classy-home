(function () {
  "use strict";

  var MAPS_URL =
    "https://www.google.com/maps/search/?api=1&query=76+Kamarajar+Street+Ondipudhur+Coimbatore";
  var PHONES = ["+917397798981", "+917397798982"];
  var EMAIL = "classyhomedns@gmail.com";

  // Mobile nav toggle
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".main-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      toggle.classList.toggle("active");
      nav.classList.toggle("open");
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        toggle.classList.remove("active");
        nav.classList.remove("open");
      });
    });
  }

  // Contact modal
  var modal = document.getElementById("contact-modal");
  var contactBtns = document.querySelectorAll("[data-action='contact']");
  var closeBtn = document.querySelector(".modal-close");

  function openModal() {
    if (modal) modal.classList.add("open");
  }

  function closeModal() {
    if (modal) modal.classList.remove("open");
  }

  contactBtns.forEach(function (btn) {
    btn.addEventListener("click", openModal);
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", closeModal);
  }

  if (modal) {
    modal.addEventListener("click", function (e) {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeModal();
  });

  // Location buttons
  document.querySelectorAll("[data-action='location']").forEach(function (btn) {
    btn.addEventListener("click", function () {
      window.open(MAPS_URL, "_blank");
    });
  });

  // Share
  var toast = document.getElementById("toast");

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("show");
    setTimeout(function () {
      toast.classList.remove("show");
    }, 2500);
  }

  document.querySelectorAll("[data-action='share']").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var shareData = {
        title: "Classy Home — Home Interiors",
        text: "Premium blinds, curtains, mosquito nets & artificial grass in Coimbatore",
        url: window.location.href,
      };

      if (navigator.share) {
        navigator.share(shareData).catch(function () {});
      } else if (navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href).then(function () {
          showToast("Link copied to clipboard!");
        });
      } else {
        showToast("Share: " + window.location.href);
      }
    });
  });

  // Expose for inline use if needed
  window.ClassyHome = {
    phones: PHONES,
    email: EMAIL,
    mapsUrl: MAPS_URL,
  };
})();
