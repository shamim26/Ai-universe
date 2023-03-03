const loadData = (dataLimit) => {
  fetch("https://openapi.programming-hero.com/api/ai/tools")
    .then((res) => res.json())
    .then((data) => displayData(data.data.tools, dataLimit));
};

// display data in cards
const displayData = (dataLists, dataLimit) => {
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
  //   dynamic card
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
            <button onclick="loadModalData('${data.id}')" class="btn"
            data-bs-toggle="modal" data-bs-target="#ai-modal">
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

// modal
const loadModalData = (id) => {
  fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`)
    .then((res) => res.json())
    .then((data) => displayDataModal(data.data));
};

// display data in modal
const displayDataModal = (data) => {
  console.log(data);
  const modal = document.getElementById("modal");
  modal.innerHTML = "";
  const div = document.createElement("div");
  div.classList.add("modal-content", "position-relative");
  div.innerHTML = `
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="ai-modal-label"></h1>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      <div class="modal-body row gap-3 my-md-3 mx-md-2 my-lg-5 mx-lg-5">
        <div class="modal-content-1 col">
          <h5>
            ChatGPT is an AI-powered chatbot platform that uses OpenAI's
            GPT technology to simulate human conversation.
          </h5>
          <div class="d-flex flex-wrap flex-md-nowrap gap-3 my-3">
            <div
              class="bg-white text-success fw-semibold rounded-4 py-3 px-3"
            >
              ${data.pricing[0].price}
            </div>
            <div
              class="bg-white text-warning fw-semibold rounded-4 py-3 px-3"
            >
              $10/month Basic
            </div>

            <div
              class="bg-white text-danger fw-semibold rounded-4 py-3 px-3"
            >
              t us Enterprise
            </div>
          </div>
          <div
            class="features-and-integrations d-flex justify-content-between overflow-hidden"
          >
            <div class="features">
              <h5>Features</h5>
              <ul>
                <li>${data.features[1].feature_name}</li>
                <li>${data.features[2].feature_name}</li>
                <li>${data.features[3].feature_name}</li>
              </ul>
            </div>
            <div class="integrations">
              <h5>Integrations</h5>
              <ul>
                <li>${
                  data.integrations && data.integrations.length > 0
                    ? data.integrations[0]
                    : "No Data Found"
                }</li>
                <li>${
                  data.integrations && data.integrations.length > 1
                    ? data.integrations[1]
                    : "No Data Found"
                }</li>
                <li>${
                  data.integrations && data.integrations.length > 2
                    ? data.integrations[2]
                    : "No Data Found"
                }</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="modal-content-2 col">
          <img class='img-fluid rounded-2 mb-4' src="${
            data.image_link[0]
          }" alt="" />
          <h5 class='text-center'>${
            data.input_output_examples
              ? data.input_output_examples[0].input
              : "No Data Found"
          }</h5>
          <p class='text-center'>${
            data.input_output_examples
              ? data.input_output_examples[0].output
              : "No Data Found"
          }</p>
        </div>
      </div>
  `;
  modal.appendChild(div);
};
