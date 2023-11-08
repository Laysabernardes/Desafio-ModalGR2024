document.addEventListener("DOMContentLoaded", function () {
    const fileInput = document.getElementById("fileInput");
    const processFileButton = document.getElementById("processFile");
    const aniversariantesList = document.getElementById("aniversariantesList");

    processFileButton.addEventListener("click", () => {
        const file = fileInput.files[0];
        if (file) {
            const reader = new FileReader();

            reader.onload = function (e) {
                const fileContent = e.target.result;
                const aniversariantes = extrairAniversariantes(fileContent);

                // Limpa a lista de aniversariantes
                aniversariantesList.innerHTML = '';

                if (aniversariantes.length > 0) {
                    aniversariantes.forEach((aniversariante) => {
                        const listItem = document.createElement("li");
                        listItem.textContent = aniversariante;
                        aniversariantesList.appendChild(listItem);
                    });
                } else {
                    const noAniversariantes = document.createElement("p");
                    noAniversariantes.textContent = "Não há aniversariantes neste mês.";
                    aniversariantesList.appendChild(noAniversariantes);
                }
            };

            reader.readAsText(file);
        }
    });

    function extrairAniversariantes(fileContent) {
        const aniversariantes = [];
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1; // Janeiro é 1, fevereiro é 2, e assim por diante

        const lines = fileContent.split('\n');
        lines.forEach((line) => {
            if (line) {
                const [nomeCompleto, email, dataNascimento] = line.split('|');

                // Verifica se dataNascimento não é undefined e divida apenas se estiver definido
                if (dataNascimento) {
                    const [diaNascimento, mesNascimento] = dataNascimento.split('/');

                    if (parseInt(mesNascimento, 10) === currentMonth) {
                        aniversariantes.push(`${nomeCompleto} (${email}) - ${dataNascimento}`);
                    }
                }
            }
        });

        return aniversariantes;
    }
});
