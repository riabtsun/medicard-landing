import { LeafletMap, Marker, TileLayer } from "leaflet";
const menuButton = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector(".mobile-nav");

menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  mobileNav.classList.toggle("open", !isOpen);
});

mobileNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuButton.setAttribute("aria-expanded", "false");
    mobileNav.classList.remove("open");
  });
});

const backToTopButton = document.querySelector(".back-to-top");

if (backToTopButton) {
  const updateBackToTopVisibility = () => {
    backToTopButton.classList.toggle("is-visible", window.scrollY > 300);
  };

  window.addEventListener("scroll", updateBackToTopVisibility, {
    passive: true,
  });
  backToTopButton.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" }),
  );
  updateBackToTopVisibility();
}

/**
 *Показуємо ділянку карти за замовчуванням
 */
let map = new LeafletMap("map").setView([48.4074524, 35.04880767], 11);

new TileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

/**
 * Робимо массив з параметрами маркерів
 */

const markersData = [
  {
    id: 1,
    lat: 48.4074524,
    lng: 35.04880767,
    info:
      "<b>Аптека №1</b>" +
      "<br><span>Адреса аптеки.</span><br>" +
      "<a href='tel:+380631234567'>063-123-45-67</a><br>" +
      "<a href='tel:+380631234567'>063-123-45-67</a>",
  },
  {
    id: 2,
    lat: 48.40719470690752,
    lng: 35.04817699610385,
    info:
      "<b>Аптека №2</b>" +
      "<br><span>Адреса аптеки.</span><br>" +
      "<a href='tel:+380631234567'>063-123-45-67</a><br>" +
      "<a href='tel:+380631234567'>063-123-45-67</a>",
  },
  {
    id: 3,
    lat: 48.40952338886608,
    lng: 35.000336557491345,
    info:
      "<b>Аптека №3</b>" +
      "<br><span>Адреса аптеки.</span><br>" +
      "<a href='tel:+380631234567'>063-123-45-67</a><br>" +
      "<a href='tel:+380631234567'>063-123-45-67</a>",
  },
];

/**
 * Сховище маркерів для взаємодії
 */
const markers = {};

/**
 * Додаємо маркери на карту
 */

markersData.forEach((data) => {
  const marker = new Marker([data.lat, data.lng])
    .addTo(map)
    .bindPopup(data.info);

  //Зберігаємо маркер в об'єкт з модифікатором
  markers[data.id] = marker;

  //обробник кліку по маркеру
  marker.on("click", () => {
    //підсвічуємо елемент списку
    document
      .querySelectorAll("#pharmacy-list .pharmacy-item")
      .forEach((li) => li.classList.remove("active"));
    const listItem = document.querySelector(
      `#pharmacy-list li[data-id="${data.id}"]`,
    );
    if (listItem) {
      listItem.classList.add("active");
      listItem.scrollIntoView({ behavior: "smooth" });
    }
  });
});

document.querySelectorAll("#pharmacy-list .pharmacy-item").forEach((item) => {
  const locationLink = item.querySelector(".pharmacy-location");
  locationLink.addEventListener("click", () => {
    const id = item.getAttribute("data-id");
    if (markers[id]) {
      map.setView(markers[id].getLatLng(), 20);
      markers[id].openPopup();

      //Підсвічування елементу списка
      document
        .querySelectorAll("#pharmacy-list .pharmacy-item")
        .forEach((li) => {
          li.classList.remove("active");
        });
      item.classList.add("active");
    }
  });
});

const citySelect = document.querySelector(".select-item");
const pharmacyWrap = document.querySelector(".pharmacy-wrap");
const mapWrap = document.querySelector(".map-wrap");


new SlimSelect({
  select: "#citySelect",
  events: {
    beforeOpen: () => {
      const select = document.querySelector("#citySelect");
      const options = select.options;
      console.log(options);
      const slimOptions = document.querySelectorAll(".ss-option");

      slimOptions.forEach((slimOption, index) => {
        const dataRegion = options[index].getAttribute("data-region");
        if (dataRegion) slimOption.setAttribute("data-region", dataRegion);
      });
    },
  },
  settings: {
    searchPlaceholder: "Оберіть місто",
    searchText: "Нічого не знайдено",
    searchingText: "Шукаємо...",
    placeholderText: "Обране значення",
    focusSearch: false,
  },
});
