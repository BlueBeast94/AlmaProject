/** Everything the site says lives here. Nothing in this file affects layout. */

export const site = {
  title: 'Proyecto ALMA',
  description:
    'Una plataforma cultural independiente que explora el vínculo entre la cultura y las ideas de la libertad.',
  // TODO: replace these three with the real links
  email: 'hola@almaproject.example',
  instagram: '#', // e.g. 'https://instagram.com/usuario'
  whatsapp: '#', // e.g. 'https://wa.me/5491112345678' (country code + number, no spaces or +)
};

/** The room revealed when the doors open in the hero. PLACEHOLDER (Unsplash id). */
export const hero = { photo: 'photo-1761409337593-4fd5a5ddf4e9' };

/**
 * PLACEHOLDER carousel photos (Unsplash ids).
 * These only show while src/assets/gallery/ is empty. See the README.
 */
export const gallery = [
  { id: 'photo-1638303322580-5e6aacd59c0d', alt: 'Naturaleza muerta con botellas y un drapeado.' },
  { id: 'photo-1784130299079-0b78f73fff23', alt: 'Techo barroco ornamentado.' },
  { id: 'photo-1491841651911-c44c30c34548', alt: 'Libros antiguos encuadernados en cuero.' },
  { id: 'photo-1731345356052-fa162523666d', alt: 'Azucarera de plata antigua.' },
  { id: 'photo-1527576539890-dfa815648363', alt: 'Edificios curvos vistos desde abajo.' },
  { id: 'photo-1508093989287-061d64de7324', alt: 'Vela encendida en la oscuridad.' },
];

/**
 * The four panels spell the name.
 * `photo` is an Unsplash id (PLACEHOLDER). To use a real photo, put the file in
 * src/assets/photos/ and write its name in `local` instead.
 */
export const rooms = [
  { letter: 'A', rest: 'rte', line: 'La belleza también es un argumento.', photo: 'photo-1775830388406-006546b9401b', alt: 'Escultura clásica de mármol.', pos: '50% 35%' },
  { letter: 'L', rest: 'ibertad', line: 'Nos atraviesa, sin consignas.', photo: 'photo-1698341484377-4a6e546867b2', alt: 'Figura de blanco caminando entre la niebla.', pos: '50% 40%' },
  { letter: 'M', rest: 'ercado', line: 'Conectar mundos que parecen no tener vínculo.', photo: 'photo-1717409047809-d9e66fc0f172', alt: 'Objetos de plata labrada.', pos: '50% 50%' },
  { letter: 'A', rest: 'cción', line: 'No sólo hablamos: lo hacemos en comunidad.', photo: 'photo-1648733330186-c77c0b7b5823', alt: 'Bailarina junto a una ventana.', pos: '60% 40%' },
];

export const method = [
  { word: 'Concepto', line: 'Todo comienza con una pregunta.' },
  { word: 'Estética', line: 'Las ideas necesitan una forma.' },
  { word: 'Experiencia', line: 'Las conversaciones necesitan comunidad.' },
];

/** Full text from the brand manual, shown on /manifiesto. */
export const manifesto = [
  'Proyecto ALMA (Arte, Libertad, Mercado, Acción) es una plataforma creativa concebida para explorar el vínculo entre la cultura y las ideas de la libertad.',
  'Nuestro leitmotiv es conectar mundos y/o ámbitos que aparentan no tener vínculo alguno y desde allí explorar, potenciar y difundir la fuerza creativa y profundamente humana del liberalismo más allá del tradicionalismo ideológico.',
  'En nuestra propuesta se funde lo conceptual, lo estético y lo experiencial bajo formatos detalladamente curados para nuestra comunidad.',
  'En un presente signado por las consignas explícitas, ALMA hace de la aproximación indirecta y la sutileza su más genuina forma de intervención. La libertad nos atraviesa integrándose de manera orgánica a nuestra cultura y todos sus vehículos: el cine, la riqueza, la tecnología, la belleza, la literatura, la moda, el diseño, el ocio, la fotografía, la arquitectura y las múltiples maneras en las que los individuos construyen y expresan significado. Bajo esa mirada, nuestro proyecto no es otro think tank, sino una plataforma de producción cultural e institucional.',
  'A través de eventos, curaduría de redes de networking, experiencias culturales, publicaciones y proyectos interdisciplinarios, ALMA busca ampliar la conversación liberal hacia territorios históricamente poco explorados por el movimiento: la estética, la creatividad, el disfrute con propósito, la innovación, la producción simbólica y la cultura contemporánea.',
  'No sólo hablamos de libertad y cultura: buscamos desplegar creativamente ese vínculo con nuestra comunidad.',
];
