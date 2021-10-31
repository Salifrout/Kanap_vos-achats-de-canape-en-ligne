//requêter l'API
//function Accueildynamique() {
    let gourl = "/api/products";
    fetch(gourl)
        .then(function(response) {
            if (response.ok) {
                //let listofproducts = response.js();
                //let listofproducts = response();
                //peut-être parsé en js
                return response.json();
            }
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
            console.log("Une erreur empêche le résultat de s'afficher.")
        })
    
    ;
//}

//appeler la fonction pour chaque produit afin de construire le DOM
//for (product of listofproducts) {
//    Accueildynamique();
//};

//ne marche pas. PK ?