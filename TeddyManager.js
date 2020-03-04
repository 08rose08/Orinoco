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
        .then(function(response){
            let teddy = response;
            console.log(teddy);
            document.getElementById('nom').textContent = teddy.name;
            document.getElementById('image').setAttribute('src', teddy.imageUrl);
            document.getElementById('image').setAttribute('alt', 'une photo de ' + teddy.name);
            document.getElementById('description').textContent = teddy.description;
            document.getElementById('prix').textContent = teddy.price/100 + '€';
            teddy.colors.forEach(function(color){
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
    
    /*async showOneTeddy(){
        const teddyOb = this.getOneTeddy();
        console.log('étape : showOneTeddy');
        console.log(teddy);
        document.getElementById('image').setAttribute('src', teddyOb.imageUrl);
        document.getElementById('image').setAttribute('alt', 'une photo de ' + teddyOb.name);
        document.getElementById('nom').textContent = teddyOb.name;
        document.getElementById('description').textContent = teddyOb.description;
        document.getElementById('prix').textContent = teddyOb.price;
        teddyOb.colors.forEach(function(color){

        });

    }*/
}
