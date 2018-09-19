# threejs-hex-map

[![Build Status](https://travis-ci.org/Bunkerbewohner/threejs-hex-map.svg?branch=master)](https://travis-ci.org/Bunkerbewohner/threejs-hex-map)

A simple 3D hexagonal terrain map based on three.js.

![Screenshot](examples/basicMap/screenshot.jpg)

## MARS trials
* Usar el ejemplo basicMap
* Hay que compilar primero para actualizar los cambios y luego arrancar el servidor
* Nuevos controles wasd para mover la vista y o para crear un objeto.


## Overview

* hexagonal tiles  flat land, hills, mountains,and rocks
* one texture atlas each for terrain textures
* blending mask texture for transitions between tiles
* two-tier fog of war like in Civilization

## Usage

For an example check out the code in `examples/random`. To test it in the browser
simply `npm start` and open `http://localhost:3000/examples/random/`.
