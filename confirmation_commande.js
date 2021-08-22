let totalPrice = JSON.parse(localStorage.getItem('totalPrice'));
let id = localStorage.getItem('idResponse');
console.log(id);
console.log(totalPrice);

function displayText (){
    var h1 = document.querySelector('#template_text');
    var newNode = document.importNode(h1.content, true);
    document.querySelector('#confirmation_text').appendChild(newNode);

    //Lorsque les keys sont effacées du local storage
    if(totalPrice == null){
        document.querySelector('#h1').textContent = `Votre panier est vide`;
        document.querySelector('#h2').style.display = 'none';
        document.querySelector('#h3').style.display = 'none';

    }else{
        document.querySelector('#h1').textContent = `Votre commande n°${id} est bien enregistrée et sera envoyée dans les meilleurs délais!`;
    document.querySelector('#h2').textContent = `Le montant total est de ${totalPrice}€`

    //Effacer le local storage sauf le formulaire
    function deleteKey (key){
        localStorage.removeItem(key);
    };

    deleteKey('totalPrice');
    deleteKey('productKey');
    deleteKey('idResponse');
    }
}
displayText();

