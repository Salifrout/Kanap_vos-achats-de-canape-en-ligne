//******************************************************************************************************//
//*******************************déclaration des variables et constantes********************************//
//******************************************************************************************************//

//--> variable pour nommer le tableau contenant la liste des produits présents dans le panier
let Cart = [];

//--> enregistrer les produits commandés
let ArrayofProductsToConfirm = [];

//--> création de la classe pour créer l'identité de l'acheteur
class Customer {
    constructor(firstName, lastName, city, email, address) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.city = city;
        this.email = email;
        this.address = address;
    }
}

//--> création d'une instance de classe pour créer un nouvel acheteur
let Infos_Customer = {};

const InputQ = document.querySelector(".cart__item__content__settings__quantity input"); //??????????
const phrase_pour_supp = document.getElementsByClassName("deleteItem"); //???????????????????????????

//--> créer des constantes pour identifier les champs de formulaire présents dans le DOM
const FIRSTNAME = document.getElementById("firstName");
const LASTNAME = document.getElementById("lastName");
const CITY = document.getElementById("city");
const EMAIL = document.getElementById("email");
const ADDRESS = document.getElementById("address");

//--> vérifier pour le nom, prénom et la ville
const VALIDATIONFORSTRING = new RegExp(/[A-Z][a-z]{2,}/);
//--> vérifier pour l'email
const VALIDATIONFOREMAIL = new RegExp(/[a-z|1-9]{2,}[@][a-z]{2,}[\.][a-z]{2,3}/);
//--> vérifier pour l'adresse physique
const VALIDATIONFORADDRESS = new RegExp(/.{7,60}/);

//--> pour requêter l'API
const SEND_COMMAND = "http://localhost:3000/api/products/order";

//******************************************************************************************************//
//***************************************création des fonctions*****************************************//
//******************************************************************************************************//

//--> créer une foncion pour récupérer les informations des produits situés dans le stockage local
function getAllProducts() {
    Cart = JSON.parse(localStorage.getItem("Allproducts"));
    console.log("Les produits sont récupérés.");
}

//--> vider le local puis y remettre le tableau mis à jour
function UpdateStorage() {
    localStorage.removeItem('Allproducts');
    localStorage.setItem('Allproducts', JSON.stringify(Cart));
}

//--> vérifier les données saisies par l'utilisateur dans le formulaire 1/3
function ValidateFormforString(elementinDOM, Sentenceforwarning) {
    if (VALIDATIONFORSTRING.test(elementinDOM)) {
        return true;
    } else {
        alert("Veuillez choisir un " + Sentenceforwarning + " valide !");
        return false;
    }
}

//--> vérifier les données saisies par l'utilisateur dans le formulaire 2/3
function ValidateFormforEmail(elementinDOM) {
    if (VALIDATIONFOREMAIL.test(elementinDOM)) {
        return true;
    } else {
        alert("Veuillez choisir une adresse e-mail valide.");
        return false;
    }
}

//--> vérifier les données saisies par l'utilisateur dans le formulaire 3/3
function ValidateFormforAdress(elementinDOM) {
    if (VALIDATIONFORADDRESS.test(elementinDOM)) {
        return true;
    } else {
        alert("Veuillez choisir une adresse physique valide.");
        return false;
    }
}

//--> vérifier si le formulaire est valide et si des produits sont présents dans le panier pour les rajouter dans le tableau des produits dont la commande sera demandée
function ProductsToBuy() {
    if (VALIDATIONFORSTRING.test(FIRSTNAME.value) && VALIDATIONFORSTRING.test(LASTNAME.value) && VALIDATIONFORSTRING.test(CITY.value) && VALIDATIONFOREMAIL.test(EMAIL.value) && VALIDATIONFORADDRESS.test(ADDRESS.value)) {
        if (document.querySelector("article")) {
            for (let CartParts of Cart) {
                if (typeof CartParts.id === 'string') {
                    ArrayofProductsToConfirm.push(CartParts.id);
                    return ArrayofProductsToConfirm; 
                }
            }
        } else {
            alert("Vous ne pouvez effectuer une commande sans avoir introduit un article dans votre panier.");
            return false;
        }
    } else {
        alert("Vous ne pouvez effectuer une commande sans avoir entré toutes vos informations de contact valides.");
    }
}

//--> créer un objet avec les informations de contact
function InfosToRegister() {
    if (ProductsToBuy()) {
        Infos_Customer = new Customer(FIRSTNAME.value, LASTNAME.value, CITY.value, EMAIL.value, ADDRESS.value);
        
        return Infos_Customer;
    } else {
        return false;
    }
}

//--> requêter l'api et récupérer l'ID de commande
async function RegisterforConfirming() {
    const CommandeByClient = {contact: Infos_Customer, products: ArrayofProductsToConfirm};
     
    const res = await fetch(SEND_COMMAND, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(CommandeByClient)
    });

    const value = await res.json();
    if(value) {
        sessionStorage.setItem('IDcommand', value.orderId);
    } else {
        alert("Une erreur est survenue. Veuillez réessayer ultérieurement.");
    }
}
 
//--> enregistrer la commande et renvoyer vers la page de confirmation ou bien demander à l'utilisateur de vérifier ses articles et informations de contact
async function Confirm() {
    if (InfosToRegister()) {
        await RegisterforConfirming();    
        document.location.href = "./confirmation.html";
    } else {
        alert("Une erreur est survenue. Veuillez vérifier vos articles ainsi que vos informations de contact.");
        return false;
    }
}

//******************************************************************************************************//
//******************************appel des fonctions et excétuion du code********************************//
//******************************************************************************************************//

//--> le panier est récupéré depuis le stockage local
getAllProducts();

//localStorage.clear();

if (localStorage.getItem("Allproducts")) {
    for (let CartParts of Cart) {

        let article = document.createElement("article");
        document.getElementById("cart__items").appendChild(article);
        article.classList.add("cart__item");
        article.setAttribute("data-ID", CartParts.id);
    
        let DivpourImagedupanier = document.createElement("div");
        DivpourImagedupanier.classList.add("cart__item__img");
        article.appendChild(DivpourImagedupanier);
        let Imagedupanier = document.createElement("img");
        Imagedupanier.setAttribute("src", CartParts.image);
        Imagedupanier.setAttribute("alt", CartParts.alternative);
        DivpourImagedupanier.appendChild(Imagedupanier);
    
        let DivpourItem = document.createElement("div");
        DivpourItem.classList.add("cart__item__content");
        article.appendChild(DivpourItem);
    
        let DivpourTitlePrice = document.createElement("div");
        DivpourItem.appendChild(DivpourTitlePrice);
        DivpourTitlePrice.classList.add("cart__item__content__titlePrice");
        let subtitle2 = document.createElement("h2");
        DivpourTitlePrice.appendChild(subtitle2);
        subtitle2.innerHTML = CartParts.name;
        let phrase1 = document.createElement("p");
        DivpourTitlePrice.appendChild(phrase1);
        phrase1.innerHTML = (CartParts.price*CartParts.number) / 100 + " €";
    
        let DivpourQtetInp = document.createElement("div");
        DivpourItem.appendChild(DivpourQtetInp);
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
        Input.setAttribute("value", CartParts.number);
        let Suppr = document.createElement("div");
        Suppr.classList.add("cart__item__content__settings__delete");
        DivpourQtetInp.appendChild(Suppr);
        let phrase_pour_supp = document.createElement("p");
        Suppr.appendChild(phrase_pour_supp);
        phrase_pour_supp.classList.add("deleteItem");
        phrase_pour_supp.innerHTML = "Supprimer";
    }
}

//******************enregistrer un changement de quantité de la part de l'utilisateur************************//

//--> modifier la quantité d'un produit enregistré dans le tableau

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

    ProductChanged.number = InputQ.value;
    
    const Element_modified = Cart.indexOf(ProductChanged);
    Cart.splice(Element_modified, 1, ProductChanged); //

}

function UpdateStorage() {
    localStorage.removeItem('Allproducts');
    localStorage.setItem('Allproducts', Cart);
    console.log("Le Storage s'est mis à jour.");
}


//créer une fonction pour exécuter toutes ses fonctions précédentes en même temps
function UpdateCartAfterOneChange() {
    UpdateQtyForProduct();
    UpdateQtyForCartParts(CartParts);
    UpdateStorage();
}

//--> enregistrement d'un changement de quantité de la part de l'utilisateur
/*if (document.querySelector("article")) {
    const Input = document.querySelector(".cart__item__content__settings__quantity input");

    for (let U = 0; U < Input.length; U++) {
        
        Input.addEventListener('input', function (e) {
            e.preventDefault();
            console.log(Input + 'test1');
            Cart[U].number = Input[U].value;
            console.log(typeof Cart + Cart.length + 'testbla' + Cart[U].number);
            const Index_modified = Cart.indexOf(Cart[U]);
            console.log(Index_modified + 'test3' + Cart[U]);
            Cart.splice(Index_modified, 1, Cart[U]);
            console.log(Cart);
            UpdateStorage();
            }
        )
    }
}*/

if (document.querySelector("article")) {
    for (let CartParts of Cart) {
        InputQ.addEventListener('input', function (event) {
            event.preventDefault();
            UpdateQtyForCartParts(CartParts);
            UpdateStorage();
            }
        )
    }
}

//**********supprimer un produit du DOM et du localStorage lors du choix de l'utilisateur*****************//

if (document.querySelector("article")) {
    for (let S = 0; S < phrase_pour_supp.length; S++) {
        phrase_pour_supp[S].addEventListener("click", (event) => {
            event.preventDefault();
            let ProductToSuppress = Cart[S]; 
//envisager de rassembler les codes de fonction courte dnas cette autre fonction

//mettre à jour la quantité de produit choisi par l(utilisateur)
for (let CartParts of Cart) {
    let Input = document.getElementsByName("itemQuantity");
    Input.addEventListener('change', UpdateCartAfterOneChange());
    
}

//===========================


//faire disparaitre du DOM avec display: none
function DOMout() {
    let phrase_pour_supp = document.getElementsByClassName("deleteItem");
    let article = phrase_pour_supp.closest("article");
    article.remove();
}


            localStorage.setItem("Allproducts", JSON.stringify(Cart));
            alert("Un produit a été supprimé du panier.");
            location.reload();
        })
    }
}

//**********afficher le nombre total de produits présents dans le panier et le prix correspondant************//

if (document.querySelector("article")) {
    for (let T = 0; T < Cart.length; T++) {
    
        let Totalpriceofarticles = Cart[T].price*Cart[T].number;
        numberofarticles += parseInt(Cart[T].number);

//sortir le produit du tableau
function Cartout(UselessProduct) {
    let KanapSuppr = Cart.indexOf(UselessProduct);
    Cart.splice(KanapSuppr);
}

//une fonction pour récapituler les précédentes
function SupprQte() {
    DOMout();
    Cartout(CartParts);
    UpdateStorage();
}

//fonction updatestorage de cleanstorage et putinstorage

//éliminer un produit si l'utilisateur le supprime
for (let CartParts of Cart) {
    let phrase_pour_supp = document.getElementsByClassName("deleteItem");
    phrase_pour_supp.addEventListener('click', SupprQte);
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


//--> vérification des données saisies par l'utilisateur dans le formulaire 1/5

//***************vérifier les données saisies par l'utilisateur dans le formulaire*******************//

FIRSTNAME.onchange = function(e){
    e.preventDefault();
    ValidateFormforString(FIRSTNAME.value, "prénom")
};

LASTNAME.addEventListener("change", function(e) {
    e.preventDefault();
    ValidateFormforString(LASTNAME.value, "nom de famille")}
    )
;

CITY.addEventListener("change", function(e) {
    e.preventDefault();
    ValidateFormforString(CITY.value, "nom de ville")}
    )
; 

EMAIL.addEventListener("change", function(e) {
    e.preventDefault();
    ValidateFormforEmail(EMAIL.value)}
    )
;

ADDRESS.addEventListener("change", function(e) {
    e.preventDefault();
    ValidateFormforAdress(ADDRESS.value)}
    )
;

//**************************création de la commande de l'utilisateur****************************//

function ProductsToBuy() {
    if (VALIDATIONFORSTRING.test(FIRSTNAME.value) && VALIDATIONFORSTRING.test(LASTNAME.value) && VALIDATIONFORSTRING.test(CITY.value) && VALIDATIONFOREMAIL.test(EMAIL.value) && VALIDATIONFORADDRESS.test(ADDRESS.value)) {
        if (document.querySelector("article")) {
            for (let CartParts of Cart) {
                if (typeof CartParts.id === 'string') {
                    ArrayofProductsToConfirm.push(CartParts.id);
                    console.log("la commande de la totalité des produits a été enregistrée.");
                    return ArrayofProductsToConfirm; 
                }
            }
        } else {
            alert("Vous ne pouvez effectuer une commande sans avoir introduit un article dans votre panier.");
            console.log("la commande de la totatité des produits n'a pas pu être enregistrée.");
            return false;
        }
    } else {
        alert("Vous ne pouvez effectuer une commande sans avoir entré toutes vos informations de contact.");
    }
}
  
 
document.getElementById("order").addEventListener('click', async function(e) {
    e.preventDefault();
    Confirm();
})

//opérateur binaire mettre un epsace, les opérateurs unaires ne peut pas mettre espace
let totalpriceOfarticles = totalForarticles / 100;

document.getElementById("totalQuantity").innerHTML = numberOfarticles;
document.getElementById("totalPrice").innerHTML = totalpriceOfarticles;


//======================
//vérifier les données saisies par l'utilisateur
//======================



document.getElementById("firstName").onchange = ValidateFormforString("firstName", "firstNameErrorMsg", "prénom");
document.getElementById("lastName").onchange = ValidateFormforString("lastName", "lastNameErrorMsg", "nom de famille");
document.getElementById("city").onchange = ValidateFormforString("city", "cityErrorMsg", "nom de ville");




document.getElementById("email").onchange = ValidateFormforEmail("email", "emailErrorMsg");




document.getElementById("address").onchange = ValidateFormforAdress("address", "addressErrorMsg");



document.getElementById("order").addEventListener('click', Confirm);

