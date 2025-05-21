class Header extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <header>

            <nav class="overlay" id="myNav">
                <a href="javascript:void(0)" class="closeBtn" onclick="closeNav()">&times;</a>
                <div class="overlaycontent">
                    <a href="../../locked/index.html">Home</a>
                    <hr>
                    <a href="../../locked/previas.html">Previas</a>
                    <a href="../../locked/dicas.html">Dicas</a>
                    <a href="../../locked/curiosidades.html">curiosidades</a>
                    <hr>
                    <a href="../../locked/clickerGame.html">Jogos</a>
                    <a href="../../locked/dashboard/dashboard.html">Dashboard</a>
                    
                </div>
            </nav>
            
            <div class="logo"></div>
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