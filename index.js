
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
const scoreEl = document.getElementById('scoreEl');

canvas.width = innerWidth;
canvas.height = innerHeight;


let score = 0;

function animate() {
    const animationFrameId = requestAnimationFrame(animate);

    c.clearRect(0, 0, innerWidth, innerHeight);

    const playerInNextFrame = {
        ...player, // Spread operator, gets all of the properties of player, then position can be overwritten in the next line
        position: {
            x: player.position.x + player.velocity.x,
            y: player.position.y + player.velocity.y
        }
    };


    boundaries.forEach(boundary => {
        if (circleCollidesWithRectangle({circle: playerInNextFrame, rectangle: boundary})) {
            player.stop();
        }
        boundary.draw();
    });

    if (pellets.length == 0) {
        cancelAnimationFrame(animationFrameId);
        console.log('You won');
    }

    for (let i = pellets.length - 1; i >= 0; i--) {
        const pellet = pellets[i];
        if (circleCollidesWithCircle({circle1: player, circle2: pellet})) {
            pellets.splice(i, 1);
            score += 10;
            scoreEl.textContent = score.toString().padStart(4, '0');
        } else {
            pellet.draw();
        }
    }

    for (let i = powerUps.length - 1; i >= 0; i--) {
        const powerUp = powerUps[i];
        if (circleCollidesWithCircle({circle1: player, circle2: powerUp})) {
            powerUps.splice(i, 1);
            score += 50;
            scoreEl.textContent = score.toString().padStart(4, '0');

            ghosts.forEach(ghost => {
                ghost.scared();
            });
        } else {
            powerUp.draw();
        }
    }

    const availableDirections = getAvailableDirections(player);
    if (availableDirections.includes(lastKey)) {
        player.moveDirection(lastKey);
    }

    for (let i = ghosts.length - 1; i >= 0; i--) {
        const ghost = ghosts[i];
   
        let availableDirections = getAvailableDirections(ghost);

        if (JSON.stringify(availableDirections) != JSON.stringify(ghost.lastAvailableDirections)) {
            availableDirections = availableDirections.filter(dir => {
                return (dir != ghost.unavailableDirection);
            });
            const randomDirection = availableDirections[Math.floor(Math.random() * availableDirections.length)];
            ghost.moveDirection(randomDirection);
            ghost.lastAvailableDirections = availableDirections;
        }

        if (circleCollidesWithCircle({circle1: player, circle2: ghost})) {
            if (ghost.isScared) {
                ghosts.splice(i, 1);
            } else {                
                cancelAnimationFrame(animationFrameId);
            }
        }

        ghost.update();
    };

    player.update();

}

animate();
