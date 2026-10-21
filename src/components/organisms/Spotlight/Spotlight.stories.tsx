import type { Meta, StoryObj } from '@storybook/react-vite';
import { Text } from '../../atoms/Text';
import { Spotlight } from './Spotlight';
import doc from './_docs/Spotlight.md?raw';

const meta = {
  title: 'Organismos/Spotlight',
  component: Spotlight,
  tags: ['autodocs', '!dev'],
  parameters: { docs: { description: { component: doc }, story: { inline: false, height: '560px' } }, layout: 'fullscreen' },
  args: { children: null },
  argTypes: { children: { control: false, table: { type: { summary: 'ReactNode' } } }, className: { control: false, table: { disable: true } } },
} satisfies Meta<typeof Spotlight>;

export default meta;
type Story = StoryObj<typeof meta>;

const Pila = () => (
  <div style={{ display: 'grid', gap: '40svh', padding: '45svh var(--padding-page)', justifyItems: 'center' }}>
    {['Primera frase de la pila.', 'Segunda frase de la pila.', 'Tercera frase de la pila.', 'Cuarta frase de la pila.'].map((f) => (
      <Spotlight key={f}>
        <Text variant="statement" align="center" wrap="balance" measure="wide">
          {f}
        </Text>
      </Spotlight>
    ))}
  </div>
);

export const Playground: Story = { tags: ['dev'], render: () => <Pila /> };

export const Pila4: Story = {
  name: 'Una pila de frases',
  parameters: { docs: { description: { story: 'Baja con el scroll: solo la frase que ocupa el centro está encendida; las demás quedan al 14 %.' } } },
  render: () => <Pila />,
};
