class Ghost {
    constructor({startingPos, startingVel, color}) {
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
        this.curColor = this.normalColor = color;
        this.lastAvailableDirections = [];
        this.curDirection;
        this.unavailableDirection;
        this.isScared = false;
        this.scaredDuration = 5000;
    }

    moveDirection(dir) {
        switch (dir) {
            case 'w':
                this.velocity = {
                    x: 0,
                    y: -this.speed
                };
                this.unavailableDirection = 's';
                break;
            case 'a':
                this.velocity = {
                    x: -this.speed,
                    y: 0
                };
                this.unavailableDirection = 'd';
                break;
            case 's':
                this.velocity = {
                    x: 0,
                    y: this.speed
                };
                this.unavailableDirection = 'w';
                break;
            case 'd':
                this.velocity = {
                    x: this.speed,
                    y: 0
                };
                this.unavailableDirection = 'a';
                break;
        };
        this.curDirection = dir;
    }
    stop() {
        this.velocity = {
            x: 0,
            y: 0
        };
    }

    scared() {
        if (this.isScared) {
            clearTimeout(this.scaredTimeoutId);
        }
        this.isScared = true;
        this.curColor = 'blue';
        
        this.scaredTimeoutId = setTimeout(() => {
            this.isScared = false;
            this.curColor = this.normalColor;
        }, this.scaredDuration);
    }
    
    draw() {
        c.fillStyle = this.curColor;
        c.beginPath();
        c.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        c.fill();
        c.stroke();
    }

    update() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.draw();
    }
}



const ghostStartingPos = {
    x: Boundary.width * 10.5,
    y: Boundary.height * 1.5 
};
const ghostStartingVel = {
    x: 1,
    y: 0
};

const ghosts = [
    new Ghost({
        startingPos: ghostStartingPos,
        startingVel: ghostStartingVel,
        color: 'red'
    }),
    new Ghost({
        startingPos: {x: ghostStartingPos.x, y: ghostStartingPos.y + Boundary.height * 2},
        startingVel: ghostStartingVel,
        color: 'pink'
    }),
    new Ghost({
        startingPos: {x: ghostStartingPos.x, y: ghostStartingPos.y + Boundary.height * 2},
        startingVel: ghostStartingVel,
        color: 'orange'
    }),
    new Ghost({
        startingPos: {x: ghostStartingPos.x, y: ghostStartingPos.y + Boundary.height * 2},
        startingVel: ghostStartingVel,
        color: 'cyan'
    }),
    // new Ghost({
    //     startingPos: {x: ghostStartingPos.x, y: ghostStartingPos.y + Boundary.height * 2},
    //     startingVel: ghostStartingVel,
    //     color: 'green'
    // }),
    // new Ghost({
    //     startingPos: {x: ghostStartingPos.x, y: ghostStartingPos.y + Boundary.height * 2},
    //     startingVel: ghostStartingVel,
    //     color: 'yellow'
    // }),
    // new Ghost({
    //     startingPos: {x: ghostStartingPos.x, y: ghostStartingPos.y + Boundary.height * 2},
    //     startingVel: ghostStartingVel,
    //     color: 'purple'
    // }),
];


