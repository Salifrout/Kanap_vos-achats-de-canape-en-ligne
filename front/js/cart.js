//*******************************Afficher les produits présents dans le panier*******************************//
let Cart = [];

function getAllProducts() {
    Cart = JSON.parse(localStorage.getItem("Allproducts"));
}

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
        let phrase2 = document.createElement("p");
        Suppr.appendChild(phrase2);
        phrase2.classList.add("deleteItem");
        phrase2.innerHTML = "Supprimer";
    }
} else {
}

//******************enregistrer un changement de quantité de la part de l'utilisateur************************//

//--> modifier la quantité d'un produit enregistré dans le tableau
function UpdateQtyForCartParts(ProductChanged) {
    let Input = document.querySelector(".cart__item__content__settings__quantity input");
    ProductChanged.number = Input.value;
    
    const Element_modified = Cart.indexOf(ProductChanged);
    Cart.splice(Element_modified, 1, ProductChanged);
}

//--> vider le local puis y remettre le tableau mis à jour
function UpdateStorage() {
    localStorage.removeItem('Allproducts');
    localStorage.setItem('Allproducts', JSON.stringify(Cart));
    console.log("Le Storage s'est mis à jour.");
}

if (document.querySelector("article")) {
    for (let CartParts of Cart) {
        let Input = document.querySelector(".cart__item__content__settings__quantity input");   
        Input.addEventListener('input', function (event) {
            event.preventDefault();
            UpdateQtyForCartParts(CartParts);
            UpdateStorage();
            }
        )
    }
}

//**********supprimer un produit du DOM et du localStorage lors du choix de l'utilisateur*****************//

const phrase2 = document.getElementsByClassName("deleteItem");

if (document.querySelector("article")) {
    for (let S = 0; S < phrase2.length; S++) {
        phrase2[S].addEventListener("click", (event) => {
            event.preventDefault();
            let ProductToSuppress = Cart[S]; 

            Cart = Cart.filter((element) => element !== ProductToSuppress);

            localStorage.setItem("Allproducts", JSON.stringify(Cart));
            alert("Un produit a été supprimé du panier.");
            window.location.href = "cart.html";
        })
    }
}

//**********afficher le nombre total de produits présents dans le panier et le prix correspondant************//

let totalForarticles = [];
let numberofarticles = 0;

if (document.querySelector("article")) {
    for (let T = 0; T < Cart.length; T++) {
    
        let Totalpriceofarticles = Cart[T].price*Cart[T].number;
        numberofarticles += parseInt(Cart[T].number);

        totalForarticles.push(Totalpriceofarticles);
    }

    const reducer = (accumulator, currentvalue) => accumulator + currentvalue;
    const TotalPrice = totalForarticles.reduce(reducer, 0);

    document.getElementById("totalPrice").innerHTML = TotalPrice / 100;
    document.getElementById("totalQuantity").innerHTML = parseInt(numberofarticles);
} else {
    document.getElementById("totalPrice").innerHTML = 0;
    document.getElementById("totalQuantity").innerHTML = 0;
}

//***************vérifier les données saisies par l'utilisateur dans le formulaire*******************//

//--> créer des constantes pour identifier les champs de formulaire présents dans le DOM
const FIRSTNAME = document.getElementById("firstName");
const LASTNAME = document.getElementById("lastName");
const CITY = document.getElementById("city");
const EMAIL = document.getElementById("email");
const ADDRESS = document.getElementById("address");

//--> vérifier pour le nom, prénom et la ville
const VALIDATIONFORSTRING = new RegExp(/[A-Z][a-z]{2,}/);

function ValidateFormforString(elementinDOM, Sentenceforwarning) {
    if (VALIDATIONFORSTRING.test(elementinDOM)) {
        return true;
    } else {
        alert("Veuillez choisir un " + Sentenceforwarning + " valide !");
        return false;
    }
}

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

//--> vérifier pour l'email
const VALIDATIONFOREMAIL = new RegExp(/[a-z|1-9]{2,}[@][a-z]{2,}[\.][a-z]{2,3}/);

function ValidateFormforEmail(elementinDOM) {
    if (VALIDATIONFOREMAIL.test(elementinDOM)) {
        return true;
    } else {
        alert("Veuillez choisir une adresse e-mail valide.");
        return false;
    }
}

EMAIL.addEventListener("change", function(e) {
    e.preventDefault();
    ValidateFormforEmail(EMAIL.value)}
    )
;

//--> vérifier pour l'adresse physique
const VALIDATIONFORADDRESS = new RegExp(/.{7,60}/);

function ValidateFormforAdress(elementinDOM) {
    if (VALIDATIONFORADDRESS.test(elementinDOM)) {
        return true;
    } else {
        alert("Veuillez choisir une adresse physique valide.");
        return false;
    }
}

ADDRESS.addEventListener("change", function(e) {
    e.preventDefault();
    ValidateFormforAdress(ADDRESS.value)}
    )
;

//=====================================

//créer l'array pour les éléments du formulaire (contact du visiteur) puis pour l'ensemble des produits (array of strings des id de produits),
//puis POST vers l'API en json ces deyux tableaux
//faire un test avec la console pour voir si bien effectuer
//passer à la page de confirmation

// let array = éléments récupérés dans le formulaire .value 

//**************************création de la commande de l'utilisateur****************************//

//--> enregistrer les produits commandés
let ArrayofProductsToConfirm = [];

function ProductsToBuy() {
    if (VALIDATIONFORSTRING.test(FIRSTNAME.value) && VALIDATIONFORSTRING.test(LASTNAME.value) && VALIDATIONFORSTRING.test(CITY.value) && VALIDATIONFOREMAIL.test(EMAIL.value) && VALIDATIONFORADDRESS.test(ADDRESS.value)) {
        if (document.querySelector("article")) {
            for (let CartParts of Cart) {
                if (typeof CartParts.id === 'string') {
                    ArrayofProductsToConfirm.push(CartParts.id);
                    console.log("la commande de la totalité des produits a été enregistrée.");
                    return ArrayofProductsToConfirm; 
                } else {
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

function InfosToRegister() {

    //???if (ValidateFormforString.test(FIRSTNAME.value) && ValidateFormforString.test(LASTNAME) && ValidateFormforString.test(CITY.value) && ValidateFormforEmail.test(EMAIL.value) && ValidateFormforAdress.test(ADDRESS.value)) {
    if (ProductsToBuy()) {
        Infos_Customer = new Customer(FIRSTNAME.value, LASTNAME.value, CITY.value, EMAIL.value, ADDRESS.value);
        console.log(Infos_Customer);
        console.log("les informations du client ont été enregistré.");
        
        return Infos_Customer;
    } else {
        console.log("Les informations du client n'ont pas pu être enregistré.");
        return false;
    }
}

const SEND_COMMAND = "http://localhost:3000/api/products/order";
  
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
  
async function Confirm() {
    if (InfosToRegister()) {
        await RegisterforConfirming();    
        document.location.href = "./confirmation.html";
    } else {
        alert("Une erreur est survenue. Veuillez vérifier vos articles ainsi que vos informations de contact.");
        return false;
    }
}
 
document.getElementById("order").addEventListener('click', async function(e) {
    e.preventDefault();
    Confirm();
})








//FAIRE EN SORTE QUE PRIX SACUTALISE LORS CHANGEMENT DE QUANTITE