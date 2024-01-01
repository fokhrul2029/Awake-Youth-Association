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
            <button type="button" onclick="openMemberModal(${user.user_id})" class="btn btn-primary">More Info</button>
            </div>
        </div>
        </div>`;
      membersInfo.innerHTML += ` ${userHtml} `;
    });
  })
  .catch((error) => {
    console.error("Error fetching the members data:", error);
  });

// Function to fetch user data from JSON file
async function fetchUserData() {
  try {
    const response = await fetch("assets/documents/members.json");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
} // End

// Function to fetch member data from JSON file
async function fetchMemberData() {
  try {
    const response = await fetch("assets/documents/members.json");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const memberData = await response.json();
    return memberData;
  } catch (error) {
    console.error("Error fetching member data:", error);
  }
}

// Function to find a member by user_id
function findMemberByUserId(members, userId) {
  return members.find((member) => member.user_id === userId);
}

// Function to open the member details modal
async function openMemberModal(user_id) {
  // Fetch member data from JSON file
  const members = await fetchMemberData();

  // Assuming you want to show details for user_id 2029
  const memberIdToShow = user_id;

  // Find the member with the specified user_id
  const user = findMemberByUserId(members, memberIdToShow);

  // Update the content of the modal with member details
  const memberImg = document.querySelector(".memberImg");
  const memberName = document.querySelector(".memberName");
  const memberPosition = document.querySelector(".memberPosition");
  const memberPhone = document.querySelector(".memberPhone");
  const memberNationality = document.querySelector(".memberNationality");
  const memberLiving = document.querySelector(".memberLiving");

  memberImg.src = `assets/img/${user.image}`;
  memberName.innerHTML = ` <span class="border-bottom border-success text-success">${user.name}</span>`;
  memberPosition.innerHTML = `Position: ${user.position}`;
  memberPhone.textContent = `Phone: ${user.phone}`;
  memberNationality.textContent = `Nationality: ${user.nationality}`;
  memberLiving.textContent = `Living: ${user.living}`;

  // Display the modal and overlay
  document.getElementById("modal").style.display = "block";
}

// Function to close the member details modal
function closeMemberModal() {
  // Hide the modal and overlay
  document.getElementById("modal").style.display = "none";
}
