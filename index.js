const btn = document.querySelector("#getCurrencies");
const preloader = document.querySelector("#loader");

function preloaderOn() {
  preloader.classList.add("display");
  setTimeout(() => {
    preloader.classList.remove("display");
  }, 5000);
}
function preloaderOff() {
  preloader.classList.remove("display");
}

async function loadData() {
  preloaderOn();
  try {
    const data = await fetch(
      "http://api.nbp.pl/api/exchangerates/tables/A/?format=json%22"
    );
    return await data.json();
  } catch (err) {
    console.error(err);
  } finally {
    preloaderOff();
  }
}
btn.addEventListener("click", () => {
  loadData("http://api.nbp.pl/api/exchangerates/tables/A/?format=json%22").then(
    (data) => {
      const cash = data[0].rates;
      const selectList = document.querySelector(".form-select");
      const input = document.querySelector("#inputCurrency");
      const header = document.querySelector("#negativeValueOfTheNumber");
      if (input.value < 0) {
        return (header.innerHTML = "wpisz wartość dodatnią");
      }
      const selectedCurrency = cash.find(
        (item) => item.code === selectList.value
      );
      header.innerHTML =
        (selectedCurrency.mid * input.value).toFixed(2) + " " + "PLN";
    }
  );
});
