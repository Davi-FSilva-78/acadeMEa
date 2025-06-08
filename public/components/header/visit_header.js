class Header extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
                  <header>
            <nav class="overlay" id="myNav">
                <a href="javascript:void(0)" class="closeBtn" onclick="closeNav()">&times;</a>
                <h1 id="b_usuario"></h1>
                <div class="overlaycontent">
                    <a href="../../index.html">Home</a>
                    <hr>
                    <a href="../../dicas.html">Dicas</a>
                    <a href="../../beneficios.html">Beneficios</a>
                    <a href="../../curiosidades.html">Curiosidades</a>
                    <a href="../../previas.html">Previas</a>
                    <hr>
                    <s style="text-decoration-thickness: 2px"><a onclick="alert('Cadastre-se para jogar')">Jogos</a></s>
                    <s style="text-decoration-thickness: 2px"><a onclick="alert('Cadastre-se para ver seus resultados')">Dashboard</a></s>
                    <hr </div>
                    <div class="btn-logout" onclick="logar, redirecionar">
                        <h3><a href = "./login.html">Login</a></h3>
                    </div>
            </nav>

            <div class="logo"><a href="index.html"><img src="../assets/img/global/logo.png" alt=""></a></div>
            <nav class="visit_header_container">
                <div class="list_visit_option">
                    <div class="burguerSalas" onclick="openNav()">
                        <div>-</div>
                        <div>-</div>
                        <div>-</div>
                    </div>
                </div>
                <ul class="list_cad">
                    <li class="cadastro"> <a href="./cadastro.html">Cadastro</a></li>
                    |
                    <li class="login"> <a href="./login.html">Login</a></li>
                </ul>
            </nav>
        </header>
        `;
    }
}

customElements.define('main-header', Header);