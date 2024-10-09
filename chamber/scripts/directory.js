// Function to get the current year
document.getElementById("currentYear").textContent = new Date().getFullYear();

// Function to get the last modification date
document.getElementById("lastModified").textContent = document.lastModified;

// Fetching the member data from the JSON file
async function loadMembers() {
    const response = await fetch('data/members.json');
    const members = await response.json();

    const directory = document.getElementById('business-directory');
    directory.innerHTML = ''; // Clear previous content

    members.forEach(member => {
        const section = document.createElement('section');
        section.innerHTML = `
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
        `;
        directory.appendChild(section);
    });
}

// Toggle between grid and list view
const gridButton = document.getElementById('grid');
const listButton = document.getElementById('list');
const directory = document.getElementById('business-directory');

gridButton.addEventListener('click', () => {
    directory.classList.add('grid');
    directory.classList.remove('list');
});

listButton.addEventListener('click', () => {
    directory.classList.add('list');
    directory.classList.remove('grid');
});


const menuButton = document.getElementById('menuBtn');
const listNav = document.getElementById('listNav');

menuButton.addEventListener('click', () => {
    menuButton.classList.toggle('open');
    if (listNav.style.display === "flex") {
        listNav.style.display = "none"; // Hide menu
      } else {
        listNav.style.display = "flex"; // Show menu
      }
});


// Load members on page load
loadMembers();
