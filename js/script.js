// script.js - funcionalidades JS básicas: menu mobile e validação simples do formulário

document.addEventListener("DOMContentLoaded", function () {
   // Menu mobile
   const toggle = document.querySelectorAll(".menu-toggle");
   const nav = document.getElementById("main-nav");

   toggle.forEach((btn) => {
      btn.addEventListener("click", function () {
         const expanded = this.getAttribute("aria-expanded") === "true";
         this.setAttribute("aria-expanded", String(!expanded));
         nav.classList.toggle("open");
      });
   });

   // Fecha menu ao clicar em link (UX mobile)
   document.querySelectorAll("#main-nav a").forEach((a) => {
      a.addEventListener("click", () => {
         nav.classList.remove("open");
         toggle.forEach((btn) => btn.setAttribute("aria-expanded", "false"));
      });
   });

   // Formulário de contato (fallback: mailto) - usado em contato.html
   const form = document.getElementById("contactForm");
   if (form) {
      form.addEventListener("submit", function (e) {
         e.preventDefault();
         const name = document.getElementById("name").value.trim();
         const email = document.getElementById("email").value.trim();
         const message = document.getElementById("message").value.trim();
         const msgEl = document.getElementById("formMessage");

         // validação básica
         if (!name || !email || !message) {
            msgEl.className = "";
            msgEl.textContent = "Por favor, preencha todos os campos.";
            msgEl.classList.remove("sr-only");
            return;
         }

         // cria mailto fallback
         const subject = encodeURIComponent("Contato via site - SAR Dynamics");
         const body = encodeURIComponent(
            `Nome: ${name}\nE-mail: ${email}\n\nMensagem:\n${message}`
         );
         const mailto = `mailto:contato@sardynamics.com.br?subject=${subject}&body=${body}`;

         // tenta abrir cliente de e-mail
         window.location.href = mailto;

         // feedback para acessibilidade
         msgEl.className = "";
         msgEl.textContent =
            "Tentando abrir seu cliente de e-mail. Se nada acontecer, envie manualmente para contato@sardynamics.com.br";
         msgEl.classList.remove("sr-only");
      });
   }
});
