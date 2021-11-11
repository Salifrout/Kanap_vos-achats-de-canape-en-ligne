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
    article.setAttribute("data-ID", id); //CartParts._id ?..

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
    subtitle2.innerHTML = name; //Cartparts.name?..
    let phrase1 = document.createElement("p");
    DivpourTitlePrice.appendChild("phrase1");
    phrase1.innerHTML = (price*number) / 100;

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

function UpdateStorage() {
    localstorage.removeItem('Allproducts');
    localstorage.setItem('Allproducts', Cart);
    console.log("Le Storage s'est mis à jour.");
}

//créer une fonction pour exécuter toutes ses fonctions précédentes en même temps
function UpdateCartAfterOneChange() {
    UpdateQtyForProduct;
    UpdateQtyForCartParts(CartParts);
    UpdateStorage;
}

//envisager de rassembler les codes de fonction courte dnas cette autre fonction

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
    UpdateStorage;
}

//fonction updatestorage de cleanstorage et putinstorage

//éliminer un produit si l'utilisateur le supprime
for (let CartParts of Cart) {
    let phrase2 = document.getElementsByClassName("deleteItem");
    phrase2.addEventListener('click', SupprQte);
}

//============================================= 
//indiquer à l'utilisateur le nombre total de produits et le prix total à payer
//===================================

let numberOfarticles = 0;
let totalForarticles = 0;

for (let CartParts of Cart) {
    numberofarticles += CartParts.number;
    totalForarticles += CartParts.number*CartParts.price;
}


//opérateur binaire mettre un epsace, les opérateurs unaires ne peut pas mettre espace
let totalpriceOfarticles = totalForarticles / 100;

document.getElementById("totalQuantity").innerHTML = numberOfarticles;
document.getElementById("totalPrice").innerHTML = totalpriceOfarticles;


//======================
//vérifier les données saisies par l'utilisateur
//======================

let validationForstring = new RegExp(/[A-Z][a-z]{2,}/s);

function ValidateFormforString(elementinDOM, form, Sentenceforwarning) {
    if (validationForstring.test(document.getElementById(elementinDOM))) {
        return true;
    } else {
        let Messagewarning = document.getElementById(form);
        Messagewarning.innerHTML = "Veuillez choisir un " + Sentenceforwarning + " valide !";
        return false;
    }
}

document.getElementById("firstName").onchange = ValidateFormforString("firstName", "firstNameErrorMsg", "prénom");
document.getElementById("lastName").onchange = ValidateFormforString("lastName", "lastNameErrorMsg", "nom de famille");
document.getElementById("city").onchange = ValidateFormforString("city", "cityErrorMsg", "nom de ville");



let ValidationForEmail = new RegExp(/[a-z|1-9]{2,}[@][a-z]{2,}[\.][a-z]{2,3}/s);

function ValidateFormforEmail(elementinDOM, form) {
    if (ValidationForEmail.test(document.getElementById(elementinDOM))) {
        return true;
    } else {
        let Messagewarning = document.getElementById(form);
        Messagewarning.innerHTML = "Veuillez choisir une adresse e-mail valide.";
        return false;
    }
}

document.getElementById("email").onchange = ValidateFormforEmail("email", "emailErrorMsg");



let ValidationForAdress = new RegExp(/.{7,60}/s);

function ValidateFormforAdress(elementinDOM, form) {
    if (ValidationForAdress.test(document.getElementById(elementinDOM))) {
        return true;
    } else {
        let Messagewarning = document.getElementById(form);
        Messagewarning.innerHTML = "Veuillez choisir une adresse physique valide.";
        return false;
    }
}

document.getElementById("adress").onchange = ValidateFormforEmail("adress", "addressErrorMsg");

//=====================================

//créer l'array pour les éléments du formulaire (contact du visiteur) puis pour l'ensemble des produits (array of strings des id de produits),
//puis POST vers l'API en json ces deyux tableaux
//faire un test avec la console pour voir si bien effectuer
//passer à la page de confirmation

// let array = éléments récupérés dans le formulaire .value 



let ArrayofProductsToConfirm = [];

function ProductsToBuy() {
    if (document.body.contains(article)) {
        for (let CartParts of Cart) {
            if (typeof CartParts._id === 'string') {
                ArrayofProductsToConfirm.push(CartParts._id);
                console.log("la commande de la totalité des produits a été enregistrée.");
                return true; 
            } else {
            }
        }
    } else {
        console.log("la commande de la totatité des produits n'a pas pu être enregistrée.");
        return false;
    }
}

class Customer {
    constructor(firstName, lastName, city, email, adress) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.city = city;
        this.email = email;
        this.adress = adress;
    }
}

let Infos_Customer = {};
let ArrayofInfosofCustomer = [];

function InfosToRegister() {
    if (ValidateFormforString() || ValidateFormforAdress() || ValidateFormforEmail()) {
        let Infos_Customer = new Customer(document.getElementById("firstName").value, document.getElementById("lastName").value, document.getElementById("city").value, document.getElementById("email").value, document.getElementById("adress").value);
        ArrayofInfosofCustomer.push(Infos_Customer);
        
        console.log("les informations du client ont été enregistré.");
    } else {
        console.log("Les informations du client n'ont pas pu être enregistré.");
        return false;
    }
}

let IDcommand = "";

function RegisterforConfirming(e) {
    e.preventDefault();
    fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        headers: {
            'Accept': 'application/json', 
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({contact: ArrayofInfosofCustomer}, {products: ArrayofProductsToConfirm})
    })
    .then(function(res) {
        if (res.ok) {
            console.log("la requête cart.js est opérationelle.");
            return res.json();
        }
    })
    .then(function(value) {
        let IDcommand = value.orderId;
    })
    .catch(function(err) {
        console.log("Une erreur est intervenue lors de la requête dans cart.js");
    });
}

function Confirm() {
    ProductsToBuy;
    InfosToRegister;

    if (ProductsToBuy() || InfosToRegister()) {
        RegisterforConfirming;
        window.location.href("./confirmation.html?order=" + IDcommand);
    } else {
        alert("Une erreur est survenue. Veuillez vérifier vos articles ainsi que vos informations de contact.");
        return false;
    }
}

document.getElementById("order").addEventListener('click', Confirm);

//======================================
//========================================

//créer un nom de variable pour récupérer l'URL de la page
let URLforconfirmation = window.location.href;
let urlc = new URL(URLforconfirmation);

//créer une variable pour définir la valeur du paramètre id situé dans l'URL
let orderID = urlc.searchParams.get("order");

function ShowCommand(command) {
    if (command == null) {
        document.getElementById("orderId").innerText = "Attention ! Votre numéro de commande a été perdu. Veuillez retourner au panier."
        console.error("l'identifiant de commande a disparu.")
    } else{
        document.getElementById("orderId").innerHTML = command;
        console.log("l'Id de commande est correctement affiché.")
    }
}

ShowCommand(orderID);





