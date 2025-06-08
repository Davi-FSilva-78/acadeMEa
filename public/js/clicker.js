// event lister para controle de ações
let liberar_jogo = false;

window.addEventListener('keydown', liberarEspaco);

function liberarEspaco(evento) {

    if (evento.code == 'Space' && liberar_jogo) {
        estimular()
    }
}

// Variavel universal
const id_usuario = sessionStorage.ID_USUARIO;

// Variaveis para controle de nivel -------------------------------------------------------------------------------------------------------------------------------------------
const niveis = [
    [1, 2],
    [2, 1.9],
    [3, 1.8],
    [4, 1.7],
    [5, 1.6],
    [6, 1.5],
    [7, 1.4],
    [8, 1.3],
    [9, 1.2],
    [10, 1.1],
    [11, 1],
    [12, 0.9],
    [13, 0.8],
    [14, 0.7],
    [15, 1.6],
    [16, 1.5],
    [17, 0.4],
    [18, 0.3],
    [19, 0.2],
    [20, 0.1]
];
const lista_series = verificarSeries(); // variavel para armazenar as series realizadas e quantas repeticoes

let nivel_atual = niveis[0][0]; // nivel atual do usuario
let esforco = niveis[0][1]; // esforco para fazer as repeticoes
obterNivelEsforco(); // função para puxar do banco de dados informações para atualizar nivel e esforco

// Variaveis de configurações do game -----------------------------------------------------------------------------------------------------------------------------------------------
let peso = 0; // variavel que irá coletar o peso que o usuario quer fazer a repeticao
let clicks_nivel = 0; // variavel de quantos clicks o usuario precisa para 
let estimulo = 0; //variavel que irá armazenar quantos clicks o user está dando para levantar o peso
let intensidade = 0;
let historico = '';

// Variaveis de nota
let nota_esforco = 0;
let nota_peso = 0;
let nota_estimulo = 0;
// var constancia constância virá do banco de dados no select

// Variaveis reboot
let repeticoes = 0; // quantas repeticoes o use rfez naquela série
let tempo = 25000 //semudar aqui tem que mudar no soltar_tempo
let intervalo = 0; //Variavél para armazenas o intervalo
let msm_historico = ``;


//Inicio da seção de funções ---------------------------------------------------------------------------------------------------

function obterNivelEsforco() {

    return fetch(`/jogo/iniciar/${id_usuario}`)
        .then(function (resposta) {
            return resposta.json();
        })
        .then(function (data) {
            let niv = data[0].nivel;
            let esf = data[0].esforco;

            niv === null ? nivel_atual = niveis[0][0] : nivel_atual = Number(niv);
            esf === null ? esforco = niveis[0][1] : esforco = Number(esf);
        })
        .catch(function (erro) {
            console.log(`#ERRO: ${erro}`);
        });
}

function verificarSeries() {
    if (!sessionStorage.LISTA_SERIES) {
        const lista_series = [];
        sessionStorage.LISTA_SERIES = lista_series;
        return lista_series;
    } else {
        let lista = []
        let temporario = '';
        let item = sessionStorage.LISTA_SERIES

        for (let i = 0; i < item.length; i++) {

            if (item[i] !== ',') {
                temporario += item[i];
            } else {
                lista.push(Number(temporario));
                temporario = '';
            }

        }

        if (temporario !== '') {
            lista.push(Number(temporario))
        }

        return lista
    }
}

function plotar_inicio() {


    div_inicio_card.style.width = '70%';
    div_inicio_card.style.left = '30%';
    div_inicio_card.style.top = '10%';

    section_game.innerHTML = ``;

    section_animation.innerHTML = `
        <img class="supino descanso" src="../assets/img/game/descanso.png" alt="">
    `;
}

function colocar_peso() {

    let contagemRegressiva = 5;

    peso = Number(input_peso.value);

    if (peso > 0) {

        button_colocar_peso.disabled = true;

        div_msm_inicio.innerHTML = ` 
            <h3>O jogo começara hein:<h3/>`
            +
            `${contagemRegressiva}`;

        let timer = setInterval(() => {
            contagemRegressiva--;

            if (contagemRegressiva > 0) {
                div_msm_inicio.innerHTML = ` 
                <h3>O jogo começara hein:<h3/>
                ${contagemRegressiva}`;
            } else if (contagemRegressiva == 0) {
                div_msm_inicio.innerHTML = `
                    <h1>VAMOOO!!<h1/>
            `;
            } else {
                div_msm_inicio.innerHTML = ``;
                clearInterval(timer);
                section_animation.innerHTML = `
                    <img class="supino descanso" src="../assets/img/game/f1.png" alt="">
                 `;
                soltar_tempo();
                liberar_jogo = true;
                clicks_nivel = peso * esforco;
            }
        }, 1000);

    } else {
        div_msm_inicio.innerHTML = '<h3>ERRO MAROMBISTICO numero uma dose de whey: Insira um valor de peso válido para iniciar.<h3/>';
    }

}

function soltar_tempo() {

    sumir_inicio();
    button_colocar_peso.disabled = false;
    plotar_game();

    if (tempo == 25000) {

        intervalo = setInterval(soltar_tempo, 1000);
        tempo -= 1000;
    }
    else if (tempo > 0) {
        tempo -= 1000;
    } else {
        clearInterval(intervalo);
        avaliar_nota();
        sumir_game();
    }
}

function sumir_inicio() {
    div_inicio_card.style.width = '0';
    div_inicio_card.style.left = '0';
}

function plotar_game() {

    let script = `
       <div class="placar">
        <div id="div_cronometro" class="div_cronometro">
            Tempo para acabar: ${tempo / 1000}s
        </div>
        <div id="div_repeticoes" class="div_repeticoes">
            Repetições feitas: ${repeticoes}
        </div>
        <div id="div_nivel" class="div_nivel">
            Nível: ${nivel_atual}
        </div>
        </div>
        `;

    section_game.innerHTML = script;
}

function estimular() {
    section_animation.innerHTML = `
        <img class="supino descanso" src="../assets/img/game/f1.png" alt="">
    `;

    estimulo++;

    if (estimulo % parseInt(clicks_nivel) == 0) {
        section_animation.innerHTML = `
        <img class="supino descanso" src="../assets/img/game/f2.png" alt="">
    `;
        repeticoes++;
    }

    plotar_game();

}

function sumir_game() {
    let msm_motivacional = '';

    lista_series.push(repeticoes);
    sessionStorage.LISTA_SERIES = lista_series;

    let proximo_nivel = 0;

    if (lista_series.length % 6 == 0) {
        proximo_nivel = "Você chegou no novo nivel"

    } else {
        let multiplicador = 6;
        while (lista_series.length > multiplicador) {
            multiplicador += 6;
        }

        proximo_nivel = multiplicador - lista_series.length;
    }

    // A ordem importa, aqui
    intensidade = avaliar_intensidade();
    msm_motivacional = fazer_msm_motivacional();
    historico = fazer_historico();


    section_animation.innerHTML = `
    <img class="supino descanso" src="../assets/img/game/descanso.png" alt="">
    `;

    section_game.innerHTML = `
        <div class="mensagem_final">
            <nav>
                <a href="index.html">←</a>
            </nav>

            <h1>Fim de jogo</h1>

            <div class="historico">
                <div class="left">
                    <div>
                        <h3> Histórico recente:</h3>
                        <span>${historico}</span>
                    </div>
                </div>

                <div class="right">
                    <div>
                        <h3>Resumo da partida:</h3>
                        <span><b>Estímulos:</b> ${estimulo}</span>
                        <span><b>Peso:</b> ${peso} kg</span>
                        <span><b>Nível atual:</b> ${nivel_atual}</span>
                        <span><b>Intensidade:</b> ${intensidade}</span>

                    </div>

                    <div>
                        <h3>Evolução:</h3>
                        <span><b>Séries feitas hoje:</b> ${lista_series.length}</span>
                        <span><b>Próximo nível em:</b> ${proximo_nivel} série(s)</span>
                    </div>


                    <div>
                        <h3> Status:</h3>
                        <span>"${msm_motivacional}"</span>
                    </div>
                </div>


            </div>

            <div class="buttons">
                <button id="button_colocar_peso" onclick="plotar_inicio()">Fazer outra série</button>
                |
                <a id="a_dashboard" href="../locked/dashboard/dashboard.html">Ir para dashboard</a>
            </div>


        </div>
            `;

    enviar_resultados_banco();
    avaliar_nivel();
    liberar_jogo = false;
}

function avaliar_nivel() {

    resetar_valores();

    if (lista_series.length % 6 == 0) {
        esforco = esforco - 0.1;
        //Adicionar evolução
        for (var i = 0; i < niveis.length; i++) {
            if (niveis[i][1] == esforco.toFixed(1)) {
                nivel_atual = niveis[i][0];
                alert(`Parabéns! Você alcançou o nível ${nivel_atual}`);
                // Adicionar evento para mostrar que usuario aumentou o nível
            }
        }
    }
}

function enviar_resultados_banco() {

    // Enviando o valor da nova input
    fetch("/jogo/enviar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id_usuarioServer: id_usuario,
            pesoServer: peso,
            estimuloServer: estimulo,
            clicks_nivelServer: clicks_nivel,
            nivel_atualServer: nivel_atual,
            esforcoServer: esforco,
            intensidadeServer: intensidade,
            nota_esforcoServer: nota_esforco,
            nota_estimuloServer: nota_estimulo,
            nota_pesoServer: nota_peso
        }),
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                console.log("Tudo certo meu nobre");
            } else {
                console.log("Houve um erro ao tentar realizar a inserção de dados!");
            }

        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });


}


// Auxiliares ---------------------------------------------------------------------------------------------------
function fazer_historico() {
    let serie_avaliada = lista_series[lista_series.length - 1];

    if (msm_historico == '') {
        for (let i = 0; i < lista_series.length; i++) {
            msm_historico += `
              Série: ${i + 1} | Peso: ${peso} | Repetições: ${repeticoes} | Intensidade: ${intensidade}<br>
             `;
        }
    } else {
        for (let i = 0; i < lista_series.length; i++) {

            if (serie_avaliada == lista_series[i]) {
                msm_historico += `
              Série: ${i + 1} | Peso: ${peso} | Repetições: ${repeticoes} | Intensidade: ${intensidade}<br>
             `;
            }
        }
    }


    return msm_historico;
}
function fazer_msm_motivacional() {
    const lista_msm = [
        `Está treinando muito fofo, vamo aumentar esse peso?!!`,
        `Seu treino está OK...Mas da para aumentar a intensidade`,
        `Você está treiando muito bem, continue assim para evoluir de nível`,
        `Falta uma série para ir embora...VAMOOOOO!!!`
    ]

    if ((lista_series.length + 1) == 6) {
        return lista_msm[3]
    } else if (intensidade == 'Treino intenso 🔥') {
        return lista_msm[2];
    } else if (intensidade == 'Treino moderado 💪') {
        return lista_msm[1];
    } else if (intensidade == 'Treino fofo 🛌') {
        return lista_msm[0];
    }
}
function resetar_valores() {
    repeticoes = 0;
    estimulo = 0;
    tempo = 25000; // Se mudar aqui tem que mudar a função soltra_tempo
}
function avaliar_nota() {

    nota_esforco = ((2 - esforco) / (2 - 0.1)) * 10;

    if (repeticoes >= 6) {
        nota_peso = (peso / 150) * 10;
    } else {
        nota_peso = 0;
    }

    nota_estimulo = (estimulo / 150) * 10;
}
function avaliar_intensidade() {
    intensidade = (peso * clicks_nivel) / nivel_atual;
    if (intensidade >= 40) {
        return 'Treino intenso 🔥';
    } else if (intensidade >= 20) {
        return 'Treino moderado 💪';
    } else {
        return 'Treino fofo 🛌';
    }
}

