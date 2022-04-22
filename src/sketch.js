/*
Smooth a point cloud approximating the points in a smart way.
Anisotropic Diffusion for smoothing 
Gradient Ascent for approximating

In order to remove noise, remove the points that are isolated.

https://en.wikipedia.org/wiki/Anisotropic_diffusion
https://en.wikipedia.org/wiki/Gradient_descent

Usage:
  1- First, press A for smooth grid
  2- Then, press X for approximating points

Dev: MorcilloSanz
Email: amorcillosanz@gmail.com
GitHub: https://github.com/MorcilloSanz
*/

// Point cloud
function Point(x, y) {
  this.x = x;
  this.y = y;
}

function generatePointCloud(n) {
  points = [];
  for(let i = 0; i < n; i ++) {
    let x = Math.random() * width;
    let y = Math.random() * height;
    points.push(new Point(x, y));
  }
  return points;
}

function drawPointCloud(pointCloud) {
  fill(255, 255, 150);
  stroke(255, 255, 150);
  for(let i = 0; i < pointCloud.length; i ++) {
    let currentPoint = pointCloud[i];
    ellipse(currentPoint.x - 1, currentPoint.y - 1, 2, 2);
  }
}

// Diffusion
function Square(x, y, squareSize, pointIndices) {
  this.x = x;
  this.y = y;
  this.squareSize = squareSize;
  this.temperature = pointIndices.length;
  this.pointIndices = pointIndices;
  
  this.draw = function() {
    const lambda = 1;
    fill(lambda * 255, lambda * (255 - 255 / (this.temperature + 1)), 0);
    rect(this.x, this.y, this.squareSize, this.squareSize);
  }
}

function Grid(squareSize, pointCloud) {
  this.squareSize = squareSize;
  this.pointCloud = pointCloud;
  this.squares = [];
  
  for(let j = 0; j < height / this.squareSize; j ++) {
    for(let i = 0; i < width / this.squareSize; i ++) {
      let x = 0 + (i * this.squareSize);
      let y = 0 + (j * this.squareSize);
      let pointIndices = [];
      
      for(let k = 0; k < pointCloud.length; k ++) {
        let currentPoint = pointCloud[k];
        if(currentPoint.x >= x && currentPoint.x <= x + this.squareSize &&
          currentPoint.y >= y && currentPoint.y <= y + this.squareSize) {
          pointIndices.push(k);
        }
      }
      
      let square = new Square(x, y, this.squareSize, pointIndices);
      this.squares.push(square);
    }
  }
  
  this.draw = function() {
    stroke(0);
    for(let i = 0; i < this.squares.length; i ++)
      this.squares[i].draw();
  }
}

function anisotropicDiffusion(grid, lambda, k, iterations) {
  if(iterations <= 0)
    return;

  let w = width / grid.squareSize;
  let h = height / grid.squareSize;
  
  for(let i = 0; i < w; i ++) {
    for(let j = 0; j < h; j ++) {
      let currentSquare = grid.squares[i + j * w];
      
      let NI = 0, SI = 0, EI = 0, WI = 0;
      let ignoreN = false, ignoreS = false, ignoreE = false, ignoreW = false;
      
      if(i == 0)            ignoreW = true;
      else if(i >= w - 1)   ignoreE = true;
      if(j == 0)            ignoreN = true;
      else if(j >= h - 1)   ignoreS = true;

      if(!ignoreN) NI = grid.squares[i + (j - 1) * w].temperature - currentSquare.temperature;
      if(!ignoreS) SI = grid.squares[i + (j + 1) * w].temperature - currentSquare.temperature;
      if(!ignoreE) EI = grid.squares[(i + 1) + j * w].temperature - currentSquare.temperature;
      if(!ignoreW) WI = grid.squares[(i - 1) + j * w].temperature - currentSquare.temperature;
      
      let cN = exp( -pow(abs(NI) / k, 2) );
      let cS = exp( -pow(abs(SI) / k, 2) );
      let cE = exp( -pow(abs(EI) / k, 2) );
      let cW = exp( -pow(abs(WI) / k, 2) );
      
      let temperature = currentSquare.temperature + lambda * (cN * NI + cS * SI + cE * EI + cW * WI);
      currentSquare.temperature = temperature;
    }
  }
  
  anisotropicDiffusion(grid, lambda, k, iterations - 1);
}

function approximatePoints(grid, stepSize, iterations) {
  if(iterations <= 0)
    return;

  let w = width / grid.squareSize;
  let h = height / grid.squareSize;

  for(let i = 0; i < w; i ++) {
    for(let j = 0; j < h; j ++) {
      let currentSquare = grid.squares[i + j * w];

      // Finite differences gradient
      let E = 0, W = 0, S = 0, N = 0;
      let ignoreN = false, ignoreS = false, ignoreE = false, ignoreW = false;

      if(i == 0)            ignoreW = true;
      else if(i >= w - 1)   ignoreE = true;
      if(j == 0)            ignoreN = true;
      else if(j >= h - 1)   ignoreS = true;

      let dx = 1, dy = 1;
      if(!ignoreN) N = grid.squares[i + (j - dy) * w].temperature;
      if(!ignoreS) S = grid.squares[i + (j + dy) * w].temperature;
      if(!ignoreE) E = grid.squares[(i + dx) + j * w].temperature;
      if(!ignoreW) W = grid.squares[(i - dx) + j * w].temperature;

      let gradient = [
        (E - W) / (2 * dx), 
        (S - N) / (2 * dy)
      ];

      // Gradient Ascent
      for(let k = 0; k < currentSquare.pointIndices.length; k ++) {

        let currentPoint = grid.pointCloud[currentSquare.pointIndices[k]];
        currentPoint.x += stepSize * gradient[0];
        currentPoint.y += stepSize * gradient[1];

        // If the point is in a new square, update grid
        for(let l = 0; l < grid.squares; l ++) {
          let nextSquare = grid.squares[l];

          if(currentPoint.x >= nextSquare.x && currentPoint.x <= nextSquare.x + grid.squareSize &&
            currentPoint.y >= nextSquare.y && currentPoint.y <= nextSquare.y + grid.squareSize && 
            nextSquare != currentSquare) {

            // Move indices from squares
            nextSquare.pointIndices.push(currentSquare.pointIndices[k]);
            currentSquare.pointIndices.splice(k, 1);
          }
        }

      }
    }
  }
  approximatePoints(grid, stepSize, iterations - 1);
}

// Program
const w = 760;
const h = 760;

const maxPoints = 1200;
let pointCloud = [];
let drawPoints = true;

const squareSize = 20;
let grid = null;
let drawGrid = true;

const lambda = 0.01;
const k = 6;  // More variation when K is in [1, 6]
let iterations = 40;

const stepSize = 1;
const approximationIterations = 5;

function setup() {
  createCanvas(w, h);
  pointCloud = generatePointCloud(maxPoints);
  grid = new Grid(squareSize, pointCloud);
}

function draw() {
  background(100);
  if(grid != null && drawGrid) grid.draw();
  if(drawPoints) drawPointCloud(pointCloud);
  
  stroke(0);
  fill(255);
  text("A apply diffusion\nG toggle grid\nP toggle points\nX approximate points", 10, 20);
}

function keyPressed() {
  if(key == "a") {
    console.log("Applying diffusion");
    anisotropicDiffusion(grid, lambda, k, iterations);
  }     
  else if(key == "g") drawGrid = !drawGrid;
  else if(key == "p") drawPoints = !drawPoints;
  else if(key == "x") {
    console.log("Approximating");
    approximatePoints(grid, stepSize, approximationIterations);
  }
}