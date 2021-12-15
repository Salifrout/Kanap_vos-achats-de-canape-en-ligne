const IDcommand = sessionStorage.getItem('IDcommand');

function ShowCommand() {
    if (typeof IDcommand === 'undefined') {
        document.getElementById("orderId").innerText = "Attention ! Votre numéro de commande a été perdu. Veuillez retourner au panier."
    } else {
        document.getElementById("orderId").innerHTML = IDcommand;
    }
}

ShowCommand();