import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Menu, Plus, X } from 'lucide-react';
import { Text } from '../Text';
import { Button } from './Button';
import styles from './Button.module.css';
import { BUTTON_DEFAULTS, BUTTON_SIZES, BUTTON_VARIANTS } from './types';
import doc from './_docs/Button.md?raw';

const Caption = ({ children }: { children: ReactNode }) => (
  <Text variant="micro" tone="secondary" as="span">
    {children}
  </Text>
);

const Row = ({ children }: { children: ReactNode }) => (
  <div style={{ display: 'flex', gap: 'var(--space-m)', alignItems: 'center', flexWrap: 'wrap' }}>{children}</div>
);

const Stack = ({ gap = 'var(--space-xl)', children }: { gap?: string; children: ReactNode }) => (
  <div style={{ display: 'grid', gap, justifyItems: 'start' }}>{children}</div>
);

const LabeledRow = ({ label, children }: { label: string; children: ReactNode }) => (
  <div style={{ display: 'grid', gridTemplateColumns: '96px 1fr', gap: 'var(--space-l)', alignItems: 'center' }}>
    <Caption>{label}</Caption>
    <Row>{children}</Row>
  </div>
);

const ICONS = {
  none: undefined,
  plus: <Plus />,
  arrowRight: <ArrowRight />,
  menu: <Menu />,
  x: <X />,
} as const;

const meta = {
  title: 'Átomos/Button',
  component: Button,
  tags: ['autodocs', '!dev'],
  parameters: { docs: { description: { component: doc } }, layout: 'padded' },
  args: { children: 'Enviar', ...BUTTON_DEFAULTS },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: [...BUTTON_VARIANTS],
      description: 'Nivel de énfasis. Solo un `primary` por zona.',
      table: { type: { summary: BUTTON_VARIANTS.join(' | ') }, defaultValue: { summary: BUTTON_DEFAULTS.variant } },
    },
    size: {
      control: 'inline-radio',
      options: [...BUTTON_SIZES],
      description: 'Alto del botón: 45 px en `md`, 36 px en `sm`. `sm` para barras y zonas densas.',
      table: { type: { summary: BUTTON_SIZES.join(' | ') }, defaultValue: { summary: BUTTON_DEFAULTS.size } },
    },
    icon: {
      control: 'select',
      options: Object.keys(ICONS),
      mapping: ICONS,
      description: 'Icono de Lucide delante de la etiqueta. Hereda el color del texto.',
      table: { type: { summary: 'ReactNode' } },
    },
    iconOnly: {
      control: 'boolean',
      description: 'Cuadrado con solo el icono; la etiqueta sigue ahí para el lector de pantalla. Solo con `icon`, y en el sistema solo en `ghost`.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: String(BUTTON_DEFAULTS.iconOnly) } },
    },
    href: {
      control: 'text',
      description: 'Con `href` el botón navega: se pinta un enlace de verdad con el mismo aspecto. No se combina con `disabled`.',
      table: { type: { summary: 'string' } },
    },
    disabled: {
      control: 'boolean',
      description: 'La acción no es posible ahora. Nunca junto a `href`.',
      table: { type: { summary: 'boolean' } },
    },
    type: {
      control: false,
      description: 'Dentro de un formulario, `submit` en el botón que lo envía. Solo cambia el atributo.',
      table: { type: { summary: 'button | submit | reset' }, defaultValue: { summary: 'button' } },
    },
    children: {
      control: 'text',
      description: 'La etiqueta: el verbo de la acción. Es el nombre accesible.',
      table: { type: { summary: 'ReactNode' } },
    },
    onClick: { control: false, table: { type: { summary: '(event) => void' } } },
    className: { control: false, table: { disable: true } },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = { tags: ['dev'], parameters: { layout: 'centered' } };

export const Variantes: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Las tres variantes en los dos tamaños. `primary` es la única con relleno; `outline` lleva el contorno fuerte; `ghost` no tiene superficie hasta que pasas el ratón. Cambia el **Tema** para ver cómo se invierten las tintas.',
      },
    },
  },
  render: () => (
    <Stack>
      {BUTTON_SIZES.map((size) => (
        <LabeledRow key={size} label={size}>
          {BUTTON_VARIANTS.map((variant) => (
            <Button key={variant} variant={variant} size={size}>
              {variant}
            </Button>
          ))}
        </LabeledRow>
      ))}
    </Stack>
  ),
};

export const Estados: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Normal, hover, active, focus y disabled, por variante. Hover y active no se pueden renderizar (los pone el navegador), así que aquí se fuerzan con una clase que lee **las mismas variables** que el estado real. Fíjate en la regla: el hover invierte el relleno y el pulsado rellena un paso más, tres superficies, nunca dos.',
      },
    },
  },
  render: () => (
    <Stack>
      {BUTTON_VARIANTS.map((variant) => (
        <LabeledRow key={variant} label={variant}>
          <Button variant={variant}>Normal</Button>
          <Button variant={variant} className={styles.forceHover}>
            Hover
          </Button>
          <Button variant={variant} className={styles.forceActive}>
            Active
          </Button>
          <Button variant={variant} className={styles.forceFocus}>
            Focus
          </Button>
          <Button variant={variant} disabled>
            Disabled
          </Button>
        </LabeledRow>
      ))}
    </Stack>
  ),
};

export const ConIcono: Story = {
  name: 'Con icono',
  parameters: {
    docs: {
      description: {
        story: 'El icono va delante de la etiqueta y con su misma tinta, en cada variante y cada tamaño: 18 px en `md`, 16 px en `sm`.',
      },
    },
  },
  render: () => (
    <Stack>
      {BUTTON_SIZES.map((size) => (
        <LabeledRow key={size} label={size}>
          <Button variant="primary" size={size} icon={<Plus />}>
            Añadir
          </Button>
          <Button variant="outline" size={size} icon={<ArrowRight />}>
            Siguiente
          </Button>
          <Button variant="ghost" size={size} icon={<X />}>
            Cerrar
          </Button>
        </LabeledRow>
      ))}
    </Stack>
  ),
};

export const SoloIcono: Story = {
  name: 'Solo icono',
  parameters: {
    docs: {
      description: {
        story:
          'Los cuatro usos reales de la web, todos en `ghost`: la hamburguesa y la cruz de la navegación estrecha, el cerrar del diálogo y las dos flechas del carrusel. Son cuadrados de 45 (`md`) y 36 (`sm`). Pasa el ratón para ver la superficie y recorre con el tabulador para oír la etiqueta, que sigue en el DOM.',
      },
    },
  },
  render: () => (
    <Stack>
      {BUTTON_SIZES.map((size) => (
        <LabeledRow key={size} label={size}>
          <Button variant="ghost" size={size} icon={<Menu />} iconOnly>
            Abrir el menú
          </Button>
          <Button variant="ghost" size={size} icon={<X />} iconOnly>
            Cerrar
          </Button>
          <Button variant="ghost" size={size} icon={<ChevronLeft />} iconOnly>
            Anterior
          </Button>
          <Button variant="ghost" size={size} icon={<ChevronRight />} iconOnly>
            Siguiente
          </Button>
        </LabeledRow>
      ))}
    </Stack>
  ),
};

export const ComoEnlace: Story = {
  name: 'Como enlace',
  parameters: {
    docs: {
      description: {
        story:
          'Con `href` el mismo componente se pinta como `<a>`: aspecto idéntico, rol de enlace. Es la llamada a la acción que lleva a otra página o a otra parada de la charla. Un enlace nunca va deshabilitado.',
      },
    },
  },
  render: () => (
    <Row>
      <Button href="#contacto" icon={<ArrowRight />}>
        Hablemos
      </Button>
      <Button href="#portfolio" variant="outline">
        Ver casos
      </Button>
      <Button href="#manifiesto" variant="ghost">
        Leer el manifiesto
      </Button>
    </Row>
  ),
};
