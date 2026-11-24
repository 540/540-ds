import styles from './foundations.module.css';
import catalog from '../images/catalog.json';

interface LibraryImage {
  id: string;
  kind: string;
  topics: string[];
  description: string;
  tone: string;
  orientation: string;
  width: number;
  height: number;
  author: string;
  source: string;
}

const files = import.meta.glob<string>('../images/photos/*.webp', { eager: true, query: '?url', import: 'default' });
const urlOf = (id: string) => files[`../images/photos/${id}.webp`];

/** Every photo of the image library of one kind (`imagen` or `textura`), with its reference, themes and credit. */
export function ImageLibrary({ kind }: { kind: 'imagen' | 'textura' }) {
  const images = (catalog.images as LibraryImage[]).filter((image) => image.kind === kind);
  return (
    <div className={styles.block}>
      <div className={styles.libraryGrid}>
        {images.map((image) => (
          <figure key={image.id} className={styles.libraryItem}>
            <img className={styles.libraryPhoto} src={urlOf(image.id)} alt={image.description} width={image.width} height={image.height} loading="lazy" />
            <figcaption className={styles.swatchText}>
              <span className={styles.swatchToken}>biblioteca:{image.id}</span>
              <span className={styles.swatchLabel}>{image.description}</span>
              <span className={styles.swatchValue}>
                {image.topics.join(' · ')} · {image.orientation}, {image.tone}
              </span>
              <span className={styles.swatchValue}>
                Foto de{' '}
                <a href={image.source} target="_blank" rel="noreferrer">
                  {image.author}
                </a>{' '}
                en Unsplash
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
