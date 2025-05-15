class Footer extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <footer>
                ©2025 acadMEa. Todos os direitos reservados.
        </footer>
        `;
    }
}

customElements.define('footer-main', Footer);