# Proyecto ALMA

Website for ALMA (Arte, Libertad, Mercado, Acción), built with [Astro](https://astro.build).

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static site in dist/
```

All the text, the contact details and the four panel photos live in `src/data/site.ts`.
Colours and sizes are at the top of `src/styles/global.css`.

## Carousel photos

Everything in `src/assets/gallery/` (`.jpg`, `.png`, `.webp`, `.avif`, `.mp4`) appears in the carousel.

- Photos appear in file-name order: `01-mano-en-la-puerta`, `02-mesa-servida`, and so on.
- The name after the number becomes the description for screen readers.
- Every photo keeps its own proportions and is shown in black and white.
- Resize new photos to about 2400px on the long side before adding them. Keep full-size
  originals outside this repository.
- Videos are muted and loop. Convert GIFs to `.mp4`, and add a first frame as
  `posters/<same-name>.jpg`.
