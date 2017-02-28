# Express

##Instalación

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

## Vías de acceso de ruta

## Manejadores de rutas

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

## Métodos de respuesta

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
