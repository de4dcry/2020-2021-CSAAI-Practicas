const canvas = document.getElementById("canvas");
const vida = document.getElementById("vida");
vida.width = 25;
vida.height = 25;

canvas.width = 1000;
canvas.height = 800;
const ctx = canvas.getContext("2d");

var bloqs = {

    height: 30,
    width: 100,
    draw: function(){
        padding_x = (1000 - (9 * this.width))/10;
        padding_y = (600 - (5 * this.width))/6;
        ctx.beginPath()
        for (var i = 1; i != 10 ; i++) {
            for (var j = 1; j != 6 ; j++) {

                 ctx.rect(((i-1)*this.width + padding_x *i) ,((j-1)*this.height)+ padding_y*j, this.width, this.height);
                ctx.fillStyle = 'red';
                ctx.fill();
                 ctx.stroke();
        }
    }
    ctx.closePath();
}
}


// La barra del jugador:

var bar = {
    x: 450,
    y: 700,
    width: 100,
    height:10,
    vx: 2,
    draw: function() {
        ctx.beginPath();
        ctx.rect(this.x,this.y , this.width, this.height);
        ctx.fillStyle = 'green';
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }
};



var ball = {
    width: 10,
    height:10,
    x: 400 ,
    y: 500 , 
    vx: 5,
    vy: -2,
    draw: function() {

        ctx.clearRect(this.x -11 ,this.y -11, 22,22);

        if (this.x < 0 || this.x >= (canvas.width - 10) ) {
            this.vx = -1  * this.vx;
          }
        
        if (this.y <= 0) {
            this.vy = -1  * this.vy;
          }

        this.x = this.x + this.vx;
        this.y = this.y + this.vy;
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, 10, 0, 2 * Math.PI);
        ctx.fillStyle = 'yellow';
        ctx.fill();
        ctx.stroke();
        ctx.closePath();            
    }
};


ctx.beginPath();
ctx.fillStyle = 'black';
ctx.font = "25px Arial";
ctx.fillText("Puntuacion:", 30, 770);
ctx.closePath();

vida.onload = ()=> {
    ctx.drawImage(vida,800,750);  
    ctx.drawImage(vida,825,750);  
    ctx.drawImage(vida,850,750); 
};
  
n = 0;
window.onkeydown = (e) => {
    n = n+1;
  if (e.keyCode == 37 || e.key == "a") {
        ctx.clearRect(bar.x -1 , bar.y -1  , 102,12);
        bar.x = bar.x - bar.vx - n;
   }


    if (e.keyCode == 39 || e.key == "d") {
        ctx.clearRect(bar.x -1 , bar.y -1 , 102,12);
            bar.x = bar.x + bar.vx + n;
        }
}
  
window.onkeyup = (e) => {
    n = 0;
  }

function colision(obj1 ,obj2){
    console.log(obj2);
    if(obj2.x >= obj1.x  &&  obj2.x <= obj1.x + obj1.width){
        if(obj2.y + obj2.width >= obj1.y  &&  obj2.y + obj2.width <= obj1.y){
            obj2.vx = -1* obj2.vx;
            obj2.vy = -1* obj2.vy;
        }
    }
    
}

function update() 
{
  bloqs.draw();
  bar.draw();
  ball.draw();
  colision(bar,ball);
  requestAnimationFrame(update);
}

update();