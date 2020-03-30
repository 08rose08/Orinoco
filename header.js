document.getElementById('header').innerHTML=`
<nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top nav d-flex justify-content-between">
    <a class="navbar-brand w-25  pt-0" href="index.html">
        <img src="logo.png" id="logoOrinoco" alt="Logo de l'entreprise Orinoco">
    </a>      
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse " id="navbarNavAltMarkup">
        <div class="navbar-nav">
            <a class="nav-item nav-link active" href="index.html">Accueil <span class="sr-only">(current)</span></a>
            <a class="nav-item nav-link" href="panier.html">Panier</a>
        </div>
    </div>
</nav>
`;
