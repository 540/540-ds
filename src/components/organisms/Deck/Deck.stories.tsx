import type { Meta, StoryObj } from '@storybook/react-vite';
import { Text } from '../../atoms/Text';
import { Card } from '../../molecules/Card';
import { SectionHeader } from '../../molecules/SectionHeader';
import { Slide } from '../Slide';
import { Deck } from './Deck';
import { DECK_DEFAULTS, DECK_THEMES } from './types';
import doc from './_docs/Deck.md?raw';

const ITEMS = [
  { href: '#contexto', label: 'Primera parada' },
  { href: '#tesis', label: 'Tesis' },
  { href: '#tarjetas', label: 'Tarjetas' },
  { href: '#cierre', label: 'Cierre' },
];

const FOOTER = {
  tagline: 'Una línea que resume de qué iba la charla.',
  networks: [
    { network: 'linkedin' as const, href: 'https://linkedin.com/company/540-degrees', label: 'LinkedIn de 540' },
    { network: 'x' as const, href: 'https://x.com/540deg', label: 'X de 540' },
    { network: 'instagram' as const, href: 'https://instagram.com/540deg', label: 'Instagram de 540' },
  ],
  copyright: '© 2026 540',
};

const Stack = ({ children, gap = 'var(--space-xl)' }: { children: React.ReactNode; gap?: string }) => (
  <div style={{ display: 'grid', gap, justifyItems: 'center' }}>{children}</div>
);

function DemoDeck(props: Partial<React.ComponentProps<typeof Deck>>) {
  return (
    <Deck items={ITEMS} footer={FOOTER} storageKey="" {...props}>
      <Slide id="portada">
        <Stack gap="var(--space-2xl)">
          <Text as="h1" variant="statement" wrap="balance" measure="wide" align="center">
            Título de la charla en una o dos líneas
          </Text>
          <Text variant="body-m" tone="secondary" wrap="balance" measure="half" align="center">
            ¿La pregunta que abre la charla?
          </Text>
        </Stack>
      </Slide>
      <Slide id="contexto">
        <SectionHeader title="Título de la primera parada" description="Una entradilla corta que la presenta." align="center" />
      </Slide>
      <Slide id="tesis">
        <div style={{ display: 'grid', gap: 'calc(var(--text-statement-size) * 1.5)' }}>
          {['La primera tesis de la charla.', 'La segunda tesis, en una línea.', 'La tercera tesis, que cierra.'].map((frase, i) => (
            <div key={frase} data-stop="">
              <Text as="p" variant="statement" wrap="balance" measure="wide" align="center">
                <span aria-hidden="true">0{i + 1} </span>
                {frase}
              </Text>
            </div>
          ))}
        </div>
      </Slide>
      <Slide id="historia" tone="raised">
        <Stack>
          <Text as="h2" variant="title-m" wrap="balance">
            Título de una historia
          </Text>
          <Text variant="body-l" tone="secondary" wrap="pretty" measure="half" align="center">
            Un párrafo que cuenta algo, a media retícula y en gris, sobre una banda levantada.
          </Text>
        </Stack>
      </Slide>
      <Slide id="tarjetas">
        <Stack gap="var(--space-3xl)">
          <SectionHeader title="Cuatro tarjetas" align="center" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--grid-gutter)', width: '100%', textAlign: 'start' }}>
            {['Primera', 'Segunda', 'Tercera', 'Cuarta'].map((t, i) => (
              <Card key={t} ordinal={`0${i + 1}`} title={t} align="center">
                Dos o tres frases sobre lo que hace este apartado y para quién.
              </Card>
            ))}
          </div>
        </Stack>
      </Slide>
      <Slide id="cierre">
        <Text as="p" variant="statement" wrap="balance" measure="wide" align="center">
          La frase de cierre. <strong>Con el giro en negrita.</strong>
        </Text>
      </Slide>
    </Deck>
  );
}

const meta = {
  title: 'Organismos/Deck',
  component: Deck,
  tags: ['autodocs', '!dev'],
  parameters: {
    docs: { description: { component: doc }, story: { inline: false, height: '640px' } },
    layout: 'fullscreen',
  },
  args: { items: ITEMS, footer: FOOTER, children: null, ...DECK_DEFAULTS, storageKey: '' },
  argTypes: {
    items: { control: false, description: 'Los destinos de la barra: las paradas principales.', table: { type: { summary: 'MenuDestination[]' } } },
    children: { control: false, description: 'Las paradas: Slides, y las fotos que acompañan a un título.', table: { type: { summary: 'ReactNode' } } },
    footer: { control: false, description: 'El pie, última parada.', table: { type: { summary: 'DeckFooterProps' } } },
    defaultTheme: {
      control: 'inline-radio',
      options: [...DECK_THEMES],
      description: 'Tema en la primera visita. Las charlas van en oscuro.',
      table: { type: { summary: DECK_THEMES.join(' | ') }, defaultValue: { summary: DECK_DEFAULTS.defaultTheme } },
    },
    storageKey: { control: 'text', description: 'Clave de localStorage donde se recuerda el tema. Vacía, no se guarda.', table: { defaultValue: { summary: DECK_DEFAULTS.storageKey } } },
    blobs: { control: 'boolean', description: 'Pinta las manchas de fondo.', table: { defaultValue: { summary: 'true' } } },
    navLabel: { control: 'text', table: { defaultValue: { summary: DECK_DEFAULTS.navLabel } } },
    indexLabel: { control: 'text', table: { defaultValue: { summary: DECK_DEFAULTS.indexLabel } } },
    homeHref: { control: 'text', table: { defaultValue: { summary: DECK_DEFAULTS.homeHref } } },
    homeLabel: { control: 'text', table: { defaultValue: { summary: DECK_DEFAULTS.homeLabel } } },
    className: { control: false, table: { disable: true } },
  },
} satisfies Meta<typeof Deck>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = { tags: ['dev'], render: (args) => <DemoDeck defaultTheme={args.defaultTheme} blobs={args.blobs} /> };

export const CharlaDeDemostracion: Story = {
  name: 'Charla de demostración',
  parameters: {
    docs: {
      description: {
        story:
          'Una charla entera: portada, contexto, tres tesis (una parada por frase, con `data-stop`), una historia en banda levantada, cuatro tarjetas, el cierre y el pie. Pulsa dentro y recorre con las flechas o el espacio; el índice de la derecha aparece al pasar la portada y la barra se esconde al navegar (vuelve al llevar el ratón arriba).',
      },
    },
  },
  render: () => <DemoDeck />,
};

export const EnClaro: Story = {
  name: 'En claro',
  parameters: { docs: { description: { story: 'La misma charla con el tema claro de inicio. El conmutador de la barra la cambia; en una charla real se recuerda en `localStorage`.' } } },
  render: () => <DemoDeck defaultTheme="light" />,
};
