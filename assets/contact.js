// Contact buttons that never show the email address on the page.
// The address is stored base64-encoded, so it isn't in the HTML as plain text or a
// mailto: link (what most spam harvesters read), and it isn't displayed to visitors.
// "Email me" opens their email app; "Copy email address" puts it on their clipboard.
document.querySelectorAll("[data-email]").forEach(function (row) {
  var address = atob(row.getAttribute("data-email"));

  var mail = document.createElement("a");
  mail.className = "btn btn-primary";
  mail.href = "mailto:" + address;
  mail.textContent = "Email me";

  var copy = document.createElement("button");
  copy.type = "button";
  copy.className = "btn btn-ghost";
  copy.textContent = "Copy email address";

  var status = document.createElement("span");
  status.className = "copy-status";
  status.setAttribute("role", "status");

  copy.addEventListener("click", function () {
    var done = function (ok) {
      status.textContent = ok ? "Copied to your clipboard." : "Couldn't copy. Use the Email me button instead.";
      setTimeout(function () { status.textContent = ""; }, 4000);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(address).then(function () { done(true); }, function () { done(false); });
    } else {
      done(false);
    }
  });

  row.replaceChildren(mail, copy, status);
});
