var results;
const movieList = document.getElementById("movieList")
const favouritesList = document.getElementById("favouritesList");
const movieDetail = document.getElementById("movieDetail");
const movieSelected = document.getElementById("movieSelected")


async function initializeFavourites(){

    
    var favouriteMovies = [];
    let retString = localStorage.getItem("favourites")
    favouriteMovies.push(JSON.parse(retString))



    for (movie in favouriteMovies){
        for(id in favouriteMovies[movie]){
        var movieId = (JSON.parse(favouriteMovies[movie][id]))
            // console.log(movieId)
            const resp = await fetch(`https://www.omdbapi.com/?apikey=69f4820b&i=${movieId}`)
            const data = await resp.json()
            // console.log(data)
            renderFavourites(data)
        }
        
    }
}

function renderFavourites(movie){
    console.log(movie)
    const li = document.createElement('li');
    li.style.display="inline-block";
    li.style.width="30%"
    li.style.marginBottom="100px"
    li.innerHTML=`
    <div id="movieCard" class="text-white" >
            <img id=${movie.imdbID} onclick="movieDetails(this.id)" class= "movie-img movieSel" src=${movie.Poster}>
            

            

        <div class="col1 pt-2">
            <div style="display: inline-block; width: 70%; min-width: 70%; ">
                <h4 style="margin-bottom: 0px;">${movie.Title}</h4>
            </div>
            <h6 style="display: inline;">${movie.imdbRating} | </h6>
            <img id=${movie.imdbID} onclick="removeFromFavourites(this.id)" class="fav-img" src="https://cdn-icons-png.flaticon.com/128/2622/2622103.png" alt="error"></img> 
        </div>  
        <div class="col2 pt-0">
                    <small>${movie.Rated} / </small>
                    <small>${movie.Runtime} /</small>
                    <small>${movie.Genre}</small>
                
                    <h5 style="font-size: 14px; font-weight: 400; margin-top: 15px">SUMMARY</h5>

                    <small>${movie.Plot}</small>
                    <p style="margin-bottom: 10px">${movie.Actors}</p>
                    <img class="cal-img" src="https://cdn-icons-png.flaticon.com/128/10755/10755587.png"></img>
                    <label style="font-size: 14px;"> - ${movie.Released}</lable>
        </div>
    </div>
                    `
    favouritesList.append(li);

   
}


async function fetchData(){
var x = document.getElementById("search").value;

    const resp = await fetch(`https://www.omdbapi.com/?apikey=69f4820b&s=${x}`)
    const data = await resp.json()
    console.log(data)
    results = data.Search
    movieList.innerHTML=""         // removing all appended div's inside movielist container so that the list refreshes whenever a new letter is added for searching
    renderList(results)
    
}

function removeFromFavourites(id){
    // console.log("id", id)
    var favouriteMovies = [];
    var newFavourite = [];
    let retString = localStorage.getItem("favourites")
    favouriteMovies.push(JSON.parse(retString))
    for (movie in favouriteMovies){
        for(movieId in favouriteMovies[movie]){
            // var movieId = (JSON.parse(favouriteMovies[movie][id]))
            if(id !== JSON.parse(favouriteMovies[movie][movieId])){
                newFavourite.push(favouriteMovies[movie][movieId])
            }
    }}
    let movieStr = JSON.stringify(newFavourite) 
    localStorage.setItem("favourites", movieStr)
    window.location.reload();
}

async function addToFavourites(id){
    console.log(id)
    var moviesArr = [];
    var movieId;
    const resp = await fetch(`https://www.omdbapi.com/?apikey=69f4820b&i=${id}&plot=full`)
    const data = await resp.json()
    movieId = JSON.stringify(data.imdbID);    //storing imdb Id of movie in localStorage and localStorage can only store string so we covert array in string and then store it
    moviesArr = JSON.parse(localStorage.getItem("favourites"))  // copied the localStrage id first and then pushing the new id in that array
    moviesArr.push(movieId);
    let movieStr = JSON.stringify(moviesArr) 
    localStorage.setItem("favourites", movieStr)
    window.alert(data.Title , "added to favourites");

}


function renderList(results){
    for(movie in results){
        // console.log(results[movie].Title)
        const div = document.createElement('div');
        const span = document.createElement("span");
        div.className="col-4 bg-dark "
        div.style.display="sticky"
        div.style.marginLeft="34%"
        div.style.width="470px"
        div.style.borderBottom= "1px solid #ffc107"
        div.innerHTML= `
        <div class="col-2 p-0 m-0 border" style="display: inline-block">
            <img id=${results[movie].imdbID} onclick="movieDetails(this.id)" class= "small-movie-img" src=${results[movie].Poster}>
            
        </div>
        <div class="p-0 m-0 text-white" style="display: inline-block; width: 200px">
                <div style="display: inline ">
                    <label class="align-items-start ">${results[movie].Title}</label>
                    <img id=${results[movie].imdbID} onclick="addToFavourites(this.id)" src="https://cdn-icons-png.flaticon.com/128/2589/2589175.png" class="fav-img"></img>
                            
                            <small style="display: block">Type - ${results[movie].Type}</small>
                            
                            <img class="cal-img" src="https://cdn-icons-png.flaticon.com/128/10755/10755587.png"></img>
                            <small style="display: inline-block"> - ${results[movie].Year}</small>
                </div>     
            </div>
        `
        movieList.append(div);
    }
}

function movieDetails(id){
    let idStr = localStorage.setItem("movieid", id)
    window.location.href = "https://nisarg39.github.io/imdbClone//movieDetails.html"
    
}

async function showMovieDetails(){
    let movieId = localStorage.getItem("movieid")
    // console.log(movieId)
    const resp = await fetch(`https://www.omdbapi.com/?apikey=69f4820b&i=${movieId}&plot=full`)
    const movie = await resp.json()
    // console.log(movie)
    const div = document.createElement('div')
    div.style.display="inherit"
    div.innerHTML = `
        
        <div class="col-4 p-0 m-0">
            <img id=${movie.imdbID} class= "movieDetail-img" src=${movie.Poster}>
        </div>

        <div class="col-8 p-0 m-0 bg-dark">


            <div id="movieDetailCard" class="text-white" >
        
                <div class="col1 pt-2">
                    <div style="display: inline-block; width: 70%; min-width: 70%; ">
                        <h4 style="margin-bottom: 0px;">${movie.Title}</h4>
                    </div>
                    <h6 style="display: inline;">${movie.imdbRating} | </h6>
                    <img id=${movie.imdbID} onclick="removeFromFavourites(this.id)" class="fav-img" src="https://cdn-icons-png.flaticon.com/128/2622/2622103.png" alt="error"></img> 
                </div>  
                <div class="col2 pt-0">
                            <small>${movie.Type} / </small>
                            <small>${movie.Rated} / </small>
                            <small>${movie.Runtime} /</small>
                            <small>${movie.Genre}</small>
                        
                            <h5 style="font-size: 14px; font-weight: 400; margin-top: 15px">SUMMARY</h5>
            
                            <small class="object-fit-contain">${movie.Plot}</small>
                            <p style="margin-top: 1px; margin-bottom: 0px;">Actors - ${movie.Actors}</p>
                            <p style="margin-bottom: 10px; display: inline-block; min-width: 270px; max-width: 270px">Director - ${movie.Director}</p>
                            <p style="margin-bottom: 10px; display: inline-block; min-width: 340px; max-width: 340px">Writer - ${movie.Writer}</p>

                            <div class="row mb-3">
                            <div class="col-8">
                                <img class="cal-img" src="https://cdn-icons-png.flaticon.com/128/3112/3112946.png"></img>
                                <label style="font-size: 12px;"> - ${movie.Awards} </lable>
                            </div>

                            <div class="col-4"> 
                                <img class="cal-img" src="https://cdn-icons-png.flaticon.com/128/10755/10755587.png"></img>
                                <label style="font-size: 12px;"> - ${movie.Released}</lable>
                            </div>
                            </div>

                            <div class="row mb-2">
                            <div class="col-4">
                                <img class="cal-img" src="https://cdn-icons-png.flaticon.com/128/2673/2673003.png"></img>
                                <label style="font-size: 12px;"> - ${movie.imdbVotes}</lable>
                            </div>
                            
                            <div class="col-4">
                                <img class="cal-img" src="https://cdn-icons-png.flaticon.com/256/7648/7648258.png"></img>
                                <label style="font-size: 12px;"> - ${movie.BoxOffice}</lable>
                            </div>

                            <div class="col-4">
                                <img class="cal-img" src="https://cdn-icons-png.flaticon.com/256/6798/6798905.png"></img>
                                <label style="font-size: 12px;"> - ${movie.Ratings[1].Value}</lable>
                            </div>

                            </div>
                            
                </div>
            </div>
        </div>

    `
    movieSelected.append(div)
}