
let id_user = sessionStorage.ID_USUARIO;
let nome = sessionStorage.NOME_USUARIO;

obterDados()

function obterDados() {
    fetch(`/dashboard/radar/${id_user}`).then(function (response) {
        return response.json()
    }).then(function (data) {
        console.log("Dado ai meu: " + data);
        plotarRadar(data);
    }).catch(function (erro) {
        console.error("Deu ruim: " + erro);
    });


    fetch(`/dashboard/ranking/${id_user}`)
        .then(function (resposta) {
            return resposta.json();
        })
        .then(function (data) {
            console.log(data);
            plotarKPIS(data);
        })
        .catch(function (erro) {
            console.log(`#ERRO: ${erro}`);
            return null;
        });

    fetch(`/dashboard/evolucao/${id_user}`).then(function (response) {
        return response.json()
    }).then(function (data) {
        console.log("Dado evolucao ai meu: " + data);
        plotarEvolucaoNiveis(data);
    }).catch(function (erro) {
        console.error("Deu ruim: " + erro);
    });

    fetch(`/dashboard/melhores/${id_user}`).then(function (response) {
        return response.json()
    }).then(function (data) {
        console.log("Dado evolucao ai meu: " + data);
        plotarMelhoresPesos(data);
    }).catch(function (erro) {
        console.error("Deu ruim: " + erro);
    });


}

function plotarRadar(data) {

    const lista_niveis = [];

    lista_niveis.push(Number(data[0].nota_estimulo));
    lista_niveis.push(Number(data[0].nota_esforco));
    lista_niveis.push(Number(data[0].nota_peso));

    let dias = Number(data[0].dias_sem_jogar);

    nota_constancia = calcular_nota_constancia(dias);

    lista_niveis.push(nota_constancia);

    console.log(lista_niveis);

    new Chart(document.getElementById("chart2"), {
        type: 'radar',
        data: {
            labels: ['Estímulo', 'Esforço', 'Força', 'Constância'],
            datasets: [{
                label: nome,
                fill: true,
                data: lista_niveis,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgb(255, 99, 132)',
                pointBackgroundColor: 'rgb(255, 99, 132)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(255, 99, 132)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        font: {
                            size: 12,
                            weight: 'bolder'
                        }
                    }
                },
                title: {
                    display: true,
                    text: 'Panorama Geral de notas por competência',
                    font: {
                        size: 12
                    }
                }
            },
            elements: {
                line: {
                    borderWidth: 3
                }
            },
            scales: {
                r: {
                    angleLines: {
                        display: true,
                        color: '#999'
                    },
                    grid: {
                        color: '#999'
                    },
                    pointLabels: {
                        color: '#333',
                        font: {
                            size: 10,
                            weight: 'bold'
                        }
                    },
                    suggestedMin: 0,
                    suggestedMax: 10,
                    ticks: {
                        beginAtZero: true,

                    }
                }
            }
        }
    });

}

function plotarEvolucaoNiveis(data) {


    const lista_data = [];
    const lista_niveis = [[], [], [], []];

    for (let i = 0; i < data.length; i++) {
        let dias_sem_jogar = Number(data[i].Ultimo_jogado);

        lista_niveis[0].push(Number(data[i].nota_estimulo));
        lista_niveis[1].push(Number(data[i].nota_esforco));
        lista_niveis[2].push(Number(data[i].nota_peso));

        nota_constancia = calcular_nota_constancia(dias_sem_jogar);
        console.log("nota constancia:" + nota_constancia);
        lista_niveis[3].push(nota_constancia);

        lista_data.push(data[i].dia);
    }



    console.log(lista_niveis);

    new Chart(document.getElementById("chart3"), {
        type: 'bar',
        data: {
            labels: lista_data,
            datasets: [
                {
                    label: 'Estimulo',
                    data: lista_niveis[0],
                    backgroundColor: '#1F77B4'
                },
                {
                    label: 'Esforço',
                    data: lista_niveis[1],
                    backgroundColor: '#FF7F0E'
                },
                {
                    label: 'Força',
                    data: lista_niveis[2],
                    backgroundColor: '#2CA02C'
                },
                {
                    label: 'Constância',
                    data: lista_niveis[3],
                    backgroundColor: '#D62728'
                }
            ]
        },
        options: {
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: `Evolução de notas por competência no mês - ${nome}`,
                    font: {
                        size: 14
                    }
                },
                legend: {
                    position: 'right',
                    labels: {
                        font: {
                            size: 12,
                            weight: 'bolder'
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    trick: {
                        font: {
                            size: 12,
                            weight: 'bolder'
                        }
                    },
                    title: {
                        display: true,
                        text: 'Níveis',
                        font: {
                            size: 12,
                            weight: 'bolder'
                        }
                    },
                },
                x: {
                    trick: {
                        font: {
                            size: 12,
                            weight: 'bolder'
                        }
                    },
                    title: {
                        display: true,
                        text: 'Dias',
                        font: {
                            size: 12,
                            weight: 'bolder'
                        }
                    },
                }
            }
        }
    });
}

function plotarMelhoresPesos(data) {

    const lista_dias = [];
    const lista_pesos = [];

    for (i = 0; i < data.length; i++) {
        lista_dias.push(data[i].dia);
        lista_pesos.push(data[i].peso);
    }


    new Chart(document.getElementById("chart1"), {
        type: 'bar',
        data: {
            labels: lista_dias,
            datasets: [{
                label: 'ppm',
                data: lista_pesos,
                backgroundColor: ['#1F77B4']
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                title: {
                    display: true,
                    text: `Os 5 melhores pesos de ${nome}`,
                    font: {
                        size: 14,weight: 'bolder'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        font: {
                            size: 12,
                            weight: 'bolder'
                        }
                    },
                    title: {
                        display: true,
                        text: '(kg)',
                        font: {
                            size: 12,
                            weight: 'bolder'
                        }
                    },
                },
                y: {
                    ticks: {
                        font: {
                            size: 12,
                            weight: 'bolder'
                        }
                    }, title: {
                        display: true,
                        text: 'Dias',
                        font: {
                            size: 14,
                            weight: 'bolder'
                        }
                    },
                }
            }
        }
    });
}

function plotarKPIS(data) {
    const nivel = data[0].nivel_max;
    const ranking_nivel = data[0].niv_ranking;
    const ranking_peso = data[0].pes_ranking;
    const qtd_usuarios = data[0].qtd_usuario;

    // KPI de nivel atual
    span_nivel.innerHTML = `${nivel} de 20`;

    // KPI de ranking nivel
    qtd_usuarios <= 1 ? span_rank_niv.innerHTML = "Você foi o primeiro a jogar" : span_rank_niv.innerHTML = `${ranking_nivel}º entre ${qtd_usuarios} competidores`;

    // KPI de ranking peso
    qtd_usuarios <= 1 ? span_rank_peso.innerHTML = "Você foi o primeiro a jogar" : span_rank_peso.innerHTML = `${ranking_peso}º de ${qtd_usuarios} competidores`;

    // Geral

}

// Auxiliares -------------------------------------------------
function calcular_nota_constancia(dias) {
    if (dias > 7) return 0;
    else if (dias == 0) return 10;
    else return (10 / 7) * (7 - dias);
}

