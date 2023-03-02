const loadData = (dataLimit) => {
  fetch("https://openapi.programming-hero.com/api/ai/tools")
    .then((res) => res.json())
    .then((data) => displayData(data.data.tools, dataLimit));
};

// display data in cards
const displayData = (dataLists, dataLimit) => {
  console.log(dataLists);
  const cardSection = document.getElementById("card-col");
  cardSection.innerHTML = "";
  //   show only 6 card
  const seeMore = document.getElementById("btn-see-more");
  if (dataLists.length > 6 && dataLimit) {
    dataLists = dataLists.slice(0, 6);
    seeMore.classList.remove("d-none");
  } else {
    seeMore.classList.add("d-none", true);
  }
  dataLists.forEach((data) => {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("col");
    cardDiv.innerHTML = `
    <div class="card d-flex">
        <img src="${data.image}" class="card-img-top p-3" alt="..." />
        <div class="card-body">
            <h5 class="card-title">Features</h5>
            <ol class="card-text border-bottom       border-2 ps-3 pb-3">
                <li>${
                  data.features[0] ? data.features[0] : "Not Available"
                }</li>
                <li>${
                  data.features[1] ? data.features[1] : "Not Available"
                }</li>
                <li>${
                  data.features[2] ? data.features[2] : "Not Available"
                }</li>
            </ol>
        </div>
        <div class="card-bottom d-flex      justify-content-between ps-3 pb-3">
            <div>
                <h5>${data.name}</h5>
                <img src="./images/icons/calander.svg" alt="" /><span
                class="ms-2"
                >${data.published_in}</span
                >
            </div>
            <button id="btn-details" class="btn">
                <img class="arrow" src="./images/icons/arrow.svg" alt="" />
            </button>
        </div>
    </div>
    `;
    cardSection.appendChild(cardDiv);
  });
//   spinner condition
  loadingSpinner(false);
};

// see more button action
document.getElementById("btn-see-more").addEventListener("click", function () {
  loadData();
});

loadData(6);

// spinner
const loadingSpinner = (isLoading) => {
  const spinner = document.getElementById("spinner");
  if (isLoading) {
    spinner.classList.remove("d-none");
  } else {
    spinner.classList.add("d-none");
  }
};
loadingSpinner(true);
