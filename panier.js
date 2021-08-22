//Récuperer les objets stockés dans le local storage
var produitLocalStorage = JSON.parse(localStorage.getItem('productKey'));

//Affichage des produits dans le panier

if(produitLocalStorage === null || produitLocalStorage == ''){
    //Sélection du template html que l'on veut rendre visible
    var empty_card_container = document.querySelector('#template_empty_card');
    //Création de la variable qui contient ce que l'on veut rendre visible
    var newNode = document.importNode(empty_card_container.content, true);
    //Import du contenu dans la balise sélectionnée
    document.querySelector('#basket_container').appendChild(newNode);
    document.querySelector('#basket_total_quantity').style.display = 'none';
    console.log('le panier est vide');
}else{
        var fullBasket = [];
    for(produit = 0; produit < produitLocalStorage.length; produit++){
        fullBasket += `<div id="recapitulatif_order">
                            <div class="product_card">
                                <a href="produits.html?${produitLocalStorage[produit]._id}"><img src="${produitLocalStorage[produit].image}" alt="photo produit"></a>
                                <div id="name_reference">
                                    <span id="name">${produitLocalStorage[produit].name}</span>
                                    <span id="reference">Réf : ${produitLocalStorage[produit]._id}</span>
                                </div>
                                <input id="number" type="number" value="${produitLocalStorage[produit].quantity}" min="${produitLocalStorage[produit].quantity}" max="${produitLocalStorage[produit].quantity}">
                                <div id="price_trash">
                                    <span id = "price">${produitLocalStorage[produit].quantity} x ${produitLocalStorage[produit].price},00€</span>
                                    <span id="total_price_product">${produitLocalStorage[produit].price*produitLocalStorage[produit].quantity},00€</span>
                                    <span class="trash_logo">
                                        <i class="far fa-trash-alt"></i>
                                    </span>
                                </div>
                            </div>
                        </div>`;

        console.log(fullBasket);
        document.querySelector('#basket_container').innerHTML = fullBasket;

    //Supprimer un élément du panier
    let deleteBtn = document.querySelectorAll('.trash_logo');
    console.log(deleteBtn);

    for(b = 0; b < deleteBtn.length; b++){
        let deleteProductId = produitLocalStorage[b]._id; 
            console.log(deleteProductId);
        deleteBtn[b].addEventListener('click', () => {
            produitLocalStorage = produitLocalStorage.filter( (el) => el._id !== deleteProductId);
                console.log(produitLocalStorage);
                
                //Envoi des nouvelles données dans le localStorage
                localStorage.setItem('productKey', JSON.stringify(produitLocalStorage));
                window.location.href = "panier.html";

        })
    }


    //vider entièrement le panier
    document.querySelector('#remove_cart').addEventListener('click', () => {
    localStorage.removeItem('productKey');
    localStorage.removeItem('totalPrice');
    //Recharger la page
    window.location.href = 'panier.html';
    })

    //Calcul du Total
    var totalPriceCart = [];
    for(let p = 0; p < produitLocalStorage.length; p++){
    var totalPriceProduct = (produitLocalStorage[p].price)*(produitLocalStorage[p].quantity);
    totalPriceCart.push(totalPriceProduct);
    }
    const reducer = (acc, currentValue) => acc + currentValue;
    var totalPrice = totalPriceCart.reduce(reducer, 0);
    //Envoyer le total dans le local storage
    localStorage.setItem('totalPrice', JSON.stringify(totalPrice));

    //Afficher le total
    document.querySelector('#total_price').textContent = `${totalPrice}, 00€ TTC`;


    let totalQuantityCart = [];
    for(let q = 0; q < produitLocalStorage.length; q++){
        let totalQuantityProduct = parseInt(produitLocalStorage[q].quantity);
        totalQuantityCart.push(totalQuantityProduct);
    }

        //Afficher le nombre d'article dans le panier
        const totalQuantity = totalQuantityCart.reduce(reducer, 0);
        console.log(totalQuantity);
        //Afficher le total
        document.querySelector('#basket_paragraph').textContent = `Votre panier contient ${totalQuantity} article(s)`;
    
            document.querySelector('#basket_total_quantity').style.display = 'flex';
            document.querySelector('#basket_total_quantity').textContent = `${totalQuantity}`;
    }
    // var newNodeFullCart = [];
    // for(produit = 0; produit < produitLocalStorage.length; produit++){
    //     let fullCartTemplate = document.querySelector('#template_full_card');
    //     let newNodeFullCart = document.importNode(fullCartTemplate.content, true);
    //     document.querySelector('#basket_container').appendChild(newNodeFullCart);
        
    //     document.querySelector('#name').textContent = `${produitLocalStorage[produit].name}`;
    //     document.querySelector('#reference').textContent = `Réf : ${produitLocalStorage[produit]._id}`;
    //     document.querySelector('#price').textContent = `${produitLocalStorage[produit].quantity} x ${produitLocalStorage[produit].price},00€`;
    //     document.querySelector('#total_price_product').textContent = `${produitLocalStorage[produit].price*produitLocalStorage[produit].quantity},00€`;
    //     document.querySelector('#number').setAttribute('value', `${produitLocalStorage[produit].quantity}`);
    //     document.querySelector('#picture_product').setAttribute('src', `${produitLocalStorage[produit].image}`);


    //     let totalProduit = produitLocalStorage[produit].quantity*produitLocalStorage[produit].price;

//--------------------------------------------------Formulaire-----------------------------------------------
//Récupération du template
let formTemplate = document.querySelector('#form_template');
let newNodeForm = document.importNode(formTemplate.content, true);
document.querySelector('#form_section').appendChild(newNodeForm);


//Récupération des valeurs du formulaire
document.querySelector('#send_container').addEventListener('click', () => {
    //Création d'un objet pour mettre les valeurs du formulaire
    const formResponse = {
        firstname : document.querySelector('#firstname').value,
        lastname : document.querySelector('#lastname').value,
        adress : document.querySelector('#adress').value,
        city : document.querySelector('#city').value,
        email : document.querySelector('#email').value
    }

    //Vérification des données
    const regExFLC = (value) => {
        return /^[A-Z\-a-z'"-àâäãçéèêëìîïòôöõùûüñ-]{2,20}$/.test(value);
    }

    let firstName = formResponse.firstname;
    let lastName = formResponse.lastname;
    let adressControl = formResponse.adress;
    let cityControl = formResponse.city;
    let emailControl = formResponse.email;

    function formControlFirstName (){
        if(regExFLC(firstName)){
            firstname.style.borderColor = 'inherit';
            document.querySelector('.error_first_name').style.display = 'none'
            console.log('ok');
            return true;

        }else{
            firstname.style.borderColor = 'red';
            document.querySelector('.error_first_name').textContent = 'Veuillez entrer un prénom valide';
            return false;
            
    }};
    function formControlLastName (){
        if(regExFLC(lastName)){
            lastname.style.borderColor = 'inherit';
            document.querySelector('.error_last_name').style.display = 'none'
            console.log('ok');
            return true;

        }else{
            lastname.style.borderColor = 'red';
            document.querySelector('.error_last_name').textContent = 'Veuillez entrer un nom valide';
            return false;
    }};
    const regExAdress = (value) => {
        return /^[A-Za-z\-1-9'"\s-àâäãçéèêëìîïòôöõùûüñ-]{5,40}$/.test(value);
    }
    function formControlAdress (){
        if(regExAdress(adressControl)){
            adress.style.borderColor = 'inherit';
            document.querySelector('.error_adress').style.display = 'none'
            console.log('ok');
            return true;

        }else{
            adress.style.borderColor = 'red';
            document.querySelector('.error_adress').textContent = 'Veuillez entrer une adresse valide';
            return false;
    }};
    function formControlCity (){
        if(regExAdress(cityControl)){
            city.style.borderColor = 'inherit';
            document.querySelector('.error_city').style.display = 'none'
            console.log('ok');
            return true;

        }else{
            city.style.borderColor = 'red';
            document.querySelector('.error_city').textContent = 'Veuillez entrer un nom de ville valide';
            return false;
    }};
    const regExEmail = (value) => {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
    }
    function formControlemail (){
        if(regExEmail(emailControl)){
            email.style.borderColor = 'inherit';
            document.querySelector('.error_email').style.display = 'none'
            console.log('ok');
            return true;

        }else{
            email.style.borderColor = 'red';
            document.querySelector('.error_email').textContent = 'Veuillez entrer un email valide';
            return false;
    }};
   
    if(formControlFirstName() && formControlLastName() && formControlAdress() && formControlCity() && formControlemail()){
        //Envoi dans le localStorage et envoi la promesse
        localStorage.setItem('Formulaire', JSON.stringify(formResponse));
        console.log(formResponse);

        //Elements à envoyer dans le localStorage
        var contact = {
            firstName: firstName,
            lastName: lastName,
            address: adressControl,
            city: cityControl,
            email: emailControl
        };
        const products = [];
        for(p = 0; p < produitLocalStorage.length; p++){
            let idProduct = produitLocalStorage[p]._id;
            products.push(idProduct);
        }
        console.log(products);
        
        const elementToSend = {contact, products,}; 
        console.log(elementToSend);
        

        const url = 'http://localhost:3000/api/cameras/order';
        let data = JSON.stringify(elementToSend);
        let fetchData = {
            method: 'POST',
            body: data,
            headers: {'Content-Type' : 'application/json'}
        };
        fetch(url, fetchData)
        //Voir le resultat du serveur dans la console
        .then(async(response) => {
            try {
                console.log(response);
                const dataResponse = await response.json();
                console.log('OK');
                if (response.ok){
                    //Envoyer l'id dans le local storage
                    console.log(dataResponse.orderId);
                    localStorage.setItem('idResponse', dataResponse.orderId);
                    window.location = 'confirmation_commande.html';
                }
            }catch(e){
                console.log(e);
                console.log('KO');
            }
        })
        .catch(function(error){
            alert(`Erreur, impossible de transmettre la requête au serveur` );
            console.log(error);
        });

    }
});
}