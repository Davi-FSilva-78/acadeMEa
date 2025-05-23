var lista_series = []; // variavel para armazenar as series realizadas e quantas repeticoes

var niveis = [
    [1, 2],
    [2, 1.5],
    [3, 1],
    [4, 0.5],
    [5, 0.1]
];// todos os niveis do jogo com o esforco equivalente
var nivel_atual = niveis[0][0]; // nivel atual do usuario

var esforco = niveis[0][1]; // esforco para fazer as repeticoes - a ideia é ele ir diminuindo conforme o tamanho da lista de series

var clicks_nivel = peso * esforco; // variavel de quantos clicks o usuario precisa para 

var peso = 0; // variavel que irá coletar o peso que o usuario quer fazer a repeticao

var estimulo = 0; //variavel que irá armazenar quantos clicks o user está dando para levantar o peso

var repeticoes = 0; // quantas repeticoes o use rfez naquela série

var tempo = 25000 //semudar aqui tem que mudar no soltar_tempo
var intervalo = 0; //Variavél para armazenas o intervalo

function plotar_inicio() {

    div_inicio_card.style.width = '40%';
    div_inicio_card.style.left = '25%';
    div_inicio_card.style.top = '5%';


    section_game.innerHTML = ``;
}

function sumir_inicio() {
    div_inicio_card.style.width = '0';
    div_inicio_card.style.left = '0';
}

function colocar_peso() {

    var contagemRegressiva = 5;

    peso = Number(input_peso.value);

    if (peso > 0) {
        button_colocar_peso.disabled = true;
        div_msm_inicio.innerHTML = ` 
            <h3>O jogo começara hein:<h3/>`
            +
            `${contagemRegressiva}`;

        var timer = setInterval(() => {
            contagemRegressiva--;

            if (contagemRegressiva > 1) {
                div_msm_inicio.innerHTML = ` 
                <h3>O jogo começara hein:<h3/>`
                    +
                    `${contagemRegressiva}`;
            } else if (contagemRegressiva == 1) {
                div_msm_inicio.innerHTML = ` 
                    <h1>VAMOOO!!<h1/>
            `;
            } else {
                clearInterval(timer);
                soltar_tempo();
            }

        }, 1000);

    } else {
        div_msm_inicio.innerHTML = '<h3>ERRO MAROMBISTICO 30g: Insira um valor de peso válido para iniciar.<h3/>';
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

        if (repeticoes >= 8 && repeticoes <= 12) {
            section_game.innerHTML = `Você fez ${repeticoes}. Nesse ritmo vai ficar maior que o Hulk`;
            lista_series[lista_series.length] = repeticoes;
        } else if (repeticoes < 8) {
            if (repeticoes >= 0 && repeticoes <= 3) {
                section_game.innerHTML = `Você fez ${repeticoes}. Vamo treinar com vontade??!!`;
            } else {
                section_game.innerHTML = `Você fez ${repeticoes}. Diminui o peso, cuidado com a lesão`;
                lista_series[lista_series.length] = repeticoes;
            }
        } else if (repeticoes > 12) {
            section_game.innerHTML = `Você fez ${repeticoes}. Esta treinando fofo, aumente esse peso`;
            lista_series[lista_series.length] = repeticoes;
        }

        avaliar_nivel();
    }
}


function plotar_game() {



    var script = `
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
        <div id="div_botao" class="div_botao_forcar">
            <button onclick="estimular()">Fazer força</button>
        </div>
        `;

    section_game.innerHTML = script;
}



function estimular() {
    clicks_nivel = peso * esforco;
    estimulo++;

    if (estimulo % parseInt(clicks_nivel) == 0) {
        repeticoes++;
    }

    plotar_game();

}

function avaliar_nivel() {
    repeticoes = 0;
    estimulo = 0;
    tempo = 25000; // Se mudar aqui tem que mudar a função soltra_tempo
    if (lista_series.length >= 9) { //A cada 9 serie completas o usuario sobe diminui seu esforco e pode subir de nivel dependendo do esforco
        esforco = esforco - 0.1;
        for (var i = 0; i < niveis.length; i++) {
            if (niveis[i][1] == esforco.toFixed(1)) {
                nivel_atual = niveis[i][0];
                // Adicionar evento para mostrar que usuario aumentou o nível
            }
        }
        lista_series = [];
    }

    plotar_inicio()
}




