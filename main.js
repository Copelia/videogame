//Programación orientada a objetos

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d')
ctx.fillStyle = "peru";

//Parámetros: x, y, ancho, alto
//ctx.fillRect(0, 0, 512, 512);

/*const marioLink = "https://bit.ly/2v3FTX5";
//Crear una instancia de la imagen en JS y no en html
const image = new Image();
image.src = marioLink;
image.onload = () => {
    ctx.drawImage(image, 0, 0, 50, 50);  
}

//A setInterval se le entrega qué hacer y cada cuánto tiempo

//Se declara un contador
let x = 0;
//Sesenta cuadros por segundo
setInterval(() =>{
    //Borrando 'aura negra' de Mario 
    ctx.clearRect(0,0, canvas.width, canvas.height);
    //Pintando a Mario 
    ctx.drawImage(image, x, 0, 50, 50);
    x++
    if(x > canvas.width) x = 0
},1000/60)*/

//canvas


//variables
var interval
var enemies = []
var frames = 0

//constructores
//Probando arrow func pero no funciona
function Background() {
    //This representa al objeto creado a partir de una plantilla
    this.x = 0
    this.y = 0
    this.width = canvas.width
    this.height = canvas.height
    this.imagen = new Image()
    this.imagen.src = 'https://bit.ly/2LA87TH'
    this.imagen.onload = function(){
        this.draw()
    }.bind(this)
    
    this.draw = function(){
        ctx.drawImage(this.imagen, this.x, this.y, this.width, this.height)
    }
}


function Mario() {
    this.x = canvas.width / 3
    this.y = canvas.height - 50
    this.width = 50
    this.height = 50
    this.imagen = new Image()
    this.imagen.src = 'https://bit.ly/2v3FTX5'
    this.imagen.onload = function() {
        this.draw()
    }.bind(this)

    this.draw = function() {
        if(this.x < 0) this.x = 0
        if(this.x > canvas.width) this.x = canvas.width - 8
        ctx.drawImage(this.imagen, this.x, this.y, this.width, this.height)
    }

    this.checkIfTouch = function(enemy){
        //Aquí se pregunta si Mario está tocando al enemigo
        return (this.x < enemy.x + enemy.width) &&
                (this.x + this.width > enemy.x) &&
                (this.y < enemy.y + enemy.height) &&
                (this.y + this.height > enemy.y);
        }
}


function Enemy(x){
    this.x = x
    this.y = 0
    this.width = 50
    this.height = 50
    this.imagen = new Image()
    this.imagen.src = 'https://s3-eu-west-1.amazonaws.com/ih-materials/uploads/upload_77b05ce5bdfb069e316ba875cb672888.png'
    this.imagen.onload = function(){
        this.draw()
    }.bind(this)
    
    this.draw = function(){
        //Cada 60 veces x segundo le pido al goomba que baje un px
        this.y++
        ctx.drawImage(this.imagen, this.x, this.y, this.width, this.height)
    }
}

//instancias
//Los objetos creados a partir de clases se llaman instancias

var board = new Background()
var mario = new Mario()
var enemy1 = new Enemy(100)




//main functions
function update(){

  ctx.clearRect(0,0, canvas.width, canvas.height)
  //Con frames sabemos cuántas veces hemos dibujado   
  frames++
  board.draw()
  mario.draw()
  enemy1.draw()
  generateEnemy()
  drawEnemies()
  checkCollition()
}

function start(){
  interval = setInterval(update, 1000/60)
}

function gameOver(){
    clearInterval(interval)
    ctx.font= "50px red"
    ctx.fillText("GAME OVER", 100, 100)
    
}

//aux functions

function generateEnemy(){
    //Cuando el múltiplo sea divisible entre 100 entonces genera un enemigo
    if(frames % 100 === 0)
    var x = Math.floor(Math.random() * 512)
    enemies.push(new Enemy(x))
}

//función aux que me permita recorrer a los enemigos para poder pintarlos
function drawEnemies(){
    enemies.forEach(function(enemy){
      enemy.draw()
    })
}

function checkCollition(){
    enemies.forEach(function(enemy){
        if(mario.checkIfTouch(enemy)){
            gameOver()
        }
    })
}

//listeners
addEventListener('keydown', function(event){
  //this.alert(event.keyCode);
  if(event.keyCode === 37 && mario.x > 0) mario.x -= 50
  //Aquí se sale del canvas
  if(event.keyCode === 39 && mario.x + 50 < canvas.width) mario.x += 50
})

start()