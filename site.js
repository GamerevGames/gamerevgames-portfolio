// site.js: small shared helpers for the portfolio. Load with: <script src="/site.js" defer></script>
(function () {
  "use strict";

  // 1) Keep the footer year current. Needs <span id="year"></span> in the footer.
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // 2) Open links to OTHER websites in a new tab. Internal links and mailto: are untouched.
  document.querySelectorAll('a[href^="http"]').forEach(function (a) {
    if (a.hostname !== location.hostname) {
      a.target = "_blank";
      a.rel = "noopener noreferrer";
    }
  });

  // 3) Click-to-enlarge for screenshots and GIFs inside <figure class="media">.
  var images = document.querySelectorAll("figure.media img");
  if (images.length && typeof HTMLDialogElement === "function") {
    var dialog = document.createElement("dialog");
    dialog.className = "lightbox";
    dialog.setAttribute("aria-label", "Enlarged image");

    var big = document.createElement("img");
    var caption = document.createElement("p");
    dialog.appendChild(big);
    dialog.appendChild(caption);
    document.body.appendChild(dialog);

    // Click anywhere (image or dark background) to close. Esc also works.
    dialog.addEventListener("click", function () { dialog.close(); });

    images.forEach(function (img) {
      img.addEventListener("click", function () {
        big.src = img.currentSrc || img.src;
        big.alt = img.alt;
        var fc = img.closest("figure") && img.closest("figure").querySelector("figcaption");
        caption.textContent = fc ? fc.textContent : "";
        dialog.showModal();
      });
    });
  }
})();
