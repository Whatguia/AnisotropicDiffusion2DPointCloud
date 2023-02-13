# AnisotropicDiffusion2DPointCloud :boom:
Approximate points of a point cloud in a smart way using Anisotropic Diffusion and Gradient Ascent.

The points tend to move to most populated regions of the point cloud, smothing it

> **Warning**: Isolated points aren't removed

## Anisotropic Diffusion

The diffusion equation is a parabolic partial differential equation. In physics, it describes the macroscopic behavior of many micro-particles in Brownian motion, resulting from the random movements and collisions of the particles (see Fick's laws of diffusion)

Let  

![alt text](https://github.com/MorcilloSanz/AnisotropicDiffusion2DPointCloud/blob/main/img/omega.png)  

denote a subset of the plane and  

![alt text](https://github.com/MorcilloSanz/AnisotropicDiffusion2DPointCloud/blob/main/img/function.png)  

be the diffusion function. Then anisotropic diffusion is defined as:

![alt text](https://github.com/MorcilloSanz/AnisotropicDiffusion2DPointCloud/blob/main/img/definition.png)

![alt text](https://github.com/MorcilloSanz/AnisotropicDiffusion2DPointCloud/blob/main/img/c.png)

Where Δ denotes the **Laplacian**, ∇ denotes the **gradient**, ∇ • is the **divergence** and c(x,y,t) is the **diffusion coefficient** which controls the rate of diffusion.

## Approximation using Gradient Ascent

In mathematics gradient descent (also often called steepest descent) is a first-order iterative optimization algorithm for finding a local minimum of a differentiable function. The idea is to take repeated steps in the opposite direction of the gradient (or approximate gradient) of the function at the current point, because this is the direction of steepest descent. Conversely, stepping in the direction of the gradient will lead to a local maximum of that function; the procedure is then known as gradient ascent

As gradient is a vector defined as:

![alt text](https://github.com/MorcilloSanz/AnisotropicDiffusion2DPointCloud/blob/main/img/gradient.png)

Let *v(x,y)* be a point of the point cloud. So the gradient ascent is given by the following expresion:

![alt text](https://github.com/MorcilloSanz/AnisotropicDiffusion2DPointCloud/blob/main/img/gradientAscent.png)

Being **ɣ** the step-size.

## Algorithm
* Each point radiates temperature. All the points radiates the same temperature (1).
* Calculate a 2D Grid. The temperature of each square is nothing but the sum of the temperatures radiated by the points inside of it (As the temperature of a point is 1 by default, the temperature of the square is the amount of points in the square).
* Apply Anisotropic Diffusion equation to the Grid in order to smooth.
* Apply Gradient Ascent  in order to approximate the points to those regions which have more amount of points.

## Demo

Random generated point cloud

![alt text](https://github.com/MorcilloSanz/AnisotropicDiffusion2DPointCloud/blob/main/img/pointcloud.png)

Grid and temperatures

![alt text](https://github.com/MorcilloSanz/AnisotropicDiffusion2DPointCloud/blob/main/img/temperatureGrid.png)

Temperature Anisotropic Diffusion

![alt text](https://github.com/MorcilloSanz/AnisotropicDiffusion2DPointCloud/blob/main/img/diffusionGrid.png)

Approximated points (smooth)

![alt text](https://github.com/MorcilloSanz/AnisotropicDiffusion2DPointCloud/blob/main/img/approximated.png)
