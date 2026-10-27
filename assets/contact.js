// Reveal the email address only when a visitor asks for it.
// The address is stored base64-encoded so it never appears in the page source
// as plain text or a mailto: link, which is what most spam harvesters look for.
document.querySelectorAll("[data-email]").forEach(function (button) {
  button.addEventListener("click", function () {
    var address = atob(button.getAttribute("data-email"));
    var link = document.createElement("a");
    link.className = button.className;
    link.href = "mailto:" + address;
    link.textContent = address;
    button.replaceWith(link);
    link.focus();
  });
});
