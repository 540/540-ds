import type { Meta, StoryObj } from '@storybook/react-vite';
import { CaseItem } from '../CaseItem';
import { SectionHeader } from '../SectionHeader';
import { Carousel } from './Carousel';
import { CAROUSEL_CONTROLS, CAROUSEL_DEFAULTS } from './types';
import doc from './_docs/Carousel.md?raw';
import pintura from '../../../assets/samples/charla-pintura.webp';
import david from '../../../assets/samples/charla-david.webp';
import fachada from '../../../assets/samples/charla-fachada.webp';

const CASOS = [
  <CaseItem key="1" src={pintura} title="Jakala" description="Un sistema de diseño que el equipo usa de verdad." href="#jakala" />,
  <CaseItem key="2" src={david} title="Saltoki" description="La calculadora de ahorro energético." href="#saltoki" />,
  <CaseItem key="3" src={fachada} title="Herramientas PIM" description="Un catálogo para un equipo que no diseña." href="#pim" />,
  <CaseItem key="4" src={pintura} title="540 Design System" description="Este mismo sistema, en Storybook." href="#ds" />,
];

const meta = {
  title: 'Moléculas/Carousel',
  component: Carousel,
  tags: ['autodocs', '!dev'],
  parameters: { docs: { description: { component: doc } }, layout: 'padded' },
  args: { items: CASOS, label: 'Casos del portfolio', ...CAROUSEL_DEFAULTS },
  argTypes: {
    items: { control: false, description: 'Las piezas, una por hueco.', table: { type: { summary: 'ReactNode[]' } } },
    label: { control: 'text', description: 'Nombre del carrusel para el lector de pantalla.', table: { type: { summary: 'string' } } },
    controls: {
      control: 'inline-radio',
      options: [...CAROUSEL_CONTROLS],
      description: '`dots` puntos centrados; `row` puntos y flechas en fila; `sides` flechas sobre la tira, sin puntos.',
      table: { type: { summary: CAROUSEL_CONTROLS.join(' | ') }, defaultValue: { summary: CAROUSEL_DEFAULTS.controls } },
    },
    header: { control: false, description: 'Cabecera encima de la tira. Con ella, los mandos suben a su fila.', table: { type: { summary: 'ReactNode' } } },
    itemWidth: { control: 'text', description: 'Ancho de cada hueco, en CSS. Por defecto media retícula desde 600 px.', table: { type: { summary: 'string' } } },
    autoplay: { control: 'number', description: 'Milisegundos entre avances. Apagado por defecto.', table: { type: { summary: 'number' } } },
    itemLabel: { control: 'text', table: { defaultValue: { summary: CAROUSEL_DEFAULTS.itemLabel } } },
    className: { control: false, table: { disable: true } },
  },
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = { tags: ['dev'] };

export const Puntos: Story = {
  parameters: { docs: { description: { story: 'El de serie: los puntos centrados debajo, sin flechas. Pulsa un punto o arrastra la tira.' } } },
  args: { controls: 'dots' },
};

export const Fila: Story = {
  parameters: { docs: { description: { story: 'Puntos y flechas en una fila: los puntos ocupan lo que sobra y las flechas van al final.' } } },
  args: { controls: 'row' },
};

export const Lados: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Las flechas superpuestas a la tira, una a cada lado, y sin puntos: ahí son el único mando. Es lo que usan los casos de Portfolio y el muro de Equipo.',
      },
    },
  },
  args: { controls: 'sides' },
};

export const ConCabecera: Story = {
  name: 'Con cabecera',
  parameters: { docs: { description: { story: 'La tira cuelga de un título y los mandos suben a su fila. Con cabecera no hay puntos solos: al lado de un título compiten con él.' } } },
  args: { controls: 'row', header: <SectionHeader title="Casos" description="Lo que hemos construido, en orden." /> },
};
