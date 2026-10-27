// Show the email address once the page loads, with a copy button.
// The address is stored base64-encoded, so it never appears in the HTML as plain text
// or a mailto: link, which is what most spam harvesters read. Visitors don't need to click anything.
document.querySelectorAll("[data-email]").forEach(function (row) {
  var address = atob(row.getAttribute("data-email"));

  var link = document.createElement("a");
  link.className = "email-link";
  link.href = "mailto:" + address;
  link.textContent = address;

  var button = document.createElement("button");
  button.type = "button";
  button.className = "btn btn-ghost copy-btn";
  button.textContent = "Copy address";

  var status = document.createElement("span");
  status.className = "copy-status";
  status.setAttribute("role", "status");

  button.addEventListener("click", function () {
    var done = function (ok) {
      status.textContent = ok ? "Copied." : "Couldn't copy. Select the address above instead.";
      setTimeout(function () { status.textContent = ""; }, 4000);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(address).then(function () { done(true); }, function () { done(false); });
    } else {
      done(false);
    }
  });

  row.replaceChildren(link, button, status);
});
