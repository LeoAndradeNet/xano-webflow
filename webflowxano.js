
// Crie uma variável para o endpoint da API. Neste exemplo, estou acessando a API da Xano
let xanoUrl = new URL('https://x8ki-letl-twmt.n7.xano.io/api:mCasU1Fc/');

// Defina uma função (conjunto de operações) para obter informações sobre os clientes.
// Isso usará a solicitação GET no endpoint do URL
function getClients() {

    // Crie uma variável de solicitação e atribua um novo objeto XMLHttpRequest a ela.
    // XMLHttpRequest é a maneira padrão de acessar uma API em Javascript simples.
    let request = new XMLHttpRequest();

    // Defina uma função (conjunto de operações) para obter informações sobre o cliente.
    // Cria uma variável que pegará a URL de cima e garante que ela seja exibida como uma string.
    // Em seguida, adicionamos a palavra 'cliente "para que o endpoint da API se torne https://x8ki-letl-twmt.n7.xano.io/api:mCasU1Fc/cliente
    let url = xanoUrl.toString() + 'cliente';

    // Lembre-se de que a 'solicitação' foi definida acima como a forma padrão de acessar uma API em Javascript.
    // GET é o verbo que estamos usando para GET dados do Xano
    request.open('GET', url, true)

    // Quando a solicitação da API for carregada, faça o seguinte ...
    request.onload = function () {

        // Armazena o que recebemos da API do Xano como uma variável chamada 'data' e converte em um objeto javascript
        let data = JSON.parse(this.response)

        // Status 200 = Sucesso. Status 400 = Problema. Isso diz que se for bem-sucedido e sem problemas, execute
        if (request.status >= 200 && request.status < 400) {

            // Mapeie uma variável chamada cardContainer para o elemento Webflow denominado "Cards-Container"
            const cardContainer = document.getElementById("Cards-Container")

            // Passa por cada objeto que está sendo passado de volta da API da Xano.
            // Para cada elemento em Dados (resposta da API), chame cada cliente item individual"
            data.forEach(client => {

                // Para cada client, crie um div chamado card e estilo com a classe "Sample Card"
                const style = document.getElementById('samplestyle')
                // Copie o card e seu estilo
                const card = style.cloneNode(true)

                card.setAttribute('id', '');
                card.style.display = 'block';
                
                // Pega o elemento imagem do card
                const img = card.getElementsByTagName('IMG')[0]
                img.src = client.logo.url + "?tpl=big:box"; // usando o mecanismo de modelo do Xano para redimensionar as imagens e torná-las uma caixa

                // Crie um h3 e defina o conteúdo do texto para o título do client
                const h3 = card.getElementsByTagName('H3')[0]
                h3.textContent = client.name;

                // Crie um parágrafo e defina o conteúdo do texto para a descrição do client
                const p = card.getElementsByTagName('P')[0]
                p.textContent = `${client.description.substring(0, 240)}` // Limit to 240 chars

                // Coloque o cartão no div "Cards-Container"
                cardContainer.appendChild(card);
            })
        }
    }

    // Enviar solicitação de restaurante para API
    request.send();
}

// This fires all of the defined functions when the document is "ready" or loaded
(function () {
    getClients();
})();
