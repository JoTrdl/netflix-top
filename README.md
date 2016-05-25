# Netflix Top - [DEMO](https://netflix-top.herokuapp.com/) 


A basic isomorphic app, featuring:

 * [Riot](http://riotjs.com/)
 * [Redux](http://redux.js.org/)
 * [Hapi](http://hapijs.com/) 
 * [Webpack](https://webpack.github.io/docs/)/[ES6](https://babeljs.io/) 

With extra setup (inputs sanitizaton, lab testing, ...)

The final javascript size is around **18Kb** (min+gz) containing mainly riot + redux + isomorphic-fetch + colorchart + app code.


### Installation

After cloning the repo:

```bash
>npm run dev
```
Which will run concurently the 2 scripts:

```bash
>npm run dev-www
```
```bash
>npm run dev-server
```
The first one starts the Webpack Dev Server and the other starts a nodemon process for the server.

To build the production code, run:
```bash
>npm run build-www
```

And then, to run the server in prod mode:

```bash
>npm run start
```
