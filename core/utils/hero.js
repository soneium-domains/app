var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

function resize() {
    var box = c.getBoundingClientRect();
    c.width = box.width;
    c.height = box.height;
}

var light = {
    x: 160,
    y: 200
};

var colors = ["#c1aaff"];

// Define fixed box positions for the text "Soneium Domains" with more spacing between words
var boxSize = 10;
var spacing = boxSize * 2;
var wordSpacing = boxSize * 2;  // Extra spacing between words

function getLetterSpacing(word){
  switch(word){
    case "M":
    case "W":
    case "X":
    case "Z":
    case "N":
    case "V":
    case "Y":
    case "Q":
      return 5;
      break;
    case "K":
    case "G":
    case "O":
    case "D":
      return 4;
      break;
    case "I":
      return 2;
      break;
    default:
      return 3;
  }
}
// Function to generate positions based on the word input
function getLetterPositions(word) {
    let positions = [];
    let startX = 500;
    let startY = 100;
    let currentX = startX;

    const letterShapes = {
    "A": [
        [0, 1], [0, 2], [0, 3], 
        [1, 0], [1, 2], 
        [2, 1], [2, 2], [2, 3],
        [0,4], [2, 4]
    ],
    "B": [
        [0, 0], [0, 1], [0, 2], [0, 3], [0, 4],
        [1, 0], [1, 2], [1,4],
        [2, 1], [2, 2], [2, 3]
    ],
    "C": [
        [0, 1], [0, 2], 
        [1, 0], [0, 3],[1, 4],
        [2, 0], [2, 4]
    ],
    "D": [
        [0, 0], [0, 1], [0, 2], [0, 3],
        [1, 0], [1, 4], [3, 3],
        [3, 1], [3, 2], [0,4], [2,0], [2,4]
    ],
    "E": [
        [0, 0], [0, 1], [0, 2], [0, 3],
        [1, 0], [1, 2], [2, 2],
        [2, 0], [0,4], [1, 4], [2, 4]
    ],
    "F": [
        [0, 0], [0, 1], [0, 2], [0, 3], [0,4],
        [1, 0], [1, 2], [2,2],
        [2, 0]
    ],
    "G": [
        [0, 0], [0, 1], [0, 2], [0, 3], [0, 4],
        [1, 0], [2, 4], [1, 4],
        [2, 0], [2, 2], [3, 2], [3, 3]
    ],
    "H": [
        [0, 0], [0, 1], [0, 2], [0, 3],[0, 4],
        [1, 2],
        [2, 0], [2, 1], [2, 2], [2, 3], [2, 4]
    ],
    "I": [
        [1, 0], [1, 1], [1, 2], [1, 3], [1, 4]
    ],
    "J": [
        [1, 0], [1, 1], [1, 2], [1, 3], [1, 4],
        [0, 4]
    ],
    "K": [
        [0, 0], [0, 1], [0, 2], [0, 3], [0, 4],
        [1, 2], [2, 3], [3, 4],[2, 1], [3, 0]
    ],
    "L": [
        [0, 0], [0, 1], [0, 2], [0, 3], [0, 4],
        [1, 4], [2, 4]
    ],
    "M": [
        [0, 0], [0, 1], [0, 2], [0, 3], [0, 4], 
        [1, 1], [2, 2], [3, 1], [4,0],
        [4, 1], [4, 2], [4, 3], [4, 4]
    ],
    "N": [
        [0, 0], [0, 1], [0, 2], [0, 3], [0, 4], 
        [1, 1], [2, 2], [3, 3] ,        
        [4, 0], [4, 1], [4, 2], [4, 3], [4, 4]
    ],
    "O": [
        [0, 1], [0, 2], [0, 3], 
        [1, 0], [2, 0], [1, 4], [2,4],
        [3, 1], [3, 2], [3, 3]
    ],
    "P": [
        [0, 0], [0, 1], [0, 2], [0, 3], [0, 4],
        [1, 0], [1, 2],
        [2, 1]
    ],
    "Q": [
        [0, 1], [0, 2], [0, 3], 
        [1, 0], [2, 0], [1, 4],[2,2], [2,4],[4,4],
        [3, 1], [3, 2], [3, 3]
    ],
    "R": [
        [0, 0], [0, 1], [0, 2], [0, 3], [0, 4],
        [1, 0], [1, 2],
        [2, 1], [2, 3], [2,4]
    ],
    "S": [
        [0, 0], [0, 1], [0, 2],[2, 0],
        [1, 0], [1, 2], [2, 2],
        [2, 3], [2, 4], [1, 4], [0,4]
    ],
    "T": [
        [0, 0], [1, 0], [2, 0], 
        [1, 1], [1, 2], [1, 3], [1, 4]
    ],
    "U": [
        [0, 0], [0, 1], [0, 2], [0, 3],
        [1, 4], [0,4], [2,4],
        [2, 0], [2, 1], [2, 2], [2, 3]
    ],
    "V": [
        [0, 0], [0, 1], [0, 2],
        [1, 3],[2, 4],[3, 3],
        [4, 2], [4, 1], [4, 0]
    ],
    "W": [
         [0, 0], [0, 1], [0, 2], [0, 3], [0, 4], 
    [1, 3], [2, 2], [3, 3], 
    [4, 0], [4, 1], [4, 2], [4, 3], [4, 4]
    ],
    "X": [
        [0, 0], [0, 4],
        [1, 1], [1, 3],
        [3, 1], [2, 2],
        [4, 0], [3, 3], [4, 4]
    ],
    "Y": [
        [0, 0], [2, 4],
        [1, 1], [2, 3],
        [3, 1], [2, 2],
        [4, 0]
    ],
    "Z": [
          [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], 
      [1, 3],
      [2, 2],
      [3, 1],        
      [0, 4], [1, 4], [2, 4], [3, 4], [4, 4]
      ],
    "0": [
        [0, 0], [0, 1], [0, 2], [0, 3],
        [1, 0], [1, 3],
        [2, 0], [2, 1], [2, 2], [2, 3]
    ],
    "1": [
        [1, 0], [1, 1], [1, 2], [1, 3]
    ],
    "2": [
        [0, 0], [0, 3],
        [1, 0], [1, 2],
        [2, 1], [2, 3]
    ],
    "3": [
        [0, 0], [0, 3],
        [1, 3],
        [2, 0], [2, 1], [2, 2], [2, 3]
    ],
    "4": [
        [0, 0], [0, 2],
        [1, 1],
        [2, 0], [2, 1], [2, 2], [2, 3]
    ],
    "5": [
        [0, 0], [0, 1], [0, 2],
        [1, 0], [1, 2],
        [2, 0], [2, 2], [2, 3]
    ],
    "6": [
        [0, 0], [0, 1], [0, 2], [0, 3],
        [1, 0], [1, 2], [1, 3],
        [2, 0], [2, 2], [2, 3]
    ],
    "7": [
        [0, 0], [0, 3],
        [1, 1], [1, 2],
        [2, 2], [2, 3]
    ],
    "8": [
        [0, 0], [0, 1], [0, 2], [0, 3],
        [1, 1], [1, 3],
        [2, 0], [2, 1], [2, 2], [2, 3]
    ],
    "9": [
        [0, 0], [0, 1], [0, 2], [0, 3],
        [1, 0], [1, 1], [1, 3],
        [2, 0], [2, 3]
    ]
};


    for (let letter of word.toUpperCase()) {
        let letterShape = letterShapes[letter];
        if (letterShape) {
            for (let [x, y] of letterShape) {
                positions.push({ x: currentX + x * spacing, y: startY + y * spacing });
            }
            currentX += getLetterSpacing(letter) * spacing;  // Adjust for the next letter
        }
        currentX += wordSpacing;  // Add spacing between letters
    }

    return positions;
}

var letterPositions = getLetterPositions("Soneium Domains");



function drawLight() {
    ctx.beginPath();
    ctx.arc(light.x, light.y, 1000, 0, 2 * Math.PI);
    var gradient = ctx.createRadialGradient(light.x, light.y, 0, light.x, light.y, 1000);
    gradient.addColorStop(0, "#6343bb");
    gradient.addColorStop(1, "#31225e");
    ctx.fillStyle = gradient;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(light.x, light.y, 20, 0, 2 * Math.PI);
    gradient = ctx.createRadialGradient(light.x, light.y, 0, light.x, light.y, 5);
    gradient.addColorStop(0, "#fff");
    gradient.addColorStop(1, "#6343bb");
    ctx.fillStyle = gradient;
    ctx.fill();
}

function Box(x, y) {
    this.half_size = boxSize;
    this.x = x;
    this.y = y;
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.shadow_length = 2000;

    this.getDots = function() {
        var p1 = { x: this.x - this.half_size, y: this.y - this.half_size };
        var p2 = { x: this.x + this.half_size, y: this.y - this.half_size };
        var p3 = { x: this.x + this.half_size, y: this.y + this.half_size };
        var p4 = { x: this.x - this.half_size, y: this.y + this.half_size };
        return { p1: p1, p2: p2, p3: p3, p4: p4 };
    };

    this.drawShadow = function() {
        var dots = this.getDots();
        var points = [];

        for (var dot in dots) {
            var angle = Math.atan2(light.y - dots[dot].y, light.x - dots[dot].x);
            var endX = dots[dot].x + this.shadow_length * Math.sin(-angle - Math.PI / 2);
            var endY = dots[dot].y + this.shadow_length * Math.cos(-angle - Math.PI / 2);
            points.push({
                endX: endX,
                endY: endY,
                startX: dots[dot].x,
                startY: dots[dot].y
            });
        }

        for (var i = points.length - 1; i >= 0; i--) {
            var n = i == 3 ? 0 : i + 1;
            ctx.beginPath();
            ctx.moveTo(points[i].startX, points[i].startY);
            ctx.lineTo(points[n].startX, points[n].startY);
            ctx.lineTo(points[n].endX, points[n].endY);
            ctx.lineTo(points[i].endX, points[i].endY);
            ctx.fillStyle = "#282354";
            ctx.fill();
        }
    };
  this.draw = function() {
        var dots = this.getDots();
        ctx.beginPath();
        ctx.moveTo(dots.p1.x, dots.p1.y);
        ctx.lineTo(dots.p2.x, dots.p2.y);
        ctx.lineTo(dots.p3.x, dots.p3.y);
        ctx.lineTo(dots.p4.x, dots.p4.y);
        ctx.fillStyle = this.color;
        ctx.fill();
    };
}

var boxes = [];

function draw() {
    ctx.clearRect(0, 0, c.width, c.height);
    drawLight();

    for (var i = 0; i < boxes.length; i++) {
        boxes[i].drawShadow();
    }

    for (var i = 0; i < boxes.length; i++) {
        boxes[i].draw();
    }
    requestAnimationFrame(draw);
}

resize();
draw();

// Create boxes according to the predefined positions
for (var i = 0; i < letterPositions.length; i++) {
    boxes.push(new Box(letterPositions[i].x, letterPositions[i].y));
}

window.onresize = resize;
c.onmousemove = function(e) {
    light.x = e.offsetX === undefined ? e.layerX : e.offsetX;
    light.y = e.offsetY === undefined ? e.layerY : e.offsetY;
};


// html{
//     height: 100%;
//   }
//   body{
//           margin: 0;
//           padding: 0;
//           height: 100%;
//           overflow: hidden;
//           cursor: none;
//   }
//   #canvas{
//           background-color: #31225e;
//           width: 100%;
//           height: 100%;		
//   }