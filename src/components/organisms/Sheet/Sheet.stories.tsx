import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button } from '../../atoms/Button';
import { Card } from '../../molecules/Card';
import { SectionHeader } from '../../molecules/SectionHeader';
import { Slide } from '../Slide';
import { Step, Steps } from '../Steps';
import { Sheet } from './Sheet';
import doc from './_docs/Sheet.md?raw';

const CUERPO = (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--grid-gutter)', textAlign: 'start' }}>
    {[1, 2, 3].map((n) => (
      <Card key={n} ordinal={`0${n}`} title={`Detalle ${n}`} align="center">
        Dos o tres frases sobre este detalle ampliado.
      </Card>
    ))}
  </div>
);

const meta = {
  title: 'Organismos/Sheet',
  component: Sheet,
  tags: ['autodocs', '!dev'],
  parameters: { docs: { description: { component: doc }, story: { inline: false, height: '640px' } }, layout: 'fullscreen' },
  args: { kicker: 'Zoom · antetítulo', title: 'Título de la hoja', description: 'Una frase que dice qué se amplía aquí.', children: CUERPO },
  argTypes: {
    open: { control: false, description: 'Abierta o cerrada. Dentro de un Step, sigue al paso.', table: { type: { summary: 'boolean' } } },
    kicker: { control: 'text', table: { type: { summary: 'ReactNode' } } },
    title: { control: 'text', table: { type: { summary: 'ReactNode' } } },
    description: { control: 'text', table: { type: { summary: 'ReactNode' } } },
    children: { control: false, table: { type: { summary: 'ReactNode' } } },
    className: { control: false, table: { disable: true } },
  },
} satisfies Meta<typeof Sheet>;

export default meta;
type Story = StoryObj<typeof meta>;

function ConBoton(args: React.ComponentProps<typeof Sheet>) {
  const [open, setOpen] = useState(false);
  return (
    <Slide id="hoja">
      <SectionHeader title="Una parada con un detalle" description="Pulsa el botón para abrir la hoja; vuelve a pulsarlo para cerrarla." align="center" />
      <div style={{ marginTop: 'var(--space-xl)' }}>
        <Button variant="outline" onClick={() => setOpen((o) => !o)}>
          {open ? 'Cerrar la hoja' : 'Abrir la hoja'}
        </Button>
      </div>
      <Sheet {...args} open={open} />
    </Slide>
  );
}

export const Playground: Story = { tags: ['dev'], render: (args) => <ConBoton {...args} /> };

export const ConBotonStory: Story = {
  name: 'Con botón',
  parameters: { docs: { description: { story: 'La hoja abierta y cerrada a mano, para verla sin teclado.' } } },
  render: (args) => <ConBoton {...args} />,
};

export const EnUnPaso: Story = {
  name: 'En un paso',
  parameters: { docs: { description: { story: 'Como va en las charlas: la flecha → abre la hoja en el paso 1 y la siguiente la cierra (paso 2). Pulsa dentro del lienzo antes de usar el teclado.' } } },
  render: (args) => (
    <Slide id="hoja-pasos">
      <Steps total={2}>
        <SectionHeader title="Una parada que se recorre" description="Paso 0: la cabecera. Paso 1: la hoja. Paso 2: la hoja se cierra." align="center" />
        <Step from={1} to={2}>
          <Sheet {...args} />
        </Step>
      </Steps>
    </Slide>
  ),
};
