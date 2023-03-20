# AnisotropicDiffusion2DPointCloud :boom:
Approximate points of a point cloud in a smart way using Anisotropic Diffusion and Gradient Ascent.

The points tend to move to most populated regions of the point cloud, smothing it

> **Warning**: Isolated points aren't removed

## Anisotropic Diffusion

The diffusion equation is a parabolic partial differential equation. In physics, it describes the macroscopic behavior of many micro-particles in Brownian motion, resulting from the random movements and collisions of the particles (see Fick's laws of diffusion)

Let $\Omega \subset \mathbb{R}^{2}$ denote a subset of the plane and  $\phi(\cdot, t) : \Omega \rightarrow \mathbb{R}$ be the diffusion function. Then anisotropic diffusion is defined as:

$$\frac{\partial \phi}{\partial t} = \nabla \cdot \left[ c(\left|| \nabla \phi \right||) \nabla \phi \right] = \nabla c \cdot \nabla \phi + c(\left|| \nabla \phi \right||) \Delta \phi$$

The gradient of $\phi$ is defined as

$$\nabla \phi = \left( \frac{\partial \phi}{\partial x}, \frac{\partial \phi}{\partial y} \right)$$

Where $\Delta \phi$ is the Laplacian of the function $\phi$

$$\Delta \phi = \sum_{i=1}^{n}\frac{\partial^{2} \phi}{\partial x^{2}_{i}} = \frac{\partial^{2}\phi}{\partial x^{2}} + \frac{\partial^{2}\phi}{\partial y^{2}}$$

And the diffusion coefficient is given by

$$c(x) = e^{-\left( \frac{x}{k} \right)^{2}}$$

Where $\Delta$ denotes the Laplacian, $\nabla$ denotes the gradient, $\nabla \cdot$ is the divergence and $c(x)$ is the diffusion coefficient which controls the rate of diffusion

## Approximation using Gradient Ascent

In mathematics gradient descent (also often called steepest descent) is a first-order iterative optimization algorithm for finding a local minimum of a differentiable function. The idea is to take repeated steps in the opposite direction of the gradient (or approximate gradient) of the function at the current point, because this is the direction of steepest descent. Conversely, stepping in the direction of the gradient will lead to a local maximum of that function; the procedure is then known as gradient ascent

Let $v(x,y)$ be a point of the point cloud. So the gradient ascent is given by the following expresion:

$$v_{n+1} = v_{n} + \gamma \nabla \phi \left( v_{n} \right)$$

Being $\gamma$ the step-size.

## Algorithm
* Calculate a 2D Grid.

![alt text](https://github.com/MorcilloSanz/AnisotropicDiffusion2DPointCloud/blob/main/img/pointcloud.png)

* Each point radiates temperature. All the points radiates the same temperature (1). The temperature of each square is nothing but the sum of the temperatures radiated by the points inside of it (As the temperature of a point is 1 by default, the temperature of the square is the amount of points in the square).

![alt text](https://github.com/MorcilloSanz/AnisotropicDiffusion2DPointCloud/blob/main/img/temperatureGrid.png)

* Apply Anisotropic Diffusion equation to the Grid in order to smooth.

![alt text](https://github.com/MorcilloSanz/AnisotropicDiffusion2DPointCloud/blob/main/img/diffusionGrid.png)

* Apply Gradient Ascent  in order to approximate the points to those regions which have more amount of points

![alt text](https://github.com/MorcilloSanz/AnisotropicDiffusion2DPointCloud/blob/main/img/approximated.png)
