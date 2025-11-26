//#region Swiper

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

//#endregion Swipee

//#region News

const wrHero = document.querySelector(".wr-hero");
const newsShowAll = document.querySelector(".news-show-all");
// const newsShowOne = document.querySelector(".news-show-one");

const goToNewsShowAllBtn = document.getElementById("goToNewsShowAll"); // Show all button
// const goToNewsShowOneBtn = document.getElementById("goToNewsShowOne"); // Show one button
const goToWrHeroBtn = document.querySelectorAll(".go-to-wr-hero"); // Back button

const btnNewsAllTitle = document.querySelectorAll(".btn-news-show-all-title");
const newsShowOneAll = document.querySelectorAll(".news-show-one");

let newsOpenedFromAll = false; //змінна для збереження джерела відкриття новин

btnNewsAllTitle.forEach((btn) => {
  btn.addEventListener("click", () => {
    const isHome = btn.dataset.home;
    console.log("клік по новині з хоме", isHome);

    if (isHome) {
      newsOpenedFromAll = false;
    } else {
      newsOpenedFromAll = true;
    }

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


for (const el of goToWrHeroBtn) {
  el.addEventListener("click", () => {
    newsShowOneAll.forEach((el) => {
      el.hidden = true;
      el.classList.remove("active");
    }); //ховаю всі новини

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
//#endregion News


// // export default myChart;
import Chart from "chart.js/auto";

// ===== 1. Дані для графіка =====
const chartDataMap = {
  USD: {
    sell: [41.95, 41.94, 41.97, 41.97, 41.97],
    buy: [41.55, 41.54, 41.56, 41.56, 41.56],
  },
  EUR: {
    sell: [45.22, 45.15, 45.17, 45.19, 45.18],
    buy: [44.8, 44.78, 44.76, 44.75, 44.77],
  },
  PLN: {
    sell: [10.15, 10.1, 10.12, 10.11, 10.13],
    buy: [9.85, 9.83, 9.84, 9.82, 9.83],
  },
};

// ===== 2. Створюємо графік =====
let myChart;
const canvas = document.getElementById("myChart");

if (canvas) {
  const ctx = canvas.getContext("2d");
  myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: ["25.07", "24.07", "23.07", "22.07", "21.07"],
      datasets: [
        {
          label: "Sell rate ",
          data: chartDataMap.USD.sell,
          borderColor: "blue",
          borderWidth: 2,
          tension: 0.3,
        },
        {
          label: "Buy rate ",
          data: chartDataMap.USD.buy,
          borderColor: "green",
          borderWidth: 2,
          tension: 0.3,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        tooltip: {
          mode: "index",
          intersect: false,
        },
        legend: {
          display: true,
          position: "bottom",
          align: "end",
          labels: {
            usePointStyle: true,
            pointStyle: "circle",

            boxWidth: 2,     // ✅ зменшити кружок
            boxHeight: 2,    // ✅ зменшити висоту (фактично радіус)
            borderRadius: 50, // ✅ зробити круглим (без квадратних країв)
          },
        },
      },
      elements: {
        point: {
          radius: 2,
        },
      },
      scales: {
        y: {
          beginAtZero: false,
          ticks: {maxTicksLimit: 5
            
          }
        },
        x: {
          grid: {
            display: false,
          },
        },
      },
    },
  });
}

// ===== 3. Функція оновлення графіка =====
function updateChartData(currency) {
  if (!chartDataMap[currency] || !myChart) return;

  myChart.data.datasets[0].data = chartDataMap[currency].sell;
  myChart.data.datasets[1].data = chartDataMap[currency].buy;

  myChart.data.datasets[0].label = `Sell rate (${currency})`;
  myChart.data.datasets[1].label = `Buy rate (${currency})`;

  myChart.update();
}

// ===== 4. Обробники подій =====

const BtnGroup = document.querySelectorAll(".view-btn");
const ContentList = document.querySelector(".content-list");
const ContentGraph = document.querySelector(".content-graph");
const CurrencyDropdown = document.querySelector(".currency-dropdown");
const currencyToggleBtn = document.querySelector(".btn-currency-type");
const currencyMenu = document.querySelector(".currency-type-menu");
const currencyButton = document.querySelectorAll(".btn-currency-type-dropdown");

// Показ/сховати випадаючий список валют
currencyToggleBtn.addEventListener("click", () => {
  currencyMenu.classList.toggle("visible");
});

// Перемикання валюти й оновлення графіка
currencyButton.forEach((btn) => {
  btn.addEventListener("click", () => {
    currencyButton.forEach((button) => button.classList.remove("active"));
    btn.classList.add("active");
    // const currency = btn.getAttribute("data-currency");

    const currency = btn.dataset.currency||btn.textContent.trim();
    console.log("currency:", currency);
    currencyToggleBtn.innerHTML=`${currency} <span class="dropdown-arrow">▼</span>`;
   

    updateChartData(currency);
    currencyMenu.classList.remove("visible");
  });
});

// Перемикання між графіком і списком
BtnGroup.forEach((btn) => {
  btn.addEventListener("click", () => {
    BtnGroup.forEach((button) => button.classList.remove("active"));
    btn.classList.add("active");

    const view = btn.dataset.view;

    if (view === "list") {
      ContentList.classList.add("visible");
      ContentGraph.classList.remove("visible");
      CurrencyDropdown.classList.remove("visible");
    } else if (view === "graph") {
      ContentGraph.classList.add("visible");
      ContentList.classList.remove("visible");
      CurrencyDropdown.classList.add("visible");
    }
  });
});
//#endregion Calc


//#region avtoriz
const appAvtorizBtn = document.querySelector(".app-avtoriz-log-Pr24")
appAvtorizBtn.addEventListener("click", () => {
  window.location.href = "https://privat24.ua/";
})
//#endregion avtoriz

//#region QR-код
import QRCode from "qrcode";

const qrCodeText = "https://privat24.ua/downloads";
const options = {
  width: 120,
  margin: 2,
  errorCorrectionLevel: "H"};

const qrCodeCanvas = document.getElementById("qrCanvas");

QRCode.toCanvas(qrCodeCanvas, qrCodeText, options )
.then(() => console.log("QR-код успішно згенеровано!")) 
.catch((error) => console.error("Помилка при генерації QR-коду:", error));
//#endregion QR-код
