import type { Meta, StoryObj } from '@storybook/react-vite';
import { Grid, GridItem } from '../../molecules/Grid';
import { SectionHeader } from '../../molecules/SectionHeader';
import { Stack } from '../../molecules/Stack';
import { Slide } from '../Slide';
import { Step, Steps } from '../Steps';
import { ProgressRing } from './ProgressRing';
import { PROGRESS_RING_DEFAULTS, PROGRESS_RING_SIZES } from './types';
import doc from './_docs/ProgressRing.md?raw';

const meta = {
  title: 'Organismos/ProgressRing',
  component: ProgressRing,
  tags: ['autodocs', '!dev'],
  parameters: { docs: { description: { component: doc } }, layout: 'padded' },
  args: { value: 72, label: 'Primera medida', caption: 'Qué mide la cifra, en pocas palabras', ...PROGRESS_RING_DEFAULTS },
  argTypes: {
    value: { control: 'number', description: 'La cifra alcanzada.' },
    max: { control: 'number', description: 'El objetivo o el total. El anillo se cierra al llegar a él.', table: { defaultValue: { summary: '100' } } },
    label: { control: 'text', description: 'Nombre accesible del anillo; se le añade la cifra.' },
    display: { control: 'text', description: 'Cómo se escribe la cifra del centro («340 de 500»). Por defecto, el porcentaje, contando.' },
    caption: { control: 'text', description: 'Texto corto bajo el anillo, en gris.' },
    tone: { control: 'inline-radio', options: ['ink', 'context', 'accent'], description: 'Tinta, gris o amarillo.', table: { defaultValue: { summary: 'ink' } } },
    size: { control: 'inline-radio', options: PROGRESS_RING_SIZES, description: 'Diámetro del anillo y tamaño de la cifra.', table: { defaultValue: { summary: 'm' } } },
    decimals: { control: 'number', description: 'Decimales del porcentaje.', table: { defaultValue: { summary: '0' } } },
    className: { control: false, table: { disable: true } },
  },
} satisfies Meta<typeof ProgressRing>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = { tags: ['dev'] };

export const UnAnillo: Story = {
  name: 'Un anillo',
  parameters: { docs: { description: { story: 'Un porcentaje en tinta: el arco crece desde las doce y la cifra cuenta con él.' } } },
};

export const HaciaUnObjetivo: Story = {
  name: 'Hacia un objetivo',
  parameters: { docs: { description: { story: '`value` sobre `max`, con `display` para escribir la cifra tal como se dice.' } } },
  args: { value: 340, max: 500, display: '340 de 500', label: 'Avance hacia el objetivo', caption: 'Unidades hechas de las previstas' },
};

export const ConAcento: Story = {
  name: 'Con acento',
  parameters: { docs: { description: { story: 'El anillo que importa en amarillo. Uno por parada.' } } },
  args: { tone: 'accent', size: 'l', value: 86, label: 'Medida destacada' },
};

export const VariosEnFila: Story = {
  name: 'Varios en fila',
  parameters: { docs: { description: { story: 'Tres anillos del mismo tamaño en un `Grid`: el que cuenta la historia en tinta y los que lo acompañan en gris.' } } },
  render: () => (
    <Grid align="center">
      <GridItem span={4}>
        <ProgressRing value={64} label="Primera medida" caption="Primera medida" tone="context" />
      </GridItem>
      <GridItem span={4}>
        <ProgressRing value={91} label="Segunda medida" caption="Segunda medida" />
      </GridItem>
      <GridItem span={4}>
        <ProgressRing value={38} label="Tercera medida" caption="Tercera medida" tone="context" />
      </GridItem>
    </Grid>
  ),
};

export const PorPasos: Story = {
  name: 'Por pasos',
  parameters: { docs: { description: { story: 'Dentro de un `Steps`: cada anillo se dibuja al encenderse su paso. Pulsa dentro y usa →.' } } },
  render: () => (
    <Slide id="anillos">
      <Steps total={2}>
        <Stack>
          <SectionHeader title="Título de la parada" description="Una frase que dice qué cambia." align="center" />
          <Grid align="center">
            <GridItem span={4}>
              <ProgressRing value={64} label="Primera medida" caption="Primera medida" tone="context" />
            </GridItem>
            <GridItem span={4}>
              <Step from={1}>
                <ProgressRing value={91} label="Segunda medida" caption="Segunda medida" />
              </Step>
            </GridItem>
            <GridItem span={4}>
              <Step from={2}>
                <ProgressRing value={38} label="Tercera medida" caption="Tercera medida" tone="context" />
              </Step>
            </GridItem>
          </Grid>
        </Stack>
      </Steps>
    </Slide>
  ),
};
