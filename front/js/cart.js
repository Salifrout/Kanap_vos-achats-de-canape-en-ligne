//créer une foncion pour récupérer les informations du produit situés dans le stockage local
function Recevoirleproduit() {
    localStorage.getItem("Produits");
}

//appeler la fonction pour l'exécuter
recevoirleproduit();

//situer les éléments dans le DOM
...