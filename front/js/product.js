//****************Afficher le produit sélectionné depuis la page d'accueil sur la page product**************//

//--> créer un nom de variable pour récupérer l'URL de la page
const URLofpage = location;
const url = new URL(URLofpage);

//--> créer une variable pour définir la valeur du paramètre id situé dans l'URL
const product_ID = url.searchParams.get("id");

const OnerequestState = fetch("http://localhost:3000/api/products/" + product_ID);

//--> créer une classe pour constituer la sélection de chaque produit
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



//--> créer une instance de classe à partir du choix de l'utilisateur du site
async function CreateProductForCart() {
    const request = await fetch("http://localhost:3000/api/products/" + product_ID);
    const result = await request.json();
    const valueForimage = await result.imageUrl;
    const valueForalternative = await result.altTxt;
    const valueForname = await result.name;
    const valueForprice = await result.price;
    const valueForID = await result._id;

    if (document.getElementById("quantity").value <= 0 || document.getElementById("quantity").value > 100 || isNaN(document.getElementById("quantity").value)) {
        
        document.getElementById("quantity").value = 1;

        let quantite = 1;
        let couleur = document.getElementById("colors").value;

        let OneProduct = new Product(valueForID, quantite, couleur, valueForimage, valueForalternative, valueForname, valueForprice);   
        return OneProduct;

    } else {
        let quantite = document.getElementById("quantity").value;
        let couleur = document.getElementById("colors").value;
        let OneProduct = new Product(valueForID, quantite, couleur, valueForimage, valueForalternative, valueForname, valueForprice);   
        return OneProduct;

    }    
}

//--> le produit se rajoute au panier ou augmente en quantité
async function UpdateCart() {
    const OneProduct = await CreateProductForCart();
    const AllProducts = localStorage.getItem('Allproducts');
    const Cart =  AllProducts ? JSON.parse(AllProducts) : [];

    if (Cart.length === 0) {
        Cart.push(OneProduct);
        console.log("bad");
        return Cart; 
    } else {
       for (let CartParts of Cart) {        // essayer === au lieu de == car à cause du parse, le nouveau produit va dans else...
            if (CartParts.id === OneProduct.id && CartParts.coloration === OneProduct.coloration) {

                console.log('nice');

                let number_inCart = parseInt(CartParts.number);
                let number_inOneProduct = parseInt(OneProduct.number);

                number_inCart += number_inOneProduct;
                CartParts.number = number_inCart;
                return Cart;

            } else { 
                Cart.push(OneProduct);
                console.log('bien');
                return Cart;
            }
        } 
    }
}
    
//--> vider le local puis y remettre le tableau mis à jour
async function UpdateStorage() {
    const Cart = await UpdateCart();

    localStorage.removeItem('Allproducts');
    localStorage.setItem('Allproducts', JSON.stringify(Cart));
}

//--> rassembler toutes les fonctions précédentes en une seule
async function AddNewProductInStorage() {
        
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
