let score = 0;
let w = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;
let h = window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight;
let isDead = false;
let animate;

function createZombies() {
    let zombieImage = new Image();
    let id = generateId();
    zombieImage.setAttribute("id", id);
    zombieImage.className = "zombies";
    zombieImage.src = "images/zombie_alive.gif";
    zombieImage.style.position = "absolute";
    zombieImage.style.top = Math.floor(Math.random() * 523) + "px";
    zombieImage.style.left = "-80px";
    document.querySelector("#zombieContainer").appendChild(zombieImage);

    return zombieImage;
}
function createBungeeZombie() {
    let bungeeZombie = new Image();
    let id = generateId();

    bungeeZombie.setAttribute("id", id);
    bungeeZombie.className = "zombies";
    bungeeZombie.src = "images/bungee_zombie.gif";
    bungeeZombie.style.position = "absolute";
    bungeeZombie.style.top = "0px"
    document.querySelector("#zombieContainer").appendChild(bungeeZombie);

    return bungeeZombie;
}
//grenade
function createSupportItems() {
    let grenade = new Image();
    let id = generateId();

    grenade.setAttribute("id", id);
    grenade.className = "supportItem";
    grenade.src = "images/grenade.gif";
    grenade.style.position = "fixed";
    grenade.style.top = "-40px";
    document.querySelector("#supportItemContainer").appendChild(grenade);

    return grenade;

}

function createIceberg() {
    let iceberg = new Image();
    let id = generateId();
    iceberg.setAttribute("id", id);
    iceberg.className = "supportItem";
    iceberg.src = "images/iceberg.gif";
    iceberg.style.position = "fixed";
    iceberg.style.top = "-40px";
    document.querySelector("#supportItemContainer").appendChild(iceberg);

    return iceberg;

}

function generateId() {
    let randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    return randLetter + Date.now();
}

function droppingSupportItem(grenade) {
    setInterval(function () {
        if (parseInt(document.getElementById(grenade.id).style.top) + document.getElementById(grenade.id).height <= h) {
            document.getElementById(grenade.id).style.top = parseInt(document.getElementById(grenade.id).style.top) + 1 + "px";
        }
        else {
            document.querySelector("#supportItemContainer").removeChild(document.getElementById(grenade.id));
        }
    }, 10)
}

function movement(zombie) {
    setInterval(function () {
        if (parseInt(document.getElementById(zombie.id).style.left) + document.getElementById(zombie.id).width <= w) {
            if (parseInt(document.getElementById(zombie.id).style.top) + document.getElementById(zombie.id).height <= h) {
                document.getElementById(zombie.id).style.top = parseInt(document.getElementById(zombie.id).style.top) + Math.floor(Math.random() * 79) - Math.floor(Math.random() * 57) + "px";
                document.getElementById(zombie.id).style.left = parseInt(document.getElementById(zombie.id).style.left) + Math.floor(Math.random() * 123) + "px";
            }
            else {
                document.getElementById(zombie.id).style.top = parseInt(document.getElementById(zombie.id).style.top) / Math.floor(Math.random() * 5 + 7) + "px";
                document.getElementById(zombie.id).style.left = parseInt(document.getElementById(zombie.id).style.left) +  Math.floor(Math.random() * 123) + "px";
            }
        }
        else {
            looseTheGame();
        }
    }, 2000)
}

function moveBungeeZombie(bungeeZombie) {
    let spaceW = w - document.getElementById(bungeeZombie.id).width;
    let spaceH = h - document.getElementById(bungeeZombie.id).height;
    let randomX = Math.round(Math.random() * spaceW);
    let randomY = Math.round(Math.random() * spaceH);
    document.getElementById(bungeeZombie.id).style.left = randomX + "px";
    document.getElementById(bungeeZombie.id).style.top = randomY + "px";
    animate = setInterval(function () {
        let spaceW = w - document.getElementById(bungeeZombie.id).width;
        let spaceH = h - document.getElementById(bungeeZombie.id).height;
        let randomX = Math.round(Math.random() * spaceW);
        let randomY = Math.round(Math.random() * spaceH);
        document.getElementById(bungeeZombie.id).style.left = randomX + "px";
        document.getElementById(bungeeZombie.id).style.top = randomY + "px";
    }, 3124)
}

function killBungeeZombie(bungeeZombie) {
    clearInterval(animate)
    document.getElementById("SLR").play();
    score += 2;
    document.getElementById("score").innerHTML = "SCORE: " + score;
    document.getElementById(bungeeZombie.id).src = "images/rip_bungee.gif";
    setTimeout(function () {
        document.querySelector("#zombieContainer").removeChild(document.getElementById(bungeeZombie.id));
    }, 2134)

}

function shooting(zombie) {
    if (isDead) {
        return
    }
    isDead = true;
    document.getElementById("myGunAudio").play();
    score += 1;
    document.getElementById("score").innerHTML = "SCORE: " + score;
    document.getElementById(zombie.id).src = "images/zombie_ex.gif";
    setTimeout(function () {
        isDead = false;
        document.querySelector("#zombieContainer").removeChild(document.getElementById(zombie.id));
    }, 1773)

}

function looseTheGame() {
    document.getElementById("endGame").style.visibility = "hidden";
    document.body.style.backgroundImage = "url('images/loose_game.png')";
    document.querySelector("#zombieContainer").parentNode.removeChild(document.querySelector("#zombieContainer"));
    document.querySelector("#supportItemContainer").parentNode.removeChild(document.querySelector("#supportItemContainer"));
    document.getElementById("themeAudio").pause();
    document.getElementById("endGameAudio").play();
    document.getElementById("score").innerHTML = "SCORE: " + score;
    document.getElementById("messageToPlayer").innerHTML = "GAME OVER";
}
function triggeredIceberg() {
    let zombie = [].slice.call(document.getElementsByClassName("zombies"), 0);
    zombie.forEach(function (img) {
        img.src = "images/frozen_zombie.png";
        document.getElementById(img.id).style.left = 0 + "px";
        setTimeout(function () {
            document.getElementById(img.id).style.left = parseInt(document.getElementById(img.id).style.left) + 2 + "px";
            document.getElementById(img.id).style.top = parseInt(document.getElementById(img.id).style.top) + 2 + "px";
        }, 4321);
    });
    document.getElementById("icebergAudio").play();
}

function grenadeExplode() {
    let numberOfZombie = document.getElementsByTagName('img');
    let zombie = [].slice.call(document.getElementsByTagName('img'), 0);
    score += numberOfZombie.length - 1;
    document.getElementById("score").innerHTML = "SCORE: " + score;
    zombie.forEach(function (img) {
        img.src = "images/grenade_explosion.gif";
        setTimeout(function () {
            img.parentNode.removeChild(img);
        }, 1234);
    });
    document.getElementById("grenadeAudio").play();
}

function displayBoomInBungee(bungeeZombie) {
    document.getElementById(bungeeZombie.id).src = "images/hover_bungee.gif";
}
function endGame() {
    alert("You achieved " + score);
    window.location.reload();
}

function startGame() {
    document.getElementById("startGame").style.display = "None";
    document.getElementById("themeAudio").play();
    setInterval(function () {
        let myZombie = createZombies();
        movement(myZombie)
        document.getElementById(myZombie.id).onclick = function () {
            shooting(myZombie);
        }
    }, 1517);

    setInterval(function () {
        let bungeeZombie = createBungeeZombie();
        moveBungeeZombie(bungeeZombie);
        document.getElementById(bungeeZombie.id).onmouseover = function () {
            displayBoomInBungee(bungeeZombie);
        }
        document.getElementById(bungeeZombie.id).onclick = function () {
            killBungeeZombie(bungeeZombie);
        }
        setTimeout(function () {
            if (document.getElementById(bungeeZombie.id)) {
                document.getElementById("bungeeSuicide").play();
                document.getElementById(bungeeZombie.id).src = "images/bungee_suicide.gif";
                setTimeout(function () {
                    looseTheGame();
                }, 1511)
            }
        }, 3791)
    }, 5000)
    setInterval(function () {
        let grenadeItem = createSupportItems();
        droppingSupportItem(grenadeItem);
        document.getElementById(grenadeItem.id).onclick = function () {
            grenadeExplode();
        }
    }, 23300)
    setInterval(function () {
        let icebergItem = createIceberg();
        droppingSupportItem(icebergItem);
        document.getElementById(icebergItem.id).onclick = function () {
            document.getElementById(icebergItem.id).src = "images/iceberg_explosion.gif"
            setTimeout(function () {
                document.getElementById(icebergItem.id).parentNode.removeChild(document.getElementById(icebergItem.id));
            }, 1547)
            triggeredIceberg();
        }
    }, 33333)

}