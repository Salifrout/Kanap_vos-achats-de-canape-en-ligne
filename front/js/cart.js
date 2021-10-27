//créer une foncion pour récupérer les informations du produit situés dans le stockage local
function Recevoirleproduit() {
    localStorage.getItem("Produits");
}

//appeler la fonction pour l'exécuter
recevoirleproduit();

//situer les éléments dans le DOM

function montrerProduit() {
    for (Produits of EnsembleduPanier) {
        let article = document.createElement("article");
        article.classList.add("cart__item");
        article.setAttribute("data-ID", id);

        let DivpourImagedupanier = document.createElement("div");
        DivpourImagedupanier.classList.add("cart__item__img");
        article.appendChild(DivpourImagedupanier);
        let Imagedupanier = document.createElement("img");
        Imagedupanier.setAttribute("src", image);
        Imagedupanier.setAttribute("alt", alternative);
        DivpourImagedupanier.appendChild(Imagedupanier);
    
        let DivpourItem = document.createElement("div");
        DivpourItem.classList.add("cart__item__content");

        let DivpourTitlePrice = document.createElement("div");
        DivpourTitlePrice.classList.add("cart__item__content__titlePrice");
        let subtitle2 = document.createElement("h2");
        DivpourTitlePrice.appendChild(subtitle2);
        subtitle2.innerHTML = name;
        let phrase1 = document.createElement("p");
        DivpourTitlePrice.appendChild("phrase1");
        phrase1.innerHTML = price;

        let DivpourQtetInp = document.createElement("div");
        DivpourQtetInp.classList.add("cart__item__content__settings");
        let DivpourQetI = document.createElement("div");
        DivpourQetI.classList.add("cart__item__content__settings__quantity");
        DivpourQtetInp.appendChild(DivpourQetI);
        let Qte = document.createElement("p");
        DivpourQetI.appendChild(Qte);
        Qte.innerHTML = "Qté : ";
        let Input = document.createElement("input");
        DivpourQetI.appendChild(Input);
        Input.setAttribute("type", "number");
        Input.classList.add("itemQuantity");
        Input.setAttribute("name", "itemQuantity");
        Input.setAttribute("min", "1");
        Input.setAttribute("max", "100");
        Input.setAttribute("value", number);
        let Suppr = document.createElement("div");
        Suppr.classList.add("cart__item__content__settings_delete");
        DivpourQtetInp.appendChild("Suppr");
        let phrase2 = document.createElement("p");
        phrase2.classList.add("deleteItem");
        phrase2.innerHTML = "Supprimer";
    }
}











