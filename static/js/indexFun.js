function funButton() {
    document.getElementById("funHeader").textContent = prompt("Enter some stuffs", "OwO");
    let fun = document.getElementById("fun");
    fun.style.position = "absolute";
    let pos = {
        x: 0,
        y: 0
    }
    let vel = {
        x: 0,
        y: 0
    }
    let acc = {
        x: 0, 
        y: 0
    }
    let main = document.getElementsByTagName("main")[0]
    main.style.height = window.innerHeight - document.getElementsByTagName("nav")[0].clientHeight + "px";
    main.style.overflow = "hidden";
    setInterval(() => {
        acc.x = Math.floor(Math.random() * (5 + 5) - 5);
        vel.x += acc.x;
        if (vel.x > 10) {
            vel.x = 10;
        } else if (vel.x < -10) {
            vel.x = -10;
        }
        pos.x += vel.x;
        if (pos.x > main.clientWidth) {
            pos.x = 0;
        } else if (pos.x < -fun.clientWidth) {
            pos.x = main.clientWidth;
        }

        acc.y = Math.floor(Math.random() * (5 + 5) - 5);
        vel.y += acc.y;
        if (vel.y > 10) {
            vel.y = 10;
        } else if (vel.y < -10) {
            vel.y = -10;
        }
        pos.y += vel.y;
        if (pos.y > main.clientHeight) {
            pos.y = 0;
        } else if (pos.y < -fun.clientHeight) {
            pos.y = main.clientHeight;
        }

        console.log(pos);
        fun.style.left = `${pos.x}px`;
        fun.style.top = `${pos.y}px`;
    }, 1000 / 30)
}