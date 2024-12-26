
let card= document.querySelector(".card")
let DetailsGame =document.querySelector(".detailsGame");
let closeBtn = document.getElementById("btnClose")
let loading =document.getElementById("loading");
let home = document.querySelector(".home")
// Select all nav links
const navLinks = document.querySelectorAll('.nav-link');


navLinks.forEach(link => {
  link.addEventListener('click', function () {
    navLinks.forEach(nav => nav.classList.remove('active'));
    this.classList.add('active');
    const category = this.getAttribute('data-category');
    getGames(category);
  });
});
async function getGames(category){
	const url = `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`;
	const options = {
		method: 'GET',
		headers: {
			'x-rapidapi-key': 'b9bc8dfc7fmsh56a76b71a19cd1dp1a4e98jsn284a5d5a4485',
			'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
		}
	};
	
	try {
    loading.classList.remove("d-none");
		const response = await fetch(url, options);
		const result = await response.json();
		console.log(result);
    displayGames(result);
	} catch (error) {
		console.error(error);
	}
  finally{
    loading.classList.add("d-none");
  }
}
function displayGames(arr){
  var cartona=``
  for( var i=0; i<arr.length ; i++){
    cartona +=`
    <div class="col-md-3">
            <div class="card bg-transparent text-white" onclick="showDetails(${arr[i].id})">
               
              <img
                height="150px"
                class="card-img-top p-3"
                src="${arr[i].thumbnail}"
                alt="Card image cap"
              />
              <div class="card-body">
                <div
                  class="topp d-flex justify-content-between align-items-center"
                >
                  <h3 class="h6">${arr[i].title}</h3>
                  <span class="badge bg-primary text-white p-2 mb-2">Free</span>
                </div>
                <p class="card-text text-center small opacity-50">
                ${arr[i].short_description.split(" ", 8)}
                </p>
              </div>
              <div class="card-footer d-flex justify-content-between">
                <span class="badge bg-grey text-white">${arr[i].genre}</span>
                <span class="badge bg-grey text-white">${arr[i].platform}</span>
              </div>
            </div>
          </div>
    `
    document.getElementById('rowData').innerHTML= cartona;
  }
}
getGames("mmorpg")

async function showDetails(gameId){
  // console.log(gameId);
  
  const url = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${gameId}`;
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': 'b9bc8dfc7fmsh56a76b71a19cd1dp1a4e98jsn284a5d5a4485',
		'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
	}
};

try {
  
  loading.classList.remove("d-none");
  home.classList.add("d-none")
  DetailsGame.classList.remove("d-none");
	const response = await fetch(url, options);
	const result = await response.json();
	console.log(result);

  document.getElementById("details").innerHTML=
  `
  <div class="col-md-4 px-3 ">
          <img src="${result.thumbnail}" class="w-100" alt="Game Image" />
        </div>
        <div class="col-md-8 px-3">
          <h3>Title: ${result.title}</h3>
          <p>
            Category:
            <span class="badge bg-info text-black fw-bold">${result.genre}</span>
          </p>
          <p>
            Platform:
            <span class="badge bg-info text-black ">${result.platform}</span>
          </p>
          <p>
            Status:
            <span class="badge bg-info text-black">${result.status}</span>
          </p>
          <p class="desc">
          ${result.description}
          </p>
          <a class="btn btn-outline-warning text-white fw-bold" target="_blank" href="${result.game_url}">Show Game</a>
        </div>
  `
} catch (error) {
	console.error(error);
}
finally{
  loading.classList.add("d-none");
}
  }
  closeBtn.addEventListener('click',function(){
    DetailsGame.classList.add("d-none");
    home.classList.remove("d-none")
  })