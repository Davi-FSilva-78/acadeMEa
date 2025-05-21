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

    function colocar_peso() {

        peso = Number(input_peso.value);

        if (peso > 0) {
            section_inicio.innerHTML = `
                <h1> Seja bem vindo ao sUPino</h1>
                <h3>Informe um peso em kg para iniciarmos</h3>
                <input type="number" id="input_peso">

                <div id="div_msm_inicio"></div>
            `;

            div_msm_inicio.innerHTML = `
                O peso escolhido foi ${peso} kg.
                <br>
                Renderizando conteúdo...`;

            section_game.innerHTML = ``;


            setTimeout(iniciar, 3000);
            setTimeout(soltar_tempo, 3000);
        } else {
            alert ('Insira um peso para iniciar.')
        }

    }

    function iniciar() {


        var script = `
        <div id="div_cronometro" class="div_cronometro">
            Tempo para acabar: ${tempo / 1000}s
        </div>
        <div id="div_repeticoes" class="div_repeticoes">
           Repetições feitas: ${repeticoes}
        </div>
        <div id="div_nivel" class="div_nivel">
          Nível: ${nivel_atual}
        </div>

        <div id="div_botao" class="div_botao_forcar" >
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

        iniciar();

    }

    function soltar_tempo() {

        iniciar();

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

    function avaliar_nivel() {
        repeticoes = 0;
        estimulo = 0;
        tempo = 25000; // Se mudar aqui tem que mudar a função soltra_tempo
        if (lista_series.length >= 9) { //A cada 9 serie completas o usuario sobe de nível
            esforco = esforco - 0.1;
            for (var i = 0; i < niveis.length; i++) {
                if (niveis[i][1] == esforco.toFixed(1)) {
                    nivel_atual = niveis[i][0];
                    // Adicionar evento para mostrar que usuario aumentou o nível
                }
            }
            lista_series = [];
        }

        reset()
    }

    function reset() {
        section_inicio.innerHTML = `
        <h1> Seja bem vindo ao sUPino</h1>
        <h3>Informe um peso em kg para iniciarmos</h3>
        <input type="number" id="input_peso">
        <button onclick="colocar_peso()"> confirmar peso</button>

        <div id="div_msm_inicio"></div>
        `;
    }
