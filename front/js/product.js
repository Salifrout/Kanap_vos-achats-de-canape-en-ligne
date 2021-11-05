//créer un nom de variable pour récupérer l'URL de la page
let URLofpage = window.location.href;
let url = new URL(URLofpage);

//créer une variable pour définir la valeur du paramètre id situé dans l'URL
let product_ID = url.searchParams.get("id");

const requestState = fetch("http://localhost:3000/api/products");

//requêter l'API et faire apparaitre le produit sélectionné depuis la page d'accueil
requestState
    .then(function(res) {
        console.info(res);
        return res.json();
    })
    .then(function(value) {
        // for (val of value) {
            if (product_ID === val._id) {
        
                let product_img = document.createElement("img");
                document.getElementsByClassName('item__img').appendChild(product_img);
                product_img.setAttribute("alt", val.altTxt + ", " + val.name);
                product_img.innerHTML = val.imageUrl;

                document.getElementById("title").innerHTML = val.name;
                document.getElementById("price").innerHTML = val.price;
                document.getElementById("description").innerHTML = val.description;

                let colorsofproduct = val.colors;
                for (let color of colorsofproduct) {
                    let colorInOption = document.createElement("option");
                    document.getElementById("colors").appendChild(colorInOption);
                    colorInOption.setAttribute("option", color);
                    colorInOption.innerHTML = color;
                }
            } else {    
            }
        //}
    })
    .catch(function(err) {
        //prévenir en cas d'erreur
        console.log("Une nouvelles erreur empêche le résultat de s'afficher.")
    })
;

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

let OneProduct = {};

//les fonctions suivantes permettent de créer une nouvelle classe, mettre dans un tableau, vider le localstorage avant d'y remettre le tableau mis à jour

for (let val of requestState.res) {
    if (product_ID === val._id) {
        let quantite = document.getElementById("quantity").value;
        let couleur = document.getElementById("colors").value;

        let OneProduct = new Product(val._id, quantite, couleur, val.imageUrl, val.altTxt, val.name, val.price);
    } else {    
        console.log("la nouvelle instance peut être créée.")    
    }
}

let Cart = [];

//fonction pour augmenter quantité d'un produit choisi
function UpdateCart(newproduct) {
    if (Cart.length === 0) {
        Cart.push(newproduct);
        console.log("Le panier est vide, un nouveau produit est ajouté.");
    } else {
        for (let CartParts of Cart) {
            if (CartParts === newproduct) {
                CartParts.number += newproduct.number;
                console.log("On augmente la quantité pour un produit.");
            } else { 
                Cart.push(newproduct);
                console.log("Un produit est ajouté au panier.");  
            }
        }
    }
}
    
//vider le local puis remettre le tableau mis à jour
function CleanStorage() {
    localstorage.removeItem('Allproducts');
    console.log("Le Storage se vide.")
}

function PutInStorage() {
    localstorage.setItem('Allproducts', Cart);
    console.log("Le panier entre dans le Storage.")
}

function AddNewProductInStorage() {
    UpdateCart(OneProduct);
    CleanStorage;
    PutInStorage;
    console.log("Le panier est mis à jour.")
}


//ajouter dans le panier lors du click sur le bouton
document.getElementById("addToCart").addEventListener('click', AddNewProductInStorage);
