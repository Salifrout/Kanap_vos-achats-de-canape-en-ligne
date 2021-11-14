//créer un nom de variable pour récupérer l'URL de la page
let URLofpage = location;
let url = new URL(URLofpage);

//créer une variable pour définir la valeur du paramètre id situé dans l'URL
let product_ID = url.searchParams.get("id");

var value_id = '';
let value_altTxt = '';
let value_imageUrl = '';
let value_price = '';
let value_name = '';
let value_description = ''; 

let blob = "http://localhost:3000/api/products/" + product_ID;
const OnerequestState = fetch("http://localhost:3000/api/products/" + product_ID);

//parse in pour vérifier que ce soit un entier,  /product_id et réupère un seul objet produitt

//envisager qu'il n'y ai pas de ID dans l'URL de la page et écrire une phrase pour dire à l'utilisateur qu'il faut remplir son panier

//requêter l'API et faire apparaitre le produit sélectionné depuis la page d'accueil
function GetInfosforOneProduct() {OnerequestState
    .then(function(res) {
        console.info(res);
        return res.json();
    })
    .then(function(value) {
        if (!product_ID) {
            
            alert("Une erreur est survenue. Vous allez être redirigé vers la page d'accueil dans quelques instants.");
            //let phrase_err = document.createElement("p");
            //document.getElementsByTagName("section").replaceChild(document.getElementsByTagName("article"), phrase_err);
            //phrase_err.innerHTML = "Une erreur est survenue. Vous serez redirigé vers la page d'accueil dans 5 secondes.";
            setTimeout(document.location.href = "https://salifrout.github.io/Projet-Kanap/front/html/index.html", 5000);
            return false;

        } else if (product_ID !== undefined) {
        
            let product_img = document.createElement("img");
            document.querySelector("section.item article div.item__img").appendChild(product_img);
            product_img.setAttribute("alt", value_altTxt + ", " + value_name);
            product_img.setAttribute("src", value_imageUrl);

            document.getElementById("title").innerHTML = value_name;
            document.getElementById("price").innerHTML = value_price / 100;
            document.getElementById("description").innerHTML = value_description;

            document.getElementById("colors").options.length = 0;

            let colorsofproduct = value.colors;
            for (let color of colorsofproduct) {
                let colorInOption = document.createElement("option");
                document.getElementById("colors").appendChild(colorInOption);
                colorInOption.setAttribute("option", color);
                colorInOption.innerHTML = color;
            }

            //info_id = value._id;
            //info_altTxt = value.altTxt;
            //info_imageUrl = value.imageUrl;
            //info_price = value.price;
            //info_name = value.name;

            let Infos_OneProduct = [value_id, value_imageUrl, info_altTxt, info_name, info_price];
            return Infos_OneProduct;

        } else {
            //essayer display none sur l'article ou la section puis set time out renvoyer vers page d'accueil
        }
    })
    .catch(function(err) {
        //prévenir en cas d'erreur
        console.log("Une nouvelle erreur empêche le résultat de s'afficher.")
    });
}

//var value_id = blob.res._id;
//let value_altTxt = value.altTxt;
//let value_imageUrl = value.imageUrl;
//let value_price = blob.res.price;
//let value_name = value.name;
//let value_description = value.description;

let Array1 = GetInfosforOneProduct;

console.log("un problème est survenu: " + Array1[0]);


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
function CreateProductForCart() {
    if (document.getElementById("quantity").value == 0 || document.getElementById("quantity").value > 100) {
        alert("La quantité choisie pour votre produit n'est pas possible. Veuillez choisir une quantité différente.");
        return false;
    } else {
    let quantite = document.getElementById("quantity").value;
    let couleur = document.getElementById("colors").value;

    let OneProduct = new Product(OnerequestState.then(function(value) {value.id}), quantite, couleur, OnerequestState.then(function(value) {value.imageUrl}), OnerequestState.then(function(value) {value.altTxt}), OnerequestState.then(function(value) {value.name}), OnerequestState.then(function(value) {value.price}));   
        
    return true;
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
function UpdateStorage() {
    localstorage.removeItem('Allproducts');
    localstorage.setItem('Allproducts', Cart);
    console.log("Le Storage s'est mis à jour.");
}

function AddNewProductInStorage() {
    if (product_ID !== undefined) {
        CreateProductForCart();
        if (CreateProductForCart()) {
            console.log("la nouvelle instance peut être créée.");
            UpdateCart(OneProduct);
            UpdateStorage;
            console.log("Le panier est mis à jour."); 
            return true;
        } else {
            return false;
        }
    } else {
    }
}

//ajouter dans le panier lors du click sur le bouton
document.getElementById("addToCart").addEventListener('click', AddNewProductInStorage);












