/* =====================================================================
   SCRIPT for sandipbhosale.in  (small interactions only, no libraries)
   Three parts:
   1. TIMELINE + COPY EMAIL   - the line that draws in "Then and now",
                                and the "Copy email address" button.
   2. THEME SWITCH            - the light / dark button in the header.
   3. CURSOR EFFECTS          - custom cursor, magnetic buttons, portrait
                                that follows the mouse, text that drifts.
                                (Mouse devices only. To remove all of it,
                                 delete everything under part 3.)
   If you change your email, also change it inside part 1 below.
   ===================================================================== */

/* ===== 1. TIMELINE + COPY EMAIL ===== */
(function () {

  /* then and now */
  var vl = document.getElementById("vlist");
  if (vl && "IntersectionObserver" in window) {
    vl.classList.add("anim");
    var vio = new IntersectionObserver(function (en) {
      if (en[0].isIntersecting) { vl.classList.add("in"); vio.disconnect(); }
    }, { threshold: 0.2 });
    vio.observe(vl);
  }

  /* contact */
  var copyBtn = document.getElementById("copy");
  var copyLabel = document.getElementById("copyLabel"), copyResetTimer;
  if (copyBtn) copyBtn.addEventListener("click", function () {
    var mail = "bhosale.sandip2@gmail.com";
    function ok() {
      if (copyLabel) copyLabel.textContent = "Copied";
      clearTimeout(copyResetTimer);
      copyResetTimer = setTimeout(function () {
        if (copyLabel) copyLabel.textContent = "Click to copy my email address";
      }, 2200);
    }
    function fail() {
      if (copyLabel) copyLabel.textContent = "Couldn’t copy";
      clearTimeout(copyResetTimer);
      copyResetTimer = setTimeout(function () {
        if (copyLabel) copyLabel.textContent = "Click to copy my email address";
      }, 2200);
    }

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(mail).then(ok, fail); }
      else { fail(); }
    } catch (err) { fail(); }
  });
})();


/* ===== 2. THEME SWITCH ===== */
(function () {
  var btn = document.getElementById("themeBtn"), root = document.documentElement;
  var mq = window.matchMedia("(prefers-color-scheme: dark)");
  function cur() { return root.getAttribute("data-theme") || (mq.matches ? "dark" : "light"); }
  function paint() { if (!btn) return; btn.setAttribute("aria-label", cur() === "dark" ? "Switch to light mode" : "Switch to dark mode"); }
  if (btn) btn.addEventListener("click", function () {
    var next = cur() === "dark" ? "light" : "dark";
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      root.classList.add("theme-anim");
      setTimeout(function () { root.classList.remove("theme-anim"); }, 350);
    }
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
    paint();
  });
  function onSys() {
    var saved = null; try { saved = localStorage.getItem("theme"); } catch (e) {}
    if (!saved) { root.setAttribute("data-theme", mq.matches ? "dark" : "light"); paint(); }
  }
  if (mq.addEventListener) mq.addEventListener("change", onSys);
  paint();
})();


/* ===== 3. CURSOR EFFECTS ===== */
(function () {
  var fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!fine || reduce) return;
  var root = document.documentElement;
  function mk(tag, cls) { var e = document.createElement(tag); e.className = cls; return e; }
  var dot = mk("div", "cur-dot"), ring = mk("div", "cur-ring");
  dot.setAttribute("aria-hidden", "true"); ring.setAttribute("aria-hidden", "true");
  document.body.appendChild(ring); document.body.appendChild(dot);

  var mx = -1000, my = -1000, rx = -100, ry = -100, rs = 1, rsT = 1, shown = false, lastT = null, inside = false;
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

  var activePrimary = null;
  function state(t) {
    var hit = t && t.closest ? t.closest("a, button, summary") : null;
    var primary = t && t.closest ? t.closest(".btn.primary") : null;
    ring.classList.toggle("link", !!hit);
    if (activePrimary && activePrimary !== primary) activePrimary.classList.remove("cursor-primary-hover");
    if (primary) primary.classList.add("cursor-primary-hover");
    activePrimary = primary;
  }

  /* magnetic buttons and menu links */
  var mags = Array.prototype.slice.call(document.querySelectorAll(".btn, .copy, .nav a, .theme-btn"));
  mags.forEach(function (m) { m.classList.add("mag"); m._tx = 0; m._ty = 0; m._on = false; });
  function pull() {
    mags.forEach(function (m) {
      var r = m.getBoundingClientRect();
      var cx = r.left + r.width / 2 - m._tx, cy = r.top + r.height / 2 - m._ty;
      var dx = mx - cx, dy = my - cy, reach = Math.max(r.width, r.height) / 2 + 40;
      if (Math.sqrt(dx * dx + dy * dy) < reach) {
        m._tx = clamp(dx * 0.22, -9, 9); m._ty = clamp(dy * 0.28, -7, 7); m._on = true;
        m.style.transform = "translate(" + m._tx.toFixed(1) + "px," + m._ty.toFixed(1) + "px)";
      } else if (m._on) { m._tx = 0; m._ty = 0; m._on = false; m.style.transform = ""; }
    });
  }

  /* portrait follows the cursor */
  var fig = document.querySelector(".portrait .frame"), pic = fig ? fig.querySelector("img") : null;
  var tg = { x: 0, y: 0 }, cu = { x: 0, y: 0 };
  function aim() {
    if (!fig) return;
    var r = fig.getBoundingClientRect();
    if (r.bottom < 0 || r.top > window.innerHeight) { tg.x = 0; tg.y = 0; return; }
    tg.x = clamp((mx - (r.left + r.width / 2)) / (window.innerWidth * 0.5), -1, 1);
    tg.y = clamp((my - (r.top + r.height / 2)) / (window.innerHeight * 0.5), -1, 1);
  }

  /* text drifts toward the cursor when it comes near */
  var items = [];
  function add(sel, max) {
    Array.prototype.forEach.call(document.querySelectorAll(sel), function (el) {
      items.push({ el: el, max: max, x: 0, y: 0, vis: false });
    });
  }
  add("h1", 3); add("h2", 3); add(".lede", 2);
  add(".vr .s", 2); add(".vr .w", 2); add("summary .t", 2.5);
  add(".job h3", 2.5); add(".tools h3", 2); add(".contact h2", 3); add(".contact p", 2);
  var RADIUS = 220;
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (en) {
      en.forEach(function (x) { for (var i = 0; i < items.length; i++) if (items[i].el === x.target) items[i].vis = x.isIntersecting; });
    });
    items.forEach(function (it) { io.observe(it.el); });
  } else { items.forEach(function (it) { it.vis = true; }); }
  function drift() {
    items.forEach(function (it) {
      var tx = 0, ty = 0;
      if (inside && it.vis) {
        var r = it.el.getBoundingClientRect();
        var cx = r.left + r.width / 2 - it.x, cy = r.top + r.height / 2 - it.y;
        var nx = Math.max(r.left - it.x - mx, 0, mx - (r.right - it.x));
        var ny = Math.max(r.top - it.y - my, 0, my - (r.bottom - it.y));
        var d = Math.sqrt(nx * nx + ny * ny);
        var w = Math.pow(clamp(1 - d / RADIUS, 0, 1), 1.4);
        if (w > 0) {
          var dx = mx - cx, dy = my - cy, len = Math.sqrt(dx * dx + dy * dy) || 1;
          tx = dx / len * it.max * w; ty = dy / len * it.max * w;
        }
      }
      it.x += (tx - it.x) * 0.12; it.y += (ty - it.y) * 0.12;
      if (Math.abs(it.x) < 0.03 && Math.abs(it.y) < 0.03 && tx === 0 && ty === 0) {
        if (it.set) { it.el.style.transform = ""; it.set = false; }
      } else {
        it.el.style.transform = "translate3d(" + it.x.toFixed(2) + "px," + it.y.toFixed(2) + "px,0)"; it.set = true;
      }
    });
  }

  document.addEventListener("mousemove", function (e) {
    mx = e.clientX; my = e.clientY; rx = mx; ry = my; lastT = e.target; inside = true;
    /* Move the inversion layer on the same pointer event; do not ease behind the pointer. */
    ring.style.transform = "translate3d(" + mx + "px," + my + "px,0) scale(" + rs.toFixed(3) + ")";
    if (!shown) { shown = true; root.classList.add("cursor-on"); dot.style.opacity = 1; ring.style.opacity = 0.4; }
    state(lastT); pull(); aim();
  }, { passive: true });
  document.addEventListener("mousedown", function () { rsT = 0.8; });
  document.addEventListener("mouseup", function () { rsT = 1; });
  root.addEventListener("mouseleave", function () {
    inside = false; dot.style.opacity = 0; ring.style.opacity = 0; tg.x = 0; tg.y = 0; if (activePrimary) { activePrimary.classList.remove("cursor-primary-hover"); activePrimary = null; }
    mags.forEach(function (m) { m.style.transform = ""; m._on = false; m._tx = 0; m._ty = 0; });
  });
  root.addEventListener("mouseenter", function () { if (shown) { inside = true; dot.style.opacity = 1; ring.style.opacity = 1; } });

  (function loop() {
    rx = mx; ry = my; rs += (rsT - rs) * 0.25;
    dot.style.transform = "translate3d(" + mx + "px," + my + "px,0)";
    ring.style.transform = "translate3d(" + mx + "px," + my + "px,0) scale(" + rs.toFixed(3) + ")";
    if (pic) {
      cu.x += (tg.x - cu.x) * 0.08; cu.y += (tg.y - cu.y) * 0.08;
      pic.style.transform = "perspective(900px) rotateY(" + (cu.x * 5).toFixed(2) + "deg) rotateX(" + (-cu.y * 4).toFixed(2) + "deg) translate3d(" + (cu.x * 8).toFixed(1) + "px," + (cu.y * 6).toFixed(1) + "px,0) scale(1.06)";
    }
    drift();
    requestAnimationFrame(loop);
  })();
})();


/* ===== 4. ACTIVE SECTION NAVIGATION (homepage scroll spy) ===== */
(function () {
  var nav = document.querySelector(".nav");
  if (!nav) return;
  var links = Array.prototype.slice.call(nav.querySelectorAll('a[href^="#"]'));
  if (!links.length) return;
  var sections = links.map(function (link) {
    var id = link.getAttribute("href").slice(1);
    var section = document.getElementById(id);
    return section ? { id: id, link: link, section: section } : null;
  }).filter(Boolean);
  if (!sections.length) return;

  function setActive(id) {
    sections.forEach(function (item) {
      var active = item.id === id;
      item.link.classList.toggle("active", active);
      if (active) item.link.setAttribute("aria-current", "location");
      else item.link.removeAttribute("aria-current");
    });
  }

  var ticking = false;
  function updateActive() {
    ticking = false;
    var header = document.querySelector(".site-head");
    var marker = (header ? header.getBoundingClientRect().bottom : 0) + 48;
    var current = sections[0];
    sections.forEach(function (item) {
      var rect = item.section.getBoundingClientRect();
      if (rect.top <= marker && rect.bottom > marker) current = item;
    });
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
      current = sections[sections.length - 1];
    }
    setActive(current.id);
  }

  function requestUpdate() {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(updateActive);
    }
  }

  links.forEach(function (link) {
    link.addEventListener("click", function () {
      setActive(link.getAttribute("href").slice(1));
    });
  });
  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
  window.addEventListener("hashchange", requestUpdate);
  updateActive();
})();


/* ===== 5. RESPONSIVE MOBILE NAVIGATION ===== */
(function () {
  var btn = document.getElementById("menuBtn");
  var nav = document.getElementById("siteNav");
  var hdr = document.querySelector(".hdr-r");
  if (!btn || !nav || !hdr) return;
  function closeMenu() {
    hdr.classList.remove("menu-open");
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-label", "Open navigation menu");
  }
  btn.addEventListener("click", function () {
    var open = btn.getAttribute("aria-expanded") !== "true";
    hdr.classList.toggle("menu-open", open);
    btn.setAttribute("aria-expanded", String(open));
    btn.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
  });
  nav.addEventListener("click", function (event) {
    if (event.target.closest("a")) closeMenu();
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") { closeMenu(); btn.focus(); }
  });
  window.addEventListener("resize", function () {
    if (window.innerWidth > 760) closeMenu();
  });
})();


/* ===== 6. CASE-STUDY READING PROGRESS ===== */
(function () {
  var article = document.querySelector(".case");
  if (!article) return;
  var bar = document.createElement("div");
  bar.className = "case-reading-progress";
  bar.setAttribute("role", "progressbar");
  bar.setAttribute("aria-label", "Case study reading progress");
  bar.setAttribute("aria-valuemin", "0");
  bar.setAttribute("aria-valuemax", "100");
  var fill = document.createElement("span");
  bar.appendChild(fill);
  document.body.appendChild(bar);
  var ticking = false;
  function update() {
    ticking = false;
    var rect = article.getBoundingClientRect();
    var total = article.offsetHeight - window.innerHeight;
    var progress = total <= 0 ? 1 : Math.max(0, Math.min(1, -rect.top / total));
    fill.style.transform = "scaleX(" + progress + ")";
    bar.setAttribute("aria-valuenow", String(Math.round(progress * 100)));
  }
  function requestUpdate() {
    if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
  }
  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
  update();
})();

/* ===== 7. CAREER ROADMAP REVEAL ===== */
(function () {
  var milestones = document.querySelectorAll(".career-milestone");
  if (!milestones.length) return;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !("IntersectionObserver" in window)) {
    milestones.forEach(function (item) { item.classList.add("is-visible"); });
    return;
  }
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  milestones.forEach(function (item) { observer.observe(item); });
})();
