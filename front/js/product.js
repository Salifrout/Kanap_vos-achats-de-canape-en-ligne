//créer un nom de variable pour récupérer l'URL de la page
let URLofpage = window.location.href;
let url = new URL(URLofpage);

//créer une variable pour définir la valeur du paramètre id situé dans l'URL
let product_ID = url.searchParams.get("id");

//créer des variables vides pour modifier leurs valeurs ensuite dans la requête de l'API
let listofproducts = [];
let imageofproduct = "";
let AlternativeTextofproduct = "";
let nameofproduct = "";
let descriptionofproduct = "";
let IDofproduct = "";
let colorsofproduct = [];
let priceofproduct = "";

//requêter l'API
//créer une fonction getproduct pour récupérer l'API, vérfier ok, transfomer json en js, et faire ensuite ce qu'on veut
fetch("http://localhost:3000/api/products")
    .then(function(response) {
        if (response.ok) {

            //vérifier si la réponse est ok, si ou la traduire en json puis la convertir en array
            //pour l'utiliser dans la boucle for qui suivra
            return response.json();
            let listofproducts = response.json();
        }
    })
    .then(function(value) {

        //donner un nom de variable pour chaque information du produit ( nom, id, image, etc.)
        let imageofproduct = value.imageUrl;
        let AlternativeTextofproduct = value.altTxt + ", " + value.name;
        let nameofproduct = value.name;
        let descriptionofproduct = value.description;
        let IDofproduct = value._id;
        let colorsofproduct = value.colors;
        let priceofproduct = value.price;
    })
    .catch(function(error) {

        //prévenir en cas d'erreur
        console.log("Une erreur empêche le résultat de s'afficher.")
    })
;

//créer une boucle pour vérifier si pour chaque produit, la valeur du paramètre ID dans L'URL est égale à celle de l'ID
//du produit situé dans l'API. Si la réponse est oui: créer les éléments d'informations du produit, expliquer où ils
//doivent se trouver dans le DOM et ce qu'ils doivent contenir. Si la réponse est non: ne rien faire.

for (product of listofproducts) {
    let product_ID = url.searchParams.get("id");
    if product_ID == IDofproduct {
        let product_img = document.createElement("img");
        document.getElementsByClassName('item__img').appendChild(product_img);
        product_img.setAttribute("alt", AlternativeTextofproduct);
        product_img.innerHTML = imageofproduct;

        document.getElementById("title").innerHTML = nameofproduct;
        document.getElementById("price").innerHTML = priceofproduct;
        document.getElementById("description").innerHTML = descriptionofproduct;

        for (color of colorsofproduct) {
            let colorInOption = document.createElement("option");
            document.getElementById("colors").appendChild(colorInOption);
            colorInOption.setAttribute("option", color);
            colorInOption.innerHTML = color;
        }

    } else {    
    }
}
//get product by ID puis lui faire apparaitre ses éléments dans le DOM

//créer une fonction vérifiant si pour chaque produit, la valeur du paramètre ID dans L'URL est égale à celle de l'ID
//du produit situé dans l'API. Si la réponse est oui: enregistrer l'ID, la quantité et la couleur choisi dnas le
// stockage local puis rediriger vers la page du panier. Si la réponse est non: ne rien faire.
function dirigerverslepanier() {
    for (product of listofproducts) {
        let product_ID = url.searchParams.get("id");
        if product_ID == IDofproduct {
            localStorage.setItem("Id", IDofproduct);
            //intercepter un formulaire pour récupérer les valeurs choisies par l'utilisateur
            localStorage.setItem("Quantity", ?????);
            localStorage.setItem("Color", ??????);
            //ne pas rediriger automatiquement sur la page panier sans prévenir l'utilisateur et laisser
            //les utilisateurs rejoindre le panier par l'ancre sur le menu
            document.location.href = "https://salifrout.github.io/Projet-Kanap/front/html/cart.html";
        } else {
        }
    }
}

//créer un évènement permettant d'exécuter la fonction précédente lorsque l'utilisateur clique sur le bouton "Envoyer"
document.getElementById("addToCart").addEventListener('click', dirigerverslepanier);





