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

### Métodos de ruta

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

### Vías de acceso de ruta

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

### Manejadores de rutas

Puede proporcionar varias funciones de devolución de llamada que se comportan como `middleware` para manejar una solicitud. La única excepción es que estas devoluciones de llamada pueden invocar `next('route')` para omitir el resto de las devoluciones de llamada de ruta. Puede utilizar este mecanismo para imponer condiciones previas en una ruta y, a continuación, pasar el control a las rutas posteriores si no hay motivo para continuar con la ruta actual.

A continuación se muestra como una matriz de funciones de devolución de llamada puede manejar una ruta:

```javascript
var cb0 = function (req, res, next) {
  console.log('CB0');
  next();
}

var cb1 = function (req, res, next) {
  console.log('CB1');
  next();
}

var cb2 = function (req, res) {
  res.send('Hello from C!');
}

app.get('/example/c', [cb0, cb1, cb2]);
```

### Métodos de respuesta

Los métodos en el objeto de respuesta (res) de la tabla siguiente pueden enviar una respuesta al cliente y terminar el ciclo de solicitud/respuestas. Si ninguno de estos métodos se invoca desde un manejador de rutas, la solicitud de cliente se dejará colgada.

| Método         | Descripción                          |
|----------------|--------------------------------------|
|res.download()  | Solicita un archivo para descargarlo.|
|res.end()       | Finaliza el proceso de respuesta.    |
|res.json()      | Envía una respuesta JSON.            |
|res.jsonp()     | Envía una respuesta JSON con soporte JSONP.|
|res.redirect()  | Redirecciona una solicitud.|
|res.render()    | Representa una plantilla de vista.|
|res.send()      | Envía una respuesta de varios tipos.|
|res.sendFile    | Envía un archivo como una secuencia de octetos.|
|res.sendStatus()|Establece el código de estado de la respuesta y envía su representación de serie como el cuerpo de respuesta.|


## Utilización del middleware

Express es una infraestructura web de direccionamiento y middleware que tiene una funcionalidad mínima propia: una aplicación Express es fundamentalmente una serie de llamadas a funciones de middleware.

Las funciones de middleware son funciones que tienen acceso al objeto de solicitud (req), al objeto de respuesta (res) y a la siguiente función de middleware en el ciclo de solicitud/respuestas de la aplicación. La siguiente función de middleware se denota normalmente con una variable denominada `next`.

Las funciones de middleware pueden realizar las siguientes tareas:

* Ejecutar cualquier código.
* Realizar cambios en la solicitud y los objetos de  respuesta.
* Finalizar el ciclo de solicitud/respuestas.
* Invocar la siguiente función de middleware en la pila.

Si la función de middleware actual no finaliza el ciclo de solicitud/respuestas, debe invocar `next()` para pasar el control a la siguiente función de middleware. De lo contrario, la solicitud quedará colgada.

### Middleware de nivel de aplicación

Es posible enlazar el middleware de nivel de aplicación a una instancia del objeto de aplicación utilizando las funciones `app.use()` y `app.METHOD()`, donde METHOD es el método HTTP de la solicitud que maneja el middleware (GET, POST, PUT ... etc.).

El siguiente ejemplo muestra una función de middleware que se ejecuta cada vez que la aplicación recibe una solicitud:

```javascript
var app = express();

app.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});
```

El siguiente ejemplo muestra una función middleware en la ruta '/user/:id'. La función middleware se ejecuta para cualquier tipo de solicitud HTTP en dicha ruta.
```javascript
app.use('/user/:id', function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});
```

Este ejemplo muestra una ruta y su función de manejador (sistema de middleware). La función maneja las solicitudes GET a la vía de acceso /user/:id.

```javascript
app.get('/user/:id', function (req, res, next) {
  res.send('USER');
});
```

En este ejemplo, se muestra la carga de una serie de funciones de middleware en un punto de montaje. Ilustra una subpila de middleware que imprime información de solicitud para cualquier tipo de solicitud HTTP en la vía de acceso /user/:id.

```javascript
app.use('/user/:id', function(req, res, next) {
  console.log('Request URL:', req.originalUrl);
  next();
}, function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});
```

### Middleware de terceros

Utilice el middleware de terceros para añadir funcionalidad a las aplicaciones Express.

Instale el módulo Node.js para la funcionalidad necesaria y cárguelo en la aplicación a nivel de aplicación o a nivel de direccionador.

El siguiente ejemplo ilustra la instalación y carga de la función de middleware de análisis de cookies cookie-parser.

```
$ npm install cookie-parser
```

```javascript
var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');

// load the cookie-parsing middleware
app.use(cookieParser());
```

Para ver una lista parcial de las funciones de middleware de terceros que más se utilizan con Express, consulte: [Middleware de terceros](http://expressjs.com/es/resources/middleware.html).

## Router

Un `router` es una instancia aislada de middleware y rutas. Se puede pensar en ella como una "mini-aplicación", capaz sólo de realizar middleware y funciones de enrutamiento. Cada aplicación Express tiene un enrutador de aplicaciones incorporado.

Un enrutador se comporta como el propio middleware, por lo que puede utilizarlo como argumento para `app.use()` o como argumento para el método `use()` de otro enrutador.

El objeto `express` de nivel superior tiene un método `Router()` que crea un nuevo objeto router.

Una vez que haya creado un objeto router, puede agregar rutas intermedias y de método HTTP (como `get`, `put`, `post`, etc.) como una aplicación. Por ejemplo:

```javascript
// invoked for any requests passed to this router
router.use(function(req, res, next) {
  // .. some logic here .. like any other middleware
  next();
});

// will handle any request that ends in /events
// depends on where the router is "use()'d"
router.get('/events', function(req, res, next) {
  // ..
});
```

### Métodos

>router.all(path, [callback, ...] callback)

Este método es igual que los métodos `router.METHOD()`, excepto que coincide con todos los métodos HTTP.

>router.METHOD(path, [callback, ...] callback)

Los métodos `router.METHOD()` proporcionan la funcionalidad de enrutamiento en Express, donde METHOD es uno de los métodos HTTP, como GET, PUT, POST y así sucesivamente, en minúsculas. Por lo tanto, los métodos actuales son `router.get()`, `router.post()`, `router.put()`, y así sucesivamente.

>router.route(path)

Devuelve una instancia de una sola ruta que puede utilizar para manejar verbos HTTP con middleware opcional. Utilice `router.route()` para evitar la asignación de rutas duplicadas y, por lo tanto, errores de escritura.

>router.use([path], [function, ...] function)

Utiliza la función o funciones de middleware especificadas, con la ruta de acceso de montaje opcional, cuyo valor predeterminado es "/".
