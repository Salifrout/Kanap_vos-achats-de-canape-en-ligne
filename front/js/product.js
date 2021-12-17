<<<<<<< HEAD
<<<<<<< HEAD
//******************************************************************************************************//
//*******************************déclaration des variables et constantes********************************//
//******************************************************************************************************//
=======
//créer un nom de variable pour récupérer l'URL de la page
let URLofpage = location;
let url = new URL(URLofpage);
>>>>>>> parent of 816ff5a (fin projet)
=======
//****************Afficher le produit sélectionné depuis la page d'accueil sur la page product**************//
>>>>>>> parent of ec5678c (mise en forme finale /1)

//créer une variable pour définir la valeur du paramètre id situé dans l'URL
let product_ID = url.searchParams.get("id");

const OnerequestState = fetch("http://localhost:3000/api/products/" + product_ID);

<<<<<<< HEAD
//--> créer une classe pour constituer la sélection de chaque produit
=======
//parse in pour vérifier que ce soit un entier,  /product_id et réupère un seul objet produitt

//envisager qu'il n'y ai pas de ID dans l'URL de la page et écrire une phrase pour dire à l'utilisateur qu'il faut remplir son panier

//requêter l'API et faire apparaitre le produit sélectionné depuis la page d'accueil
OnerequestState
    .then(function(res) {
        console.info(res);
        return res.json();
    })
    .then(function(value) {
        if (!product_ID) {
            
            alert("Une erreur est survenue. Vous allez être redirigé vers la page d'accueil dans quelques instants.");
            document.body.remove();
            setTimeout(document.location.href = "https://salifrout.github.io/Projet-Kanap/front/html/index.html", 1000);
            
        } else if (product_ID !== undefined) {
        
            let product_img = document.createElement("img");
            document.querySelector("section.item article div.item__img").appendChild(product_img);
            product_img.setAttribute("alt", value.altTxt + ", " + value.name);
            product_img.setAttribute("src", value.imageUrl);

            document.getElementById("title").innerHTML = value.name;
            document.getElementById("price").innerHTML = value.price / 100;
            document.getElementById("description").innerHTML = value.description;

            document.getElementById("colors").options.length = 0;

            let colorsofproduct = value.colors;
            for (let color of colorsofproduct) {
                let colorInOption = document.createElement("option");
                document.getElementById("colors").appendChild(colorInOption);
                colorInOption.setAttribute("option", color);
                colorInOption.innerHTML = color;
            }  
        }
    })
    .catch(function(err) {
        //prévenir en cas d'erreur
        console.log(err);
    })
;


//créer une classe pour mettre des informations sur chaque produit
>>>>>>> parent of 816ff5a (fin projet)
class Product {
    constructor(id, number, coloration, image, alternative, name, price) {
        this.id = id;
        this.number = number;
        this.coloration = coloration;
        this.image = image;
        this.alternative = alternative;
        this.name = name;
        this.price = price;
    }
}

<<<<<<< HEAD
<<<<<<< HEAD
//******************************************************************************************************//
//***************************************création des fonctions*****************************************//
//******************************************************************************************************//
=======
//--> requêter l'API et faire apparaitre le produit sélectionné depuis la page d'accueil
OnerequestState
    .then(function(res) {
        if (res.ok) {
            return res.json();
        } else {
            alert("Une erreur est survenue. Vous allez être redirigé vers la page d'accueil dans quelques instants.");
            setTimeout(document.location.href = "./index.html", 400);
            return false;
        }
    })
    .then(function(value) {
        
        let product_img = document.createElement("img");
        document.querySelector("section.item article div.item__img").appendChild(product_img);
        product_img.setAttribute("alt", value.altTxt + ", " + value.name);
        product_img.setAttribute("src", value.imageUrl);

        document.getElementById("title").innerHTML = value.name;
        document.getElementById("price").innerHTML = value.price / 100 + " ";
        document.getElementById("description").innerHTML = value.description;

        document.getElementById("colors").options.length = 0;

        let colorsofproduct = value.colors;
        for (let color of colorsofproduct) {
            let colorInOption = document.createElement("option");
            document.getElementById("colors").appendChild(colorInOption);
            colorInOption.setAttribute("option", color);
            colorInOption.innerHTML = color;
        }  
    })
    .catch(function(err) {
        alert(err);
    })
;

//*****************créer la sélection d'un produit et le rajouter dans le panier(localStorage)*************//


>>>>>>> parent of ec5678c (mise en forme finale /1)

//--> créer une instance de classe à partir du choix de l'utilisateur du site
=======
>>>>>>> parent of 816ff5a (fin projet)
async function CreateProductForCart() {
    const request = await fetch("http://localhost:3000/api/products/" + product_ID);
    const result = await request.json();
    const valueForimage = await result.imageUrl;
    const valueForalternative = await result.altTxt;
    const valueForname = await result.name;
    const valueForprice = await result.price;
    const valueForID = await result._id;

    if (document.getElementById("quantity").value == 0 || document.getElementById("quantity").value > 100) {
        alert("La quantité choisie pour votre produit n'est pas possible. Veuillez choisir une quantité différente.");
        return false;
    } else {
    let quantite = document.getElementById("quantity").value;
    let couleur = document.getElementById("colors").value;

    let OneProduct = new Product(valueForID, quantite, couleur, valueForimage, valueForalternative, valueForname, valueForprice);   
        
    return OneProduct;
    }    
}

//fonction pour augmenter quantité d'un produit choisi
async function UpdateCart() {

<<<<<<< HEAD
    if (Cart.length === 0) {
=======
    let OneProduct = await CreateProductForCart();

    //if (Cart.length === 0) {
    if (!JSON.parse(localStorage.getItem('Allproducts'))) {
        let Cart = [];
>>>>>>> parent of 816ff5a (fin projet)
        Cart.push(OneProduct);
<<<<<<< HEAD
        console.log("Le panier est vide, un nouveau produit est ajouté.");
        return Cart;
    } else {
<<<<<<< HEAD
       for (let CartParts of Cart) {
            if (CartParts.id == OneProduct.id && CartParts.coloration == OneProduct.coloration) {
=======
        console.log("bad");
        return Cart; 
    } else {
       for (let CartParts of Cart) {        // essayer === au lieu de == car à cause du parse, le nouveau produit va dans else...
            if (CartParts.id === OneProduct.id && CartParts.coloration === OneProduct.coloration) {

                console.log('nice');
>>>>>>> parent of ec5678c (mise en forme finale /1)

                let number_inCart = parseInt(CartParts.number);
                let number_inOneProduct = parseInt(OneProduct.number);

                number_inCart += number_inOneProduct;
                CartParts.number = number_inCart;
=======
        let Cart = JSON.parse(localStorage.getItem("Allproducts"));
        for (let CartParts of Cart) {
            if (OneProduct === CartParts) {
                OneProduct.number += CartParts.number;
                console.log("On augmente la quantité pour un produit.");
>>>>>>> parent of 816ff5a (fin projet)
                return Cart;
            } else { 
                Cart.push(OneProduct);
<<<<<<< HEAD
                console.log("Un produit est ajouté au panier.");  
=======
                console.log('bien');
>>>>>>> parent of ec5678c (mise en forme finale /1)
                return Cart;
            }
        }
    }
}
<<<<<<< HEAD
<<<<<<< HEAD

=======
    
>>>>>>> parent of ec5678c (mise en forme finale /1)
//--> vider le local puis y remettre le tableau mis à jour
=======
    
//vider le local puis remettre le tableau mis à jour
>>>>>>> parent of 816ff5a (fin projet)
async function UpdateStorage() {

    let Cart = await UpdateCart();

    localStorage.removeItem('Allproducts');
    localStorage.setItem('Allproducts', JSON.stringify(Cart));
    console.log("Le Storage s'est mis à jour.");
}

<<<<<<< HEAD
<<<<<<< HEAD
//--> confirmer le rajout du produit dans le panier
=======
//créer une fonction unique qui permettra d'exécuter toutes les fonctions précédentes à la fois
>>>>>>> parent of 816ff5a (fin projet)
=======
//--> rassembler toutes les fonctions précédentes en une seule
>>>>>>> parent of ec5678c (mise en forme finale /1)
async function AddNewProductInStorage() {
    if (product_ID !== undefined) {
        await CreateProductForCart();
        
<<<<<<< HEAD
    await UpdateStorage();
    alert("Le produit a bien été rajouté au panier.");
    location.reload(); //peut etre a supprimer
}

//*****************envoyer le nouveau produit sélectionné dans la page panier (localStorage)******************//

//--> exécuter les fonctions précédentes lors du click de l'utilisateur
document.getElementById("addToCart").addEventListener('click', async function(event) {
    event.preventDefault();
    AddNewProductInStorage()
});
<<<<<<< HEAD
=======
        if (CreateProductForCart()) {
           // await UpdateCart();
            await UpdateStorage();
            console.log(Storage.length);
            console.log(localStorage.getItem('Allproducts'));
            return true;
        } else {
            return false;
        }
    } else {
        console.error("le produit n'a pas pu être rajouté au panier");
    }
}

//exécuter la dernière fonction lors du clique de l'utilisateur sur le bouton
document.getElementById("addToCart").addEventListener('click', AddNewProductInStorage);




/*que les memes produits augmentent la quantité au lieu de se rajouter
que le prix du produit change lors de la quantité
que le bouton supprimer soit effectif
mettre le total de tous les produits*/
>>>>>>> parent of 816ff5a (fin projet)
=======
>>>>>>> parent of ec5678c (mise en forme finale /1)
