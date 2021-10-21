let URLofpage = window.location.href;
let url = new URL(URLofpage);
let product_ID = url.searchParams.get("id");

let listofproducts = [];
let imageofproduct = "";
let AlternativeTextofproduct = "";
let nameofproduct = "";
let descriptionofproduct = "";
let IDofproduct = "";
let colorsofproduct = [];
let priceofproduct = "";

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
        let colorsofproduct = value.colors;
        let priceofproduct = value.price;
    })
    .catch(function(error) {
        console.log("Une erreur empêche le résultat de s'afficher.")
    })
;

for (product of listofproducts) {
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