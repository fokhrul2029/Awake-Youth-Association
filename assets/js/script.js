// JavaScript of AOS Animatio 
AOS.init();

// Js For Get Member's Info 
const jsonFile = "assets/documents/members.json";
const membersInfo = document.querySelector("#membersInfo");
fetch(jsonFile)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((members) => {
    const getAllMembers = document.querySelector("#getAllMembers");
    // Get All User/Member Index
    const membersLength = members.length; // 13 members
    // Display only the first 8 members initially
    let displayIndex = 8;
    let limitedMembers = members.slice(0, displayIndex);

    getAllMembers.addEventListener("click", () => {
      // Update limitedMembers to include all members
      displayIndex = membersLength;
      limitedMembers = members;

      // Clear existing content before adding all members
      membersInfo.innerHTML = "";
      getAllMembers.style.display = "none";
      // Loop through the array of limited members (now all members)
      limitedMembers.forEach((user) => {
        const userHtml = `
          <div class="col-xl-3 col-md-4 col-sm-6">
            <div class="card">
              <input type="hidden" id="${user.user_id}">
              <div class="img">
                <img src="assets/media/members/${user.image}" class="card-img-top" alt="${user.name}" />
              </div>
              <div class="card-body">
                <h5 class="card-title">${user.name}</h5>
                <p class="card-text">${user.position}</p>
                <button type="button" onclick="openMemberModal(${user.user_id})" class="btn btn-color">More Info</button>
              </div>
            </div>
          </div>`;
        membersInfo.innerHTML += ` ${userHtml} `;
      });
    });

    // Loop through the array of limited members initially
    limitedMembers.forEach((user) => {
      const userHtml = `
        <div class="col-xl-3 col-md-4 col-sm-6">
          <div class="card">
            <input type="hidden" id="${user.user_id}">
            <div class="img">
              <img src="assets/media/members/${user.image}" class="card-img-top" alt="${user.name}" />
            </div>
            <div class="card-body">
              <h5 class="card-title">${user.name}</h5>
              <p class="card-text">${user.position}</p>
              <button type="button" onclick="openMemberModal(${user.user_id})" class="btn btn-color">More Info</button>
            </div>
          </div>
        </div>`;
      membersInfo.innerHTML += ` ${userHtml} `;
    });
  })
  .catch((error) => {
    console.error("Error fetching the members data:", error);
  });

// End

// Js For HTML Modal 

// Function to fetch member data from JSON file
async function fetchMemberData() {
  try {
    const response = await fetch(jsonFile);
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
  const socialInfo = document.querySelector("#socialInfo");

  const phone = `
       <a href="tel:${user.phone}"><i class="bi bi-telephone-outbound-fill"></i></a>`;
  const wp = `
       <a target="_blank" href="http://wa.me/${user.phone}"><i    class="bi bi-whatsapp"></i></a>`;
  const fb = `
      <a target="_blank" href="${user.fb_url}"><i class="bi bi-facebook"></i></a>`;

  memberImg.src = `assets/media/members/${user.image}`;
  memberName.innerHTML = ` <span class="border-bottom border-info text-color">${user.name}</span>`;
  memberPosition.innerHTML = `Position: ${user.position}`;
  memberPhone.textContent = `Phone: ${user.phone}`;
  memberNationality.textContent = `Nationality: ${user.nationality}`;
  memberLiving.textContent = `Living: ${user.living}`;

  socialInfo.innerHTML = ` ${phone}
  ${user.whatsapp == true ? wp : ""}
  ${user.fb_url == false ? "" : fb}
  
  `;
  // Display the modal and overlay
  document.getElementById("modal").style.display = "block";
}

// Function to close the member details modal
function closeMemberModal() {
  // Hide the modal and overlay
  document.getElementById("modal").style.display = "none";
}
