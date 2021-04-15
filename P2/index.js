const gui = {

    botonExp : document.getElementById("E"),
    botonPunto : document.getElementById("."),
    boton_numeric : document.getElementsByClassName("numeric"),
    boton_operator : document.getElementsByClassName("operator"),
    botonDEL : document.getElementById("DEL"),
    botonAC : document.getElementById("AC"),
    botonANS : document.getElementById("ANS"),
    botonEQUAL : document.getElementById("="),
    display : document.getElementById("display"),
    warning_display : document.getElementById("warning_display")
};


function estado(){
    document.getElementById("estado_display").innerHTML = ESTADO;
}

t1 = setInterval(estado,100)

let ESTADO = 0; /* 0= No hay nada escrito , 1= valor numerico , 2= operador , 3= segundo valor numerico
 (si se introducen mas operaciones se debe repetir el estado 2,3 )   */

let EstadoAnterior = 0;

let ANS = gui.display.innerHTML;

gui.botonEQUAL.onclick = () =>{
    gui.display.innerHTML = gui.display.innerHTML.replace(/x/g , "*")

    if(ESTADO == 3 || ESTADO == 1 ){
        gui.display.innerHTML = eval(display.innerHTML);
        ANS = gui.display.innerHTML;
        ESTADO == 1}
    else if(ESTADO == 0){
        gui.display.innerHTML = "0";
    } 
    else {
        gui.display.innerHTML = "ERROR";
    }
}

gui.botonDEL.onclick = () => {

    let eliminar = gui.display.innerHTML.slice(-1);
    let previo = gui.display.innerHTML.slice(-2,-1);
    console.log(previo); 
    gui.display.innerHTML = gui.display.innerHTML.slice(0,-1) ;
    if (gui.display.innerHTML.length <= 0 ){
        ESTADO = 0;
        EstadoAnterior = 0;
        gui.warning_display.innerHTML = "";
    }
    if (eliminar == "x" || eliminar == "+" || eliminar == "-" || eliminar == "/" || previo == "x" || previo == "+" || previo == "-" || previo == "/"){
        ESTADO = EstadoAnterior;
    }

    try {
        eval(display.innerHTML);
      } catch (SyntaxError) {
        gui.warning_display.innerHTML = "";
      }

}

gui.botonAC.onclick = function () {
    gui.display.innerHTML = "0";
    ESTADO = 0;
    EstadoAnterior = 0;
}

function register_click (invalue){
    x = display.innerHTML;
    x = x + invalue;
    display.innerHTML = x;
};



console.log(gui.boton_numeric);

for (let boton of gui.boton_numeric) {
    boton.onclick = (ev) => {
        if (ESTADO == 0){
            gui.display.innerHTML = "";
            EstadoAnterior = ESTADO;
            ESTADO = 1;
            register_click(ev.target.value)}
        else if (ESTADO == 2){
            EstadoAnterior = ESTADO;
            ESTADO = 3;
            register_click(ev.target.value);
        }
        else {
            register_click(ev.target.value);
        }
      }
}

for (let boton of gui.boton_operator) {
    boton.onclick = (ev) => {
        
        if (ESTADO == 1 || ESTADO == 3){
            EstadoAnterior = ESTADO;
            register_click(ev.target.value);
            ESTADO = 2;
        }
        else if (ESTADO == 0){
            gui.display.innerHTML = "";
            ESTADO = 2;
            register_click(ev.target.value)
            gui.warning_display.innerHTML = "No puede haber un operador antes de un valor numerico, corrigelo por favor";
        }
        else if (ESTADO == 2){
            ESTADO = 2;
            register_click(ev.target.value)
            gui.warning_display.innerHTML = "No puede haber dos operadores juntos, corrigelo por favor";
        }

      }
}

