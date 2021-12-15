let Input = document.querySelector(".cart__item__content__settings__quantity input");

//--> modifier la quantité d'un produit enregistré dans le tableau
function UpdateQtyForCartParts(ProductChanged) {
    ProductChanged.number = Input.value;
    const Index_modified = Cart.indexOf(ProductChanged);
    Cart.splice(Index_modified, 1, ProductChanged); 
}

//--> vider le local puis y remettre le tableau mis à jour
function UpdateStorage() {
    localStorage.removeItem('Allproducts');
    localStorage.setItem('Allproducts', JSON.stringify(Cart));
}

//--> enregistrement d'un changement de quantité de la part de l'utilisateur
if (document.querySelector("article")) {
    for (let CartParts of Cart) {
        Input.addEventListener('input', function (e) {
            e.preventDefault();
            UpdateQtyForCartParts(CartParts);
            UpdateStorage();
            }
        )
    }
}