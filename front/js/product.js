//créer un nom de variable pour récupérer l'URL de la page
let URLofpage = window.location.href;
let url = new URL(URLofpage);

//créer une variable pour définir la valeur du paramètre id situé dans l'URL
let product_ID = url.searchParams.get("id");

//requêter l'API
function Afficherleproduit() {
    fetch("http://localhost:3000/api/products")
    .then(function(response) {
        if (response.ok) {
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


//créer une classe pour mettre des informations sur chaque produit
class Product {
    constructor(id, number, coloration, image, alternative, name, price) {
        this.id = id;
        this.number = number;
        this.coloration = coloration;
        this.image = image;
        this.alternative = alternative;
        this.name = name;
        this.price = price;
    }
}

let Produit = ();

//fonction pour créer nouvelle classe
function ChoisirleNouveauProduit() {
    for (product of listofproducts) {
      let product_ID = url.searchParams.get("id");
      if product_ID == value._id {
          let quantite = document.getElementById("quantity").value;
          let couleur = document.getElementById("colors").value;

  
          let Produit = new Product(value._id, quantite, couleur, value.imageUrl, value.altTxt, value.name, value.price);
        } else {   
        } 
    }
}

let EnsembleduPanier = [];

//fonction pour augmenter quantité d'un produit choisi
function Ajouterleproduit() {
    if EnsembleduPanier.length == 0 {
        EnsembleduPanier.push(Produit);
    }
    if else {
        for (Elements of EnsembleduPanier) {
        Produit == Elements
    }}
    // !!!
    {Elements.number == Elements.number + Produit.number};
    else {
        EnsembleduPanier.push(Produit);
    }
}

//vider le local puis remettre le tableau mis à jour
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


//ajouter dnas le panier lors du click sur le bouton
document.getElementById("addToCart").addEventListener('click', EnregistrerdanslePanier);
