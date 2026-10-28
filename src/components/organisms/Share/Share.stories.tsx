import type { Meta, StoryObj } from '@storybook/react-vite';
import { Grid, GridItem } from '../../molecules/Grid';
import { Share } from './Share';
import { SHARE_DEFAULTS } from './types';
import doc from './_docs/Share.md?raw';

const meta = {
  title: 'Organismos/Share',
  component: Share,
  tags: ['autodocs', '!dev'],
  parameters: { docs: { description: { component: doc } }, layout: 'padded' },
  args: {
    label: 'Reparto del total',
    title: 'Reparto del total',
    segments: [
      { label: 'La parte que importa', value: 64 },
      { label: 'El resto', value: 36 },
    ],
    ...SHARE_DEFAULTS,
  },
  argTypes: {
    segments: { control: false, description: 'Las partes del todo.', table: { type: { summary: 'ShareSegment[]' } } },
    label: { control: 'text', description: 'Nombre accesible.' },
    title: { control: 'text', description: 'Nombre visible sobre la barra.' },
    decimals: { control: 'number', description: 'Decimales de los porcentajes.', table: { defaultValue: { summary: '0' } } },
    className: { control: false, table: { disable: true } },
  },
} satisfies Meta<typeof Share>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = { tags: ['dev'] };

export const DosPartes: Story = {
  name: 'Dos partes',
  parameters: { docs: { description: { story: 'Una parte frente al resto: la frase «dos de cada tres».' } } },
};

export const TresPartes: Story = {
  name: 'Tres partes, una destacada',
  parameters: { docs: { description: { story: 'Tres partes de un total con la del medio en amarillo, y al lado otro reparto con el que compararlo.' } } },
  render: () => (
    <Grid>
      <GridItem span={6}>
        <Share
          label="Reparto antes"
          title="Antes"
          segments={[
            { label: 'Primera parte', value: 52, tone: 'ink' },
            { label: 'Segunda parte', value: 30, tone: 'accent' },
            { label: 'Tercera parte', value: 18, tone: 'context' },
          ]}
        />
      </GridItem>
      <GridItem span={6}>
        <Share
          label="Reparto ahora"
          title="Ahora"
          segments={[
            { label: 'Primera parte', value: 31, tone: 'ink' },
            { label: 'Segunda parte', value: 61, tone: 'accent' },
            { label: 'Tercera parte', value: 8, tone: 'context' },
          ]}
        />
      </GridItem>
    </Grid>
  ),
};
