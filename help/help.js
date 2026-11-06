// Same Dark Mode choice as the app (selfCheckout.darkMode; dark unless "0"); the pages share its origin
(function () {
  var dark = true;
  try { dark = localStorage.getItem("selfCheckout.darkMode") !== "0"; } catch (e) {}
  document.documentElement.classList.toggle("dark", dark);
  // Color theme (Settings > Theme): blue is the plain look
  try {
    var theme = localStorage.getItem("selfCheckout.theme");
    if (theme && theme !== "blue") document.documentElement.setAttribute("data-theme", theme);
    // The word "blue" (in the theme's color) becomes the theme's name: "red", "seafoam"...
    var names = { red: "red", tan: "tan", purple: "purple", pink: "pink",
      green: "green", slate: "slate", seafoam: "seafoam" };
    if (names[theme]) document.addEventListener("DOMContentLoaded", function () {
      var spans = document.querySelectorAll("span.blue");
      for (var i = 0; i < spans.length; i++) {
        var s = spans[i], word = s.textContent;
        if (word.toLowerCase() !== "blue") continue;
        var name = names[theme];
        if (word.charAt(0) === "B") name = name.charAt(0).toUpperCase() + name.slice(1);
        s.textContent = name;
        // "a blue row" -> "an ..." before a vowel
        var before = s.previousSibling;
        if (before && before.nodeType === 3 && /(^|\s)a $/.test(before.nodeValue) && /^[aeiou]/i.test(name))
          before.nodeValue = before.nodeValue.replace(/a $/, "an ");
      }
    });
  } catch (e) {}
})();
