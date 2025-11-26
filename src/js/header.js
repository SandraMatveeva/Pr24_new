import tippy from "tippy.js";
import "tippy.js/dist/tippy.css"; // optional for styling

import i18next from "i18next";
import HttpBackend from "i18next-http-backend";

document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ DOM завантажено, запускаємо i18next...");
  i18next
    .use(HttpBackend) // кажемо, що будемо завантажувати переклади через HTTP (із JSON-файлів)
    .init({
      lng: "ua", // поточна мова за замовчуванням
      fallbackLng: "ua", //мова. якщо переклад не знайдено
      interpolation: {
        escapeValue: false, // ← дозволяє HTML (наприклад, <br />)
      },
      backend: {
        loadPath: "../locales/{{lng}}.json", //шлях до файлів з перекладом
      },
    })
    .then(() => {
      //переклади завантажились — оновлюємо текст і tooltip-и
      updateTexts();
      initTooltips();
    });

  function updateTexts() {
    // 🔹 1. Оновлюємо звичайні тексти на сторінці
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n"); // дістаємо ключ перекладу
      const translated = i18next.t(key); // отримуємо переклад
      el.innerHTML = translated; // вставляємо перекладений текст
    });

    document.querySelectorAll("[data-i18n-tippy]").forEach((el) => {
      const key = el.getAttribute("data-i18n-tippy"); //дістаємо ключ перекладу
      const translated = i18next.t(key);

      el.setAttribute("data-tippy-content", translated); // вставляємо переклад
    });

    const btn = document.getElementById("lang-toggle");
    btn.textContent = i18next.language === "ua" ? "EN" : "UA"; //// якщо зараз українська — показуємо "EN", і навпаки
  }

  let activeTooltips = [];

  function initTooltips() {
    activeTooltips.forEach((t) => t.destroy());
    activeTooltips = [];

    activeTooltips = tippy("[data-tippy-content", {
      theme: "dark",
      arrow: true,
      delay: [100, 50],
    });
  }

  document.getElementById("lang-toggle").addEventListener("click", () => {
    //Зміна мови при кліку на кнопку
    //Визначаємо, на яку мову перемикатись
    const newLang = i18next.language === "ua" ? "en" : "ua";

    i18next.changeLanguage(newLang).then(() => {
      updateTexts();
      initTooltips();
    });
  });
});
