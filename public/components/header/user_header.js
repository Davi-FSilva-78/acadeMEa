class Header extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <header>

            <nav class="overlay" id="myNav">
                <a href="javascript:void(0)" class="closeBtn" onclick="closeNav()">&times;</a>
                <h1 id="b_usuario"></h1>
                <div class="overlaycontent">
                    <a href="../../locked/index.html">Home</a>
                    <hr>
                    <a href="../../locked/dicas.html">Dicas</a>
                    <a href="../../locked/beneficios.html">Beneficios</a>
                    <a href="../../locked/curiosidades.html">Curiosidades</a>
                    <a href="../../locked/previas.html">Previas</a>
                    <hr>
                    <a href="../../locked/clickerGame.html">Jogos</a>
                    <a href="../../locked/dashboard.html">Dashboard</a>
                    <hr  
                </div>
                <div class="btn-logout" onclick="limparSessao()">
                    <h3>Sair</h3>
                </div>
            </nav>
            
            <div class="logo"><img src="../assets/img/global/logo.png" alt=""></div>
            <nav class="visit_header_container">
                <div class="list_visit_option">
                        <div class="burguerSalas" onclick="openNav()">
                            <div>-</div>
                            <div>-</div>
                            <div>-</div>
                        </div>
                </div>
            </nav>
        </header>
        `;
    }
}

customElements.define('user-header', Header);