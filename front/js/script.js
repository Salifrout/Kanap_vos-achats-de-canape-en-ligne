const requestState = fetch("http://localhost:3000/api/products");
 
requestState
    .then(function(res) {
        // ici si tu veut ré attaché une methode .then en dessous
        // tu doit retourné une nouvelle Promise
 
        let listofproducts = res.json(); // res.json() renvoi une Promise et ne donne pas directement les résultat
        console.info(res); // <- [Object <"pending">]
         
        // retourne une nouvelle promise
        return listofproducts;
    })
    .then(function(listofproducts) {
        // ici value correspond au données JSON renvoyé par le serveur
     
        // ici product n'existe pas elle n'est pas définit dans ce scope
        // value correspond à products
        // for(val of value) {...}
        let listofproducts = res.json(); 
        for (product of listofproducts) {
            let link = document.createElement("a");
            document.getElementById('items').appendChild(link);
            link.setAttribute("href", "./product.html?id=" + product._id);
 
            let article = document.createElement("article");
            link.appendChild(article);
 
            let image = document.createElement("img");
            article.appendChild(image);
            image.setAttribute("src", product.imageUrl);
            image.setAttribute("alt", product.altTxt + ", " + product.name);
 
            let subtitle3 = document.createElement("h3");
            article.appendChild(subtitle3);
            subtitle3.innerHTML = product.name;
            subtitle3.classList.add("productName");
 
            let normalText = document.createElement("p");
            article.appendChild(normalText);
            normalText.innerHTML = product.description;
            normalText.classList.add("productDescription");
        }
    })
    .catch(function(err) {
        // ici la requête à planté
        console.log("Une erreur empêche le résultat de s'afficher");
    });