//créer une foncion pour récupérer les informations du produit situés dans le stockage local
let Cart = [];

function getAllProducts() {
    let Cart = localStorage.getItem("Allproducts");
    console.log("Les produits sont récupérés.")
}

getAllProducts;

//faire apparaitre les différents produits dnas le DOM du fichier cart.html
for (let CartParts of Cart) {
    let article = document.createElement("article");
    article.classList.add("cart__item");
    article.setAttribute("data-ID", id);

    let DivpourImagedupanier = document.createElement("div");
    DivpourImagedupanier.classList.add("cart__item__img");
    article.appendChild(DivpourImagedupanier);
    let Imagedupanier = document.createElement("img");
    Imagedupanier.setAttribute("src", image);
    Imagedupanier.setAttribute("alt", alternative);
    DivpourImagedupanier.appendChild(Imagedupanier);

    let DivpourItem = document.createElement("div");
    DivpourItem.classList.add("cart__item__content");

    let DivpourTitlePrice = document.createElement("div");
    DivpourTitlePrice.classList.add("cart__item__content__titlePrice");
    let subtitle2 = document.createElement("h2");
    DivpourTitlePrice.appendChild(subtitle2);
    subtitle2.innerHTML = name;
    let phrase1 = document.createElement("p");
    DivpourTitlePrice.appendChild("phrase1");
    phrase1.innerHTML = (price*number)/100;

    let DivpourQtetInp = document.createElement("div");
    DivpourQtetInp.classList.add("cart__item__content__settings");
    let DivpourQetI = document.createElement("div");
    DivpourQetI.classList.add("cart__item__content__settings__quantity");
    DivpourQtetInp.appendChild(DivpourQetI);
    let Qte = document.createElement("p");
    DivpourQetI.appendChild(Qte);
    Qte.innerHTML = "Qté : ";
    let Input = document.createElement("input");
    DivpourQetI.appendChild(Input);
    Input.setAttribute("type", "number");
    Input.classList.add("itemQuantity");
    Input.setAttribute("name", "itemQuantity");
    Input.setAttribute("min", "1");
    Input.setAttribute("max", "100");
    Input.setAttribute("value", number);
    let Suppr = document.createElement("div");
    Suppr.classList.add("cart__item__content__settings_delete");
    DivpourQtetInp.appendChild("Suppr");
    let phrase2 = document.createElement("p");
    phrase2.classList.add("deleteItem");
    phrase2.innerHTML = "Supprimer";

    console.log("Un nouveau produit est rajouté dans le panier.")
}


//==============================



//changer la valeur de la quantité dans le DOM et l'enregistrer
function UpdateQtyForProduct() {
    let Input = document.getElementsByName("itemQuantity");
    let number = Input.value;
    Input.setAttribute("value", number);
} 

//modifier la valeur dans la classe
//et dans le tableau
function UpdateQtyForCartParts(ProductChanged) {
    let input = document.getElementsByName("itemQuantity");

    ProductChanged.number = Input.value;

    let KanapQty = Cart.indexOf(ProductChanged);
    Cart.splice(KanapQty, 1, ProductChanged);
}

//vider le localstorage
function CleanStorage() {
    localstorage.removeItem('Allproducts');
    console.log("Le Storage se vide.")
}

//le remplir avec le tableau mis à jour
function PutInStorage() {
    localstorage.setItem('Allproducts', Cart);
    console.log("Le panier entre dans le Storage.")
}

//créer une fonction pour exécuter toutes ses fonctions précédentes en même temps
function UpdateCartAfterOneChange() {
    UpdateQtyForProduct;
    UpdateQtyForCartParts(CartParts);
    CleanStorage;
    PutInStorage;
}

//mettre à jour la quantité de produit choisi par l(utilisateur)
for (let CartParts of Cart) {
    let Input = document.getElementsByName("itemQuantity");
    Input.addEventListener('change', UpdateCartAfterOneChange);
}

//===========================

//faire disparaitre du DOM avec display: none
function DOMout() {
    let phrase2 = document.getElementsByClassName("deleteItem");
    let article = phrase2.closest("article");
    article.remove();
}

//sortir le produit du tableau
function Cartout(UselessProduct) {
    let KanapSuppr = Cart.indexOf(UselessProduct);
    Cart.splice(KanapSuppr);
}

//une fonction pour récapituler les précédentes
function SupprQte() {
   DOMout;
    Cartout(CartParts);
    CleanStorage;
    PutInStorage;
}

//éliminer un produit si l'utilisateur le supprime
for (let CartParts of Cart) {
    let phrase2 = document.getElementsByClassName("deleteItem");
    phrase2.addEventListener('click', SupprQte);
}

//============================================= 
//indiquer à l'utilisateur le nombre total de produits et le prix total à payer
//===================================

let numberOfarticles = 0;
let totalpriceOfarticles = 0;

for (let CartParts of Cart) {
    numberofarticles += CartParts.number;
    totalpriceOfarticles += CartParts.number* CartParts.price;
}

document.getElementById("totalQuantity").innerHTML = numberOfarticles;
document.getElementById("totalPrice").innerHTML = totalpriceOfarticles;


//======================
//vérifier les données saisies par l'utilisateur
//======================

let validationForstring = new RegExp(/[A-Z][a-z]{2,}/);

function ValidateFormforString(elementinDOM, form, Sentenceforwarning) {
    if (validationForstring.test(document.getElementById(elementinDOM))) {
        return true;
    } else {
        let Messagewarning = document.getElementById(form);
        Messagewarning.innerHTML = "Veuillez choisir un " + Sentenceforwarning + " valide !";
        return false;
    }
}

ValidateFormforString("firstName", "firstNameErrorMsg", "prénom");
ValidateFormforString("lastName", "lastNameErrorMsg", "nom de famille");
ValidateFormforString("city", "cityErrorMsg", "ville");















