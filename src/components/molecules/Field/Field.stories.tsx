import type { Meta, StoryObj } from '@storybook/react-vite';
import { Field } from './Field';
import { FIELD_DEFAULTS, FIELD_SIZES } from './types';
import doc from './_docs/Field.md?raw';

const meta = {
  title: 'Moléculas/Field',
  component: Field,
  tags: ['autodocs', '!dev'],
  parameters: { docs: { description: { component: doc } }, layout: 'padded' },
  args: { label: 'Nombre', id: 'nombre', placeholder: 'Cómo te llamas', ...FIELD_DEFAULTS },
  argTypes: {
    label: { control: 'text', description: 'La etiqueta, obligatoria, en caja normal.', table: { type: { summary: 'string' } } },
    id: { control: 'text', description: 'Ata la etiqueta al control. Único por página.', table: { type: { summary: 'string' } } },
    size: {
      control: 'inline-radio',
      options: [...FIELD_SIZES],
      description: 'Alto del control: 45 (`md`) o 36 (`sm`).',
      table: { type: { summary: FIELD_SIZES.join(' | ') }, defaultValue: { summary: FIELD_DEFAULTS.size } },
    },
    multiline: { control: 'boolean', description: 'Un `textarea` para mensajes.', table: { type: { summary: 'boolean' } } },
    placeholder: { control: 'text', description: 'Pista dentro del control. No sustituye a la etiqueta.', table: { type: { summary: 'string' } } },
    disabled: { control: 'boolean', table: { type: { summary: 'boolean' } } },
    className: { control: false, table: { disable: true } },
  },
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  tags: ['dev'],
  parameters: { layout: 'centered' },
  render: (args) => (
    <div style={{ width: 320 }}>
      <Field {...args} />
    </div>
  ),
};

export const Estados: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Normal, con texto y deshabilitado, en los dos tamaños. Pulsa dentro de uno para ver el foco: la línea pasa a 2 px y al color de foco, sin anillo.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 320px)', gap: 'var(--space-3xl) var(--grid-gutter)' }}>
      {FIELD_SIZES.map((size) => (
        <div key={size} style={{ display: 'contents' }}>
          <Field label={`Nombre · ${size}`} id={`n-${size}`} size={size} placeholder="Cómo te llamas" />
          <Field label="Correo" id={`c-${size}`} size={size} type="email" defaultValue="olaia@540deg.com" />
          <Field label="Empresa" id={`e-${size}`} size={size} placeholder="Deshabilitado" disabled />
        </div>
      ))}
    </div>
  ),
};

export const Formulario: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Los cuatro campos del formulario de contacto: nombre, correo, empresa y mensaje (multilínea). La leyenda de obligatorios va antes del formulario y la obligatoriedad en `required`.',
      },
    },
  },
  render: () => (
    <form style={{ display: 'grid', gap: 'var(--space-xl)', width: 480 }} onSubmit={(e) => e.preventDefault()}>
      <Field label="Nombre" id="f-nombre" required autoComplete="name" />
      <Field label="Correo" id="f-correo" type="email" required autoComplete="email" />
      <Field label="Empresa" id="f-empresa" autoComplete="organization" />
      <Field label="Mensaje" id="f-mensaje" multiline required placeholder="Cuéntanos el problema y nada más." />
    </form>
  ),
};
