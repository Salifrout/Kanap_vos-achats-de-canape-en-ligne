//créer une foncion pour récupérer les informations du produit situés dans le stockage local
function recevoirleproduit() {
    localStorage.getItem("Id");
    localStorage.getItem("Quantity");
    localStorage.getItem("Color");
}

//appeler la fonction pour l'exécuter
recevoirleproduit();

//situer les éléments dans le DOM
...