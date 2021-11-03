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
    .then(function(value) {
        // ici value correspond au données JSON renvoyé par le serveur
     
        // ici product n'existe pas elle n'est pas définit dans ce scope
        // value correspond à products
        // for(val of value) {...}
        
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
        // ici la requête à planté
        console.log("Une erreur empêche le résultat de s'afficher");
    });