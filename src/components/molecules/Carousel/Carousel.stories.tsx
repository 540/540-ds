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
  <CaseItem key="1" src={pintura} title="Primer caso" description="Una frase que cuenta de qué iba el caso." href="#caso-1" />,
  <CaseItem key="2" src={david} title="Segundo caso" description="Una frase que cuenta de qué iba este otro." href="#caso-2" />,
  <CaseItem key="3" src={fachada} title="Tercer caso" description="Una frase más, igual de corta." href="#caso-3" />,
  <CaseItem key="4" src={pintura} title="Cuarto caso" description="Y una cuarta pieza para que la tira se pase." href="#caso-4" />,
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
  args: { controls: 'row', header: <SectionHeader title="Título de la tira" description="Una entradilla corta." /> },
};
