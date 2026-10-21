import type { Meta, StoryObj } from '@storybook/react-vite';
import { CaseItem } from './CaseItem';
import styles from './CaseItem.module.css';
import { CASE_ITEM_DEFAULTS } from './types';
import doc from './_docs/CaseItem.md?raw';
import pintura from '../../../assets/samples/charla-pintura.webp';
import david from '../../../assets/samples/charla-david.webp';
import fachada from '../../../assets/samples/charla-fachada.webp';

const CASOS = [
  { src: pintura, title: 'Jakala', description: 'Un sistema de diseño que el equipo de desarrollo usa de verdad.', href: '#jakala' },
  { src: david, title: 'Saltoki', description: 'La calculadora de ahorro energético, de cinco pasos.', href: '#saltoki' },
  { src: fachada, title: 'Herramientas PIM', description: 'Un catálogo de producto para un equipo que no diseña.', href: '#pim' },
];

const meta = {
  title: 'Moléculas/CaseItem',
  component: CaseItem,
  tags: ['autodocs', '!dev'],
  parameters: { docs: { description: { component: doc } }, layout: 'padded' },
  args: { ...CASOS[0], ...CASE_ITEM_DEFAULTS },
  argTypes: {
    src: { control: 'text', description: 'La foto, siempre en 2:1.', table: { type: { summary: 'string' } } },
    alt: { control: 'text', description: 'Alt de la foto. Vacío por defecto: el título ya dice qué es.', table: { defaultValue: { summary: '""' } } },
    title: { control: 'text', description: 'El nombre del caso. Es también el nombre del enlace.', table: { type: { summary: 'ReactNode' } } },
    description: { control: 'text', description: 'Una frase sobre el caso.', table: { type: { summary: 'ReactNode' } } },
    href: { control: 'text', description: 'Con destino, toda la pieza es un enlace y la foto se acerca al pasar. Sin él, no se pulsa.', table: { type: { summary: 'string' } } },
    level: { control: 'inline-radio', options: ['h2', 'h3', 'h4'], description: 'Nivel del título.', table: { defaultValue: { summary: CASE_ITEM_DEFAULTS.level } } },
    className: { control: false, table: { disable: true } },
  },
} satisfies Meta<typeof CaseItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  tags: ['dev'],
  parameters: { layout: 'centered' },
  render: (args) => (
    <div style={{ width: 'min(588px, 90vw)' }}>
      <CaseItem {...args} />
    </div>
  ),
};

export const Estados: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Normal, hover y active de un caso enlazado, forzados. El acercamiento de la foto es lo único que dice que se pulsa: el nombre no se subraya ni cambia de color.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--grid-gutter)' }}>
      <CaseItem {...CASOS[0]} />
      <CaseItem {...CASOS[0]} className={styles.forceHover} />
      <CaseItem {...CASOS[0]} className={styles.forceActive} />
    </div>
  ),
};

export const SinDestino: Story = {
  name: 'Sin destino',
  parameters: { docs: { description: { story: 'Un caso que todavía no tiene página: sin `href` no es un enlace y la foto no se mueve al pasar.' } } },
  render: () => (
    <div style={{ width: 588 }}>
      <CaseItem src={david} title="Un caso que viene" description="Todavía sin página. La pieza se ve igual, pero no promete nada." />
    </div>
  ),
};

export const EnTira: Story = {
  name: 'En tira',
  parameters: { docs: { description: { story: 'Tres casos seguidos, cada uno a media retícula, como en la tira del portfolio. Es lo que el Carousel pone dentro.' } } },
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--grid-gutter)', overflowX: 'auto' }}>
      {CASOS.map((c) => (
        <div key={c.title} style={{ flex: '0 0 588px' }}>
          <CaseItem {...c} />
        </div>
      ))}
    </div>
  ),
};
