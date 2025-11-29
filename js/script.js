// script.js - funcionalidades JS básicas: menu mobile e validação simples do formulário

document.addEventListener("DOMContentLoaded", function () {
   // Menu mobile
   const toggle = document.querySelectorAll(".menu-toggle");
   const nav = document.getElementById("main-nav");
   const body = document.body;
   
   // Criar overlay se não existir
   let overlay = document.querySelector(".menu-overlay");
   if (!overlay) {
      overlay = document.createElement("div");
      overlay.className = "menu-overlay";
      document.body.appendChild(overlay);
   }

   function openMenu() {
      nav.classList.add("open");
      overlay.classList.add("active");
      body.classList.add("menu-open");
      toggle.forEach((btn) => btn.setAttribute("aria-expanded", "true"));
   }

   function closeMenu() {
      nav.classList.remove("open");
      overlay.classList.remove("active");
      body.classList.remove("menu-open");
      toggle.forEach((btn) => btn.setAttribute("aria-expanded", "false"));
   }

   toggle.forEach((btn) => {
      btn.addEventListener("click", function () {
         const expanded = this.getAttribute("aria-expanded") === "true";
         if (expanded) {
            closeMenu();
         } else {
            openMenu();
         }
      });
   });

   // Fecha menu ao clicar no overlay
   overlay.addEventListener("click", closeMenu);

   // Fecha menu ao clicar em link (UX mobile)
   document.querySelectorAll("#main-nav a").forEach((a) => {
      a.addEventListener("click", closeMenu);
   });

   // Fecha menu ao pressionar ESC
   document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("open")) {
         closeMenu();
      }
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
            if (msgEl) {
               msgEl.className = "";
               msgEl.textContent = "Por favor, preencha todos os campos.";
               msgEl.classList.remove("sr-only");
            }
            return;
         }

         // cria mailto fallback
         const subject = encodeURIComponent("Contato via site - SAR Dynamics");
         const body = encodeURIComponent(`Nome: ${name}\nE-mail: ${email}\n\nMensagem:\n${message}`);
         const mailto = `mailto:theus.baptistella@gmail.com?subject=${subject}&body=${body}`;

         // tenta abrir cliente de e-mail (tenta window.open primeiro)
         const win = window.open(mailto, "_self");
         if (!win) {
            // fallback: atualiza location (pode substituir a página) ou informar usuário
            window.location.href = mailto;
         }

         // feedback para acessibilidade
         if (msgEl) {
            msgEl.className = "";
            msgEl.textContent =
               "Tentando abrir seu cliente de e-mail. Se nada acontecer, envie manualmente para contato@sardynamics.com.br";
            msgEl.classList.remove("sr-only");
         }
      });
   }
});
