// sessão
function validarSessao() {
    var nome = sessionStorage.NOME_USUARIO;;

    var b_usuario = document.getElementById("b_usuario");


    if (nome != null ) {
        b_usuario.innerHTML = `Olá, ${nome}`;
    } else {
        window.location = "http://localhost:3333/login.html";
    }
}

function limparSessao() {
    sessionStorage.clear();
    window.location = "http://localhost:3333/login.html";
}

// carregamento (loading)
function aguardar() {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "flex";
}

function finalizarAguardar(texto) {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "none";

    var divErrosLogin = document.getElementById("div_erros_login");
    
    if (
        texto == 'Houve um erro ao tentar realizar o cadastro!' || 
        texto == 'Houve um erro ao tentar realizar o login!' || 
        texto == 'Email e/ou senha inválido(s)') {
        divErrosLogin.style.display = "flex";
        divErrosLogin.innerHTML = texto;
    } else {
        divErrosLogin.style.display = "none";
    }
}

