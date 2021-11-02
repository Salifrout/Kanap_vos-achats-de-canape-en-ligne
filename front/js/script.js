
fetch("http://localhost:3000/api/products")
    .then(function(res) {
        let products = res.json();
    })
    .then(function(value) {
        for (product of products) {
        let link = document.createElement("a");
        document.getElementById('items').appendChild(link);
        link.setAttribute("href", "./product.html?id=" + value._id);
            
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
    .catch(function(err) {
        console.log("Une erreur empêche le résultat de s'afficher");
    })

;}
