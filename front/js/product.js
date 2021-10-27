//créer un nom de variable pour récupérer l'URL de la page
let URLofpage = window.location.href;
let url = new URL(URLofpage);

//créer une variable pour définir la valeur du paramètre id situé dans l'URL
let product_ID = url.searchParams.get("id");

//créer des variables vides pour modifier leurs valeurs ensuite dans la requête de l'API
//let listofproducts = [];
//let imageofproduct = "";
//let AlternativeTextofproduct = "";
//let nameofproduct = "";
//let descriptionofproduct = "";
//let IDofproduct = "";
//let colorsofproduct = [];
//let priceofproduct = "";

//requêter l'API
//créer une fonction getproduct pour récupérer l'API, vérfier ok, transfomer json en js, et faire ensuite ce qu'on veut
function Afficherleproduit() {
    fetch("http://localhost:3000/api/products")
    .then(function(response) {
        if (response.ok) {
            //vérifier si la réponse est ok, si oui la traduire en json puis la convertir en array
            //pour l'utiliser dans la boucle for qui suivra
            //return response.json();
            let listofproducts = JSON.parse(response);
        }
    })
    .then(function(value) {
        let product_img = document.createElement("img");
        document.getElementsByClassName('item__img').appendChild(product_img);
        product_img.setAttribute("alt", value.altTxt + ", " + value.name);
        product_img.innerHTML = value.imageUrl;

        document.getElementById("title").innerHTML = value.name;
        document.getElementById("price").innerHTML = value.price;
        document.getElementById("description").innerHTML = value.description;

        let colorsofproduct = value.colors;
        for (color of colorsofproduct) {
            let colorInOption = document.createElement("option");
            document.getElementById("colors").appendChild(colorInOption);
            colorInOption.setAttribute("option", color);
            colorInOption.innerHTML = color;
        //donner un nom de variable pour chaque information du produit ( nom, id, image, etc.)
        //let imageofproduct = value.imageUrl;
        //let AlternativeTextofproduct = value.altTxt + ", " + value.name;
        //let nameofproduct = value.name;
        //let descriptionofproduct = value.description;
        //let IDofproduct = value._id;
        //let colorsofproduct = value.colors;
        //let priceofproduct = value.price;
    })
    .catch(function(error) {
        //prévenir en cas d'erreur
        console.log("Une erreur empêche le résultat de s'afficher.")
    });
}

//créer une boucle pour vérifier si pour chaque produit, la valeur du paramètre ID dans L'URL est égale à celle de l'ID
//du produit situé dans l'API. Si la réponse est oui: créer les éléments d'informations du produit, expliquer où ils
//doivent se trouver dans le DOM et ce qu'ils doivent contenir. Si la réponse est non: ne rien faire.

for (product of listofproducts) {
    let product_ID = url.searchParams.get("id");
    if product_ID == value._id {
        Afficherleproduit;
    } else {    
    }
}
//get product by ID puis lui faire apparaitre ses éléments dans le DOM

//normal: créer class

//normal: créer array (blabla)

//normal: mettre array (blabla) dans localStorage

//let EnsembleduPanier = [];
//localStorage.setItem(produit, EnsembleduPanier);

//fonction 1: créer new class

//fonction 2: let blabla (ou pas??) = localstorage.getItem(array)
//localStorage.clear()
//if blabla.length == 0 {blabla.push(new class)}
//else if for (obj of blabla) {new class == obj} {obj.number == obj.number + new class.number}
//else if for (obj of blabla) {new class =DIFFERENT= obj} {blabla.push(new class)}
//else {blabla.push(new class)}
//localStorage.setItem(Produitsdanslepanier, array)

//fonction 3() {
//  fonction 1;
//fonction 2;
//}

//addEventListener(click, fonction3);


//changer méthode, mis à jour aray en localStorage, puis remove array de localstorage, et add array mis à jour !

class Product {
    constructor(id, number, coloration) {
        this.id = id;
        this.number = number;
        this.coloration = coloration;
    }
}

let Produit = ();

function ChoisirleNouveauProduit() {
    for (product of listofproducts) {
      let product_ID = url.searchParams.get("id");
      if product_ID == value._id {
          let quantite = document.getElementById("quantity").value;
          let couleur = document.getElementById("colors").value;
  
          let Produit = new Product(value._id, quantite, couleur);
        } else {   
        } 
    }
}

let EnsembleduPanier = [];

function Ajouterleproduit() {
    if EnsembleduPanier.length == 0 {
        EnsembleduPanier.push(Produit);
    }
    if else {
        for (Elements of EnsembleduPanier) {
        Produit == Elements
    }}
    {Elements.number == Elements.number + Produit.number};
    else {
        EnsembleduPanier.push(Produit);
    }
}

function ViderleLocal() {
    localstorage.removeItem('Produits');
}

function AjouterEnsembleauPanier() {
    localstorage.setItem('Produits', EnsembleduPanier);
}

function EnregistrerdanslePanier() {
    ChoisirleNouveauProduit;
    Ajouterleproduit;
    ViderleLocal;
    AjouterEnsembleauPanier;
}

document.getElementById("addToCart").addEventListener('click', EnregistrerdanslePanier);
