const searchBar = document.querySelector(".users .search input"),
searchBtn = document.querySelector(".users .search button"),
userslist = document.querySelector(".users .users-list");

searchBtn.onclick = ()=>{
    searchBar.classList.toggle("active");
    searchBar.focus();
    searchBtn.classList.toggle("active");
    searchBar.value = "";
}

searchBar.onkeyup = ()=>{
    let searchTerm = searchBar.ariaValueMax;
    if(searchTerm != ""){
        searchBar.classList.add("active");
    }else{
        searchBar.classList.remove("active");
    }
        //starting Ajax
        let xhr = new XMLHttpRequest();  //CREATING XML object
        xhr.open("POST", "php/search.php", true);
        xhr.onload =() =>{
            if(xhr.readyState === XMLHttpRequest.DONE){
                if(xhr.status === 200){
                    let data = xhr.response;
                    userslist.innerHTML = data;
                }
            }
        }
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send("searchTerm=" + searchTerm);
    }

setInterval(() =>{
    //starting Ajax
    let xhr = new XMLHttpRequest();  //CREATING XML object
    xhr.open("GET", "php/users.php", true);
    xhr.onload =() =>{
        if(xhr.readyState === XMLHttpRequest.DONE){
            if(xhr.status === 200){
                let data = xhr.response;
                if(!searchBar.classList.contains("active")){ // if active not contains in search bar then add this data
                    userslist.innerHTML = data;
                }
            }
        }
    }
    xhr.send();
}, 500); //this function will run frequently after 500ms