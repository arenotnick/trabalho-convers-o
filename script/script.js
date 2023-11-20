
document.addEventListener('DOMContentLoaded', function () {
    /**
     * Botão de conversão que o usuário clicará para realizar a conversão.
     * @type {HTMLElement}
     */
    const converterButton = document.getElementById('converter');

    /**
     * Div onde o resultado da conversão será exibido.
     * @type {HTMLElement}
     */
    const resultadoDiv = document.getElementById('resultado');

    /**
     * Adiciona um ouvinte de evento de clique ao botão de conversão.
     */
    converterButton.addEventListener('click', function () {
        buscarTaxaCambio();
    });

    /**
     * Função para buscar a taxa de câmbio da API com base nas moedas selecionadas e valor de entrada.
     */
    function buscarTaxaCambio() {
        /**
         * Valor da moeda de origem selecionada pelo usuário.
         * @type {string}
         */
        const moedaOrigem = document.getElementById('moedaOrigem').value;

        /**
         * Valor da moeda de destino selecionada pelo usuário.
         * @type {string}
         */
        const moedaDestino = document.getElementById('moedaDestino').value;

        /**
         * Valor de entrada fornecido pelo usuário.
         * @type {number}
         */
        const valorInput = document.getElementById('valor').value;

        // Verifica se o valor inserido é maior que zero
        if (valorInput <= 0) {
            exibirErro('Por favor, digite um valor maior que 0.');
            return;
        }

        /**
         * Chave de API para acessar a API de taxas de câmbio.
         * @type {string}
         */
        const apiKey = 'SUA_CHAVE_API';

        /**
         * URL da API para obter as taxas de câmbio.
         * @type {string}
         */
        const apiUrl = `https://open.er-api.com/v6/latest/${moedaOrigem}?apikey=${apiKey}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const taxaCambio = data.rates;

                exibirResultado(taxaCambio, valorInput, moedaOrigem, moedaDestino);
            })
            .catch(error => {
                console.error('Erro ao buscar dados:', error);
                exibirErro('Erro ao buscar dados. Por favor, tente novamente mais tarde.');
            });
    }

    /**
     * Função para exibir o resultado da conversão na página.
     * @param {object} taxaCambio - Taxas de câmbio entre diferentes moedas.
     * @param {number} valorInput - Valor de entrada fornecido pelo usuário.
     * @param {string} moedaOrigem - Moeda de origem selecionada pelo usuário.
     * @param {string} moedaDestino - Moeda de destino selecionada pelo usuário.
     */
    function exibirResultado(taxaCambio, valorInput, moedaOrigem, moedaDestino) {
        /**
         * Taxa de câmbio da moeda de origem para a moeda de destino.
         * @type {number}
         */
        const taxaCambioDestino = taxaCambio[moedaDestino];

        if (!taxaCambioDestino) {
            exibirErro('Taxa de câmbio não encontrada para a moeda de destino.');
            return;
        }

        /**
         * Valor convertido com base na taxa de câmbio.
         * @type {string}
         */
        const valorConvertido = (valorInput * taxaCambioDestino).toFixed(2);

        resultadoDiv.innerHTML = `<p>${valorInput} ${moedaOrigem} = ${valorConvertido} ${moedaDestino}</p>`;
    }

    /**
     * Função para exibir mensagens de erro na página.
     * @param {string} mensagem - Mensagem de erro a ser exibida.
     */
    function exibirErro(mensagem) {
        resultadoDiv.innerHTML = `<p>${mensagem}</p>`;
    }
});
