let s;
let agents;

function setup() {
    createCanvas(540, 540);
    s = {};
    s.noiseIntensity = 255;
    s.noiseScale = 300;
    s.agentCount = 20;
    s.bgColor = color(33);
    s.agentColor = color(200, 50);
    agents = [];
    for (let i = 0; i < s.agentCount; i++) {
        agents.push(new Agent());
    }
    background(s.bgColor);
}

function draw() {
    // background(s.bgColor);
    for (let i = 0; i < s.agentCount; i++) {
        let a = agents[i];
        a.angle = noise(a.position.x / s.noiseScale, a.position.y / s.noiseScale) * s.noiseIntensity;
        a.updatePosition();
    }
    stroke(s.agentColor);
    noFill();
    for (let i = 0; i < s.agentCount; i++) {
        let a = agents[i];
        strokeWeight(10);
        line(a.previousPosition.x, a.previousPosition.y, a.position.x, a.position.y);
    }
}

class Agent {
    constructor(position) {
        this.position = position !== undefined ? position : createVector(random(width), random(height)); // Si aucune position n'est fournie, initialisation avec une position aléatoire
        this.previousPosition = this.position.copy();
        this.angle = random(TWO_PI);
        this.stepSize = 2;
    }
    updatePosition() {
        // Une méthode mettant à jour de la position de l'agent en fonction de son angle actuel
        this.previousPosition = this.position.copy();
        this.position.x += cos(this.angle) * this.stepSize;
        this.position.y += sin(this.angle) * this.stepSize;
        if (this.isOutsideSketch() > 0) {
            this.position = createVector(random(width), random(height));
            this.previousPosition = this.position.copy();
        }
    }
    isOutsideSketch() {
        // Une méthode permettant de vérifier si l'agent est sorti des limites de l'espace du sketch. La méthode renvoie les valeurs suivantes :
        // 0: l'agent n'est pas sorti des limites de l'espace du sketch
        // 1: l'agent est sorti par le haut
        // 2: l'agent est sorti par la droite
        // 3: l'agent est sorti par le bas
        // 4: l'agent est sorti par la gauche
        if (this.position.y < 0) {
            return 1;
        } else if (this.position.x > width) {
            return 2;
        } else if (this.position.y > height) {
            return 3;
        } else if (this.position.x < 0) {
            return 4;
        } else {
            return 0;
        }
    }
}

