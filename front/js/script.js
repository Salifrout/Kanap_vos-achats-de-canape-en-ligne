fetch("http://localhost:3000/api/products")
.then(function(response) {
   // retourne le contenue json de la réponse dans une nouvelle Promise
   return response.json();
})
.then(function(json) {
   console.log("Le serveur à retourné les données: ", json);
})
.catch(function(error) {
   console.error(error);
   throw new Error("La requête a planté");
});


//appeler la fonction pour chaque produit afin de construire le DOM
//for (product of listofproducts) {
//    Accueildynamique();
//};

//ne marche pas. PK ?



