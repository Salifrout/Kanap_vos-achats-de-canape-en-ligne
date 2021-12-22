
/*
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
}*/
let Input = document.querySelector(".cart__item__content__settings__quantity input");

if (document.querySelector("article")) {
    console.log(Input + 'test1.0');
    console.log(Input.value + 'test0');

    for (let U = 0; U < InputQ.length; U++) {
        console.log(Input[U].value + 'test1.1');
        console.log(Input[U] + 'test1.2');

        InputQ.addEventListener('input', function (event) {
            event.preventDefault();
            Cart[U].number = Input[U].value;

            console.log(Input[U].value + 'test1');
            console.log(Cart[U].number + 'test2');
            console.log(typeof Cart[U] + 'test3');
            console.log(Cart[U] + 'test4'); 

            const Index_modified = Cart.indexOf(Cart[U]);

            console.log(Index_modified + 'test5');

            Cart.splice(Index_modified, 1, Cart[U]);

            console.log(Cart + 'test6');
            console.log(typeof Cart + 'test7');

            localStorage.removeItem('Allproducts');
            localStorage.setItem('Allproducts', JSON.stringify(Cart));
        })
    }
}



84 + 234 + 285


const articles = document.querySelectorAll("article");





