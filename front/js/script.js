<<<<<<< HEAD
fetch("http://localhost:3000/api/products")
.then(function(response) {
   // retourne le contenue json de la réponse dans une nouvelle Promise
   return response.json();
})
.then(function(json) {
   console.log("Le serveur à retourné les données: ", json);
})
.catch(function(error) {
   console.error(error);
   throw new Error("La requête a planté");
});

=======
//requêter l'API
//function Accueildynamique() {
    fetch("http://localhost:3000/api/products")
        .then(function(response) {
                //let listofproducts = response.js();
                //let listofproducts = response();
                //peut-être parsé en js
                console.info(response);
        })
        .then(function(value) {
            for (value of response.json()) {
            let link = document.createElement("a");
            document.getElementById('items').appendChild(link);
            link.setAttribute("href", "./product.html?id=" + value._id);
            
            //sélectionner créer mettre enfant
            let article = document.createElement("article");
            link.appendChild(article);
    
            let image = document.createElement("img");
            article.appendChild(image);
            image.setAttribute("src", value.imageUrl);
            image.setAttribute("alt", value.altTxt + ", " + value.name);
    
            let subtitle3 = document.createElement("h3");
            article.appendChild(subtitle3);
            subtitle3.innerHTML = value.name;
            subtitle3.classList.add("productName");
    
            let normalText = document.createElement("p");
            article.appendChild(normalText);
            normalText.innerHTML = value.description;
            normalText.classList.add("productDescription");   
            }
        })
        .catch(function(error) {
            console.error(error)
        })
    
    ;
//}
>>>>>>> parent of 42028d9 (DOM script.js 10)

//appeler la fonction pour chaque produit afin de construire le DOM
//for (product of listofproducts) {
//    Accueildynamique();
//};

//ne marche pas. PK ?



