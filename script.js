const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

const testimonials = [
  {
    quote: "“They understood the traditions that mattered to our parents and the atmosphere we dreamed of. Somehow, it felt entirely like us.”",
    author: "AISHWARYA & ROHAN",
    place: "A HYDERABAD CELEBRATION"
  },
  {
    quote: "“From the first haldi flower to the final farewell, every detail felt thoughtful. Our families could simply be present and enjoy it all.”",
    author: "MEERA & ARJUN",
    place: "A COASTAL ANDHRA WEDDING"
  },
  {
    quote: "“They took all our scattered ideas and created a celebration that was warm, elegant and deeply personal. We would choose them all over again.”",
    author: "NISHA & ADITYA",
    place: "A ROYAL PALACE CELEBRATION"
  }
];
let testimonialIndex = 0;
const quoteEl = document.getElementById("testimonial-text");
const authorEl = document.getElementById("testimonial-author");
const dots = document.querySelectorAll(".testimonial-dots i");

function showTestimonial(index) {
  testimonialIndex = (index + testimonials.length) % testimonials.length;
  const item = testimonials[testimonialIndex];
  quoteEl.textContent = item.quote;
  authorEl.innerHTML = `${item.author} <span>— ${item.place}</span>`;
  dots.forEach((dot, i) => dot.classList.toggle("active", i === testimonialIndex));
}
document.getElementById("prev-testimonial").addEventListener("click", () => showTestimonial(testimonialIndex - 1));
document.getElementById("next-testimonial").addEventListener("click", () => showTestimonial(testimonialIndex + 1));

const enquiryForm = document.getElementById("enquiry-form");
enquiryForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(enquiryForm);
  const name = (data.get("name") || "").trim();
  const email = (data.get("email") || "").trim();
  if (!name || !email) {
    document.getElementById("form-status").textContent = "Please add your name and email to continue.";
    return;
  }

  const subject = encodeURIComponent(`Wedding enquiry from ${name}`);
  const body = encodeURIComponent(
`Hello Vivaah team,

I'd love to enquire about wedding planning.

Name: ${name}
Email: ${email}
Phone / WhatsApp: ${data.get("phone") || "Not provided"}
Wedding date: ${data.get("date") || "Not decided"}
Wedding city: ${data.get("city") || "Not decided"}
Interested in: ${data.get("service") || "Let's discuss"}

My vision:
${data.get("message") || "I'd love to discuss my celebration with you."}

Please get in touch with me.`
  );
  document.getElementById("form-status").textContent = "Opening your email app with the enquiry details…";
  // Replace this demo email address with the wedding planner's real business email before launch.
  window.location.href = `mailto:hello@vivaahatelier.example?subject=${subject}&body=${body}`;
});
