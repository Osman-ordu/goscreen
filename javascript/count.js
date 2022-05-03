let countRight = 1;
let countWrong = 1;

function counterGreen(){
    valueGreen.textContent=countRight++;
    valueGreen.style.color="green";
}
function counterRed(){
    
    valueRed.textContent=countWrong++;
    valueRed.style.color="red";
}
