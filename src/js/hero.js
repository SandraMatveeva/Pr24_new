import Swiper from "swiper";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";

Swiper.use([Autoplay, Navigation]);

+document.addEventListener("DOMContentLoaded", () => {
  const element = document.querySelector(".wrap-banner");
  console.log("🟡 wrap-banner element:", element);

  // Тепер ініціалізуємо тільки якщо елемент знайдено
  if (!element) {
    console.warn(
      "⛔ Елемент .wrap-banner не знайдено в DOM на момент завантаження!"
    );
    return;
  }

  const swiper = new Swiper(
    ".swiper",

    {
      slidesPerView: 1,
      // spaceBetween: 0,
      loop: true,
      initialSlide: 0,
      centeredSlides: false,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      keyboard: {
        enabled: true,
        onlyInViewport: true,
      },
      mousewheel: true,
      // autoplay: {
      //   delay: 3000,
      // },
    }
  );

  console.log("TOTAL:", swiper.slides.length);

  // swiper.on("slideChange", () => {
  //   console.log("slide changed", swiper.activeIndex);
  // });

  const slideColors = [
    "rgb(199, 229, 211)", // Slide 1 199, 229, 211
    "rgb(255, 220, 200)", // Slide 2
    "rgb(200, 240, 255)", // Slide 3
    "rgb(250, 200, 255)", // Slide 4
    "rgb(220, 220, 220)", // Slide 5
    "rgb(180, 220, 180)", // Slide 6
    "rgb(240, 200, 180)", // Slide 7
  ];

  let lastRealIndex = -1;

  swiper.on("slideChange", () => {
    if (swiper.realIndex !== lastRealIndex) {
      lastRealIndex = swiper.realIndex;
      const realSlideNumber = swiper.realIndex + 1;
      console.log("✅ Slide changed to:", realSlideNumber);

      const currentSpan = document.getElementById("current");
      if (currentSpan) {
        currentSpan.textContent = realSlideNumber;
      }
      const root = document.documentElement;
      const newColor = slideColors[swiper.realIndex];
      root.style.setProperty("--background-color", newColor);
    }
  });
});

const wrHero = document.querySelector(".wr-hero");
const newsShowAll = document.querySelector(".news-show-all");
const newsShowOne = document.querySelector(".news-show-one");

const goToNewsShowAllBtn = document.getElementById("goToNewsShowAll"); // Show all button
const goToNewsShowOneBtn = document.getElementById("goToNewsShowOne"); // Show one button
const goToWrHeroBtn = document.querySelectorAll(".go-to-wr-hero"); // Back button

const btnNewsAllTitle = document.querySelectorAll(".btn-news-show-all-title");
const newsShowOneAll = document.querySelectorAll(".news-show-one");

let newsOpenedFromAll = false; //змінна для збереження джерела відкриття новин

btnNewsAllTitle.forEach((btn) => {
  btn.addEventListener("click", () => {
    newsOpenedFromAll = true;
    console.log("✅ Кнопка натиснута:", btn);
    const newId = btn.dataset.newid; // логіка для відкриття однієї новини зі списку
    console.log("Клік по новині ID:", newId);

    newsShowOneAll.forEach((el) => {
      el.hidden = true;
    });
    // ховаємо всі новини

    const targetNews = document.querySelector(
      `.news-show-one[data-newid="${newId}"]`
    );
    if (targetNews) {
      console.log("🔓 Відкриваю новину:", targetNews);
      wrHero.classList.add("hidden");
      newsShowAll.classList.remove("active");
      targetNews.hidden = false; // ✅ NEW
    }
  });
});

goToNewsShowAllBtn.addEventListener("click", () => {
  wrHero.classList.add("hidden");
  newsShowAll.classList.add("active");
});

goToNewsShowOneBtn.addEventListener("click", () => {
  wrHero.classList.add("hidden");
  newsShowOne.classList.add("active");
});

for (const el of goToWrHeroBtn) {
  el.addEventListener("click", () => {
    newsShowOneAll.forEach((el) => (el.hidden = true)); //ховаю всі новини

    if (newsOpenedFromAll) {
      console.log(1);

      newsShowAll.classList.add("active");
      wrHero.classList.add("hidden");
    } else {
      wrHero.classList.remove("hidden");
      newsShowAll.classList.remove("active");
    }

    newsOpenedFromAll = false;
  });
}
