const actionContainer = document.getElementById('actionContainer');

const pokemonList = document.getElementById('pokemonList');

const setUpBattle = (data) => {
  console.log(data.name);
  actionContainer.removeChild(pokemonList);
  actionContainer.style.overflow = 'visible';
  let battleDiv = document.createElement('div');
  battleDiv.className += 'battleArena';
  actionContainer.appendChild(battleDiv);
  let enemyDiv = document.createElement('div');
  enemyDiv.className += 'enemyBox';

  let playerDiv = document.createElement('div');
  playerDiv.className += 'playerBox';

  battleDiv.appendChild(playerDiv);
  battleDiv.appendChild(enemyDiv);
};

const getSuggestions = async (num) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${num}`);
    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }
    const data = await response.json();

    const imageData =
      data.sprites.versions['generation-iii']['firered-leafgreen'][
        'front_default'
      ];

    let newDiv = document.createElement('div');
    newDiv.className += 'listImgContainer';
    let newImage = document.createElement('img');
    newImage.src = imageData;

    newImage.addEventListener('click', () => {
      setUpBattle(data);
    });
    newDiv.appendChild(newImage);
    pokemonList.appendChild(newDiv);
  } catch (error) {
    console.log(error);
  }
};
window.onload = function () {
  for (let i = 1; i < 152; i++) {
    getSuggestions(i);
  }
};
