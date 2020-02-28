class TeddyManager {
    /*appel api, 
    parse la réponse
    affiche le résultat du parse dans la console
    utilise le résultat dans la construction html
    */
    constructor(){
        console.log('coucou');
        this.teddies=null;
    }
    getAllTeddy(){
        return new Promise((resolve)=>{
            var appel = new XMLHttpRequest();
            appel.onload = function() {
                if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                    resolve(JSON.parse(this.responseText));
                }else{
                    throw new Error('error dans appel');
                }
            };
            appel.open("GET", "http://localhost:3000/api/teddies");
            appel.send();
        });  
    }
    async showAllTeddy(){
        const teddies=await this.getAllTeddy();
        console.log(teddies);
        teddies.forEach(function (teddie) {
            var carteTeddie = document.createElement("div");
            carteTeddie.setAttribute('class', 'card bg-dark text-white w-25 m-3');
            var imageTeddie = document.createElement("img");
            imageTeddie.setAttribute('src', teddie.imageUrl);
            imageTeddie.setAttribute('class', 'card-img-top');
            imageTeddie.setAttribute('alt', 'un portrait de notre teddy');
            var etiquetteTeddie = document.createElement("div");
            etiquetteTeddie.setAttribute('class', 'card-body bg-dark p-1 text-center');
            var nomTeddie = document.createElement("h3");
            nomTeddie.textContent = teddie.name;
            nomTeddie.setAttribute('class', 'card-title m-0');
            var prixTeddie = document.createElement("p");
            prixTeddie.textContent = teddie.price/100+" €";
            prixTeddie.setAttribute('class', 'card-text m-0');
            var boutonTeddie = document.createElement("a");
            boutonTeddie.textContent = "Voir " + teddie.name;
            boutonTeddie.setAttribute('class', 'btn btn-dark');
            boutonTeddie.setAttribute('href', 'teddy.html?idProduit=' + teddies._id);
            vitrine.appendChild(carteTeddie);
            carteTeddie.appendChild(imageTeddie);
            carteTeddie.appendChild(etiquetteTeddie);
            etiquetteTeddie.appendChild(nomTeddie);
            etiquetteTeddie.appendChild(prixTeddie);
            etiquetteTeddie.appendChild(boutonTeddie);
        });
    }  
}
