import type { Meta, StoryObj } from '@storybook/react-vite';
import { SectionHeader } from '../../molecules/SectionHeader';
import { Stack } from '../../molecules/Stack';
import { Slide } from '../Slide';
import { Step, Steps } from '../Steps';
import { Waffle } from './Waffle';
import { WAFFLE_DEFAULTS } from './types';
import doc from './_docs/Waffle.md?raw';

const meta = {
  title: 'Organismos/Waffle',
  component: Waffle,
  tags: ['autodocs', '!dev'],
  parameters: { docs: { description: { component: doc } }, layout: 'padded' },
  args: { value: 37, label: 'Primera medida', caption: 'Qué cuenta la cifra, en pocas palabras', ...WAFFLE_DEFAULTS },
  argTypes: {
    value: { control: 'number', description: 'La parte destacada: sobre 100, o sobre `total`.' },
    total: { control: 'number', description: 'El total del que forma parte. Por defecto 100.', table: { defaultValue: { summary: '100' } } },
    label: { control: 'text', description: 'Nombre accesible de la gráfica; se le añaden las cifras.' },
    name: { control: 'text', description: 'Nombre de la parte destacada en la leyenda. Solo con una segunda parte.' },
    display: { control: 'text', description: 'Cómo se escribe la cifra («37 de cada 100»). Por defecto, el porcentaje, contando.' },
    caption: { control: 'text', description: 'Texto corto bajo la cifra, en gris.' },
    tone: { control: 'inline-radio', options: ['ink', 'accent'], description: 'Tinta o amarillo.', table: { defaultValue: { summary: 'ink' } } },
    secondary: { control: false, description: 'Una segunda parte opcional, en gris, detrás de la destacada. Trae leyenda.', table: { type: { summary: 'WafflePart' } } },
    decimals: { control: 'number', description: 'Decimales del porcentaje.', table: { defaultValue: { summary: '0' } } },
    className: { control: false, table: { disable: true } },
  },
} satisfies Meta<typeof Waffle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = { tags: ['dev'] };

export const UnaParte: Story = {
  name: 'Una parte',
  parameters: { docs: { description: { story: 'Una proporción en tinta: los cuadros se llenan en orden de lectura y la cifra cuenta con ellos.' } } },
};

export const DeCadaCien: Story = {
  name: 'De cada cien',
  parameters: { docs: { description: { story: '`display` para escribir la cifra tal como se dice en voz alta.' } } },
  args: { display: '37 de cada 100' },
};

export const SobreUnTotal: Story = {
  name: 'Sobre un total',
  parameters: { docs: { description: { story: '`value` sobre `total`: el gofre lo pasa a cuadros de cien.' } } },
  args: { value: 18, total: 48, label: 'Segunda medida', caption: 'Elementos que cumplen de un total de 48' },
};

export const DosPartes: Story = {
  name: 'Dos partes',
  parameters: { docs: { description: { story: 'Con `secondary`: una segunda parte en gris detrás de la destacada, y leyenda.' } } },
  args: { value: 42, name: 'Primera parte', secondary: { value: 31, label: 'Segunda parte' }, caption: 'El resto, en gris claro, no está en ninguna' },
};

export const ConAcento: Story = {
  name: 'Con acento',
  parameters: { docs: { description: { story: 'La parte que importa en amarillo. Un acento por parada.' } } },
  args: { tone: 'accent', value: 64 },
};

export const PorPasos: Story = {
  name: 'Por pasos',
  parameters: { docs: { description: { story: 'Dentro de un `Steps`: en el paso 0, la parte destacada; en el paso 1, la misma con la segunda parte. Pulsa dentro y usa →.' } } },
  render: () => (
    <Slide id="gofre">
      <Steps total={1}>
        <Stack>
          <SectionHeader title="Título de la parada" description="Una frase que dice qué cambia." align="center" />
          <Step from={0} to={1} collapse>
            <Waffle value={42} label="Primera medida" caption="Qué cuenta la cifra" />
          </Step>
          <Step from={1} collapse>
            <Waffle value={42} label="Primera medida" name="Primera parte" secondary={{ value: 31, label: 'Segunda parte' }} caption="Qué cuenta la cifra" />
          </Step>
        </Stack>
      </Steps>
    </Slide>
  ),
};
