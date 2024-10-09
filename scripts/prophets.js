const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';
const cards = document.querySelector('#cards');

// Fetch and display prophets data
async function getProphetData() {
  const response = await fetch(url);
  const data = await response.json();
  displayProphets(data.prophets);
}

// Display each prophet as a card
const displayProphets = (prophets) => {
  prophets.forEach((prophet, index) => {
    // Create a card section
    let card = document.createElement('section');

    // Create h2 element for the full name
    let fullName = document.createElement('h2');
    fullName.textContent = `${prophet.name} ${prophet.lastname}`;

    // Create img element for the prophet's portrait
    let portrait = document.createElement('img');
    portrait.setAttribute('src', prophet.imageurl);
    portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`);
    portrait.setAttribute('loading', 'lazy');

    // Create paragraph for date of birth
    let birthDate = document.createElement('p');
    birthDate.textContent = `Date of Birth: ${prophet.birthdate}`;

    // Create paragraph for place of birth
    let birthPlace = document.createElement('p');
    birthPlace.textContent = `Place of Birth: ${prophet.birthplace}`;

    // Append the created elements to the card
    card.appendChild(fullName);
    card.appendChild(portrait);
    card.appendChild(birthDate);
    card.appendChild(birthPlace);

    // Append the card to the main container
    cards.appendChild(card);
  });
};

getProphetData();
