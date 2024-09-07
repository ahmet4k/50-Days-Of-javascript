const content = document.getElementById("content");
const speedElement = document.getElementById("speed");
const text ="I am a Front-end Developer"
let idx = 1;
let speed = 300/speedElement.value;

writeText()


function writeText(){
    content.innerText=text.slice(0,idx);
    idx++;

    if(idx>text.length){
        idx=1
        
    }

    setTimeout(writeText,speed)
}

speedElement.addEventListener("input",(e)=>(speed=300/e.target.value))