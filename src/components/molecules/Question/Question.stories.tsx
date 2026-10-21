import type { Meta, StoryObj } from '@storybook/react-vite';
import { Question } from './Question';
import doc from './_docs/Question.md?raw';

const meta = {
  title: 'Moléculas/Question',
  component: Question,
  tags: ['autodocs', '!dev'],
  parameters: { docs: { description: { component: doc } }, layout: 'padded' },
  args: {
    question: (
      <>
        <strong>Q1 · ¿La primera pregunta?</strong> Un matiz que la concreta.
      </>
    ),
    answer: 'La respuesta, en una frase.',
  },
  argTypes: {
    question: { control: false, table: { type: { summary: 'ReactNode' } } },
    answer: { control: 'text', table: { type: { summary: 'ReactNode' } } },
    className: { control: false, table: { disable: true } },
  },
} satisfies Meta<typeof Question>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = { tags: ['dev'], parameters: { layout: 'centered' }, render: (args) => <div style={{ width: 480 }}><Question {...args} /></div> };

export const Tres: Story = {
  name: 'Tres preguntas',
  parameters: { docs: { description: { story: 'Tres preguntas numeradas, apiladas, cada una con su línea.' } } },
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--space-l)', maxWidth: 480, margin: '0 auto' }}>
      {[1, 2, 3].map((n) => (
        <Question
          key={n}
          question={
            <>
              <strong>Q{n} · ¿Pregunta número {n}?</strong> Un matiz que la concreta.
            </>
          }
          answer="La respuesta, en una frase."
        />
      ))}
    </div>
  ),
};
