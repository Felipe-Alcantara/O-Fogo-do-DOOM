const firePixelsArray = [] // Array que guarda a intensidade do fogo em cada pixel

// Dimensões da matriz de fogo
const fireWidth = 80
const fireHeight = 60

const fireColorsPalette = [{"r":7,"g":7,"b":7},{"r":31,"g":7,"b":7},{"r":47,"g":15,"b":7},{"r":71,"g":15,"b":7},{"r":87,"g":23,"b":7},{"r":103,"g":31,"b":7},{"r":119,"g":31,"b":7},{"r":143,"g":39,"b":7},{"r":159,"g":47,"b":7},{"r":175,"g":63,"b":7},{"r":191,"g":71,"b":7},{"r":199,"g":71,"b":7},{"r":223,"g":79,"b":7},{"r":223,"g":87,"b":7},{"r":223,"g":87,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":103,"b":15},{"r":207,"g":111,"b":15},{"r":207,"g":119,"b":15},{"r":207,"g":127,"b":15},{"r":207,"g":135,"b":23},{"r":199,"g":135,"b":23},{"r":199,"g":143,"b":23},{"r":199,"g":151,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":167,"b":39},{"r":191,"g":167,"b":39},{"r":191,"g":175,"b":47},{"r":183,"g":175,"b":47},{"r":183,"g":183,"b":47},{"r":183,"g":183,"b":55},{"r":207,"g":207,"b":111},{"r":223,"g":223,"b":159},{"r":239,"g":239,"b":199},{"r":255,"g":255,"b":255}]



function start() {
    createFireDataStructure()
    createFireSource()
    renderFire()
    setInterval(calculateFirePropagation, 40)
}

// Cria a estrutura de dados do fogo, gera a tabela de pixels fazendo com que cada pixel inicie com intensidade 0
function createFireDataStructure() {
    const numberOfPixels = fireWidth * fireHeight // Multiplica a largura pela altura para obter o número total de pixels

    // Incrementa o numero 0 até o número total de pixels, atribuindo 0 a cada posição do array
    for (let i = 0;
        i < numberOfPixels;
        i++) { firePixelsArray[i] = 0}
}

function calculateFirePropagation() {

    for (let column = 0; column < fireWidth; column++) {
        for (let row = 0; row < fireHeight; row++) {

            const pixelIndex = column + (fireWidth * row) // Calcula o índice do pixel atual

            updateFireIntensityPerPixel(pixelIndex)
        }
    }

    renderFire()
}

function updateFireIntensityPerPixel(currentPixelIndex) {
    const belowPixelIndex = currentPixelIndex + fireWidth

    if (belowPixelIndex >= fireWidth * fireHeight) {
        return
    }

    const decay = Math.floor(Math.random() * 3)
    const belowPixelFireIntensity = firePixelsArray[belowPixelIndex]
    const newFireIntensity = belowPixelFireIntensity - decay >= 0 ? belowPixelFireIntensity - decay : 0

    firePixelsArray[currentPixelIndex - decay] = newFireIntensity
}

function renderFire() {

    debug = false

    let html = '<table cellpadding=0 cellspacing=0>' // Inicia a string HTML com abertura da tabela

    for (let row = 0; row < fireHeight; row++) { // Loop para cada linha da matriz
        html += '<tr>' // Abre uma nova linha da tabela

        for (let column = 0; column < fireWidth; column++) { // Loop para cada coluna da linha atual

            const pixelIndex = column + (fireWidth * row) // Calcula o índice do pixel no array unidimensional
            
            const fireIntensity = firePixelsArray[pixelIndex] // Obtém a intensidade do fogo para o pixel atual

            if (debug === true) {

                html += '<td>' // Abre uma célula da tabela
                html += `<div class="pixel-index">${pixelIndex}</div>` // Adiciona o índice do pixel dentro da célula
                html += fireIntensity // Adiciona a intensidade do fogo dentro da célula
                html += '</td>' // Fecha a célula da tabela
            
            }else{
                const color = fireColorsPalette[fireIntensity] // Obtém a cor correspondente à intensidade do fogo
                const colorString = `${color.r},${color.g},${color.b}` // Formata a cor como uma string RGB
                html += `<td class="pixel" style="background-color: rgb(${colorString})"></td>` // Adiciona a célula da tabela com a cor de fundo correspondente
                html += '</td>' // Fecha a célula da tabela
            }
        }

        html += '</tr>' // Fecha a linha da tabela
    }

    html += '</table>' // Fecha a tabela HTML

    document.querySelector('#fireCanvas').innerHTML = html // Injeta o HTML gerado no elemento do DOM

}

function createFireSource() {
    for (let column = 0; column <= fireWidth; column++) {
        const overflowPixelIndex = fireWidth * fireHeight
        const pixelIndex = (overflowPixelIndex - fireWidth) + column

        firePixelsArray[pixelIndex] = 36
}}

start();