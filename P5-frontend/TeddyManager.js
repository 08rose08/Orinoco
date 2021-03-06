const APIURL = "http://localhost:3000/api/teddies/";
class TeddyManager {
    constructor(){
        console.log('coucou');
        this.teddies = null;
        this.teddy = null;
        this.panierBacks = null;
        this.contact = null;
        this.products = null;
        this.arrayProducts = null;
        this.trucPost = null;
        this.objetPost = null;
        this.prixFinal = null;   
    }
    /*appel api
    parse la réponse
    -> promesse*/
    getAllTeddy(){
        return new Promise((resolve)=>{
            let appel = new XMLHttpRequest();
            appel.onload = function() {
                if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                    resolve(JSON.parse(this.responseText));
                }else{
                    throw new Error('error dans appel');
                }
            };
            appel.open("GET", APIURL);
            appel.send();
        });  
    }
    /*attrape la promesse de getAllTeddy
    construit pour chaque item une carte produit
    insère cette carte dans le html
    */
    async showAllTeddy(){
        const teddies = await this.getAllTeddy();
        console.log(teddies);
        teddies.forEach(function (teddie) {
            let carteTeddie = document.createElement("div");
            carteTeddie.setAttribute('class', 'card bg-dark text-white w-25 m-3');
            carteTeddie.setAttribute('id', 'carte');
            let imageTeddie = document.createElement("img");
            imageTeddie.setAttribute('src', teddie.imageUrl);
            imageTeddie.setAttribute('class', 'card-img-top');
            imageTeddie.setAttribute('alt', 'un portrait de notre teddy');
            let etiquetteTeddie = document.createElement("div");
            etiquetteTeddie.setAttribute('class', 'card-body bg-dark p-1 text-center');
            let nomTeddie = document.createElement("h3");
            nomTeddie.textContent = teddie.name;
            nomTeddie.setAttribute('class', 'card-title m-0');
            let prixTeddie = document.createElement("p");
            prixTeddie.textContent = teddie.price/100+" €";
            prixTeddie.setAttribute('class', 'card-text m-0');
            let boutonTeddie = document.createElement("a");
            boutonTeddie.textContent = "Voir " + teddie.name;
            boutonTeddie.setAttribute('class', 'btn btn-dark');
            boutonTeddie.setAttribute('href', 'produit.html?id=' + teddie._id);
            vitrine.appendChild(carteTeddie);
            carteTeddie.appendChild(imageTeddie);
            carteTeddie.appendChild(etiquetteTeddie);
            etiquetteTeddie.appendChild(nomTeddie);
            etiquetteTeddie.appendChild(prixTeddie);
            etiquetteTeddie.appendChild(boutonTeddie);
        });
        document.getElementById('erreur').remove();
    };
    /* attrape le paramètre dans l'url
    l'utilise pour fetch get
    utilise la réponse pour remplir la carte produit*/
    getOneTeddy(){
        let id = location.search.substring(4); 
        console.log(id);
        fetch(APIURL + id)
        .then(response => response.json())
        .then((response)=>{
            console.log(this.teddy);
            this.teddy = response;
            console.log(this.teddy);
            document.getElementById('nom').textContent = this.teddy.name;
            document.getElementById('image').setAttribute('src', this.teddy.imageUrl);
            document.getElementById('image').setAttribute('alt', 'une photo de ' + this.teddy.name);
            document.getElementById('description').textContent = this.teddy.description;
            document.getElementById('prix').textContent = this.teddy.price/100 + '€';
            this.teddy.colors.forEach(function(color){
                let couleur = document.createElement("option");
                couleur.setAttribute('value', color);
                couleur.textContent = color;
                couleurs.appendChild(couleur);
            });
        })
        .catch(function(error){
            console.log('Il y a eu un problème avec fetch: ' + error.message);
        });
    }
    /* vérifie que le panier existe et est un tableau
    ajoute le teddy au panier*/
    /**
     * ajoute le teddy au panier
     * @param {MouseEvent} event 
     */
    addTeddy(event){
        //console.log(event);
        console.log(this.teddy);
        //event.preventDefault();
        let strPanierBack = localStorage.getItem('strPanier');
        //si le panier existe ... sinon le créer et push le teddy     
        if(strPanierBack){
            let panierBack = JSON.parse(strPanierBack);
            //si le panier est un tableau alors le remplir sinon le créer et push le teddy
            if(Array.isArray(panierBack)){
                let teddyPanier = {
                    nom : this.teddy.name,
                    prix : this.teddy.price,
                    id : this.teddy._id,
                }
                console.log(teddyPanier);
                panierBack.push(teddyPanier);
                console.log(panierBack);
                let strPanierGo = JSON.stringify(panierBack);
                console.log(strPanierGo);
                localStorage.setItem('strPanier', strPanierGo);
            }else{
                let tableauPanier = [];
                let teddyPanier = {
                    nom : this.teddy.name,
                    prix : this.teddy.price,
                    id : this.teddy._id,
                }
                console.log(teddyPanier);
                tableauPanier.push(teddyPanier);
                console.log(tableauPanier);
                let strPanierGo = JSON.stringify(tableauPanier);
                console.log(strPanierGo);
                localStorage.setItem('strPanier', strPanierGo);
            }
        }else{
            let tableauPanier = [];
            let teddyPanier = {
                nom : this.teddy.name,
                prix : this.teddy.price,
                id : this.teddy._id,
            }
            console.log(teddyPanier);
            tableauPanier.push(teddyPanier);
            console.log(tableauPanier);
            let strPanierGo = JSON.stringify(tableauPanier);
            console.log(strPanierGo);
            localStorage.setItem('strPanier', strPanierGo);
        }
    }
    // au clic : appelle addTeddy()
    putInTheStorage(){
        document.getElementById('panier').addEventListener('click', (event)=>{
            console.log(this);
            this.addTeddy(event);
        });  
    };
    //afficher le contenu du panier
    getFromTheStorage(){
        //récupérer le panier dans le localStorage
        let strPanierBack = localStorage.getItem('strPanier');
        console.log(strPanierBack);
        let panierBacks = JSON.parse(strPanierBack);
        console.log(panierBacks);
        //si le panier existe, le parser sinon ... afficher panier vide
        if(strPanierBack){
            let panierBack = JSON.parse(strPanierBack);
            //si le panier est un tableau ... sinon
            if(Array.isArray(panierBack)){
                // si la longueur du tableau 0 alors afficher panier vide ... sinon l191
                if(panierBack.length == 0){
                    console.log(panierBack.length);
                    let panierVide = document.createElement("p");
                    panierVide.setAttribute('class', '');
                    panierVide.textContent = 'Panier vide';
                    panier.appendChild(panierVide);
                    if(document.getElementById('viderPanier')){
                        // si le bouton vider le panier existe, le supprimer
                        document.getElementById('viderPanier').remove();
                    }else{
                    }
                    document.getElementById('panierInterieur').remove();
                }else{
                    document.getElementById('panierInterieur').innerHTML = null;
                    if(document.getElementById('viderPanier')){
                        //si le bouton vider le panier existe, le supprimer
                        document.getElementById('viderPanier').remove();
                    }else{
                    }
                    //récupérer le panier et pour chaque item afficher le nom, le prix, l'icone de suppression, et une barre de séparation
                    this.panierBacks = panierBacks;
                    console.log(panierBacks.length);
                    for (let i = 0; i < panierBacks.length; i++){
                        console.log('coucou dans le for\'t');
                        let item = document.createElement("div");
                        item.setAttribute('id', 'item' + [i]);
                        item.setAttribute('class', 'item d-sm-flex justify-content-between flex-row');
                        let nom = document.createElement("p");
                        nom.setAttribute('class','w-50');
                        nom.textContent = panierBack[i].nom;
                        let prix = document.createElement("p");
                        prix.setAttribute('class','w-25');
                        prix.textContent = panierBack[i].prix /100 + '€';
                        let annule = document.createElement("i");
                        annule.setAttribute('id', 'annule' + [i]);
                        annule.setAttribute('class', 'fas fa-times-circle close retireTeddy');
                        annule.addEventListener('click', (event)=>{
                            console.log('je veux retirer ce teddy');
                            this.removeTeddy(i);
                        })
                        let hr = document.createElement("hr");
                        panierInterieur.appendChild(item);
                        item.appendChild(nom);
                        item.appendChild(prix);
                        item.appendChild(annule);
                        panierInterieur.appendChild(hr);    
                    }
                    // calcul le prix total du panier
                    let total = 0;
                    panierBacks.forEach(function(panierBack){
                        total += panierBack.prix/100;
                    })
                    this.prixFinal = total;
                    console.log(this.prixFinal);
                    //affiche le prix total
                    let prixTotal = document.createElement("div");
                    prixTotal.setAttribute('class', 'p-4');
                    prixTotal.textContent = 'Prix total : ' + total + '€';
                    panierInterieur.appendChild(prixTotal);
                    //affiche le bouton vider le panier
                    let viderPanier = document.createElement("button");
                    viderPanier.setAttribute('id', 'viderPanier');
                    viderPanier.setAttribute('class', 'btn btn-danger w-50');              
                    viderPanier.textContent = 'Vider le panier';
                    panier.appendChild(viderPanier);
                    viderPanier.addEventListener('click', ()=>{
                        localStorage.clear();
                        this.getFromTheStorage();
                        viderPanier.remove();
                        document.getElementById('panierInterieur').remove();
                    })
                }     
            }else{
                console.log('ça m*rde  = pas un tableau');
            }
        }else{
            let panierVide = document.createElement("p");
            panierVide.setAttribute('class', '');
            panierVide.textContent = 'Panier vide';
            panier.appendChild(panierVide);  
        }
        //lance checkEmptyInput au clic
        document.getElementById('envoiPost').addEventListener('click', (event)=>{
            console.log('c\'est cliqué');
            this.checkEmptyInput(event);
        })
    }
    //suprime un teddy du panier
    removeTeddy(i){
        console.log('ok j\'ai vu que tu voulais le retirer');
        //recupérer le array
        // retirer ce teddy
        this.panierBacks.splice(i, 1); 
        console.log(this.panierBacks);
        // stringify le array
        let strPanierBack = JSON.stringify(this.panierBacks);
        console.log(strPanierBack);
        //vide le localstorage
        localStorage.clear();
        console.log('localstorage vidé normalement ?');
        // mettre à jour le localStorage
        localStorage.setItem('strPanier', strPanierBack);
        console.log('localstorage mis à jour normalement ?');
        // relancer getFromTheStorage
        this.getFromTheStorage();
    }
    //vérifie que les champs du formulaire ne sont pas vides
    checkEmptyInput(event){
        event.preventDefault();
        let strPanierBack = localStorage.getItem('strPanier');
        console.log(strPanierBack);
        let panierBacks = JSON.parse(strPanierBack);
        console.log(panierBacks);
        //if panier est pas vide et sa longueur supérieur à 0 sinon... alert panier vide
        if(panierBacks != null && panierBacks.length > 0){
            //                           0            1               2              3                4
            var tabId      = new Array('formNom',   'formPrenom',   'formMail',    'formAdresse',   'formVille');
            var tabMessage = new Array('votre nom', 'votre prénom', 'votre email', 'votre adresse', 'votre ville');
            var br = '\n', mes = '';
            for (var i = 0; i < tabId.length; i++){
                document.getElementById(tabId[i]).value = document.getElementById(tabId[i]).value.trim();//trim permet de eliminer les espaces
                if(document.getElementById(tabId[i]).value == ''){
                    mes = mes + br + ' - ' + tabMessage[i] + ' ;';
                }
            }
            //si message différent de '', affiche le message en alert sinon... appelle controlPanier
            if(mes != ''){
                alert('ERREUR :' + br + br + 'Il manque :' + mes);
            } else{
                console.log('Pas de champ vide'); 
                this.controlPanier(event);
            }
        }else{
            alert('Panier vide')
        }
    }
    //vérifie les inputs du formulaire
    controlPanier(event){
        event.preventDefault();
        console.log('Go control !');
        let chiffre = /[0-9]/;
        let verifAt = /.+@.+\..+/;
        let formNom = document.getElementById('formNom').value;
        let formPrenom = document.getElementById('formPrenom').value;
        let formVille = document.getElementById('formVille').value;
        let formMail= document.getElementById('formMail').value;
        let br = '\n', mes = '';
        if(chiffre.test(formNom)==true){
            console.log('nom invalide');
            mes = mes + br + ' - Nom invalide;';
        }else{
            console.log('nom ok')
        }
        if(chiffre.test(formPrenom)==true){
            console.log('Prénom invalide');
            mes = mes + br + ' - Prénom invalide;';
        }else{
            console.log('prénom ok')
        }
        if(chiffre.test(formVille)==true){
            console.log('Ville invalide');
            mes = mes + br + ' - Nom de ville invalide;';
        }else{
            console.log('ville ok')
        }
        if(verifAt.test(formMail)==false){
            console.log('mail invalide');
            mes = mes + br + ' - Mail invalide;';
        }else{
            console.log('mail ok')
        }
        if(chiffre.test(formNom)==false && chiffre.test(formPrenom)==false && chiffre.test(formVille)==false && verifAt.test(formMail)==true){
            console.log('On peut POST !')
            //-> le tableau de produits
            let arrayProductsT = [];
            console.log(this.panierBacks)
            this.panierBacks.forEach(function(panierBack){
                console.log('on démarre la complétion du tableau')
                arrayProductsT.push(panierBack.id);
                console.log(arrayProductsT);
            });
            this.arrayProducts = arrayProductsT;
            sessionStorage.clear();
            sessionStorage.setItem('nom', document.getElementById('formPrenom').value);
            //-> l'objet contact
            this.contact = {
                firstName : document.getElementById('formPrenom').value,
                lastName : document.getElementById('formNom').value,
                address : document.getElementById('formAdresse').value,
                city : document.getElementById('formVille').value,
                email : document.getElementById('formMail').value,
            }
            //-> objet à POST
            this.objetPost = {
                products : this.arrayProducts,
                contact : this.contact,
            }
            console.log(this.objetPost);
            this.trucPost = JSON.stringify(this.objetPost);
            console.log(this.trucPost);
            this.postTeddy(event); // passer à la page confirmation seulement après que postTeddy soit ok
        }else{
            //affiche le message d'erreur
            console.log('il reste un problème');
            alert('ERREUR :' + br + br + mes);
        }
    };
    //envoie la requête post de la commande avec le tableau d'items et l'objet contact
    postTeddy(){
        console.log(this.prixFinal);
        sessionStorage.setItem('prix', this.prixFinal);
        return new Promise((resolve)=>{
            console.log('Post-apocalyptique ?');
            let post = new XMLHttpRequest();
            post.onload = function() {
                if (this.readyState == XMLHttpRequest.DONE && this.status == 201){
                    let laReponse = JSON.parse(this.responseText);
                    console.log(laReponse);
                    console.log(laReponse.orderId);
                    sessionStorage.setItem('numero', laReponse.orderId);
                    document.forms['frm'].action = './confirmation.html';
                    document.forms['frm'].submit();
                    resolve(laReponse);                 
                }else{
                    console.log('erreur dans le post')
                }
            };
            post.open("POST", APIURL + "order");
            post.setRequestHeader("Content-Type", "application/json");
            post.send(this.trucPost);
        });
    }
    //affiche le message de confirmation à partir du sessionStorage
    async showOrder(){
        console.log('let\'s the show begin !');
        let numeroFinal = sessionStorage.getItem('numero');
        console.log(numeroFinal);
        let prixAffiche = sessionStorage.getItem('prix');
        console.log(prixAffiche);
        let nom = sessionStorage.getItem('nom');
        let merciMess = document.getElementById('nom');
        let order = document.getElementById('order');
        //si pas de numero de commande alors message d'erreur
        if (numeroFinal != null){
            merciMess.textContent = nom;
            order.textContent = 'Votre commande de ' + prixAffiche + '€ porte le numéro : ' + numeroFinal;
            localStorage.clear();
        }else{
            document.getElementById('merci').textContent = 'Saperlipopette !';
            order.textContent = 'Il y a un souci avec votre commande.'
        }
    }
}
