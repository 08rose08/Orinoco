const APIURL = "http://localhost:3000/api";
class TeddyManager {
    /*appel api, 
    parse la réponse
    affiche le résultat du parse dans la console
    utilise le résultat dans la construction html
    */
    constructor(){
        console.log('coucou');
        this.teddies = null;
        this.teddy = null;
        
    }

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
            appel.open("GET", APIURL + "/teddies");
            appel.send();
        });  
    }
    async showAllTeddy(){
        const teddies = await this.getAllTeddy();
        console.log(teddies);
        teddies.forEach(function (teddie) {
            let carteTeddie = document.createElement("div");
            carteTeddie.setAttribute('class', 'card bg-dark text-white w-25 m-3');
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
    };



    getOneTeddy(){
        let id = location.search.substring(4); 
        console.log(id);
        fetch(APIURL + "/teddies/" + id)
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
    addTeddy(event){
        console.log(this.teddy);
        //event.preventDefault();
        let strPanierBack = localStorage.getItem('strPanier');
        
        if(strPanierBack){
            let panierBack = JSON.parse(strPanierBack);
            if(Array.isArray(panierBack)){
                let teddyPanier = {
                    nom : this.teddy.name,
                    prix : this.teddy.price,
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
            }
            console.log(teddyPanier);
            tableauPanier.push(teddyPanier);
            console.log(tableauPanier);
            let strPanierGo = JSON.stringify(tableauPanier);
            console.log(strPanierGo);
            localStorage.setItem('strPanier', strPanierGo);
        }
        
        /*let resultat = window.confirm('Voir le panier ?');
        if (resultat = true){
            window.location.href="panier.html";
        }*/
    }
    
    putInTheStorage(){
        document.getElementById('panier').addEventListener('click', (event)=>{
            console.log(this);
            this.addTeddy(event);
        }); 
        //document.getElementById('panier').addEventListener('click', this.addTeddy); 
    };
    
    getFromTheStorage(){
        let strPanierBack = localStorage.getItem('strPanier');
        console.log(strPanierBack);
        let panierBacks = JSON.parse(strPanierBack);
        console.log(panierBacks);

        if(strPanierBack){
            let panierBack = JSON.parse(strPanierBack);
            if(Array.isArray(panierBack)){
                panierBacks.forEach(function(panierBack){
                    nom.setAttribute('class','');
                    nom.textContent = panierBack.nom;
                    prix.setAttribute('class','')
                    prix.textContent = panierBack.prix /100 + '€';
                    item.appendChild(nom);
                    item.appendChild(prix);
                })
                let viderPanier = document.createElement("p");
                viderPanier.setAttribute('class', '');              
                viderPanier.textContent = 'Vider le panier';
                panier.appendChild(viderPanier);
                viderPanier.addEventListener('click', ()=>{
                    localStorage.clear();
                    this.getFromTheStorage();
                    viderPanier.remove();
                })
            }else{
                console.log('ça merde  = pas un tableau');
            }
        }else{
            let panierVide = document.createElement("p");
            panierVide.setAttribute('class', '');
            panierVide.textContent = 'Panier vide';
            panier.appendChild(panierVide);
            item.remove();
            
            
        }
        
                    
        
        
        
    }   
}
