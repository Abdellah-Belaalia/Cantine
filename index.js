const popup = document.getElementById("pop-up");
const formStop = document.getElementById("form-stop");
const btnAnnuler = document.getElementById("annule");
const btnValide = document.getElementById("btn-ajout");
const btnValid = document.getElementById("btn-valide");


//==========une seul fois "button X"=============================//
document.getElementById("btn-close").addEventListener("click", function () {
  popup.classList.add("invisible");
});
//===========================================================//


//============button ajouter et annuler==================//
btnAnnuler.addEventListener("click", function (e) {
  popup.classList.add("invisible");
});
document.getElementById("btn-ajout").addEventListener("click", function () {
  popup.classList.remove("invisible");
});
//======================================================//


//=======click dans le div de h3 ne ferme pas la page ===========//
formStop.addEventListener("click", function (e) {
  e.stopPropagation();
});
//===============================================================//

//==============click à côté ferme la fenetre====================
popup.addEventListener("click", function () {
  popup.classList.add("invisible");
});
//=================================================================

//===========après clicker valider la fenetre fermera==========//
formStop.addEventListener("submit", function (e) {
  e.preventDefault();
  popup.classList.add("invisible");
})
//=============================================================//