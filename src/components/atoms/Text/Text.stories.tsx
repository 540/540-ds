import type { Meta, StoryObj } from '@storybook/react-vite';
import { Text, TEXT_ALIGNS, TEXT_MEASURES, TEXT_TONES, TEXT_VARIANTS, TEXT_WRAPS } from './Text';

const meta = {
  title: 'Átomos/Text',
  component: Text,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    variant: { control: 'select', options: TEXT_VARIANTS, description: 'Estilo de texto' },
    tone: { control: 'select', options: TEXT_TONES, description: 'Tono (color)' },
    as: {
      control: 'select',
      options: ['p', 'span', 'h1', 'h2', 'h3', 'h4', 'div', 'figcaption', 'blockquote', 'li', 'label'],
      description: 'Etiqueta HTML',
    },
    align: { control: 'radio', options: TEXT_ALIGNS, description: 'Alineación' },
    wrap: { control: 'radio', options: TEXT_WRAPS, description: 'Reparto de líneas' },
    measure: { control: 'select', options: TEXT_MEASURES, description: 'Ancho máximo' },
    children: { control: 'text', description: 'Contenido' },
  },
  args: {
    variant: 'body-m',
    tone: 'primary',
    as: 'p',
    wrap: 'auto',
    measure: 'none',
    children: 'Diseño que trasciende',
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Cambia las opciones desde el panel de controles. */
export const Playground: Story = {};

/** Los trece estilos, de mayor a menor. */
export const Escala: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--space-xl)' }}>
      {TEXT_VARIANTS.map((variant) => (
        <div key={variant} style={{ display: 'grid', gap: 'var(--space-xs)' }}>
          <Text variant="micro" tone="tertiary" as="span">
            {variant}
          </Text>
          <Text variant={variant}>{variant === 'statement' ? '540°' : 'Diseño que trasciende'}</Text>
        </div>
      ))}
    </div>
  ),
};

/** Los siete tonos sobre el fondo del tema. El tono inverse se muestra sobre fondo invertido. */
export const Tonos: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--space-l)' }}>
      {TEXT_TONES.map((tone) => (
        <div
          key={tone}
          style={{
            padding: 'var(--space-m) var(--space-l)',
            borderRadius: 'var(--radius-default)',
            background: tone === 'inverse' ? 'var(--color-bg-inverse)' : 'transparent',
          }}
        >
          <Text variant="body-l" tone={tone}>
            {tone} · Diseño que trasciende
          </Text>
        </div>
      ))}
    </div>
  ),
};

/** El estilo y la etiqueta se eligen por separado: tres h2 con tres estilos distintos. */
export const EstiloYEtiqueta: Story = {
  name: 'Estilo y etiqueta',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--space-xl)' }}>
      <Text as="h2" variant="statement">
        Un h2 en statement
      </Text>
      <Text as="h2" variant="title-l">
        Un h2 en title-l
      </Text>
      <Text as="h2" variant="body-s-bold">
        Un h2 en body-s-bold
      </Text>
    </div>
  ),
};

/** Los cuatro anchos con nombre, centrados. */
export const Anchos: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--space-3xl)' }}>
      {(['wide', 'half', 'prose', 'narrow'] as const).map((measure) => (
        <div key={measure} style={{ display: 'grid', gap: 'var(--space-s)' }}>
          <Text variant="micro" tone="tertiary" as="span" align="center">
            measure = {measure}
          </Text>
          <Text variant="body-l" align="center" wrap="pretty" measure={measure} style={{ outline: '1px dashed var(--color-border-default)' }}>
            Una charla sobre dejar de entregar pantallas y entregar el sistema que las produce. Cada parada del recorrido pesa igual que las
            demás: misma escala, mismo aire, mismo tratamiento.
          </Text>
        </div>
      ))}
    </div>
  ),
};

/** Reparto de líneas: balance para frases y títulos, pretty para párrafos. */
export const RepartoDeLineas: Story = {
  name: 'Reparto de líneas',
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--space-3xl)', maxWidth: 520 }}>
      {TEXT_WRAPS.map((wrap) => (
        <div key={wrap} style={{ display: 'grid', gap: 'var(--space-s)' }}>
          <Text variant="micro" tone="tertiary" as="span">
            wrap = {wrap}
          </Text>
          <Text variant="title-m" wrap={wrap}>
            Dejar de entregar pantallas y entregar el sistema que las produce
          </Text>
        </div>
      ))}
    </div>
  ),
};
