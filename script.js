// element declration
const darkModeBtn = document.querySelector(".dark-mode");
const searchBarInput = document.querySelector(".search-bar input");
const filterListInput = document.querySelector(".filter-list input");
const countryContainer = document.querySelector(".container");
const body = document.querySelector("body");
const main = document.querySelector("main");
const popUp = document.querySelector(".pop-up");
let darkmode = false;
// fetch data and use methods
fetch(`data.json`)
  .then((Response) => Response.json())
  .then((data) => {
    // to get all Countries
    allCountries(data);
    // filter method
    fliter(data);
    // country popup detail
    countryDetail(data);
  });

//   dark mode
darkModeBtn.addEventListener("click", (e) => {
  if (e.target.closest(".dark-mode")) {
    if (darkmode === false) {
      darkmode = true;
    } else darkmode = false;
    body.classList.toggle("dark-mode-main");
    countryContainer.classList.toggle("dark-mode-main");
    main.classList.toggle("dark-mode-main");
    filterListInput.classList.toggle("dark-mode-element");
    searchBarInput.classList.toggle("dark-mode-element");
    document.querySelector(".search-bar").classList.toggle("dark-mode-element");
    document.querySelector("footer").classList.toggle("dark-mode-element");
    document.querySelectorAll(".country").forEach((country) => {
      country.classList.toggle("dark-mode-element");
      country
        .querySelectorAll("span")
        .forEach((span) => span.classList.toggle("dark-mode-element-text"));
    });
  }
});

// search btn
searchBarInput.addEventListener("change", () => {
  document.querySelectorAll(".country-info h5").forEach((contryName) => {
    if (
      searchBarInput.value.trim().toLowerCase() ==
      contryName.textContent.toLocaleLowerCase()
    ) {
      contryName.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });
});

// All countries method
function allCountries(data) {
  data.forEach((element, index) => {
    let html = `<div id="${index}" class="country">
    <img
      src="${element.flags.svg}"
      alt=""
    />
    <div class="country-info ">
      <h5>${element.name}</h5>
      <p>population : <span class="pop">${element.population}</span></p>
      <p>region : <span class="reg">${element.region}</span></p>
      <p>capital : <span class="cap">${element.capital}</span></p>
    </div>
  </div>`;
    countryContainer.insertAdjacentHTML("beforeend", html);
  });
}

// filter Method
function fliter(data) {
  popUp.addEventListener("change", () => {
    if (popUp.value == "All" || popUp.value == "") {
      countryContainer.innerHTML = ""
      allCountries(data);
    } else {
      countryContainer.innerHTML = "";
      data.forEach((country, index) => {
        if (country.region == popUp.value) {
          let html = `<div id="${index}" class="country">
        <img
          src="${country.flags.svg}"
          alt=""
        />
        <div class="country-info ">
          <h5>${country.name}</h5>
          <p>population : <span class="pop">${country.population}</span></p>
          <p>region : <span class="reg">${country.region}</span></p>
          <p>capital : <span class="cap">${country.capital}</span></p>
        </div>
      </div>`;
          countryContainer.insertAdjacentHTML("beforeend", html);
        }
      });
      // to check if dark mode on
      if (darkmode === true) {
        document.querySelectorAll(".country").forEach((country) => {
          country.classList.add("dark-mode-element");
          country
            .querySelectorAll("span")
            .forEach((span) => span.classList.add("dark-mode-element-text"));
        });
      }
    }
  });
}
// country detail function
function countryDetail(data) {
  countryContainer.addEventListener("click", (e) => {
    if (e.target.closest(".country")) {
      document.querySelector(".country-details").classList.add("popup-show");
      document.querySelector("body").classList.add("overflow");
      let country = data[e.target.closest(".country").getAttribute("id")];
      console.log(country);
      document.querySelector(".country-cont").innerHTML = "";
      let htmldetail = ` 
      <div class="country country-det">
      <img src="${country.flags.svg}" alt="" />
      <div class="country-info choosed-country">
        <div class="con-info">
          <div class="country-name">
            <h2>${country.name}</h2>
          </div>
          <div class="first">
            <p>native name : <span class="native">${country.nativeName}</span></p>
            <p>population : <span class="pop">${country.population}</span></p>
            <p>region : <span class="reg">${country.region}</span></p>
            <p>sub region : <span class="sreg">${country.subregion}</span></p>
            <p>capital : <span class="cap">${country.capital}</span></p>
          </div>
          <div class="second">
            <p>top Level Domain : <span class="time">${country.topLevelDomain}</span></p>
            <p class="cur">currencies : </p>
            <p class="lang">language : </p>
          </div>
        </div>
        <div class="con-border">
          border-countries

        </div>
      </div>
    </div>
`;
      document
        .querySelector(".country-cont")
        .insertAdjacentHTML("afterbegin", htmldetail);

      if (country.borders) {
        country.borders.forEach((border) => {
          let borders = `<span class="border-1">${border}</span>`;
          document
            .querySelector(".con-border")
            .insertAdjacentHTML("beforeend", borders);
        });
      }
      if (country.currencies) {
        country.currencies.forEach((currency) => {
          let currencies = `<span class="border-1">${currency.name}</span>`;
          document
            .querySelector(".cur")
            .insertAdjacentHTML("beforeend", currencies);
        });
      }
      if (country.languages) {
        country.languages.forEach((language) => {
          let languages = `<span class="border-1">${language.name}</span>`;
          document
            .querySelector(".lang")
            .insertAdjacentHTML("beforeend", languages);
        });
      }

      if (darkmode === true) {
        // dark mode for deital card
        document.querySelector(".footer").classList.add("dark-mode-element");
        document
          .querySelector(".country-details")
          .classList.add("dark-mode-main");
        document.querySelector(".back-btn").classList.add("dark-mode-element");
        document
          .querySelector(".choosed-country")
          .classList.add("dark-mode-element");
        document
          .querySelector(".country-det")
          .classList.add("dark-mode-element");
      } else {
        document.querySelector(".footer").classList.remove("dark-mode-element");
        document
          .querySelector(".country-details")
          .classList.remove("dark-mode-main");
        document
          .querySelector(".back-btn")
          .classList.remove("dark-mode-element");
        document
          .querySelector(".choosed-country")
          .classList.remove("dark-mode-element");
        document
          .querySelector(".country-det")
          .classList.remove("dark-mode-element");
      }
    }
  });
}
// back button
document.querySelector(".back-btn").addEventListener("click", (e) => {
  if (e.target.closest(".back")) {
    document.querySelector(".country-details").classList.remove("popup-show");
    document.querySelector("body").classList.remove("overflow");
  }
});
