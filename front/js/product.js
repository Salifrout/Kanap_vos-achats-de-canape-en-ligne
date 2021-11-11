//créer un nom de variable pour récupérer l'URL de la page
let URLofpage = location;
let url = new URL(URLofpage);

//créer une variable pour définir la valeur du paramètre id situé dans l'URL
let product_ID = url.searchParams.get("id");




const OnerequestState = fetch("http://localhost:3000/api/products/" + product_ID);

//parse in pour vérifier que ce soit un entier,  /product_id et réupère un seul objet produitt

//envisager qu'il n'y ai pas de ID dans l'URL de la page et écrire une phrase pour dire à l'utilisateur qu'il faut remplir son panier

//requêter l'API et faire apparaitre le produit sélectionné depuis la page d'accueil
OnerequestState
    .then(function(res) {
        console.info(res);
        return res.json();
    })
    .then(function(value) {
        if (product_ID == null || product_ID == undefined) {
     
            document.getElementsByTagName("article").innerHTML ="Une erreur est survenue. Vous serez redirigé vers la page d'accueil dans 5 secondes."
            setTimeout(document.location.href = "https://salifrout.github.io/Projet-Kanap/front/html/index.html", 5000);
        
        } else if (product_ID !== undefined) {
        
            let product_img = document.createElement("img");
            document.getElementsByClassName('item__img').appendChild(product_img);
            product_img.setAttribute("alt", value.altTxt + ", " + value.name);
            product_img.innerHTML = value.imageUrl;

            document.getElementById("title").innerHTML = value.name;
            document.getElementById("price").innerHTML = value.price;
            document.getElementById("description").innerHTML = value.description;

            let colorsofproduct = value.colors;
            for (let color of colorsofproduct) {
                let colorInOption = document.createElement("option");
                document.getElementById("colors").appendChild(colorInOption);
                colorInOption.setAttribute("option", color);
                colorInOption.innerHTML = color;
            }
        } else {  

            document.getElementsByTagName("article").innerHTML ="Une erreur est survenue. Vous serez redirigé vers la page d'accueil dans 5 secondes."
            setTimeout(document.location.href = "https://salifrout.github.io/Projet-Kanap/front/html/index.html", 5000);
        
        }
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
function CreateProductForCart(Chosenproduct) {
    let quantite = document.getElementById("quantity").value;
    let couleur = document.getElementById("colors").value;

    let OneProduct = new Product(Chosenproduct.value._id, quantite, couleur, Chosenproduct.value.imageUrl, Chosenproduct.value.altTxt, Chosenproduct.value.name, Chosenproduct.value.price);   
        
    console.log("la nouvelle instance peut être créée.")    
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
        CreateProductForCart(OnerequestState);
        UpdateCart(OneProduct);
        UpdateStorage;

        console.log("Le panier est mis à jour.") 
    } else {
    }
}

//ajouter dans le panier lors du click sur le bouton
document.getElementById("addToCart").addEventListener('click', AddNewProductInStorage);
