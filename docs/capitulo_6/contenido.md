# Express

## Instalación

Suponiendo que ya ha instalado Node.js, cree un directorio para que contenga la aplicación y conviértalo en el directorio de trabajo.

```
$ mkdir myapp
$ cd myapp
```

Utilice el comando npm init para crear un archivo package.json para la aplicación.

```
$ npm init
```

Este comando solicita varios elementos como, por ejemplo, el nombre y la versión de la aplicación. Por ahora, sólo tiene que pulsar INTRO para aceptar los valores predeterminados para la mayoría de ellos, con la siguiente excepción:

```
entry point: (index.js)
```

Especifique app.js o el nombre que desee para el archivo principal. Si desea que sea index.js, pulse INTRO para aceptar el nombre de archivo predeterminado recomendado.

A continuación, instale Express en el directorio app y guárdelo en la lista de dependencias. Por ejemplo:

```
$ npm install express --save
```

Para instalar Express temporalmente y no añadirlo a la lista de dependencias, omita la opción --save:

```
$ npm install express
```

## Direccionamiento básico

El **direccionamiento** hace referencia a la determinación de cómo responde una aplicación a una solicitud de cliente en un determinado punto final, que es un URI (o una vía de acceso) y un método de solicitud HTTP específico (GET, POST, etc.).

Cada ruta puede tener una o varias funciones de manejador, que se excluyen cuando se correlaciona la ruta.

La definición de ruta tiene la siguiente estructura:

```
app.METHOD(PATH, HANDLER)
```

Donde:

* `app` es una instancia de express.
* `METHOD` es un método de solicitud HTTP.
* `PATH` es una vía de acceso en el servidor.
* `HANDLER` es la función que se ejecuta cuando se   correlaciona la ruta.

El siguiente [ejemplo](https://github.com/ULL-ESIT-DSI-1617/estudiar-las-rutas-en-expressjs-alejandro-carlos-samuel-35l2/blob/master/src/example_1.js) ilustra la definición de direccionamiento básico.

## Métodos de ruta

Un método de ruta se deriva de uno de los métodos de HTTP y se adjunta a una instancia de la clase **express**.

En la porción de código que se encuentra abajo es un ejemplo de rutas definidas para GET y POST en la raíz de la aplicación:

```javascript
//Ejemplo de GET
app.get('/', function (req, res) {
  res.send('GET request to the homepage');
});

//Ejemplo de POST
app.post('/', function (req, res) {
  res.send('POST request to the homepage');
});

```
Express proporciona soporte para más metodos HTTP, los dos de arriba son representativos ya que son unos de los más utilizados. Sin embargo, también existen `put`, `head`, `delete`, `options`, `trace`, `copy`, `lock`, `mkcol`, `move`, `purge`, `propfind`, `proppatch`, `unlock`, `report`, `mkactivity`, `checkout`, `merge`, `m-search`, `notify`,  `subscribe`, `unsubscribe`, `patch`, `search` y `connect`.

También existe un método de direccionamiento especial
`app.all()`
que no corresponde con ningún método HTTP pero que se utiliza para cargar funciones de middleware en una ruta determinada para todos los métodos de solicitud.

Un ejemplo de lo mencionado anteriormente:

```javascript
app.all('/secret', function (req, res, next) {
  console.log('Accessing the secret section ...');
  next(); // Se pasa el control al siguiente middleware
});
```

En el ejemplo de arriba, el manejador de ruta se ejecutará para las peticiones a "/secret" independientemente del método HTTP que se utilice (GET, POST, PUT, DELETE ... etc.).

## Vías de acceso de ruta

Las vías de acceso de ruta, en combinación con un método de solicitud, definen los punto finales en los que pueden realizarse las solicitudes. Las vías de acceso de ruta pueden ser series, patrones de serie o expresiones regulares.

Estos son algunos ejemplos de vías de acceso de rutas basadas en series.

Esta vía de acceso de ruta coincidirá con las solicitudes a `/docs`.

```javascript
app.get('/docs', function (req, res) {
  res.send('docs');
});
```

Estos son algunos ejemplos de vías de acceso de ruta basadas en patrones de serie.

Esta vía de acceso de ruta coincidirá con `acd` y `abcd`.

```javascript
app.get('/ab?cd', function(req, res) {
  res.send('ab?cd');
});
```

>Los caracteres ?, +, * y () son subconjuntos de sus contrapartidas de expresiones regulares. El guión (-) y el punto (.) se interpretan literalmente en las vías de acceso basadas en series.

Ejemplos de vías de acceso de ruta basadas en expresiones regulares:

Esta vía de acceso de ruta coincidirá con cualquier valor con una “a” en el nombre de la ruta.

```javascript
app.get(/a/, function(req, res) {
  res.send('/a/');
});
```
