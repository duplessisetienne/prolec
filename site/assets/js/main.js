// Pro-Lec site scripts: footer year, project filters, enquiry form.
(function () {
  "use strict";

  // Footer year
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // Project filters (projects.html)
  var filterBtns = document.querySelectorAll("[data-filter]");
  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var cat = btn.getAttribute("data-filter");
      filterBtns.forEach(function (b) {
        b.classList.toggle("active", b === btn);
        b.setAttribute("aria-pressed", b === btn ? "true" : "false");
      });
      document.querySelectorAll(".project-item").forEach(function (item) {
        var show = cat === "all" || item.getAttribute("data-category") === cat;
        item.classList.toggle("d-none-filter", !show);
      });
    });
  });

  // Enquiry form (contact.html)
  var form = document.getElementById("enquiry-form");
  if (!form) return;

  // Preselect enquiry type from ?type=quote (used by the "Request for Quote" buttons)
  var params = new URLSearchParams(window.location.search);
  if (params.get("type") === "quote") {
    var select = form.querySelector("#enquiry-type");
    if (select) select.value = "Request for Quote";
  }

  var status = document.getElementById("form-status");
  var submitBtn = form.querySelector("button[type=submit]");

  function showStatus(kind, msg) {
    status.className = "alert mt-3 mb-0 alert-" + kind;
    status.textContent = msg;
    status.hidden = false;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }
    // Honeypot: bots fill hidden fields, people don't.
    if (form.querySelector("[name=_gotcha]").value) return;

    if (form.action.indexOf("YOUR_FORM_ID") !== -1) {
      showStatus("warning", "The enquiry form is not connected yet. Please call or WhatsApp us in the meantime.");
      return;
    }

    submitBtn.disabled = true;
    fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" }
    })
      .then(function (res) {
        if (!res.ok) throw new Error("Request failed");
        form.reset();
        form.classList.remove("was-validated");
        showStatus("success", "Thank you, your message has been sent. The Pro-Lec team will be in touch soon.");
      })
      .catch(function () {
        showStatus("danger", "Sorry, your message could not be sent. Please call or WhatsApp us instead.");
      })
      .finally(function () {
        submitBtn.disabled = false;
      });
  });
})();
