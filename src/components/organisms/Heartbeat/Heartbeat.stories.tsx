import type { Meta, StoryObj } from '@storybook/react-vite';
import { Text } from '../../atoms/Text';
import { Heartbeat } from './Heartbeat';
import doc from './_docs/Heartbeat.md?raw';

const meta = {
  title: 'Organismos/Heartbeat',
  component: Heartbeat,
  tags: ['autodocs', '!dev'],
  parameters: { docs: { description: { component: doc } }, layout: 'centered' },
  argTypes: { className: { control: false, table: { disable: true } } },
} satisfies Meta<typeof Heartbeat>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = { tags: ['dev'] };

export const ConFrase: Story = {
  name: 'Con frase',
  parameters: { docs: { description: { story: 'El latido y, debajo, la frase que dice qué está vivo.' } } },
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--space-xl)', justifyItems: 'center', textAlign: 'center' }}>
      <Heartbeat />
      <Text variant="body-l" tone="secondary" wrap="pretty" measure="half">
        Una frase que explica qué proceso late aquí.
      </Text>
    </div>
  ),
};
