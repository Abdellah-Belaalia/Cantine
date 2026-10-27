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
btnAnnuler.addEventListener("click", function () {
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
});
//=============================================================//

//==================function ajouter===========================//
let inptArray = [];
let nextId = 1;
let recetteId = null;
let carteModifier = null;
formStop.addEventListener("submit", function (e) {
  e.preventDefault();
  let pltNom = document.getElementById("ptext").value;
  let categorie = document.getElementById("categorie").value;
  let badge = document.getElementById("badge").value;
  let price = document.getElementById("price").value;

  if (recetteId !== null) {
    for (let i = 0; i < inptArray.length; i++) {
      if (inptArray[i].id === recetteId) {
        inptArray[i].nomPlat = pltNom;
        inptArray[i].categorieEl = categorie;
        inptArray[i].badgeQual = badge;
        inptArray[i].prixPlat = price;

        let platModifier = inptArray[i];

        carteModifier.remove();

        afficheCarte(platModifier);

        break;
      }
    }

    recetteId = null;
    carteModifier = null;
  } else {
    let platInfo = {
      id: nextId++,
      nomPlat: pltNom,
      categorieEl: categorie,
      badgeQual: badge,
      prixPlat: price,
    };
    inptArray.push(platInfo);
    afficheCarte(platInfo);
    choisisRecette();
  }

  document.getElementById("ptext").value = "";
  document.getElementById("categorie").value = "";
  document.getElementById("badge").value = "";
  document.getElementById("price").value = "";
});
//=================================================================//

//===============function Afficher=================================//µ
const categories = {
  Entrée: document.getElementById("entree-carte"),
  "Plat principal": document.getElementById("platPrincip-carte"),
  Dessert: document.getElementById("dessert-carte"),
};
function afficheCarte(platInfo) {
  const container = categories[platInfo.categorieEl];
  const card = document.createElement("div");
  card.dataset.id = platInfo.id;
  card.className =
    "text-2xl rounded-2xl flex flex-col p-2 m-2 w-60 bg-[#F8FAFC] font-bold text-[#333333] ";
  card.innerHTML = `<img
                  src="assets/images/imagenotfound.png"
                  alt=""
                  class="rounded-2xl w-4/5 p-2 mx-auto h-42 "
                /><div class="p-2 items-start ">
                  <h4>${platInfo.nomPlat}</h4>
                  <span>Prix</span>
                  <span>${platInfo.prixPlat}</span>
                  <p>${platInfo.badgeQual}</p>
                </div>
                <div class="flex justify-between items-center p-2">
                  <button
                    type="button" id="modifier"
                    class="border rounded bg-[#277A3E] p-3 text-lg align-middle text-white"
                  >
                    Modifier
                  </button>
                  <button
                    type="button" id="supprimer"
                    class="border rounded bg-[#C92A2A] p-3 text-lg text-white align-middle"
                  >
                    Supprimer
                  </button>
                </div>`;
  container.appendChild(card);
}
//=======================================================================//

//=====================function Supprimer=================================//
document.addEventListener("click", function (e) {
  if (e.target.id === "supprimer") {
    let card = e.target.parentElement.parentElement;
    let id = Number(card.dataset.id);
    for (let i = 0; i < inptArray.length; i++) {
      if (inptArray[i].id === id) {
        inptArray.splice(i, 1);
        break;
      }
    }
    card.remove();
  }
});
//==========================================================================//
//========================function modifier=================================//
document.addEventListener("click", function (e) {
  if (e.target.id === "modifier") {
    carteModifier = e.target.parentElement.parentElement;
    let id = Number(carteModifier.dataset.id);
    for (let i = 0; i < inptArray.length; i++) {
      if (inptArray[i].id === id) {
        let plat = inptArray[i];

        recetteId = id;

        document.getElementById("ptext").value = plat.nomPlat;
        document.getElementById("categorie").value = plat.categorieEl;
        document.getElementById("badge").value = plat.badgeQual;
        document.getElementById("price").value = plat.prixPlat;

        popup.classList.remove("invisible");

        break;
      }
    }
  }
});
//======================================================================//
//======================function choisir==============================//
function choisisRecette() {
  const repasCards = document.querySelectorAll(".repas-cartes");

  for (let i = 0; i < repasCards.length; i++) {
    const repasCard = repasCards[i];

    const entree = repasCard.querySelector(".entree");
    const platPrincipale = repasCard.querySelector(".plat-principale");
    const dessert = repasCard.querySelector(".dessert");

    entree.innerHTML = "";
    platPrincipale.innerHTML = "";
    dessert.innerHTML = "";

    const optionEntree = document.createElement("option");
    optionEntree.value = "";
    optionEntree.textContent = "Choisir une entrée";
    entree.appendChild(optionEntree);

    const optionPlat = document.createElement("option");
    optionPlat.value = "";
    optionPlat.textContent = "Choisir un plat principale";
    platPrincipale.appendChild(optionPlat);

    const optionDessert = document.createElement("option");
    optionDessert.value = "";
    optionDessert.textContent = "Choisir un dessert";
    dessert.appendChild(optionDessert);

    for (let j = 0; j < inptArray.length; j++) {
      const plat = inptArray[j];

      const option = document.createElement("option");
      option.value = plat.id;
      option.textContent = plat.nomPlat;

      if (plat.categorieEl === "Entrée") {
        entree.appendChild(option);
      } else if (plat.categorieEl === "Plat principal") {
        platPrincipale.appendChild(option);
      } else if (plat.categorieEl === "Dessert") {
        dessert.appendChild(option);
      }
    }

    repasCard.querySelector("h4").textContent = `Repas N° ${i + 1}`;
  }
}
//================================================================//
//===================function calcutorTpatal======================//
function calculTotal(repasCard) {
  let total = 0;

  let entreeId = repasCard.querySelector(".entree").value;
  let platId = repasCard.querySelector(".plat-principale").value;
  let dessertId = repasCard.querySelector(".dessert").value;

  for (let i = 0; i < inptArray.length; i++) {
    if (
      inptArray[i].id === Number(entreeId) ||
      inptArray[i].id === Number(platId) ||
      inptArray[i].id === Number(dessertId)
    ) {
      total += Number(inptArray[i].prixPlat);
    }
  }
  repasCard.querySelector(".repas-total").textContent = total + "/50 DH";

  return total;
}
//=================================================================//
//======================verifier le total =========================//
function verifierBudget(repasCard, select) {
  let ancienValeur = select.dataset.ancienValeur || "";

  let total = calculTotal(repasCard);

  if (total > 50) {
    alert("Budget de journée est dépasser !!");
    select.value = ancienValeur;
    calculTotal(repasCard);
  } else {
    select.dataset.ancienValeur = select.value;
  }
}
//=================================================================//
//========================               ==========================//
const repasCards = document.querySelectorAll(".repas-cartes");

for(let i =0; i < repasCards.length; i++){
  const repasCard = repasCards[i];
  const selects = repasCard.querySelectorAll("select");

  for (let j = 0; j < selects.length; j++){
    selects[j].addEventListener("change", function (){
      verifierBudget(repasCard, selects[j]);
    });
  }
  calculTotal(repasCard);
}