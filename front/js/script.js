
fetch("http://localhost:3000/api/products")
    .then(function(res) {
        let products = res.json();
        console.info(res);
    })
    .then(function(value) {
        for (product of products) {
        let link = document.createElement("a");
        document.getElementById('items').appendChild(link);
        link.setAttribute("href", "./product.html?id=" + product.value._id);
            
        let article = document.createElement("article");
        link.appendChild(article);
    
        let image = document.createElement("img");
        article.appendChild(image);
        image.setAttribute("src", product.value.imageUrl);
        image.setAttribute("alt", product.value.altTxt + ", " + product.value.name);
    
        let subtitle3 = document.createElement("h3");
        article.appendChild(subtitle3);
        subtitle3.innerHTML = product.value.name;
        subtitle3.classList.add("productName");
    
        let normalText = document.createElement("p");
        article.appendChild(normalText);
        normalText.innerHTML = product.description;
        normalText.classList.add("productDescription");
        }
    })
    .catch(function(err) {
        console.log("Une erreur empêche le résultat de s'afficher");
    })
;

