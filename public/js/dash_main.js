    
    let id_user = sessionStorage.ID_USUARIO;
    let nome = sessionStorage.NOME_USUARIO;


    function obterDados () {
        fetch() 
    }

    function plotarRadar () {

    }

    function plotarEvolucaoNiveis () {

    }

    function plotarMelhoresPesos () {

    }

    function plotarKPIS () {
        
    }
    // Gráfico de barras
    new Chart(document.getElementById("chart1"), {  
        type: 'bar',
        data: {
            labels: ['Dia x', 'Dia x', 'Dia x', 'Dia x', 'Dia x', 'Dia x', 'Dia x'],
            datasets: [{
                label: 'ppm',
                data: [7, 6, 5, 4, 3, 2, 1],
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
                    text: 'Os 7 melhores pesos',
                    font: {
                        size: 14
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        font: {
                            size: 8
                        }
                    },  
                    title: {
                        display: true,
                        text: '(kg)',
                        font: {
                            size: 12
                        }
                    },
                },
                y: {
                    ticks: {
                        font: {
                            size: 8
                        }
                    }, title: {
                        display: true,
                        text: 'Dias',
                        font: {
                            size: 12
                        }
                    },
                }
            }
        }
    });

    // Gráfico de radar
    new Chart(document.getElementById("chart2"), {
        type: 'radar',
        data: {
            labels: ['Força', 'Esforço', 'Constância', 'Estímulo'],
            datasets: [{
                label: 'USER',
                fill: true,
                data: [5, 7, 7, 7],
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
                            size: 8
                        }
                    }
                },
                title: {
                    display: true,
                    text: 'Panorama Geral',
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
                r: { // Este é o objeto do eixo radial
                    angleLines: {
                        display: true
                    },
                    // *** As opções abaixo devem estar DENTRO do objeto 'r' ***
                    suggestedMin: 0,
                    suggestedMax: 10,
                    ticks: {
                        beginAtZero: true,
                        // stepSize: 1 // Descomente e ajuste se precisar de espaçamento específico
                    }
                }
            }
        }
    });

    // Gráfico de linhas
    new Chart(document.getElementById("chart3"), {
        type: 'bar',
        data: {
            labels: ['1', '2', '3', '4', '5', '6', '7'],
            datasets: [
                {
                    label: 'Esforco',
                    data: [1, 2, 2, 5, 5, 5],
                    borderColor: '#1F77B4',
                    fill: false
                }, {
                    label: 'força',
                    data: [1, 2, 2, 5, 5, 5, 8],
                    borderColor: '#1F77B4',
                    borderDash: [5, 5],
                    fill: false,
                },
                 {
                    label: 'Estimulo',
                    data: [1, 2, 2, 5, 5, 5, 8],
                    borderColor: '#1F77B4',
                    borderDash: [5, 5],
                    fill: false,

                }, 
                 {
                    label: 'constância',
                    data: [1, 2, 2, 5, 5, 5, 8],
                    borderColor: '#1F77B4',
                    borderDash: [5, 5],
                    fill: false,

                }
            ]
        },
        options: {
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Evolução de níveis do USER no mês',
                    font: {
                        size: 14
                    }
                },
                legend: {
                    position: 'right',
                    labels: {
                        font: {
                            size: 10
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    trick: {
                        font: {
                            size: 8
                        }
                    },
                    title: {
                        display: true,
                        text: 'Níveis',
                        font: {
                            size: 12
                        }
                    },
                },
                x: {
                    trick: {
                        font: {
                            size: 8
                        }
                    },
                     title: {
                        display: true,
                        text: 'Dias',
                        font: {
                            size: 12
                        }
                    },
                }
            }
        }
    });
