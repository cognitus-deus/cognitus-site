document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  const form = document.getElementById("leadForm");
  const msg = document.getElementById("formMessage");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    msg.textContent = "Gracias — (modo demo).";
    msg.style.color = "green";
    form.reset();
  });
});
