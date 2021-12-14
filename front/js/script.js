//*************************Afficher les différents produits dans le panier********************//

const REQUEST_STATE = fetch("http://localhost:3000/api/products");
 
REQUEST_STATE
    .then(function(res) {
        return res.json();
    })
    .then(function(value) {
        for (val of value) {
            let link = document.createElement("a");
            document.getElementById('items').appendChild(link);
            link.setAttribute("href", "./product.html?id=" +  val._id);
 
            let article = document.createElement("article");
            link.appendChild(article);
 
            let image = document.createElement("img");
            article.appendChild(image);
            image.setAttribute("src",  val.imageUrl);
            image.setAttribute("alt",  val.altTxt + ", " +  val.name);
 
            let subtitle3 = document.createElement("h3");
            article.appendChild(subtitle3);
            subtitle3.innerHTML =  val.name;
            subtitle3.classList.add("productName");
 
            let normalText = document.createElement("p");
            article.appendChild(normalText);
            normalText.innerHTML =  val.description;
            normalText.classList.add("productDescription");
        }
    })
    .catch(function(err) {
        alert("Une erreur empêche l'affichage de la liste des produits sur la page principale: " + err);
    })
;