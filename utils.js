
function getAvailableDirections(circle) {
    const circleLeft = {
        ...circle, // Spread operator, gets all of the properties of player, then position can be overwritten in the next line
        position: {
            x: circle.position.x - circle.speed,
            y: circle.position.y
        }
    };
    const circleRight = {
        ...circle, // Spread operator, gets all of the properties of player, then position can be overwritten in the next line
        position: {
            x: circle.position.x + circle.speed,
            y: circle.position.y
        }
    };
    const circleUp = {
        ...circle, // Spread operator, gets all of the properties of player, then position can be overwritten in the next line
        position: {
            x: circle.position.x,
            y: circle.position.y - circle.speed
        }
    };
    const circleDown = {
        ...circle, // Spread operator, gets all of the properties of player, then position can be overwritten in the next line
        position: {
            x: circle.position.x,
            y: circle.position.y + circle.speed
        }
    };

    const unavailableDirections = [];

    boundaries.forEach(boundary => {

        if (circleCollidesWithRectangle({circle: circleLeft, rectangle: boundary})) {
            unavailableDirections.push('a');
        }
        if (circleCollidesWithRectangle({circle: circleRight, rectangle: boundary})) {
            unavailableDirections.push('d');
        }
        if (circleCollidesWithRectangle({circle: circleUp, rectangle: boundary})) {
            unavailableDirections.push('w');
        }
        if (circleCollidesWithRectangle({circle: circleDown, rectangle: boundary})) {
            unavailableDirections.push('s');
        }
    });

    const availableDirections = ['w','a','s','d'].filter((dir) => {
        return !unavailableDirections.includes(dir);
    });
    return availableDirections;
}

function circleCollidesWithRectangle({circle, rectangle}) {
    const buffer = rectangle.width / 2 - circle.radius;
    return (
        circle.position.x + circle.radius > rectangle.position.x - buffer &&
        circle.position.x - circle.radius < rectangle.position.x + rectangle.width + buffer &&
        circle.position.y - circle.radius < rectangle.position.y + rectangle.height + buffer &&
        circle.position.y + circle.radius > rectangle.position.y - buffer
    );
}

function circleCollidesWithCircle({circle1, circle2}) {
    const distBetweenMeshes = Math.hypot(
        circle1.position.x - circle2.position.x,
        circle1.position.y - circle2.position.y);
    return (distBetweenMeshes <= circle1.radius + circle2.radius); 
}
