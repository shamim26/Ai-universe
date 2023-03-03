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
             ${data.description}
            </h5>
            <div class="d-flex align-items-center text-center flex-wrap flex-md-nowrap gap-3 my-3">
              <div
                class="bg-white text-success fw-semibold rounded-4 py-2 px-3"
              >
                ${data.pricing ? data.pricing[0].price : "Free Of Cost"}/<br>${
    data.pricing ? data.pricing[0].plan : "Basic"
  }
              </div>
              <div
                class="bg-white text-warning fw-semibold rounded-4 py-2 px-3"
              >
              ${data.pricing ? data.pricing[1].price : "Free Of Cost"}/<br>${
    data.pricing ? data.pricing[1].plan : "Pro"
  }
              </div>
  
              <div
                class="bg-white text-danger fw-semibold rounded-4 py-2 px-3"
              >
              ${data.pricing ? data.pricing[2].price : "Free Of Cost"}/<br>${
    data.pricing ? data.pricing[2].plan : "Enterprise"
  }
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
          <div class="modal-content-2 col position-relative">
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

            ${
              data.accuracy && data.accuracy.score !== null ? 
              `<div class="accuracy bg-danger text-white rounded-3 px-2 py-1">
                ${data.accuracy.score * 100}% accuracy
                </div>`
              : ""
            }
          </div>
        </div>
    `;
  modal.appendChild(div);
};
