import type { Meta, StoryObj } from '@storybook/react-vite';
import { Text } from '../../atoms/Text';
import { SectionHeader } from '../SectionHeader';
import { Section } from './Section';
import { SECTION_DEFAULTS, SECTION_TONES } from './types';
import doc from './_docs/Section.md?raw';

const meta = {
  title: 'Moléculas/Section',
  component: Section,
  tags: ['autodocs', '!dev'],
  parameters: { docs: { description: { component: doc } }, layout: 'fullscreen' },
  args: {
    ...SECTION_DEFAULTS,
    children: (
      <SectionHeader
        title="Meses de investigación"
        description="Lo que probamos, lo que descartamos y lo que se quedó. En orden, mes a mes."
        align="center"
      />
    ),
  },
  argTypes: {
    tone: {
      control: 'inline-radio',
      options: [...SECTION_TONES],
      description: '`default` no pinta nada; `raised` levanta la banda un peldaño.',
      table: { type: { summary: SECTION_TONES.join(' | ') }, defaultValue: { summary: SECTION_DEFAULTS.tone } },
    },
    children: { control: false, description: 'Lo que va dentro de la columna.', table: { type: { summary: 'ReactNode' } } },
    className: { control: false, table: { disable: true } },
  },
} satisfies Meta<typeof Section>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = { tags: ['dev'] };

export const Tonos: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Dos bandas seguidas: `default` deja ver el papel y `raised` sube un peldaño. El fondo llega de lado a lado; el contenido se para en los 1200 px de la columna. Cambia el **Viewport** y verás cómo el aire vertical baja de 120 a 48 por debajo de 1024.',
      },
    },
  },
  render: () => (
    <>
      <Section tone="default" aria-labelledby="s1">
        <SectionHeader titleId="s1" title="Una banda default" description="No pinta nada: deja ver el fondo de la página y lo que haya detrás." />
      </Section>
      <Section tone="raised" aria-labelledby="s2">
        <SectionHeader titleId="s2" title="Una banda raised" description="Un peldaño por encima. Es la de las historias, las objeciones y las citas." />
      </Section>
      <Section tone="default" aria-labelledby="s3">
        <SectionHeader titleId="s3" title="Y otra default" />
      </Section>
    </>
  ),
};

export const ConContenido: Story = {
  name: 'Con contenido',
  parameters: {
    docs: {
      description: {
        story: 'Una cabecera y un párrafo dentro de la columna. La Section no sabe nada de lo que lleva dentro: solo pone la banda, la columna y el aire.',
      },
    },
  },
  render: () => (
    <Section tone="raised" aria-labelledby="s4">
      <div style={{ display: 'grid', gap: 'var(--space-xl)' }}>
        <SectionHeader titleId="s4" title="Lo que creía" align="center" />
        <Text variant="body-l" tone="secondary" align="center" wrap="pretty" measure="half">
          Que un sistema de diseño era un archivo de Figma bien ordenado. Que si las pantallas estaban limpias, el resto venía solo.
        </Text>
      </div>
    </Section>
  ),
};
