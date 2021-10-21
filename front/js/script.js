let listofproducts = [];
let imageofproduct = "";
let AlternativeTextofproduct = "";
let nameofproduct = "";
let descriptionofproduct = "";
let IDofproduct = "";

fetch("http://localhost:3000/api/products")
    .then(function(response) {
        if (response.ok) {
            return response.json();
            let listofproducts = response.json();
        }
    })
    .then(function(value) {
        let imageofproduct = value.imageUrl;
        let AlternativeTextofproduct = value.altTxt + ", " + value.name;
        let nameofproduct = value.name;
        let descriptionofproduct = value.description;
        let IDofproduct = value._id;
    })
    .catch(function(error) {
        console.log("Une erreur empêche le résultat de s'afficher.")
    })
;

for (let product of listofproducts) {
    let link = document.createElement("a");
    document.getElementById('items').appendChild(link);
    link.setAttribute("href", "./product.html?id=" + IDofproduct);

    let article = document.createElement("article");
    link.appendChild(article);

    let image = document.createElement("img");
    article.appendChild(image);
    image.innerHTML = imageofproduct;
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

//value.description ou product.description




