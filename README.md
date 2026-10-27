# Atril

Lector de EPUB que funciona en el navegador y se puede instalar como app (PWA), también sin conexión.

- Biblioteca con portadas y progreso de lectura
- Índice, temas (Papel, Sepia, Noche), tamaño de letra y ancho de línea
- Resaltados en colores, subrayado y notas
- Resumen de notas de todos los libros, con búsqueda y filtros
- Copia de seguridad de notas para pasarlas a otro navegador o dispositivo

Los libros, el progreso y las notas se guardan **solo en el navegador de cada dispositivo**. No se suben a ningún sitio.
No subas archivos EPUB a este repositorio: es público.

## Instalar

Abre la web publicada con GitHub Pages:

- **Android (Chrome):** menú ⋮ → *Instalar aplicación* o *Añadir a pantalla de inicio*.
- **iPhone / iPad (Safari):** botón Compartir → *Añadir a pantalla de inicio*.
- **PC (Chrome / Edge):** icono de instalar en la barra de direcciones. Una vez instalada, puedes abrir archivos `.epub` con Atril desde el explorador de archivos.

## Actualizar

Al cambiar cualquier archivo, sube también `sw.js` con un número nuevo en `VERSION` (por ejemplo `atril-v2`). La app se actualiza sola la siguiente vez que se abre con conexión.

## Créditos

- [JSZip](https://stuk.github.io/jszip/) 3.10.1 (MIT o GPLv3)
- Tipografías [Literata](https://fonts.google.com/specimen/Literata) y [Figtree](https://fonts.google.com/specimen/Figtree) (SIL Open Font License), servidas desde Google Fonts y guardadas para uso sin conexión
