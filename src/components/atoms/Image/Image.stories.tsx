import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { Text } from '../Text';
import { Image } from './Image';
import { IMAGE_DEFAULTS, IMAGE_RATIOS } from './types';
import doc from './_docs/Image.md?raw';
import pintura from '../../../assets/samples/charla-pintura.webp';
import david from '../../../assets/samples/charla-david.webp';
import fachada from '../../../assets/samples/charla-fachada.webp';
import retrato from '../../../assets/samples/retrato.jpg';
import logoCliente from '../../../assets/samples/jakala-claro.png';

const Caption = ({ children }: { children: ReactNode }) => (
  <Text variant="micro" tone="secondary" as="span">
    {children}
  </Text>
);

const Stack = ({ gap = 'var(--space-s)', children }: { gap?: string; children: ReactNode }) => (
  <div style={{ display: 'grid', gap }}>{children}</div>
);

const ALT_FACHADA = 'Fachada de una nave curva, con la misma pieza romboidal repetida en toda su superficie';
const ALT_DAVID = 'El David de Miguel Ángel, visto desde abajo bajo la cúpula de la Galería de la Academia';
const ALT_PINTURA = 'Brochazos de pintura blanca arrastrados sobre una superficie gris, unos encima de otros';

const meta = {
  title: 'Átomos/Image',
  component: Image,
  tags: ['autodocs', '!dev'],
  parameters: { docs: { description: { component: doc } }, layout: 'padded' },
  args: { src: fachada, alt: ALT_FACHADA, ...IMAGE_DEFAULTS },
  argTypes: {
    ratio: {
      control: 'inline-radio',
      options: [...IMAGE_RATIOS],
      description: 'Quién pone el alto: `2:1` y `1:1` la caja, `fill` el contenedor, `auto` el archivo (la única que no recorta).',
      table: { type: { summary: IMAGE_RATIOS.join(' | ') }, defaultValue: { summary: IMAGE_DEFAULTS.ratio } },
    },
    src: { control: 'text', description: 'El archivo.', table: { type: { summary: 'string' } } },
    alt: {
      control: 'text',
      description: 'Obligatorio. Describe lo que muestra, o `""` para marcarla decorativa: distinto de olvidarse.',
      table: { type: { summary: 'string' } },
    },
    loading: {
      control: 'inline-radio',
      options: ['lazy', 'eager'],
      description: '`lazy` por defecto; `eager` solo en lo que se ve al entrar (la foto de portada).',
      table: { type: { summary: 'lazy | eager' }, defaultValue: { summary: IMAGE_DEFAULTS.loading } },
    },
    className: { control: false, table: { disable: true } },
  },
} satisfies Meta<typeof Image>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  tags: ['dev'],
  parameters: { layout: 'centered' },
  render: (args) => (
    <div style={{ width: 480 }}>
      <Image {...args} />
    </div>
  ),
};

export const Proporciones: Story = {
  name: 'Proporciones',
  parameters: {
    docs: {
      description: {
        story:
          'La misma foto vertical (1200 × 1800) en las cuatro proporciones, en cajas de 320 px de ancho. `2:1` y `1:1` recortan y centran; `fill` llena el alto que le da el contenedor (aquí, 420 px); `auto` enseña el archivo entero con su forma. Ninguna se deforma.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 320px)', gap: 'var(--space-xl)', alignItems: 'start' }}>
      {IMAGE_RATIOS.map((ratio) => (
        <Stack key={ratio}>
          <Caption>ratio = {ratio}</Caption>
          <div style={{ height: ratio === 'fill' ? 420 : undefined, overflow: 'hidden' }}>
            <Image src={fachada} alt={ALT_FACHADA} ratio={ratio} />
          </div>
        </Stack>
      ))}
    </div>
  ),
};

export const EnLaReticula: Story = {
  name: 'En la retícula',
  parameters: {
    docs: {
      description: {
        story:
          'Tres fotos de distinta forma (horizontal, vertical, vertical) en tres cajas `2:1` de una rejilla: la caja manda y las tres quedan iguales. Es la foto de un caso en el portfolio. El radio y el recorte los pone el contenedor (`overflow: hidden`), no la imagen.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--grid-gutter)' }}>
      {[
        { src: pintura, alt: ALT_PINTURA },
        { src: david, alt: ALT_DAVID },
        { src: fachada, alt: ALT_FACHADA },
      ].map((img) => (
        <div key={img.src} style={{ borderRadius: 'var(--radius-default)', overflow: 'hidden' }}>
          <Image src={img.src} alt={img.alt} ratio="2:1" />
        </div>
      ))}
    </div>
  ),
};

export const Retrato: Story = {
  parameters: {
    docs: {
      description: {
        story: 'El retrato de una persona del equipo en `1:1`. La foto original es vertical; la caja cuadrada recorta arriba y abajo por igual.',
      },
    },
  },
  render: () => (
    <div style={{ width: 240, borderRadius: 'var(--radius-default)', overflow: 'hidden' }}>
      <Image src={retrato} alt="Retrato de un miembro del equipo" ratio="1:1" />
    </div>
  ),
};

export const SinRecorte: Story = {
  name: 'Sin recorte',
  parameters: {
    docs: {
      description: {
        story:
          'Un logotipo de cliente con `auto`: no se puede recortar, así que el archivo pone el alto. A cambio hay que reservarle el sitio con `width` y `height` (aquí 1315 × 546), o la página salta al cargar.',
      },
    },
  },
  render: () => (
    <div style={{ width: 320 }}>
      <Image src={logoCliente} alt="Jakala" ratio="auto" width={1315} height={546} />
    </div>
  ),
};

export const Decorativa: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'La foto de ambiente detrás de un título de bloque va con `alt=""`: el lector de pantalla la salta. Es una decisión, no un olvido: el tipo obliga a escribir el `alt` siempre.',
      },
    },
  },
  render: () => (
    <div style={{ width: 480 }}>
      <Image src={david} alt="" ratio="2:1" />
    </div>
  ),
};
