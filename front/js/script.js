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
    then(function(value) {
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
    createElement("a");
    document.getElementById('items').appendChild("a");
    document.querySelector("#items a").setAttribute("href", "./product.html?id=" + IDofproduct);
    createElement("article");
    document.querySelector("#items a").appendChild("article");
    createElement("img");
    createElement("h3");
    createElement("p");
    document.querySelector("#items a article").appendChild("img");
    document.querySelector("#items a article").appendChild("h3");
    document.querySelector("#items a article").appendChild("p");
    document.querySelector("#items a article img").innerHTML = imageofproduct;
    document.querySelector("#items a article img").setAttribute("alt", AlternativeTextofproduct);
    document.querySelector("#items a article h3").innerHTML = nameofproduct;
    document.querySelector("#items a article p").innerHTML = descriptionofproduct;
}

//value.description ou product.description




