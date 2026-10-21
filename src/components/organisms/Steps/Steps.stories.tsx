import type { Meta, StoryObj } from '@storybook/react-vite';
import { Text } from '../../atoms/Text';
import { Card } from '../../molecules/Card';
import { SectionHeader } from '../../molecules/SectionHeader';
import { Slide } from '../Slide';
import { PanelStack, Step, Steps } from './Steps';
import doc from './_docs/Steps.md?raw';

const meta = {
  title: 'Organismos/Steps',
  component: Steps,
  tags: ['autodocs', '!dev'],
  parameters: { docs: { description: { component: doc }, story: { inline: false, height: '640px' } }, layout: 'fullscreen' },
  args: { total: 4, children: null },
  argTypes: {
    total: { control: 'number', description: 'Cuántos pasos tiene el bloque.', table: { type: { summary: 'number' } } },
    children: { control: false, table: { type: { summary: 'ReactNode' } } },
    onStep: { control: false, table: { type: { summary: '(step: number) => void' } } },
    className: { control: false, table: { disable: true } },
  },
} satisfies Meta<typeof Steps>;

export default meta;
type Story = StoryObj<typeof meta>;

function Demo() {
  return (
    <Slide id="pasos">
      <Steps total={4}>
        <PanelStack>
          <Step from={0} to={3}>
            <SectionHeader title="Título que presenta las tarjetas" align="center" />
          </Step>
          <Step from={3}>
            <SectionHeader title="Otro título cuando ya están todas" align="center" />
          </Step>
        </PanelStack>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--grid-gutter)', marginTop: 'var(--space-2xl)', textAlign: 'start' }}>
          {[1, 2, 3, 4].map((n) => (
            <Step key={n} from={n}>
              <Card ordinal={`0${n}`} title={`Tarjeta ${n}`} align="center">
                Aparece en el paso {n}.
              </Card>
            </Step>
          ))}
        </div>
        <Step from={4}>
          <Text variant="body-l" tone="secondary" align="center" wrap="pretty" measure="half" style={{ marginTop: 'var(--space-2xl)' }}>
            Y al final, una frase que cierra. La siguiente flecha ya pasa de parada.
          </Text>
        </Step>
      </Steps>
    </Slide>
  );
}

export const Playground: Story = { tags: ['dev'], render: () => <Demo /> };

export const CuatroTarjetas: Story = {
  name: 'Cuatro tarjetas',
  parameters: {
    docs: {
      description: {
        story: 'Pulsa dentro y usa la flecha →: la cabecera está desde el principio, las cuatro tarjetas entran una a una, en el paso 3 la cabecera cambia (PanelStack) y en el 4 aparece la frase. La siguiente flecha pasaría a la siguiente parada.',
      },
    },
  },
  render: () => <Demo />,
};
