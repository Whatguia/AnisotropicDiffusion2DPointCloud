# AnisotropicDiffusion2DPointCloud
Approximate points of a point cloud in a smart way

## Anisotropic Diffusion
Let  

![alt text](https://github.com/MorcilloSanz/AnisotropicDiffusion2DPointCloud/blob/main/img/omega.png)  

denote a subset of the plane and  

![alt text](https://github.com/MorcilloSanz/AnisotropicDiffusion2DPointCloud/blob/main/img/function.png)  

be the diffusion function. Then anisotropic diffusion is defined as:

![alt text](https://github.com/MorcilloSanz/AnisotropicDiffusion2DPointCloud/blob/main/img/definition.png)

![alt text](https://github.com/MorcilloSanz/AnisotropicDiffusion2DPointCloud/blob/main/img/c.png)

Where **Δ** denotes the Laplacian, **∇** denotes the gradient, **∇ •** is the divergence and **c(x,y,t)** is the diffusion coefficient which controls the rate of diffusion.

## Approximation using Gradient Descent

As gradient is a vector defined as:

![alt text](https://github.com/MorcilloSanz/AnisotropicDiffusion2DPointCloud/blob/main/img/gradient.png)

Let *v(x,y)* be a point of the point cloud.

![alt text](https://github.com/MorcilloSanz/AnisotropicDiffusion2DPointCloud/blob/main/img/gradientDescent.png)

Being **ɣ** the step-size.

The gradient vector is always pointing at a maximum. So moving *v* in that direction should aproximate *v* to a maximum, moving in the opposite direction aproximates to a minimum.

## Algorithm
* Each point radiates temperature. All the points radiates the same temperature (1).
* Calculate a 2D Grid. The temperature of each square is nothing but the sum of the temperatures radiated by the points inside of it (As the temperature of a point is 1 by default, the temperature of the square is the amount of points in the square).
* Apply Anisotropic Diffusion equation to the Grid in order to smooth.
* Apply Gradient Descent (opposite) in order to approximate the points to those regions which have more amount of points.
> Keep in mind that we want to approximate the point to regions that contain more amount of points, which are maximums. So instead of moving in the opposite gradient direction, we'll move in the gradient direction. (The opposite of Gradient Descent)

## Demo

Random generated point cloud

![alt text](https://github.com/MorcilloSanz/AnisotropicDiffusion2DPointCloud/blob/main/img/pointcloud.png)

Grid and temperatures

![alt text](https://github.com/MorcilloSanz/AnisotropicDiffusion2DPointCloud/blob/main/img/temperatureGrid.png)

Temperature Anisotropic Diffusion

![alt text](https://github.com/MorcilloSanz/AnisotropicDiffusion2DPointCloud/blob/main/img/diffusionGrid.png)

Approximated points (smooth)

![alt text](https://github.com/MorcilloSanz/AnisotropicDiffusion2DPointCloud/blob/main/img/approximated.png)