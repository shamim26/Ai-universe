const loadData = () => {
  fetch("https://openapi.programming-hero.com/api/ai/tools")
    .then((res) => res.json())
    .then((data) => displayData(data.data.tools));
};

const displayData = (dataLists) => {
  const cardSection = document.getElementById("card-col");
  dataLists.forEach((data) => {
    console.log(data);
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("col");
    cardDiv.innerHTML = `
    <div class="card d-flex">
        <img src="${data.image}" class="card-img-top p-3" alt="..." />
        <div class="card-body">
            <h5 class="card-title">Features</h5>
            <ol class="card-text border-bottom       border-2 ps-3 pb-3">
                <li>${data.features[0]}</li>
                <li>${data.features[1]}</li>
                <li>${data.features[2]}</li>
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
};

loadData();
