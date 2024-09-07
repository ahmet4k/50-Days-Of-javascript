const insert = document.getElementById("insert");


window.addEventListener("keydown",(event)=>{
    insert.innerHTML= `
        <div class="key">
            ${event.key === " " ? "Space" : event.key}

            <small>Event-Key</small>
        </div>
        <div class="key">
            
            ${event.keyCode}
            <small>Event-keyCode</small>
        </div>
        <div class="key">
            ${event.code}
            <small>event.code</small>
        </div>
        <div class="key">  key ve Keycode almak için herhangi bir tuşa basınız </div>
    </div>



    
    `
})
