const searchInput = document.getElementById('search-input');
const resultArtist = document.getElementById('result-artist');
const resultPlaylist = document.getElementById('result-playlists');

function requestApi(searchTerm) {
  const url = `http://localhost:3000/artists?name_like=${searchTerm}`;
  fetch(url)
    .then((response) => response.json())
    .then((result) => displayResults(result));
}

function displayResults(result) {
  console.log(result);

  resultPlaylist.classList.add('hidden');
  const artistsContainer = resultArtist.querySelector('.grid-container');
  // const artistName = document.getElementById('artist-name');
  // const artistImage = document.getElementById('artist-img');

  let newInnerHTML = "";
  result.forEach((element) => {
    // artistName.innerText = element.name;
    // artistImage.src = element.urlImg;
    newInnerHTML = newInnerHTML.concat(`
<div class="artist-card" id="${element.id}">
    <div class="card-img">
        <img id="artist-img-${element.id}" class="artist-img" src="${element.urlImg}" />
        <div class="play">
            <span class="fa fa-solid fa-play"></span>
        </div>
    </div>
    <div class="card-text">
        <a title="${element.name}" class="vst" href=""></a>
        <span class="artist-name" id="artist-name-${element.id}">${element.name}</span>
        <span class="artist-categorie">Artista</span>
        </a>
    </div>
</div>
`);
  });
  artistsContainer.innerHTML = newInnerHTML;

  resultArtist.classList.remove('hidden');
}

document.addEventListener('input', function () {
  const searchTerm = searchInput.value.toLowerCase();
  console.log(searchTerm);

  if (searchTerm === '') {
    resultPlaylist.classList.remove('hidden');
    resultArtist.classList.add('hidden');
    return;
  }

  requestApi(searchTerm);
});
