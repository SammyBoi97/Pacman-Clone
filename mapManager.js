class Boundary {
    static width = 40;
    static height = 40;

    constructor({position, imgSrc}) {
        this.position = {
            x: position.x,
            y: position.y
        };
        this.width = Boundary.width;
        this.height = Boundary.height;
        this.color = 'blue';
        this.img = new Image(Boundary.width, Boundary.height);
        this.img.src = imgSrc;
    }

    draw() {
        c.drawImage(this.img, this.position.x, this.position.y);
    }
}

class Pellet {
    constructor({position}) {
        this.position = {
            x: position.x,
            y: position.y
        };
        this.radius = Boundary.width * 0.2 / 2;
    }

    draw() {
        c.fillStyle = 'white';
        c.beginPath();
        c.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        c.fill();
        c.stroke();
    }
}

class PowerUp {
    constructor({position}) {
        this.position = {
            x: position.x,
            y: position.y
        };
        this.radius = Boundary.width * 0.4 / 2;
    }

    draw() {
        c.fillStyle = 'white';
        c.beginPath();
        c.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        c.fill();
        c.stroke();
    }
}


const levelMap = [
    ['0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'],
    ['0','.','.','.','.','.','.','.','.','0','.','.','.','.','.','.','.','.','0'],
    ['0','p','0','0','.','0','0','0','.','0','.','0','0','0','.','0','0','p','0'],
    ['0','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','0'],
    ['0','.','0','0','.','0','.','0','0','0','0','0','.','0','.','0','0','.','0'],
    ['0','.','.','.','.','0','.','.','.','0','.','.','.','0','.','.','.','.','0'],
    ['0','0','0','0','.','0','0','0',' ','0',' ','0','0','0','.','0','0','0','0'],
    [' ',' ',' ','0','.','0',' ',' ',' ',' ',' ',' ',' ','0','.','0',' ',' ',' '],
    ['0','0','0','0','.','0',' ','0','0','0','0','0',' ','0','.','0','0','0','0'],
    [' ',' ',' ','0','.',' ',' ','0',' ',' ',' ','0',' ',' ','.','0',' ',' ',' '],
    ['0','0','0','0','.','0',' ','0','0','0','0','0',' ','0','.','0','0','0','0'],
    [' ',' ',' ','0','.','0',' ',' ',' ',' ',' ',' ',' ','0','.','0',' ',' ',' '],
    ['0','0','0','0','.','0',' ','0','0','0','0','0',' ','0','.','0','0','0','0'],
    ['0','.','.','.','.','.','.','.','.','0','.','.','.','.','.','.','.','.','0'],
    ['0','p','0','0','.','0','0','0','.','0','.','0','0','0','.','0','0','p','0'],
    ['0','.','.','.','.','.','.','.','.','.','.','.','.','.','.','0','.','.','0'],
    ['0','0','.','0','.','0','.','0','0','0','0','0','.','0','.','0','.','0','0'],
    ['0','.','.','0','.','0','.','.','.','0','.','.','.','0','.','.','.','.','0'],
    ['0','.','0','0',' ','0','0','0','.','0','.','0','0','0','0','0','0','.','0'],
    ['0','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','0'],
    ['0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'],
];


function determineBoundaryImage({levelMapCoord}) {
    let aboveBoundary = null;
    let leftOfBoundary = null;
    let belowBoundary = null;
    let rightOfBoundary = null;
    
    try {
        aboveBoundary = levelMap[levelMapCoord.y - 1][levelMapCoord.x];
    } catch (error) {}
    try {
        leftOfBoundary = levelMap[levelMapCoord.y][levelMapCoord.x - 1];
    } catch (error) {}
    try {
        belowBoundary = levelMap[levelMapCoord.y + 1][levelMapCoord.x];
    } catch (error) {}
    try {
        rightOfBoundary = levelMap[levelMapCoord.y][levelMapCoord.x + 1];
    } catch (error) {}

    let boundaryPattern = "";

    if (aboveBoundary == '0') {
        boundaryPattern += 'w'
    }
    if (leftOfBoundary == '0') {
        boundaryPattern += 'a'
    }
    if (belowBoundary == '0') {
        boundaryPattern += 's'
    }
    if (rightOfBoundary == '0') {
        boundaryPattern += 'd'
    }

    let boundaryImgSource = './img/block.png';

    switch (boundaryPattern) {
        case 'w':
            boundaryImgSource = './img/capBottom.png';
            break;
        case 'a':
            boundaryImgSource = './img/capRight.png';
            break;
        case 's':
            boundaryImgSource = './img/capTop.png';
            break;
        case 'd':
            boundaryImgSource = './img/capLeft.png';
            break;
        case 'wa':
            boundaryImgSource = './img/pipeCorner3.png';
            break;
        case 'ws':
            boundaryImgSource = './img/pipeVertical.png';
            break;
        case 'wd':
            boundaryImgSource = './img/pipeCorner4.png';
            break;
        case 'was':
            boundaryImgSource = './img/pipeConnectorLeft.png';
            break;
        case 'wad':
            boundaryImgSource = './img/pipeConnectorTop.png';
            break;
        case 'wsd':
            boundaryImgSource = './img/pipeConnectorRight.png';
            break;
        case 'as':
            boundaryImgSource = './img/pipeCorner2.png';
            break;
        case 'ad':
            boundaryImgSource = './img/pipeHorizontal.png';
            break;
        case 'asd':
            boundaryImgSource = './img/pipeConnectorBottom.png';
            break;
        case 'sd':
            boundaryImgSource = './img/pipeCorner1.png';
            break;
    }

    return boundaryImgSource;
}

const boundaries = [];
const pellets = [];
const powerUps = [];

levelMap.forEach((row, i) => {
    row.forEach((col, j) => {
        const curMapCoord = {
            x: j,
            y: i
        };
        switch (col) {
            case '0':
                boundaries.push(new Boundary({
                    position: {
                        x: Boundary.width * j,
                        y: Boundary.height * i
                    },
                    imgSrc: determineBoundaryImage({levelMapCoord: curMapCoord})
                }));
                break;
            case '.':
                pellets.push(new Pellet({
                    position: {
                        x: Boundary.width * j + Boundary.width / 2,
                        y: Boundary.height * i + Boundary.height / 2
                    }
                }));
                break;
            case 'p':
                powerUps.push(new PowerUp({
                    position: {
                        x: Boundary.width * j + Boundary.width / 2,
                        y: Boundary.height * i + Boundary.height / 2
                    }
                }));
                break;
        }
    });
});