//Requête http avec la méthode GET utilisant la fonction fetch
fetch('http://localhost:3000/api/cameras')
    .then(function(response){
        if(response.ok){
            return response.json();
        }  
    })
    .then(function(data){
        console.log(data);

        let listeProduits = '<div class="products">';
        for (let product of data){
            listeProduits += `<div class="camera_card"><a href="produits.html?${product._id}"><img src="${product.imageUrl}" alt=""><div id="camera_card_text"><span class="name">${product.name}</span><span class="price">${product.price/100},00 €</span></div></a></div>`;
        }
        listeProduits += '</div>';
        document.querySelector('.products_container').innerHTML = listeProduits;  


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
        //Afficher le total dans l'icône panier
        const totalQuantity = totalQuantityCart.reduce(reducer, 0);
        document.querySelector('#basket_total_quantity').style.display = 'flex';
        document.querySelector('#basket_total_quantity').textContent = `${totalQuantity}`;
    }
    })
    .catch(function(error){
        alert('Erreur, pas de réponse du serveur' );
        console.log(error);
    });




 


