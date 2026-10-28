import type { Meta, StoryObj } from '@storybook/react-vite';
import { Text } from '../../atoms/Text';
import { Card } from '../Card';
import { Grid, GridItem } from '../Grid';
import { Question } from '../Question';
import { SectionHeader } from '../SectionHeader';
import { Stack } from './Stack';
import { STACK_DEFAULTS, STACK_GAPS, STACK_MEASURES } from './types';
import doc from './_docs/Stack.md?raw';

const meta = {
  title: 'Moléculas/Stack',
  component: Stack,
  tags: ['autodocs', '!dev'],
  parameters: { docs: { description: { component: doc } }, layout: 'padded' },
  args: { ...STACK_DEFAULTS, children: null },
  argTypes: {
    gap: { control: 'inline-radio', options: [...STACK_GAPS], description: 'El hueco entre piezas: 16, 32 o 48.', table: { defaultValue: { summary: STACK_DEFAULTS.gap } } },
    measure: { control: 'inline-radio', options: [...STACK_MEASURES], description: 'Ancho de la pila.', table: { defaultValue: { summary: STACK_DEFAULTS.measure } } },
    children: { control: false, table: { type: { summary: 'ReactNode' } } },
    className: { control: false, table: { disable: true } },
  },
} satisfies Meta<typeof Stack>;

export default meta;
type Story = StoryObj<typeof meta>;

const CabeceraYTarjetas = (args: Partial<React.ComponentProps<typeof Stack>>) => (
  <Stack {...args}>
    <SectionHeader title="Título de la parada" description="Una entradilla corta que presenta las tarjetas." align="center" />
    <Grid>
      {[1, 2, 3].map((n) => (
        <GridItem key={n} span={4}>
          <Card ordinal={`0${n}`} title={`Tarjeta ${n}`} align="center">
            Dos frases sobre esta tarjeta.
          </Card>
        </GridItem>
      ))}
    </Grid>
    <Text variant="body-l" tone="secondary" align="center" wrap="pretty" measure="half">
      Una frase que remata lo que se acaba de ver.
    </Text>
  </Stack>
);

export const Playground: Story = { tags: ['dev'], render: (args) => <CabeceraYTarjetas gap={args.gap} measure={args.measure} /> };

export const CabeceraYContenido: Story = {
  name: 'Cabecera y contenido',
  parameters: { docs: { description: { story: 'El uso de siempre: la cabecera, la rejilla y una frase de remate, con el hueco grande entre ellas.' } } },
  render: () => <CabeceraYTarjetas />,
};

export const Preguntas: Story = {
  parameters: { docs: { description: { story: 'Tres preguntas en una columna a media retícula, con el hueco pequeño.' } } },
  render: () => (
    <Stack gap="s" measure="half">
      {[1, 2, 3].map((n) => (
        <Question key={n} question={<><strong>Q{n} · ¿Pregunta número {n}?</strong> Un matiz que la concreta.</>} answer="La respuesta, en una frase." />
      ))}
    </Stack>
  ),
};
