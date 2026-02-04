// PAGE TRANSITION
const transition = document.querySelector(".page-transition");
document.querySelectorAll("a[href]").forEach(link => {
  const url = link.getAttribute("href");
  if (!url || url.startsWith("#") || url.startsWith("http")) return;

  link.addEventListener("click", e => {
    e.preventDefault();
    if (!transition) return;
transition.classList.add("active");

    setTimeout(() => location.href = url, 400);
  });
});

// SCROLL REVEAL
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => e.isIntersecting && e.target.classList.add("active"));
},{ threshold: 0.15 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// THEME TOGGLE
const toggle = document.getElementById("themeToggle");
if (toggle) toggle.onclick = () => document.body.classList.toggle("light");

// ================= EMAILJS (CONTACT PAGE ONLY) =================
if (
  typeof emailjs !== "undefined" &&
  document.getElementById("contactForm")
) {
  emailjs.init("f__i2w6R5e35JMTre");

  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");

  form.addEventListener("submit", e => {
    e.preventDefault();
    status.textContent = "Sending…";

    emailjs.sendForm(
      "service_tk6xiqn",
      "template_pt3w45m",
      form
    ).then(() => {
      status.textContent = "Message sent successfully.";
      status.style.color = "#4DFFF3";
      form.reset();
    }, () => {
      status.textContent = "Failed to send. Please try again.";
      status.style.color = "#ff6b6b";
    });
  });
}
// ================= DNA HERO ANIMATION (INDEX ONLY) =================
if (
  typeof gsap !== "undefined" &&
  document.querySelector(".hero")
) {
  gsap.registerPlugin(ScrollTrigger);

  const tl = gsap.timeline({
    defaults: { ease: "power3.out" }
  });

  // LOGO FIRST (STATEMENT OBJECT)
  tl.to(".hero-logo", {
    opacity: 1,
    scale: 1,
    y: 0,
    duration: 1.4
  })

  // MASKED HEADLINE REVEAL
  .to(".hero-title .line span", {
    y: "0%",
    duration: 1,
    stagger: 0.14
  }, "-=0.5")

  // SUBTEXT
  .to(".hero-sub", {
    opacity: 0.85,
    y: 0,
    duration: 0.8
  }, "-=0.4");

  // SCROLL DEPTH
  gsap.to(".hero-bg", {
    y: 120,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: true
    }
  });
}


