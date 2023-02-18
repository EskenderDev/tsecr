# TSE Record

Es un proyecto para obtener el registro de una persona utilizando el DNI en la página web del [TSE](https://tse.go.cr/) (Tribunal Supremo de elecciones de Costa Rica).

## Instalación

Para instalar _TSERecord_, primero debes tener instalado [Node.js](https://nodejs.org/es/) en tu sistema. Luego, abre una terminal y escribe el siguiente comando:

### npm

```
npm install tse-record
```

### pnpm

```
pnpm add tse-record
```

## Uso

Para utilizar _TSERecord_, debes importar la función **findRecord** que se encarga de buscar un registro en base a un DNI específico.

```
import {findRecord} from 'tse-record';

const record = await findRecord("123456789");
```

## Licencia

Este proyecto está bajo la licencia MIT. Ver [LICENSE](LICENSE) para más detalles.
