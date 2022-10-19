const form=document.querySelector("#film-form");
const titleElement=document.getElementById("title");
const directorElement=document.querySelector("#director");
const urlElement=document.getElementById("url");
const cardbody=document.querySelectorAll(".card-body")[1];
const clear=document.getElementById("clear-films");

eventListeners();

function eventListeners(){
    form.addEventListener("submit",addFilm);
    document.addEventListener("DOMContentLoaded",function(){
        let films=Storage.getFilmsFromStorage();
        UI.loadAllFilms(films);
    });
    cardbody.addEventListener("click",deleteFilm);
    clear.addEventListener("click",clearAllFilms);
}




function addFilm(e){
    const title=titleElement.value;
    const director=directorElement.value;
    const url=urlElement.value;

    if(title === "" || director === "" || url ===" "){
        UI.displayMessages("Tüm alanları doldurun...","danger");
    }
    else{
        const newFilm=new Film(title,director,url);

        UI.addFilmToUI(newFilm);

        Storage.addFilmToStorage(newFilm);

        UI.displayMessages("Film başarıyla eklendi...","success");
    }

    


    UI.clearInputs(titleElement,directorElement,urlElement);
    e.preventDefault(e);
}
function deleteFilm(e){
    if(e.target.id==="delete-film"){
        UI.deleteFilmFromUI(e.target);
        Storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);

        UI.displayMessages("Silme işlemi başarılı...","success");
    }

}
function clearAllFilms(e){
    if(confirm("Emin misiniz...?")){
        UI.clearAllFilmsFromUI();
    Storage.clearAllFilmsFromStorage();
    }

    
}


