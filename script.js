// =====================================
// WonderValleyMC Script
// =====================================

// Vul hier jouw server-IP in
const SERVER_IP = "play.wondervalleymc.nl";

// ----------------------------
// Minecraft Server Status
// ----------------------------

async function updateServerStatus() {

    try {

        const response = await fetch(
            `https://api.mcsrvstat.us/3/${SERVER_IP}`
        );

        const data = await response.json();

        const status = document.getElementById("serverStatus");
        const players = document.getElementById("playerCount");
        const version = document.getElementById("serverVersion");

        if (data.online) {

            status.innerHTML = "🟢 Server Online";

            players.innerHTML =
                `👥 ${data.players.online} / ${data.players.max} spelers`;

            version.innerHTML =
                `📦 Versie ${data.version}`;

        } else {

            status.innerHTML = "🔴 Server Offline";

            players.innerHTML = "";

            version.innerHTML = "";

        }

    } catch (error) {

        document.getElementById("serverStatus").innerHTML =
            "⚠ Kan serverstatus niet ophalen.";

    }

}

updateServerStatus();

// elke minuut vernieuwen
setInterval(updateServerStatus, 60000);

// ----------------------------
// Server IP kopiëren
// ----------------------------

function copyIP() {

    navigator.clipboard.writeText(SERVER_IP);

    alert("Server IP gekopieerd!\n\n" + SERVER_IP);

}

// ----------------------------
// Scroll animaties
// ----------------------------

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

}, {

    threshold: 0.15

});

document.querySelectorAll(
".card,.status-box,.news-card,.join,.hero-content"
).forEach(el => {

    el.classList.add("fade-up");

    observer.observe(el);

});

// ----------------------------
// Gouden deeltjes
// ----------------------------

const particles = document.getElementById("particles");

for(let i = 0; i < 40; i++){

    const dot = document.createElement("div");

    dot.style.position = "absolute";

    dot.style.width = Math.random()*5+2+"px";

    dot.style.height = dot.style.width;

    dot.style.borderRadius = "50%";

    dot.style.background = "gold";

    dot.style.opacity = Math.random()*0.5;

    dot.style.left = Math.random()*100+"%";

    dot.style.top = Math.random()*100+"%";

    dot.style.boxShadow =
    "0 0 10px gold";

    dot.style.animation =
    `float${i} ${8+Math.random()*12}s linear infinite`;

    particles.appendChild(dot);

    const style = document.createElement("style");

    style.innerHTML = `
    @keyframes float${i}{

        0%{

            transform:
            translateY(0px);

        }

        50%{

            transform:
            translateY(-40px);

        }

        100%{

            transform:
            translateY(0px);

        }

    }
    `;

    document.head.appendChild(style);

}

// ----------------------------
// Navbar achtergrond
// ----------------------------

window.addEventListener("scroll",()=>{

    const header = document.querySelector("header");

    if(window.scrollY > 50){

        header.style.background =
        "rgba(0,0,0,.82)";

    }

    else{

        header.style.background =
        "rgba(0,0,0,.55)";

    }

});
