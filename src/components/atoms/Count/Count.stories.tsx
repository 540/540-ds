import type { Meta, StoryObj } from '@storybook/react-vite';
import { Grid, GridItem } from '../../molecules/Grid';
import { Metric, MetricNote } from '../../molecules/Metric';
import { Stack } from '../../molecules/Stack';
import { Text } from '../Text';
import { Count } from './Count';
import { COUNT_DEFAULTS } from './types';
import doc from './_docs/Count.md?raw';

const meta = {
  title: 'Átomos/Count',
  component: Count,
  tags: ['autodocs', '!dev'],
  parameters: { docs: { description: { component: doc } }, layout: 'padded' },
  args: { value: 79592, ...COUNT_DEFAULTS },
  argTypes: {
    value: { control: 'number', description: 'La cifra final.', table: { type: { summary: 'number' } } },
    decimals: { control: 'number', description: 'Decimales, con coma.', table: { defaultValue: { summary: '0' } } },
    prefix: { control: 'text', description: 'Texto antes de la cifra.' },
    suffix: { control: 'text', description: 'Texto después de la cifra, con su espacio.' },
    className: { control: false, table: { disable: true } },
  },
} satisfies Meta<typeof Count>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  tags: ['dev'],
  render: (args) => (
    <Text variant="statement" align="center">
      <Count {...args} />
    </Text>
  ),
};

export const EnUnaFilaDeDatos: Story = {
  name: 'En una fila de datos',
  parameters: { docs: { description: { story: 'Cuatro `Metric` cuya cifra es un `Count`. Suben al llegar; con movimiento reducido se ven ya hechas.' } } },
  render: () => (
    <Stack gap="s">
      <Grid>
        {[
          { value: <Count value={1240} />, label: 'Lo que mide la primera cifra' },
          { value: <Count value={45.9} decimals={1} suffix=" %" />, label: 'Lo que mide la segunda', delta: '+6 puntos desde el inicio' },
          { value: <Count value={79592} />, label: 'Lo que mide la tercera' },
          { value: <Count value={312} prefix="+" />, label: 'Lo que mide la cuarta' },
        ].map((m, i) => (
          <GridItem key={i} span={3}>
            <Metric {...m} />
          </GridItem>
        ))}
      </Grid>
      <MetricNote>De dónde salen las cifras: qué se midió, cuándo y cómo.</MetricNote>
    </Stack>
  ),
};
