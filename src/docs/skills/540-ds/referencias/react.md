# Vía React: la pieza dentro de un proyecto

Cuando la pieza vive dentro de una app React, no hay render ni etiquetas: se usan los componentes del paquete
`@540deg/ds`, con el JSX que devuelve el MCP casi tal cual. Los pasos 0 a 4, 7 y 8 de la skill son los mismos;
los pasos 5 y 6 son los de este fichero.

## Instalar

1. Comprueba que el proyecto usa **React 19** (`react` en `package.json`). Si es otra versión, para y dilo:
   el paquete no funciona con ella.
2. Si `@540deg/ds` no está en `dependencies`, propón instalarlo con el gestor del proyecto (`npm install
   @540deg/ds`, `pnpm add`, `yarn add`) y espera el sí.
3. La hoja de estilos se importa **una vez**, en la entrada de la app (`main.tsx` o el layout raíz):

   ```tsx
   import '@540deg/ds/styles.css';
   ```

   Si ya está importada, no la repitas. Lleva los tokens, el reset, DM Sans y los estilos de todos los
   componentes: no hace falta Google Fonts ni ninguna otra hoja.

## Escribir la pieza

- Un componente por pieza (en `src/`, donde el proyecto guarde sus páginas). Con plantilla: la raíz es el
  `shell` de `get-template` y dentro van las partes de `get-template-stops`. En diseño libre: las secciones
  aprobadas, con el JSX de `get-component` y `get-component-stories`.
- Los imports, todos de la raíz del paquete: `import { Section, Stack, Grid } from '@540deg/ds';`. Los tipos,
  igual: `import type { CardProps } from '@540deg/ds';`.
- Las constantes de la plantilla, si vas con una, se copian al fichero de la pieza.
- Las imágenes de muestra se cambian por las de la pieza, importadas como las importe el proyecto (`import
  portada from './portada.webp'`). Nunca las de muestra del sistema.
- Las mismas normas: ni `className`, ni `style`, ni CSS del proyecto sobre los componentes.
- Monta la pieza en una ruta o página del proyecto, según cómo enrute la app. Si no está claro dónde, pregunta.

## Comprobar

- Tipos: el `tsc` del proyecto (o su `npm run build`) sin errores en el fichero de la pieza. El paquete
  necesita `"moduleResolution": "bundler"`, que es lo que traen Vite y Next.
- Arranca la app y abre la pieza, si puedes. Si no, dilo en la entrega.
- Haz el repaso del paso 7, como en la vía HTML.
