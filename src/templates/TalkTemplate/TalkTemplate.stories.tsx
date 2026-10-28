import type { Meta, StoryObj } from '@storybook/react-vite';
import { TalkTemplate } from './TalkTemplate';
import doc from './_docs/TalkTemplate.md?raw';

const meta = {
  title: 'Plantillas/Charla completa',
  component: TalkTemplate,
  tags: ['autodocs', '!dev'],
  parameters: { docs: { description: { component: doc }, story: { inline: false, height: '720px' } }, layout: 'fullscreen' },
  args: { defaultTheme: 'dark' },
  argTypes: {
    defaultTheme: { control: 'inline-radio', options: ['dark', 'light'], description: 'Tema de inicio. Las charlas se proyectan en oscuro.', table: { defaultValue: { summary: 'dark' } } },
  },
} satisfies Meta<typeof TalkTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = { tags: ['dev'] };

export const EnOscuro: Story = {
  name: 'En oscuro',
  parameters: { docs: { description: { story: 'La plantilla como se proyecta. Pulsa dentro y recorre con las flechas o el espacio: los bloques con pasos (tarjetas, ciclo, tramo, esquema, barras, zoom) consumen la flecha antes de pasar de parada.' } } },
};

export const EnClaro: Story = {
  name: 'En claro',
  parameters: { docs: { description: { story: 'La misma plantilla en claro: todo lo que se ve en oscuro tiene que verse aquí.' } } },
  args: { defaultTheme: 'light' },
};
