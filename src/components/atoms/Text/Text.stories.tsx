import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { Text } from './Text';
import { TEXT_ALIGNS, TEXT_DEFAULTS, TEXT_ELEMENTS, TEXT_MEASURES, TEXT_TONES, TEXT_VARIANTS, TEXT_WRAPS } from './types';
import doc from './_docs/Text.md?raw';

const MUESTRA = 'Diseño que trasciende';

const Caption = ({ children }: { children: ReactNode }) => (
  <Text variant="micro" tone="secondary" as="span">
    {children}
  </Text>
);

const Stack = ({ gap = 'var(--space-xl)', children }: { gap?: string; children: ReactNode }) => (
  <div style={{ display: 'grid', gap }}>{children}</div>
);

const meta = {
  title: 'Átomos/Text',
  component: Text,
  tags: ['autodocs', '!dev'],
  parameters: { docs: { description: { component: doc } }, layout: 'padded' },
  args: { children: MUESTRA, ...TEXT_DEFAULTS },
  argTypes: {
    variant: {
      control: 'select',
      options: [...TEXT_VARIANTS],
      description: 'Uno de los trece estilos de texto. Decide tamaño, peso, interlineado y tracking; no decide la etiqueta.',
      table: { type: { summary: TEXT_VARIANTS.join(' | ') }, defaultValue: { summary: TEXT_DEFAULTS.variant } },
    },
    tone: {
      control: 'select',
      options: [...TEXT_TONES],
      description: 'La tinta: `primary` (negro) o `secondary` (gris). Text no va en colores.',
      table: { type: { summary: TEXT_TONES.join(' | ') }, defaultValue: { summary: TEXT_DEFAULTS.tone } },
    },
    as: {
      control: 'select',
      options: [...TEXT_ELEMENTS],
      description: 'Etiqueta HTML. Se elige por el significado en el documento (un `h1` por pantalla), nunca por el tamaño.',
      table: { type: { summary: TEXT_ELEMENTS.join(' | ') }, defaultValue: { summary: TEXT_DEFAULTS.as } },
    },
    align: {
      control: 'inline-radio',
      options: [...TEXT_ALIGNS],
      description: 'Alineación horizontal. Sin valor, hereda la del contenedor.',
      table: { type: { summary: TEXT_ALIGNS.join(' | ') } },
    },
    wrap: {
      control: 'inline-radio',
      options: [...TEXT_WRAPS],
      description: '`balance` para frases y títulos (líneas de largo parecido); `pretty` para párrafos (sin palabra suelta al final).',
      table: { type: { summary: TEXT_WRAPS.join(' | ') }, defaultValue: { summary: TEXT_DEFAULTS.wrap } },
    },
    measure: {
      control: 'select',
      options: [...TEXT_MEASURES],
      description: 'Ancho máximo con nombre: `wide` (tres cuartos), `half` (media retícula), `prose` (62 caracteres), `narrow` (38). Centrado, el bloque también se centra.',
      table: { type: { summary: TEXT_MEASURES.join(' | ') }, defaultValue: { summary: TEXT_DEFAULTS.measure } },
    },
    children: {
      control: 'text',
      description: 'El texto.',
      table: { type: { summary: 'ReactNode' } },
    },
    mono: { control: 'boolean', description: 'Monoespaciada, un poco más pequeña: un comando, un nombre de archivo.', table: { defaultValue: { summary: 'false' } } },
    className: { control: false, table: { disable: true } },
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = { tags: ['dev'], parameters: { layout: 'centered' } };

export const Escala: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Los trece estilos, de mayor a menor, con el mismo texto. A la izquierda de cada uno, el nombre de la variante. Cambia el **Viewport** para ver crecer los cuatro títulos desde 1024 px, y el selector **Escala → Proyección** para ver la escala de sala.',
      },
    },
  },
  render: () => (
    <Stack>
      {TEXT_VARIANTS.map((variant) => (
        <Stack key={variant} gap="var(--space-xs)">
          <Caption>{variant}</Caption>
          <Text variant={variant}>{variant === 'statement' ? '540°' : MUESTRA}</Text>
        </Stack>
      ))}
    </Stack>
  ),
};

export const EstiloYEtiqueta: Story = {
  name: 'Estilo y etiqueta',
  parameters: {
    docs: {
      description: {
        story:
          'Tres `h2` con tres estilos distintos. El nivel del encabezado es el mismo para el lector de pantalla; lo que cambia es cómo se ve. Es la razón de que `variant` y `as` sean dos opciones y no una.',
      },
    },
  },
  render: () => (
    <Stack>
      <Text as="h2" variant="statement">
        Un h2 en statement
      </Text>
      <Text as="h2" variant="title-l">
        Un h2 en title-l
      </Text>
      <Text as="h2" variant="body-s-bold">
        Un h2 en body-s-bold
      </Text>
    </Stack>
  ),
};

export const Tonos: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Las dos tintas: negro para lo que se lee y gris para lo que acompaña. Son las únicas del texto, como en las charlas. Cambia el **Tema** y verás que se invierten (blanco y gris claro sobre negro).',
      },
    },
  },
  render: () => (
    <Stack gap="var(--space-l)">
      {TEXT_TONES.map((tone) => (
        <Text key={tone} variant="body-l" tone={tone}>
          {tone} · {MUESTRA}
        </Text>
      ))}
    </Stack>
  ),
};

export const RepartoDeLineas: Story = {
  name: 'Reparto de líneas',
  parameters: {
    docs: {
      description: {
        story:
          'La misma frase con los tres valores de `wrap`, en una columna estrecha. `balance` reparte las palabras para que las líneas midan parecido; `pretty` evita que la última línea se quede con una sola palabra.',
      },
    },
  },
  render: () => (
    <Stack gap="var(--space-3xl)">
      {TEXT_WRAPS.map((wrap) => (
        <Stack key={wrap} gap="var(--space-s)">
          <Caption>wrap = {wrap}</Caption>
          <div style={{ maxWidth: 520 }}>
            <Text variant="title-m" wrap={wrap}>
              Dejar de entregar pantallas y entregar el sistema que las produce
            </Text>
          </div>
        </Stack>
      ))}
    </Stack>
  ),
};

export const NegritaYCodigo: Story = {
  name: 'Negrita y código',
  parameters: { docs: { description: { story: 'Dentro de cualquier texto, `strong` va en negrita y `code` en monoespaciada un 8 % más pequeña. Con `mono`, el texto entero.' } } },
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--space-l)', maxWidth: 560 }}>
      <Text variant="body-m">
        Una frase con <strong>la parte que importa</strong> en negrita y un <code>/comando</code> en monoespaciada.
      </Text>
      <Text variant="title-s">
        Un título con <code>/comando</code> dentro
      </Text>
      <Text variant="body-s" tone="secondary" mono>
        «Título de un artículo» · mes 2026
      </Text>
    </div>
  ),
};

export const Anchos: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Los cuatro anchos con nombre, centrados, con el contorno punteado para ver la caja. Son las cuatro medidas que ya usan las charlas: así no hace falta escribir anchos a mano.',
      },
    },
  },
  render: () => (
    <Stack gap="var(--space-3xl)">
      {(['wide', 'half', 'prose', 'narrow'] as const).map((measure) => (
        <Stack key={measure} gap="var(--space-s)">
          <Text variant="micro" tone="secondary" as="span" align="center">
            measure = {measure}
          </Text>
          <Text variant="body-l" align="center" wrap="pretty" measure={measure} style={{ outline: '1px dashed var(--color-border-default)' }}>
            Una charla sobre dejar de entregar pantallas y entregar el sistema que las produce. Cada parada del recorrido pesa igual que las
            demás: misma escala, mismo aire, mismo tratamiento.
          </Text>
        </Stack>
      ))}
    </Stack>
  ),
};
