import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '../../atoms/Button';
import { Dialog } from './Dialog';
import doc from './_docs/Dialog.md?raw';
import retrato from '../../../assets/samples/retrato.svg';

const TEXTO =
  'Lleva el equipo de desarrollo y las decisiones de arquitectura. Ahora, con el sistema de diseño en código: tokens, componentes y la documentación que el equipo usa de verdad. Antes, diez años construyendo producto para otros.';

function Demo(props: { media?: boolean; footer?: boolean; long?: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Abrir la ficha
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="Markel Aldaz · Head of Engineering"
        media={props.media ? { src: retrato, alt: '' } : undefined}
        footer={
          props.footer ? (
            <Button variant="outline" size="sm" icon={<ArrowRight />} href="#markel">
              Ver perfil
            </Button>
          ) : undefined
        }
      >
        {props.long ? `${TEXTO} ${TEXTO} ${TEXTO} ${TEXTO}` : TEXTO}
      </Dialog>
    </>
  );
}

const meta = {
  title: 'Moléculas/Dialog',
  component: Dialog,
  tags: ['autodocs', '!dev'],
  parameters: { docs: { description: { component: doc } }, layout: 'padded' },
  args: { open: false, onClose: () => {}, title: 'Markel Aldaz', children: TEXTO },
  argTypes: {
    open: { control: false, description: 'Si está abierto. Lo decide la pantalla.', table: { type: { summary: 'boolean' } } },
    onClose: { control: false, description: 'Avisa de que hay que cerrar: Escape, la cruz o un clic en el velo.', table: { type: { summary: '() => void' } } },
    title: { control: 'text', description: 'El título: el encabezado que se ve y el nombre del diálogo.', table: { type: { summary: 'ReactNode' } } },
    media: { control: false, description: 'Retrato opcional, a sangre, recortado a cuadrado.', table: { type: { summary: '{ src, alt }' } } },
    footer: { control: false, description: 'Fila de acciones opcional.', table: { type: { summary: 'ReactNode' } } },
    children: { control: 'text', description: 'El texto. Lo único que se desplaza si no cabe.', table: { type: { summary: 'ReactNode' } } },
    className: { control: false, table: { disable: true } },
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = { tags: ['dev'], parameters: { layout: 'centered' }, render: () => <Demo media footer /> };

export const Completo: Story = {
  parameters: { docs: { description: { story: 'Retrato, título, texto y pie. Ábrelo: el foco entra, Escape cierra, y un clic en el velo también.' } } },
  render: () => <Demo media footer />,
};

export const SoloTexto: Story = {
  name: 'Solo texto',
  parameters: { docs: { description: { story: 'Sin retrato ni pie: título, cruz y texto.' } } },
  render: () => <Demo />,
};

export const TextoLargo: Story = {
  name: 'Texto largo',
  parameters: { docs: { description: { story: 'Cuando el contenido no cabe, se desplaza solo el texto: el título y la cruz se quedan a la vista.' } } },
  render: () => <Demo media long />,
};
