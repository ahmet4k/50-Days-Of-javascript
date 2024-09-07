const counters = document.querySelectorAll(".counter");

counters.forEach((counter) => {
    counter.innerText="0"
    const updateCounter = () => {
        const target = parseInt(counter.getAttribute("data-target"));
        const count = + parseInt(counter.innerText);
        const increment = target / 300 ; // increment by 0.5% every 1
        if (count < target) {
            counter.innerText = `${Math.ceil(count + increment)}`
            setTimeout(updateCounter, 1);
        }
        else{
            counter.innerText = target
        }
    }
    updateCounter();
})