/* ============================================================
   KARDO DELI — באנר עוגיות + קישורי פוטר (הצהרת נגישות / תנאי שימוש)
   קובץ עצמאי. השילוב היחיד הנדרש ב-index.html:
   הוספת השורה הבאה לפני </body> :
   <script src="cookie-consent.js"></script>
   ============================================================ */
(function () {
  "use strict";

  var STORAGE_KEY = "kardo_cookie_ok";

  /* ---------- עיצוב (בסגנון האתר) ---------- */
  var css = ''
    + '#kardo-cookie{position:fixed;left:0;right:0;bottom:0;z-index:9000;'
    + 'background:rgba(20,61,41,.98);backdrop-filter:blur(10px);'
    + 'border-top:1px solid rgba(198,154,78,.35);color:#f3ede3;'
    + 'font-family:"Heebo",system-ui,sans-serif;box-shadow:0 -10px 30px rgba(0,0,0,.4);'
    + 'transform:translateY(110%);transition:transform .35s ease}'
    + '#kardo-cookie.show{transform:translateY(0)}'
    + '#kardo-cookie .wrap{max-width:1000px;margin:0 auto;padding:1rem 1.2rem;'
    + 'display:flex;align-items:center;gap:1rem;flex-wrap:wrap;justify-content:center}'
    + '#kardo-cookie .txt{flex:1 1 320px;font-size:.92rem;line-height:1.55;text-align:right;min-width:260px}'
    + '#kardo-cookie .txt a{color:#c99a4e;text-decoration:underline;text-underline-offset:3px}'
    + '#kardo-cookie .txt a:hover{color:#fff}'
    + '#kardo-cookie .btn{flex:none;background:#25d366;color:#08331a;font-family:inherit;'
    + 'font-weight:800;font-size:.95rem;border:none;border-radius:12px;padding:.75rem 1.6rem;'
    + 'cursor:pointer;transition:box-shadow .2s}'
    + '#kardo-cookie .btn:hover{box-shadow:0 8px 20px rgba(37,211,102,.3)}'
    + '#kardo-cookie .btn:focus-visible{outline:2px solid #fff;outline-offset:2px}'
    + '#kardo-cookie a:focus-visible{outline:2px solid #c99a4e;outline-offset:2px;border-radius:4px}'
    + '.kardo-legal-links{max-width:1000px;margin:1.2rem auto 0;padding:1rem 1.2rem 0;'
    + 'border-top:1px solid rgba(198,154,78,.22);text-align:center;font-size:.82rem;line-height:2}'
    + '.kardo-legal-links a{color:#b8ab98;text-decoration:none;margin:0 .7rem}'
    + '.kardo-legal-links a:hover{color:#c99a4e;text-decoration:underline;text-underline-offset:3px}';

  var style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  /* ---------- הוספת קישורי פוטר (נגישות + תנאי שימוש) ---------- */
  function addFooterLinks() {
    var footer = document.querySelector("footer");
    if (!footer || document.querySelector(".kardo-legal-links")) return;
    var nav = document.createElement("nav");
    nav.className = "kardo-legal-links";
    nav.setAttribute("aria-label", "קישורים משפטיים");
    nav.innerHTML =
      '<a href="accessibility.html">הצהרת נגישות</a>' +
      '<a href="terms.html">תנאי שימוש ומדיניות פרטיות</a>';
    footer.appendChild(nav);
  }

  /* ---------- באנר העוגיות ---------- */
  function showBanner() {
    if (localStorage.getItem(STORAGE_KEY) === "1") return;

    var bar = document.createElement("div");
    bar.id = "kardo-cookie";
    bar.setAttribute("role", "region");
    bar.setAttribute("aria-label", "הודעת עוגיות");
    bar.innerHTML =
      '<div class="wrap">' +
        '<div class="txt">אתר זה עושה שימוש בעוגיות (Cookies) לצורך תפעול תקין ושיפור חוויית הגלישה. ' +
          'המשך השימוש באתר מהווה הסכמה. לפרטים ראו <a href="terms.html#privacy">מדיניות הפרטיות</a>.</div>' +
        '<button type="button" class="btn" id="kardo-cookie-ok">הבנתי, אישור</button>' +
      '</div>';
    document.body.appendChild(bar);

    // אנימציית כניסה
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { bar.classList.add("show"); });
    });

    var btn = document.getElementById("kardo-cookie-ok");
    function accept() {
      try { localStorage.setItem(STORAGE_KEY, "1"); } catch (e) {}
      bar.classList.remove("show");
      setTimeout(function () { if (bar.parentNode) bar.parentNode.removeChild(bar); }, 400);
    }
    btn.addEventListener("click", accept);
  }

  /* ---------- הפעלה ---------- */
  function init() {
    try { addFooterLinks(); } catch (e) {}
    try { showBanner(); } catch (e) {}
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
