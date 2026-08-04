// ========================================
// WonderValleyMC
// Script.js
// ========================================

// Server IP
const SERVER_IP = "wondervalleymc.minecraftserver.nl";

// Elementen
const statusElement = document.getElementById("serverStatus");
const playerElement = document.getElementById("playerCount");
const versionElement = document.getElementById("serverVersion");

// ----------------------
// Server Status
// ----------------------

async function updateServerStatus() {

    try {

        const response = await fetch(`https://api.mcsrvstat.us/3/${SERVER_IP}`);
        const data = await response.json();

        if (data.online) {

            statusElement.innerHTML = "🟢 <strong>ONLINE</strong>";

            playerElement.innerHTML =
                `👥 ${data.players.online} / ${data.players.max} spelers`;

            versionElement.innerHTML =
                `📦 ${data.version}`;

            // MOTD toevoegen
            if(data.motd && data.motd.clean){

                versionElement.innerHTML +=
                    `<br>💬 ${data.motd.clean.join("<br>")}`;

            }

            // Server icon tonen
            if(data.icon){

                let img = document.getElementById("serverIcon");

                if(!img){

                    img = document.createElement("img");
                    img.id = "serverIcon";
                    img.style.width = "80px";
                    img.style.marginBottom = "20px";
                    img.style.borderRadius = "12px";

                    document.querySelector(".status-box")
                        .prepend(img);

                }

                img.src = data.icon;

            }

        }

        else{

            statusElement.innerHTML = "🔴 <strong>OFFLINE</strong>";

            playerElement.innerHTML = "";

            versionElement.innerHTML =
                "De server is momenteel niet bereikbaar.";

        }

    }

    catch(e){

        statusElement.innerHTML =
            "⚠ Kan serverstatus niet ophalen.";

    }

}

updateServerStatus();

setInterval(updateServerStatus,60000);

// ----------------------
// Kopieer IP
// ----------------------

function copyIP(){

    navigator.clipboard.writeText(SERVER_IP);

    const button = event.target;

    const oldText = button.innerHTML;

    button.innerHTML = "✅ Gekopieerd!";

    setTimeout(()=>{

        button.innerHTML = oldText;

    },2000);

}

// ----------------------
// Fade Animaties
// ----------------------

const observer = new IntersectionObserver(entries=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

});

document.querySelectorAll(
".card,.status-box,.news-card,.join,.hero-content"
).forEach(el=>{

    el.classList.add("fade-up");

    observer.observe(el);

});

// ----------------------
// Header Scroll Effect
// ----------------------

window.addEventListener("scroll",()=>{

    const header = document.querySelector("header");

    if(window.scrollY>50){

        header.style.background="rgba(0,0,0,.90)";

    }

    else{

        header.style.background="rgba(0,0,0,.55)";

    }

});

// ----------------------
// Gouden Particles
// ----------------------

const particleContainer = document.getElementById("particles");

for(let i=0;i<50;i++){

    const particle=document.createElement("span");

    particle.style.position="absolute";
    particle.style.width=Math.random()*6+2+"px";
    particle.style.height=particle.style.width;
    particle.style.left=Math.random()*100+"%";
    particle.style.top=Math.random()*100+"%";
    particle.style.borderRadius="50%";
    particle.style.background="#FFD54D";
    particle.style.opacity=Math.random()*0.6;

    particle.animate([

        {
            transform:"translateY(0px)"
        },

        {
            transform:"translateY(-40px)"
        },

        {
            transform:"translateY(0px)"
        }

    ],{

        duration:6000+Math.random()*6000,
        iterations:Infinity

    });

    particleContainer.appendChild(particle);

}
