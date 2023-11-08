document.addEventListener("DOMContentLoaded", function () {
    function criarSenhaMetodoUm(senha, chaveSecreta) {
        const senhaComChave = senha + chaveSecreta;
        return btoa(senhaComChave);
    }

    function criarSenhaMetodoDois(senha, chaveSecreta) {
        const senhaInvertida = senha.split('').reverse().join('');
        const senhaComChave = senhaInvertida + chaveSecreta;
        return btoa(senhaComChave);
    }

    function criarSenhaMetodoTres(senha, chaveSecreta) {
        const senhaComChave = chaveSecreta + senha;
        return btoa(senhaComChave);
    }

    const criptografarBotao = document.getElementById("criptografar");
    const senhaInput = document.getElementById("senha");
    const metodoSelect = document.getElementById("metodo");
    const senhaCriptografadaOutput = document.getElementById("senhaCriptografada");

    criptografarBotao.addEventListener("click", () => {
        const senha = senhaInput.value;
        const metodo = metodoSelect.value;
        const chaveSecreta = "#modalGR#GPTW#top#maiorEmpresaTecnologia#baixadaSantista";

        let senhaCriptografada = "";

        if (metodo === "metodoUm") {
            senhaCriptografada = criarSenhaMetodoUm(senha, chaveSecreta);
        } else if (metodo === "metodoDois") {
            senhaCriptografada = criarSenhaMetodoDois(senha, chaveSecreta);
        } else if (metodo === "metodoTres") {
            senhaCriptografada = criarSenhaMetodoTres(senha, chaveSecreta);
        }

        senhaCriptografadaOutput.textContent = senhaCriptografada;
    });
});
