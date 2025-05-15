class Header extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <header>
                <div class="logo"></div>
                <nav class="visit_header_container">
                    <ul class="list_visit_option">
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