import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from '../Card';
import { Grid, GridItem } from './Grid';
import { GRID_ALIGNS, GRID_DEFAULTS, GRID_LAYOUTS } from './types';
import doc from './_docs/Grid.md?raw';

const card = (n: number) => (
  <Card ordinal={`0${n}`} title={`Tarjeta ${n}`} align="center">
    Dos frases sobre esta tarjeta.
  </Card>
);

const meta = {
  title: 'Moléculas/Grid',
  component: Grid,
  tags: ['autodocs', '!dev'],
  parameters: { docs: { description: { component: doc } }, layout: 'padded' },
  args: { ...GRID_DEFAULTS, compact: false, children: null },
  argTypes: {
    layout: { control: 'inline-radio', options: [...GRID_LAYOUTS], description: '`twelve` con spans; `five` cinco iguales; `fiveCentered` tres y dos.', table: { defaultValue: { summary: GRID_DEFAULTS.layout } } },
    align: { control: 'inline-radio', options: [...GRID_ALIGNS], description: '`stretch` iguala alturas; `center` centra cada celda en altura.', table: { defaultValue: { summary: GRID_DEFAULTS.align } } },
    compact: { control: 'boolean', description: 'Textos y rellenos un punto más pequeños.', table: { defaultValue: { summary: 'false' } } },
    children: { control: false, table: { type: { summary: 'ReactNode' } } },
    className: { control: false, table: { disable: true } },
  },
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  tags: ['dev'],
  render: (args) => (
    <Grid {...args}>
      {[1, 2, 3, 4, 5].map((n) => (
        <GridItem key={n} span={4}>
          {card(n)}
        </GridItem>
      ))}
    </Grid>
  ),
};

export const TresPorFila: Story = {
  name: 'Tres por fila',
  parameters: { docs: { description: { story: 'Tres celdas de span 4. Estrecha el **Viewport**: media fila en tablet, la fila entera en móvil.' } } },
  render: () => (
    <Grid>
      {[1, 2, 3].map((n) => (
        <GridItem key={n} span={4}>
          {card(n)}
        </GridItem>
      ))}
    </Grid>
  ),
};

export const SieteYCinco: Story = {
  name: 'Siete y cinco',
  parameters: { docs: { description: { story: 'Dos columnas desiguales (7 + 5), como el anillo y su panel.' } } },
  render: () => (
    <Grid>
      <GridItem span={7}>{card(1)}</GridItem>
      <GridItem span={5}>{card(2)}</GridItem>
    </Grid>
  ),
};

export const CincoCompacta: Story = {
  name: 'Cinco, compacta',
  parameters: { docs: { description: { story: 'Cinco columnas iguales con la densidad compacta: textos y rellenos un punto más pequeños para que quepan.' } } },
  render: () => (
    <Grid layout="five" compact>
      {[1, 2, 3, 4, 5].map((n) => (
        <GridItem key={n}>{card(n)}</GridItem>
      ))}
    </Grid>
  ),
};

export const TresYDos: Story = {
  name: 'Tres y dos',
  parameters: { docs: { description: { story: 'Cinco piezas: tres arriba y dos centradas debajo, desde 1024 px.' } } },
  render: () => (
    <Grid layout="fiveCentered">
      {[1, 2, 3, 4, 5].map((n) => (
        <GridItem key={n} span={4}>
          {card(n)}
        </GridItem>
      ))}
    </Grid>
  ),
};
