let s;

function setup() {
    createCanvas(540, 540);
    s = {};
    s.noiseIntensity = 255;
    s.noiseScale = 300;
    drawPerlinValues();
}

function drawPerlinValues() {
    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
            let v = noise(i / s.noiseScale, j / s.noiseScale); // La division est préférée à la multiplication car elle donne des résultats plus intuitifs : plus 'noiseScale' aura une valeur élevée, et plus la taille des structures visuelles produites sera grande.
            stroke(v * s.noiseIntensity);
            point(i, j);
        }
    }
}
