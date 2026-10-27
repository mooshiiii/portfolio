// Tap or click a diagram to see it full screen, with zoom in / zoom out / close.
(function () {
  var dialog = document.createElement("dialog");
  dialog.className = "zoom";
  dialog.setAttribute("aria-label", "Enlarged diagram");

  var bar = document.createElement("div");
  bar.className = "zoom-bar";

  var title = document.createElement("p");
  title.className = "zoom-title";

  var icon = function (path) {
    return '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">' + path + "</svg>";
  };
  var makeButton = function (label, svgPath) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "zoom-btn";
    b.setAttribute("aria-label", label);
    b.innerHTML = icon(svgPath);
    return b;
  };
  var out = makeButton("Zoom out", '<circle cx="11" cy="11" r="7"/><path d="M8 11h6M20 20l-4-4"/>');
  var inn = makeButton("Zoom in", '<circle cx="11" cy="11" r="7"/><path d="M8 11h6M11 8v6M20 20l-4-4"/>');
  var close = makeButton("Close", '<path d="M6 6l12 12M18 6L6 18"/>');

  var stage = document.createElement("div");
  stage.className = "zoom-stage";
  var sheet = document.createElement("div");
  sheet.className = "zoom-sheet";
  stage.appendChild(sheet);

  bar.append(title, out, inn, close);
  dialog.append(bar, stage);
  document.body.appendChild(dialog);

  var levels = [1, 1.6, 2.4];
  var level = 0;
  var setLevel = function (n) {
    level = Math.max(0, Math.min(levels.length - 1, n));
    sheet.style.setProperty("--zoom", levels[level]);
    out.disabled = level === 0;
    inn.disabled = level === levels.length - 1;
  };

  out.addEventListener("click", function () { setLevel(level - 1); });
  inn.addEventListener("click", function () { setLevel(level + 1); });
  close.addEventListener("click", function () { dialog.close(); });
  dialog.addEventListener("click", function (e) { if (e.target === dialog || e.target === stage) dialog.close(); });
  dialog.addEventListener("close", function () { sheet.replaceChildren(); });

  document.querySelectorAll(".card-figure .diagram").forEach(function (diagram) {
    var svg = diagram.querySelector("svg");
    if (!svg) return;
    var heading = diagram.closest(".card").querySelector("h3");
    var name = heading ? heading.textContent : "diagram";

    diagram.setAttribute("role", "button");
    diagram.setAttribute("tabindex", "0");
    diagram.setAttribute("aria-label", "Enlarge the " + name + " diagram");

    var open = function () {
      title.textContent = name;
      sheet.replaceChildren(svg.cloneNode(true));
      setLevel(0);
      dialog.showModal();
      stage.scrollTo(0, 0);
    };
    diagram.addEventListener("click", open);
    diagram.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); }
    });
  });
})();
