import type { Meta, StoryObj } from '@storybook/react-vite';
import { LogoCarousel } from './LogoCarousel';
import { LOGO_CAROUSEL_DEFAULTS } from './types';
import doc from './_docs/LogoCarousel.md?raw';
import c1 from '../../../assets/samples/logos/cliente-1.svg';
import c2 from '../../../assets/samples/logos/cliente-2.svg';
import c3 from '../../../assets/samples/logos/cliente-3.svg';
import c4 from '../../../assets/samples/logos/cliente-4.svg';
import c5 from '../../../assets/samples/logos/cliente-5.svg';
import c6 from '../../../assets/samples/logos/cliente-6.svg';
import c7 from '../../../assets/samples/logos/cliente-7.svg';
import c8 from '../../../assets/samples/logos/cliente-8.svg';
import c9 from '../../../assets/samples/logos/cliente-9.svg';

const LOGOS = [c1, c2, c3, c4, c5, c6, c7, c8, c9].map((src, i) => ({ src, name: `Cliente ${i + 1}` }));

const meta = {
  title: 'Organismos/LogoCarousel',
  component: LogoCarousel,
  tags: ['autodocs', '!dev'],
  parameters: { docs: { description: { component: doc } }, layout: 'fullscreen' },
  args: { logos: LOGOS, label: 'Clientes', ...LOGO_CAROUSEL_DEFAULTS },
  argTypes: {
    logos: { control: false, description: 'Los logotipos, con el nombre de cada cliente.', table: { type: { summary: 'ClientLogo[]' } } },
    label: { control: 'text', table: { type: { summary: 'string' } } },
    interval: { control: { type: 'number', min: 800, max: 8000, step: 100 }, description: 'Milisegundos entre pasos.', table: { defaultValue: { summary: String(LOGO_CAROUSEL_DEFAULTS.interval) } } },
    className: { control: false, table: { disable: true } },
  },
} satisfies Meta<typeof LogoCarousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = { tags: ['dev'] };

export const Tira: Story = {
  parameters: { docs: { description: { story: 'Nueve logotipos en siete huecos: el del centro a plena tinta y un 8 % más grande. Avanza solo; pasa el ratón para pararlo. Cambia el **Tema** y el **Viewport** (5 huecos en tablet, 3 en móvil).' } } },
};
