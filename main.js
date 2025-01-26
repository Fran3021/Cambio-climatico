//logica para hacer toggle en el buton del header en vista movil
let navHeader = document.querySelector('nav.menu-header')
let buttonDesplegable = document.querySelector('button.menu-desplegable')

buttonDesplegable.addEventListener('click', () =>{
    navHeader.classList.toggle('block')
})

//seleccionamos los elementos necesarios del html
let title = document.querySelector('h1')
let main = document.getElementById('main-principal')
let preguntas = document.getElementById('pregunta')
let palabrasCorrectas = document.getElementById('palabra-correcta')
let palabrasIncorrectas = document.getElementById('palabra-incorrecta')
let dibujoAhorcado = document.getElementById('dibujo-ahorcado')
let ctx = dibujoAhorcado.getContext('2d')
let buttonAdivina = document.getElementById('adivina-palabra')
let message = document.getElementById('message')
let buttonRestart = document.getElementById('restart-button')


//variables de musica
let musicaFondo = new Audio ('./music/musica-fondo.mp3')
musicaFondo.volume = 0.3
musicaFondo.loop = true

let correctWord = new Audio ('./music/palabra-correcta.wav')
correctWord.volume = 1.0
correctWord.loop = false

let wrongWord = new Audio ('./music/wrong-words.wav')
wrongWord.volume = 0.3
wrongWord.loop = false

let gameOver = new Audio ('./music/game-over-ahorcado.wav')
gameOver.volume = 0.7
gameOver.loop = false

let win = new Audio ('./music/win-game-ahorcado.wav')
win.volume = 0.1
win.loop = false

//creamos un array con las preguntas en distintos niveles de dificultad
let arrayPreguntasFacil = ['¿Qué gas producen los coches que contamina el aire?',
    '¿Cómo se llama el calentamiento de la Tierra por la contaminación?',
    '¿Qué podemos plantar para limpiar el aire?',
    '¿Qué debemos usar menos para ahorrar energía: ¿la bicicleta o el coche?',
    '¿Qué material reciclamos de las botellas?',
    '¿Qué gas necesitamos para respirar?',
    '¿Qué debemos apagar cuando no lo usamos para ahorrar energía?',
    '¿Cómo se llaman los bloques de hielo que se derriten por el calor?',
    '¿Qué animal está en peligro por el derretimiento del Ártico?',
    '¿Qué usamos para cargar nuestros dispositivos?',
]

let arrayPreguntasMedio = ['¿Qué gas de efecto invernadero se produce al quemar carbón o petróleo?',
    '¿Qué recurso natural necesitamos para producir energía solar?',
    '¿Qué proceso de las plantas ayuda a limpiar el aire?',
    '¿Qué tipo de bolsas de plástico debemos usar para cuidar el medio ambiente?',
    '¿Cómo se llama el fenómeno que ocurre cuando sube el nivel del mar?',
    '¿Qué podemos reciclar del papel para evitar cortar más árboles?',
    '¿Qué transporte no contamina y usa pedales?',
    '¿Qué recurso natural usamos para producir energía eólica?',
    '¿Qué debemos ahorrar para evitar la sequía?',
    '¿Qué planeta estamos tratando de proteger con el reciclaje?',
]

let arrayPreguntasDificil = ['¿Cómo se llama el proceso por el cual la Tierra se calienta debido a ciertos gases?',
    ' ¿Qué gas producido por las vacas contribuye al calentamiento global?',
    '¿Qué capa de la atmósfera protege la Tierra de los rayos solares dañinos?',
    '¿Cómo se llama el fenómeno en el que los glaciares se derriten rápidamente?',
    '¿Cómo se llama el proceso de conversión de vapor a líquido?',
    '¿Qué metal reciclamos de las latas para reducir la contaminación?',
    '¿Partícula subatómica sin carga?',
    '¿Qué energía renovable usamos con paneles solares?',
    '¿Qué tipo de combustibles producen más contaminación al quemarse?',
    '¿Qué acuerdo internacional busca reducir el cambio climático?',
]

//creamos un array con las respuestas en distintos niveles de dificultad
let arrayRespuestasFacil = ['dioxidodecarbono',
    'calentamientoglobal',
    'arboles',
    'coche',
    'plastico',
    'oxigeno',
    'luz',
    'glaciares',
    'osopolar',
    'electricidad',
]

let arrayRespuestasMedio = ['dioxidodecarbono',
    'sol',
    'fotosintesis',
    'reutilizables',
    'inundacion',
    'carton',
    'bicicleta',
    'viento',
    'agua',
    'tierra',
]

let arrayRespuestasDificil = ['efectoinvernadero',
    'metano',
    'ozono',
    'deshielo',
    'condensacion',
    'aluminio',
    'neutron',
    'solar',
    'fosiles',
    'acuerdodeparis',
]



function iniciarGame(nivelDificultad){
    if(nivelDificultad === 'facil'){
        preguntaRespuestaFacil()
        comprobarLetra()
        musicaFondo.play()
    }else if(nivelDificultad === 'medio'){
        preguntaRespuestaMedio()
        comprobarLetra()
        musicaFondo.play()
    }else if(nivelDificultad === 'dificil'){
        preguntaRespuestaDificil()
        comprobarLetra()
        musicaFondo.play()
    }
}

let respuesta
let palabraIncorrecta = []
let maxFallos = 6
let fallos = 0
let palabraCorrecta = []


function preguntaRespuestaFacil(){
    let pregunta = arrayPreguntasFacil[Math.floor(Math.random() * arrayPreguntasFacil.length)]
    preguntas.textContent = pregunta
    let indexPregunta = arrayPreguntasFacil.findIndex(question => question === pregunta)
    respuesta = arrayRespuestasFacil[indexPregunta]
}

function preguntaRespuestaMedio(){
    let pregunta = arrayPreguntasMedio[Math.floor(Math.random() * arrayPreguntasMedio.length)]
    preguntas.textContent = pregunta
    let indexPregunta = arrayPreguntasMedio.findIndex(question => question === pregunta)
    respuesta = arrayRespuestasMedio[indexPregunta]
}

function preguntaRespuestaDificil(){
    let pregunta = arrayPreguntasDificil[Math.floor(Math.random() * arrayPreguntasDificil.length)]
    preguntas.textContent = pregunta
    let indexPregunta = arrayPreguntasDificil.findIndex(question => question === pregunta)
    respuesta = arrayRespuestasDificil[indexPregunta]
}


function comprobarLetra(){
    let palabraAdivinar = Array(respuesta.length).fill('_')
    buttonAdivina.addEventListener('click', () => {
        let valor = document.getElementById('input-letra').value.toLowerCase()
        let inputLetra = document.getElementById('input-letra')
        inputLetra.value = ''
        let letraCorrecta = false
        let numerosLetras = /^[a-zA-Z0-9]+$/
        if(!numerosLetras.test(valor)){
            alert('No ha introducido un caracter correcto')
        }else{
            for(let i = 0; i < respuesta.length; i++){
                if(respuesta[i] === valor){
                    palabraAdivinar[i] = valor
                    palabraCorrecta[i] = valor
                    letraCorrecta = true
                    correctWord.play()
                    comprobarVictoria()
                }
            }
            if(!letraCorrecta){
                palabraIncorrecta.push(valor)
                palabrasIncorrectas.textContent = palabraIncorrecta.join(' ')
                fallos += 1
                letraCorrecta = false
                wrongWord.play()
                comprobarDerrota()
                dibujarAhorcado()
            }
        }
        palabrasCorrectas.textContent = palabraAdivinar.join(' ')
    })
}

function comprobarDerrota(){
    let inputLetra = document.getElementById('input-letra')
    if(fallos >= maxFallos){
        message.textContent = `¡Has perdido todas la vidas! La respuesta era --> ${respuesta}`.toUpperCase()
        buttonAdivina.disabled = true
        buttonAdivina.style.pointerEvents = 'none'
        buttonRestart.style.display = 'block'
        inputLetra.disabled = true
        musicaFondo.pause();
        musicaFondo.currentTime = 0;
        gameOver.play()
        buttonRestart.addEventListener('click', () => {
            location.reload()
        })
    }
}

function comprobarVictoria(){
    let inputLetra = document.getElementById('input-letra')
    if(palabraCorrecta.join(',').replaceAll(',' ,'') === respuesta){
        message.textContent = 'Has ganado!'
        musicaFondo.pause();
        musicaFondo.currentTime = 0;
        win.play()
        buttonAdivina.disabled = true
        buttonAdivina.style.pointerEvents = 'none'
        buttonRestart.style.display = 'block'
        inputLetra.disabled = true
        buttonRestart.addEventListener('click', () => {
            location.reload()
        })
    }
}

function dibujarAhorcado(){
    //base
    if(fallos >= 1){
        ctx.lineWidth = 3
        ctx.strokeStyle = 'blue'
        ctx.beginPath()
        ctx.moveTo(30, 140)
        ctx.lineTo(30, 150)
        ctx.moveTo(30,140)
        ctx.lineTo(150,140)
        ctx.moveTo(150, 140)
        ctx.lineTo(150, 150)
        ctx.stroke()
    }

    //poste
    if(fallos >= 2){
        ctx.lineWidth = 3
        ctx.strokeStyle = 'blue'
        ctx.beginPath()
        ctx.moveTo(70, 140)
        ctx.lineTo(70, 10)
        ctx.moveTo(70, 10)
        ctx.lineTo(110, 10)
        ctx.moveTo(110, 10)
        ctx.lineTo(110, 140)
        ctx.stroke()
    }

    //soporte cuerda
    if(fallos >= 3){
        ctx.lineWidth = 3
        ctx.strokeStyle = 'blue'
        ctx.beginPath();
        ctx.moveTo(110, 25)
        ctx.lineTo(220, 10)
        ctx.moveTo(220, 10)
        ctx.lineTo(240, 20)
        ctx.moveTo(240, 20)
        ctx.lineTo(110, 38)
        ctx.stroke()
    }

    //cuerda
    if(fallos >= 4){
        ctx.lineWidth = 4
        ctx.strokeStyle = 'blue'
        ctx.beginPath();
        ctx.moveTo(220, 23);
        ctx.lineTo(220, 55);
        ctx.stroke();
    }

    //cabeza
    if(fallos >= 5){
        ctx.lineWidth = 2
        ctx.strokeStyle = 'blue'
        ctx.beginPath();
        ctx.arc(220, 69, 15, 0, Math.PI * 2);
        ctx.moveTo(225, 65)
        ctx.arc(225, 65, 1, 0 , Math.PI * 2)
        ctx.moveTo(215, 65)
        ctx.arc(215, 65, 1, 0 , Math.PI * 2)
        ctx.moveTo(225, 77)
        ctx.arc(220, 77, 5, 0, Math.PI, true )
        ctx.stroke();
    }

    //cuerpo
    if(fallos >= 6){
        ctx.lineWidth = 2
        ctx.strokeStyle = 'blue'
        ctx.beginPath()
        ctx.moveTo(220,85)
        ctx.lineTo(220, 120)
        ctx.moveTo(220,90)
        ctx.lineTo(200, 115)
        ctx.moveTo(220, 119)
        ctx.lineTo(200, 140)
        ctx.moveTo(220, 90)
        ctx.lineTo(240, 115)
        ctx.moveTo(220, 119)
        ctx.lineTo(240, 140)
        ctx.stroke()
    }
}




function comprobarDificultad(){
    let nivelDificultad = prompt('Introduce el nivel de dificultad -> facil | medio | dificil').normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim()
    if(nivelDificultad === 'facil'){
        iniciarGame(nivelDificultad)
    }else if(nivelDificultad === 'medio'){
        iniciarGame(nivelDificultad)
    }else if(nivelDificultad === 'dificil'){
        iniciarGame(nivelDificultad)
    }else{
        while(nivelDificultad !== 'facil' && nivelDificultad !== 'medio' && nivelDificultad !== 'dificil'){
            alert('No ha introducido una dificultad correcta')
            nivelDificultad = prompt('Introduce el nivel de dificultad -> facil | medio | dificil').normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim()
        }
        iniciarGame(nivelDificultad)
    }
}

comprobarDificultad()