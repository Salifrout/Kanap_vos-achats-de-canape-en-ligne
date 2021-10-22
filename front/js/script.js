//créer des variables vides pour modifier leurs valeurs ensuite dans la requête de l'API
let listofproducts = [];
let imageofproduct = "";
let AlternativeTextofproduct = "";
let nameofproduct = "";
let descriptionofproduct = "";
let IDofproduct = "";
//pas la peine de créer des varaibles vides car fetch n'est pas une fonction

//requêter l'API
fetch("http://localhost:3000/api/products")
    .then(function(response) {
        if (response.ok) {

            //vérifier si la réponse est ok, si ou la traduire en json puis la convertir en array
            //pour l'utiliser dans la boucle for qui suivra
            let listofproducts = response.json();
            //peut-être parsé en js
        }
    })
    .then(function(value) {

        //donner un nom de variable pour chaque information du produit (nom, id, image, etc.)
        let imageofproduct = value.imageUrl;
        let AlternativeTextofproduct = value.altTxt + ", " + value.name;
        let nameofproduct = value.name;
        let descriptionofproduct = value.description;
        let IDofproduct = value._id;
        //dans la fonction, mettre les values directement, sans passer par les varaibles car celles ci seonr écrasées à chaque fois
    })
    .catch(function(error) {

        //prévenir en cas d'erreur
        console.log("Une erreur empêche le résultat de s'afficher.")
    })
;


//utiliser une boucle pour que chaque produit soit présent sur la page d'accueil : créer un élement,
//expliquer où il doit se trouver et ce qu'il doit contenir
//function qqchose() {} !!!
for (let product of listofproducts) {
    let link = document.createElement("a");
    document.getElementById('items').appendChild(link);
    link.setAttribute("href", "./product.html?id=" + IDofproduct);

    let article = document.createElement("article");
    link.appendChild(article);

    let image = document.createElement("img");
    article.appendChild(image);
    //inner.HTML utilisable pour le chemin d'un fichier, même si ce n'est pas du texte ?
    image.innerHTML = imageofproduct; //src et mettre le chemin
    image.setAttribute("alt", AlternativeTextofproduct);

    let subtitle3 = document.createElement("h3");
    article.appendChild(subtitle3);
    subtitle3.innerHTML = nameofproduct;
    subtitle3.classList.add("productName");

    let normalText = document.createElement("p");
    article.appendChild(normalText);
    normalText.innerHTML = descriptionofproduct;
    normalText.classList.add("productDescription");   
}

//value.description ou product.description ?



//envisager de créer les fonctions dans un fichier spécifique et les appeler dans un autre
