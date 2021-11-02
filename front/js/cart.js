//créer une foncion pour récupérer les informations du produit situés dans le stockage local
function Recevoirleproduit() {
    localStorage.getItem("Produits");
}

//appeler la fonction pour l'exécuter
recevoirleproduit();

//situer les éléments dans le DOM
function montrerProduit() {
    for (Produit of EnsembleduPanier) {
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
        phrase1.innerHTML = price;

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
    }
}

//appeler la fonction pour mettre dans le DOM
montrerProduit();

//==============================

//changer la valeur de la quantité dans le DOM et l'enregistrer
function Changevaleur() {
    let input = document.getElementsByName("itemQuantity");
    input.value = this.value;
} 

//modifier la valeur dans la classe
function ChangeClass() {
    let input = document.getElementsByName("itemQuantity");
    Produit.quantite = input.value;
}

//dans le tableau
function ChangeTableau() {
    let QteKanap = EnsembleduPanier.indexOf(Produit);
    EnsembleduPanier.splice(QteKanap, 1, Produit);
}

function ViderleLocal() {
    localstorage.removeItem('Produits');
}

function AjouterEnsembleauPanier() {
    localstorage.setItem('Produits', EnsembleduPanier);
}

function ChangeQte() {
    Changevaleur;
    ChangeClass;
    ChangeTableau;
    ViderleLocal;
    AjouterEnsembleauPanier;
}

for (Produit of EnsembleduPanier) {
    let input = document.getElementsByName("itemQuantity");
    input.addEventListener('change', ChangeQte);
}

//===========================

//faire disparaitre du DOM avec display: none
function SortirduDOM() {
    let phrase2 = document.getElementsByClassName("deleteItem");
    let article = phrase2.closest("article");
    article.style.display = "none";
}

//sortir le produit du tableau
function SortirduTableau() {
    let SupprKanap = EnsembleduPanier.indexOf(Produit);
    EnsembleduPanier.splice(SupprKanap);
}

function ViderleLocal() {
    localstorage.removeItem('Produits');
}

function AjouterEnsembleauPanier() {
    localstorage.setItem('Produits', EnsembleduPanier);
}

function SupprQte() {
    SortirduDOM();
    SortirduTableau();
    ViderleLocal();
    AjouterEnsembleauPanier();
}

for (Produit of EnsembleduPanier) {
    let phrase2 = document.getElementsByClassName("deleteItem");
    phrase2.addEventListener('click', SupprQte);
}


//rajouter  TOTAL du prix de tous les produits

//récupérer les données des utilisateurs
//vérifier les données des utilisateurs
//envoyer un message d'erreur si...













