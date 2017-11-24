<<<<<<< HEAD
# Awesome game

Awesome game by
[gituser](https://github.com/gituser).

Initial scaffolding generated with [generator-gamejam](https://github.com/belen-albeza/generator-gamejam/).

## Installation

### Requirements

This games uses [gulp](http://gulpjs.com/) for building and tasks automation.

You can install gulp with npm:

```
npm install -g gulp
```

### Build

Clone this repository and install dependencies:

```
git clone gituser/awesome-game
cd awesome-game
npm install
```

To **build** the game, run the `dist` task from the project root:

```
gulp dist
```

The `dist` folder will contain a build of the game. You can then start a local server that serves this directory statically to play the game in local:

```
npm install -g http-server
http-server dist
```

You can **clean up** the temporary files and the `dist` folder by running:

```
gulp clean
```

## Development

This project uses [Browserify](http://browserify.org) to handle JavaScript modules.

There is a task that will automatically run Browserify when a JavaScript file changes, and it will also reload the browser.

```
gulp run
```





You can deploy to **Github Pages** with the `deploy:ghpages` task, which will build the project and then push the `dist` folder in the `gh-pages` branch.

```
gulp deploy:ghpages
```

=======
# NullReference : Super Pang

  Basado en el juego de 1990 de arcade, Super Pang.
  Solo vamos a implementar el modo tour (por niveles) y para 1 o 2 jugadores.

## Controles:

  **Jugador 1:**
  
  *Movimiento 4 direcciones con WASD.  
  *Disparo con barra espaciadora.
  
  
  **Jugador 2:**
  
  *Movimiento 4 direcciones con flechas.  
  *Disparo con shift derecho.
  
## Elementos eliminados

  El juego es un clon de Super Pang, pero no incluirá:
  *El powerup de metralleta.  
  *El enemigo pájaro volador.  
  
## Modificaciones:

  **Niveles extra** 
    
    *Niveles por tiempo en los que el jugador puede conseguir puntos destruyendo burbujas hasta que se acabe el tiempo  
    aunque no puedes morir por golpes.
    
    
   **Nuevos powerups**
    
    *Gancho del Poder 2: comportamiento similar al gancho del poder, pero no se destruye al primer toque,  
    si no que solo se destruye cuando pasa el tiempo definido enganchado.
    *Escudo de invulnerabilidad por tiempo: escudo que te hace invulnerable durante el tiempo que está activo.
    
>>>>>>> 94eb1cb5c60edc620cdfc55eb0e44a433b9e039d
