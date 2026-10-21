import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { Text } from '../Text';
import { SocialIcon } from './SocialIcon';
import { SOCIAL_ICON_DEFAULTS, SOCIAL_ICON_SIZES, SOCIAL_NETWORKS } from './types';
import doc from './_docs/SocialIcon.md?raw';

const Caption = ({ children }: { children: ReactNode }) => (
  <Text variant="micro" tone="secondary" as="span">
    {children}
  </Text>
);

const NAMES: Record<(typeof SOCIAL_NETWORKS)[number], string> = { linkedin: 'LinkedIn', x: 'X', youtube: 'YouTube', instagram: 'Instagram' };

const meta = {
  title: 'Átomos/SocialIcon',
  component: SocialIcon,
  tags: ['autodocs', '!dev'],
  parameters: { docs: { description: { component: doc } }, layout: 'padded' },
  args: { network: 'linkedin', ...SOCIAL_ICON_DEFAULTS },
  argTypes: {
    network: {
      control: 'inline-radio',
      options: [...SOCIAL_NETWORKS],
      description: 'Una de las cuatro redes que guarda el sistema.',
      table: { type: { summary: SOCIAL_NETWORKS.join(' | ') } },
    },
    size: {
      control: 'inline-radio',
      options: [...SOCIAL_ICON_SIZES],
      description: '18 px (`md`) o 16 px (`sm`): los dos tokens de icono.',
      table: { type: { summary: SOCIAL_ICON_SIZES.join(' | ') }, defaultValue: { summary: SOCIAL_ICON_DEFAULTS.size } },
    },
    className: { control: false, table: { disable: true } },
  },
} satisfies Meta<typeof SocialIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = { tags: ['dev'], parameters: { layout: 'centered' } };

export const Redes: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Las cuatro redes en los dos tamaños. Rellenos y con su trazado original; heredan la tinta, así que en oscuro se vuelven blancos solos.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--space-xl)' }}>
      {SOCIAL_ICON_SIZES.map((size) => (
        <div key={size} style={{ display: 'grid', gridTemplateColumns: '64px 1fr', gap: 'var(--space-l)', alignItems: 'center' }}>
          <Caption>{size}</Caption>
          <div style={{ display: 'flex', gap: 'var(--space-xl)', alignItems: 'center' }}>
            {SOCIAL_NETWORKS.map((network) => (
              <SocialIcon key={network} network={network} size={size} />
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

export const EnElPie: Story = {
  name: 'En el pie',
  parameters: {
    docs: {
      description: {
        story:
          'Como van de verdad: cada icono dentro de un enlace de 24 × 24 con su nombre («LinkedIn de 540») y foco visible. El dorado del hover lo pone el enlace y el icono lo hereda. Pasa el ratón y recorre con el tabulador.',
      },
    },
  },
  render: () => (
    <ul style={{ display: 'flex', gap: 'var(--space-m)', margin: 0, padding: 0, listStyle: 'none' }}>
      {SOCIAL_NETWORKS.map((network) => (
        <li key={network}>
          <a
            href={`#${network}`}
            aria-label={`${NAMES[network]} de 540`}
            className="social-link"
            style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', inlineSize: 'var(--size-control-xs)', blockSize: 'var(--size-control-xs)', color: 'var(--color-text-primary)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-text-accent-inverse)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-primary)')}
          >
            <SocialIcon network={network} />
          </a>
        </li>
      ))}
    </ul>
  ),
};
