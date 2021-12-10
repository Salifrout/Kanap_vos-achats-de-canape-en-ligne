const IDcommand = sessionStorage.getItem('IDcommand');
console.log(IDcommand);

function ShowCommand() {
    console.log(IDcommand);
    if (typeof IDcommand === 'undefined') {
        document.getElementById("orderId").innerText = "Attention ! Votre numéro de commande a été perdu. Veuillez retourner au panier."
        console.error("l'identifiant de commande a disparu.")
    } else {
        document.getElementById("orderId").innerHTML = IDcommand;
        //localStorage.clear();
        console.log("l'ID de commande est correctement affiché.")
    }
}

ShowCommand();