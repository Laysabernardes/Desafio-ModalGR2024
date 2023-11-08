window.addEventListener('load', function () {
    const emprestimoForm = document.getElementById('emprestimoForm');
    const opcoesRetirada = document.getElementById('opcoesRetirada');

    function verificarTempoDeTrabalho(dataAdmissao) {
        const dataAdmissaoDate = new Date(dataAdmissao);
        const dataAtual = new Date();
        const tempodeDeTrabalho = dataAtual.getFullYear() - dataAdmissaoDate.getFullYear();
        return tempodeDeTrabalho;
    }

    const calcularNotas = (valor, notas) => {
        const quantidadeDeNotas = {};
        for (const nota of notas) {
            const quantidade = Math.floor(valor / nota);
            if (quantidade > 0) {
                quantidadeDeNotas[`${nota} reais`] = quantidade;
                valor -= quantidade * nota;
            }
        }
        return { quantidadeDeNotas };
    };

    const calcularNotasDeMaiorValor = valor => calcularNotas(valor, [100, 50, 20, 10, 5, 2]);
    const calcularNotasDeMenorValor = valor => calcularNotas(valor, [20, 10, 5, 2]);

    const calcularNotasMeioAMeio = valor => {
        meio = valor / 2;
        const notasMaiorValor = calcularNotasDeMaiorValor(meio);
        const notasMenorValor = calcularNotasDeMenorValor(meio);
        return { notasMaiorValor, notasMenorValor, meio };
    };

    emprestimoForm.addEventListener('submit', function (e) {
        e.preventDefault();
        // valores do formulário
        const nome = document.getElementById('nome').value;
        const salarioAtual = parseFloat(document.getElementById('salarioAtual').value);
        const valorEmprestimo = parseFloat(document.getElementById('valorEmprestimo').value);
        const dataAdmissao = document.getElementById('dataAdmissao').value;

        const tempodeDeTrabalho = verificarTempoDeTrabalho(dataAdmissao);

        // Verifica se a diferença é maior ou igual a 5 anos
        if (tempodeDeTrabalho >= 5) {
            alert("O colaborador está trabalhando há mais de 5 anos e poderá participar do programa de Empréstimo da ModalGR");

            // Verifica se o empréstimo está dentro do requisito
            if (salarioAtual * 2 >= valorEmprestimo && valorEmprestimo % 2 === 0) {
                const opcoesDeRetirada = {};

                // Calcula as opções de retirada
                opcoesDeRetirada["Notas de maior valor"] = calcularNotasDeMaiorValor(valorEmprestimo);
                opcoesDeRetirada["Notas de menor valor"] = calcularNotasDeMenorValor(valorEmprestimo);

                opcoesDeRetirada["Notas meio a meio"] = " ";
                const notasMeioAMeio = calcularNotasMeioAMeio(valorEmprestimo);
                opcoesDeRetirada[`${notasMeioAMeio.meio} reais em notas de maior valor`] = notasMeioAMeio.notasMaiorValor;
                opcoesDeRetirada[`${notasMeioAMeio.meio} reais em notas de menor valor`] = notasMeioAMeio.notasMenorValor;

                // Exibe as opções de retirada
                let opcoes = `<h3>Valor empréstimo: ${valorEmprestimo} reais</h3>`;
                for (const tipo in opcoesDeRetirada) {
                    const notas = opcoesDeRetirada[tipo].quantidadeDeNotas;

                    opcoes += `<h4>${tipo}:<h4>`;
                    for (const nota in notas) {
                        opcoes += `<li>${nota}: ${notas[nota]}</li>`;
                    }
                }
                opcoesRetirada.innerHTML = opcoes;

            } else {
                opcoesRetirada.innerHTML = `Insira um valor válido!`;
            }

        } else {
            alert(`${nome}, Agradecemos seu interesse, mas você não atende os requisitos mínimos do programa.`);
        }
    });
});