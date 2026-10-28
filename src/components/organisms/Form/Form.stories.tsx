import type { Meta, StoryObj } from '@storybook/react-vite';
import { Field } from '../../molecules/Field';
import { Form } from './Form';
import doc from './_docs/Form.md?raw';

const meta = {
  title: 'Organismos/Form',
  component: Form,
  tags: ['autodocs', '!dev'],
  parameters: { docs: { description: { component: doc } }, layout: 'padded' },
  args: {
    submitLabel: 'Enviar mensaje',
    onSubmit: (e) => e.preventDefault(),
    children: (
      <>
        <Field label="Nombre" id="form-nombre" required autoComplete="name" />
        <Field label="Correo" id="form-correo" type="email" required autoComplete="email" />
        <Field label="Empresa" id="form-empresa" autoComplete="organization" />
        <Field label="Mensaje" id="form-mensaje" multiline required />
      </>
    ),
  },
  argTypes: {
    children: { control: false, description: 'Los campos, normalmente Field.', table: { type: { summary: 'ReactNode' } } },
    submitLabel: { control: 'text', description: 'El verbo y el objeto del botón de envío.', table: { type: { summary: 'string' } } },
    align: { control: 'inline-radio', options: ['end', 'center'], description: 'Dónde va el envío: al final (web) o centrado (charla).', table: { defaultValue: { summary: 'end' } } },
    noValidate: { control: 'boolean', description: 'Apaga los globos del navegador.', table: { defaultValue: { summary: 'true' } } },
    className: { control: false, table: { disable: true } },
  },
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  tags: ['dev'],
  parameters: { layout: 'centered' },
  render: (args) => (
    <div style={{ width: 'min(588px, 90vw)' }}>
      <Form {...args} />
    </div>
  ),
};

export const Contacto: Story = {
  parameters: { docs: { description: { story: 'Los cuatro campos del formulario de contacto, con 24 px entre ellos, y el envío al final de la fila. Mide media retícula.' } } },
  render: (args) => (
    <div style={{ width: 'min(588px, 90vw)' }}>
      <Form {...args} />
    </div>
  ),
};
