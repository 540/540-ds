import type { Meta, StoryObj } from '@storybook/react-vite';
import { Grid, GridItem } from '../Grid';
import { Metric, MetricNote } from './Metric';
import doc from './_docs/Metric.md?raw';

const meta = {
  title: 'Moléculas/Metric',
  component: Metric,
  tags: ['autodocs', '!dev'],
  parameters: { docs: { description: { component: doc } }, layout: 'padded' },
  args: { value: '0,76 %', label: 'Lo que mide esta cifra', delta: '−89 % desde el valor inicial' },
  argTypes: {
    value: { control: 'text', table: { type: { summary: 'ReactNode' } } },
    label: { control: 'text', table: { type: { summary: 'ReactNode' } } },
    delta: { control: 'text', table: { type: { summary: 'ReactNode' } } },
    className: { control: false, table: { disable: true } },
  },
} satisfies Meta<typeof Metric>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = { tags: ['dev'], parameters: { layout: 'centered' }, render: (args) => <div style={{ width: 280 }}><Metric {...args} /></div> };

export const Fila: Story = {
  name: 'Una fila de datos',
  parameters: { docs: { description: { story: 'Cuatro datos en un Grid de cuatro columnas y, debajo, la nota de dónde salen.' } } },
  render: () => (
    <>
      <Grid>
        {[
          { value: '0,76 %', label: 'Lo que mide la primera cifra', delta: '−89 % desde el valor inicial' },
          { value: '2,81', label: 'Lo que mide la segunda', delta: '−30 % desde 4,03' },
          { value: '17', label: 'Lo que mide la tercera', delta: '−45 % desde el pico de 31' },
          { value: '28', label: 'Lo que mide la cuarta' },
        ].map((m) => (
          <GridItem key={m.value} span={3}>
            <Metric {...m} />
          </GridItem>
        ))}
      </Grid>
      <MetricNote>Medido cada semana durante veintiocho semanas sobre la rama principal.</MetricNote>
    </>
  ),
};
