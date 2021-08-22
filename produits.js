//Récupération de l'id du produt à partir de l'URL
const id = window.location.search.slice(1);

fetch(`http://localhost:3000/api/cameras/${id}`)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
        //Ajout de la quantité des articles dans le panier
        let produitLocalStorage = JSON.parse(localStorage.getItem('productKey'));
        const reducer = (acc, currentValue) => acc + currentValue;
        if(produitLocalStorage === null){
            document.querySelector('#basket_total_quantity').style.display = 'none';
        }else{
            let totalQuantityCart = [];
        for(let q = 0; q < produitLocalStorage.length; q++){
            let totalQuantityProduct = parseInt(produitLocalStorage[q].quantity);
            totalQuantityCart.push(totalQuantityProduct);
        }

        const totalQuantity = totalQuantityCart.reduce(reducer, 0);
        //Afficher le total
            document.querySelector('#basket_total_quantity').style.display = 'flex';
            document.querySelector('#basket_total_quantity').textContent = `${totalQuantity}`;
        }
        
        let nomProduit = `<span class="name">Modèle : ${data.name}</span>`;
        document.querySelector('.name_container').innerHTML = nomProduit;

        let produit = ` <div id="picture"><img src="${data.imageUrl}" alt="appareil photo">
                        </div>
                        <div class="description_container">
                            <span id="name_camera">${data.name}</span>
                            <p id="description">${data.description}</p>
                        <div id="price_container">
                            <span id ="price">${data.price / 100}</span>,00 € TTC
                        </div>
                        <span>Quantité</span>
                        <input id="number" type="number" value="1" min="1" max="6">
                        <select name="dropdown_list" id="dropdown_list">
                            <option value="">--Choisissez votre lentille--</option>
                            <option value="option1">${data.lenses[0]}</option>
                            <option value="option2">${data.lenses[1]}</option>
                        </select>
                        <div id="btn_container">
                            <a href="panier.html">
                                <button class="btn" type="submit">Ajouter au panier</button>
                            </a>
                        </div>`;

        console.log(produit);
        document.querySelector('#product_container').innerHTML = produit;
        
        


    //Sélection du bouton "ajouter au panier"
    let btn = document.querySelector(".btn");
    //Ecouter le clic sur le bouton "ajouter au panier"
    btn.addEventListener('click', (event) => {
        event.preventDefault();
        var quantityProduct = document.querySelector('#number').value;
        var detailProduit = {
            name : data.name,
            _id : id,
            price : data.price/100,
            quantity : quantityProduct,
            image : data.imageUrl,
        }
        console.log(detailProduit);
    
    //Fonction pour ouvrir une fenêtre après ajout au panier
    function pushCart (){
        if(window.confirm(`Votre produit : ${data.name} a bien été ajouté au panier ! Souhaitez-vous accèder au panier ?`)){
            window.location.href = 'panier.html';
        }
        else{
            window.location.href = 'index.html';
        }
    }

    //Ajout des produits au panier (dans le localStorage)
    //Transformer l'objet js en JSON et l'envoyer dans le localstorage

    //Fonction envoi dans le local storage
    function pushLocalStorage () {
            produitLocalStorage.push(detailProduit);
            localStorage.setItem('productKey', JSON.stringify(produitLocalStorage));
            console.log('voici l\'id du produit ajouter au panier :' + detailProduit._id);
            pushCart();
    };
    
    let produitLocalStorage = JSON.parse(localStorage.getItem('productKey'));

    //S'il y a déjà des produits dans le localStorage
    if(produitLocalStorage){
        console.log(produitLocalStorage);
        console.log('Il a déjà des produits dans le panier');
        let existeId =  false;

        for(e = 0; e < produitLocalStorage.length; e++){
            console.log('Avant ajout : Nombre de produit différent dans le panier :' + produitLocalStorage.length);
            console.log(produitLocalStorage[e].quantity);
            console.log('id déjà présent(s) dans le local storage : ' + produitLocalStorage[e]._id);

            //Vérification si l'id du produit produit est déjà présent dans le localStorage
            if(produitLocalStorage[e]._id == id){
                existeId = true;
            }  
        }
        //Si l'Id' n'est pas présent dans le localStorage, alors le produit n'y est pas
        if(existeId == false){
            detailProduit.quantity = document.querySelector('#number').value;
            //console.log('quantité du produit qui vient d\'être ajouté au panier :' + produitLocalStorage[e].quantity);
            console.log('Le panier contient des articles, mais pas celui-ci');
            pushLocalStorage();
            //break; 

        } else {
            for(e = 0; e < produitLocalStorage.length; e++){
                if(produitLocalStorage[e]._id == id){
                    console.log('Ce produit est déjà présent dans le panier')
                    let quantityOfProductInLocalStorage = parseInt(produitLocalStorage[e].quantity);
                    let quantityOfProductInThisPage = parseInt(detailProduit.quantity);
                    quantityOfProductInLocalStorage += quantityOfProductInThisPage;
                    console.log('Après ajout, il y a ' + quantityOfProductInLocalStorage + 'fois ce produit dans le local storage');
                    produitLocalStorage.splice(e,1);
                    detailProduit.quantity = quantityOfProductInLocalStorage;
                    pushLocalStorage();
                    break;
                }
            }}     
    }else{
        console.log('pas de produits dans le panier');
        produitLocalStorage = []; 
        pushLocalStorage();
        console.log(produitLocalStorage);
    }   
    })})
    .catch(function(error){
        alert('Erreur, pas de réponse du serveur' );
        console.log(error);
    });