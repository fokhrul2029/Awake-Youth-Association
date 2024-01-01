// Fetch the members data from the JSON file
fetch("assets/documents/members.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((members) => {
    // Access each member's name and display them in the HTML
    const membersInfo = document.querySelector("#membersInfo");
    // Loop through the array of members
    members.forEach((user) => {
      // HTML Contents or Elements
      const userHtml = `
        <div class="col-xl-3 col-md-4 col-sm-6">
        <div class="card">
            <input type="hidden" id="${user.user_id}">
            <img
            src="assets/img/${user.image}"
            class="card-img-top"
            alt="${user.name}"
            />
            <div class="card-body">
            <h5 class="card-title">${user.name}</h5>
            <p class="card-text">${user.position}</p>
            <a href="#" class="btn btn-primary">More Info</a>
            </div>
        </div>
        </div>`;
      membersInfo.innerHTML += ` ${userHtml} `;
    });
  })
  .catch((error) => {
    console.error("Error fetching the members data:", error);
  });
