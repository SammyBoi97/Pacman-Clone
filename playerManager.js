
class Player {
    constructor({startingPos, startingVel}) {
        this.position = {
            x: startingPos.x,
            y: startingPos.y
        };
        this.velocity = {
            x: startingVel.x,
            y: startingVel.y
        };
        this.speed = 1;
        this.radius = Boundary.width * 0.8 / 2;
        this.chompSpeed = 0.02;
        this.mouthPos = 0;
        this.rotation = 0;
    }

    moveDirection(dir) {
        switch (dir) {
            case 'w':
                this.velocity = {
                    x: 0,
                    y: -this.speed
                };
                this.rotation = Math.PI * 1.5;
                break;
            case 'a':
                this.velocity = {
                    x: -this.speed,
                    y: 0
                };
                this.rotation = Math.PI;
                break;
            case 's':
                this.velocity = {
                    x: 0,
                    y: this.speed
                };
                this.rotation = Math.PI / 2;
                break;
            case 'd':
                this.velocity = {
                    x: this.speed,
                    y: 0
                };
                this.rotation = 0;
                break;
        };
    }
    stop() {
        this.velocity = {
            x: 0,
            y: 0
        };
    }
    
    draw() {
        c.fillStyle = 'yellow';
        c.save()
        c.translate(this.position.x, this.position.y);
        c.rotate(this.rotation);
        c.translate(-this.position.x, -this.position.y);

        c.beginPath();
        c.lineTo(this.position.x, this.position.y);
        
        c.arc(this.position.x, this.position.y, this.radius, this.mouthPos, 2 * Math.PI - this.mouthPos);
        c.fill();
        c.stroke();
        c.restore()
    }

    update() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if (this.mouthPos > Math.PI / 4 || this.mouthPos < 0) {
            this.chompSpeed = -this.chompSpeed;
        } 
        this.mouthPos += this.chompSpeed;

        this.draw();
    }
}



const playerStartingPos = {
    x: Boundary.width * 1.5,
    y: Boundary.height * 1.5 
};
const playerStartingVel = {
    x: 1,
    y: 0
};

const player = new Player({
    startingPos: playerStartingPos,
    startingVel: playerStartingVel
});


let lastKey = 'd';


addEventListener("keydown", (event) => {
    if (event.key == 'w') {
        lastKey = 'w';
    }
    if (event.key == 'a') {
        lastKey = 'a';
    }
    if (event.key == 's') {
        lastKey = 's';
    }
    if (event.key == 'd') {
        lastKey = 'd';
    }
});