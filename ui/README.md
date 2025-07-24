# @becker-platform/ui

Enterprise-grade design system for the Becker Solutions Energy-Tender Platform MVP v1.0.

## Features

- ✅ **24+ React Components** - Complete component library with TypeScript support
- 🎨 **Design Tokens** - Comprehensive token system with Tailwind CSS integration  
- ♿ **Accessibility** - WCAG 2.1 AA compliant with semantic HTML and ARIA attributes
- 📚 **Storybook** - Interactive documentation and component playground
- 🧪 **Visual Regression** - Chromatic integration for snapshot testing
- 📦 **Optimized Bundle** - Tree-shakeable ES modules, ≤30kB gzipped target
- 🔧 **Developer Experience** - Full TypeScript support with proper type definitions

## Installation

```bash
# Using pnpm (recommended)
pnpm add @becker-platform/ui

# Using npm
npm install @becker-platform/ui

# Using yarn
yarn add @becker-platform/ui
```

## Quick Start

```tsx
import { Button, Card, Input } from '@becker-platform/ui';

function App() {
  return (
    <Card>
      <Input label="Email" placeholder="Enter your email" />
      <Button variant="primary">Submit</Button>
    </Card>
  );
}
```

## Design Tokens

The design system is built on a comprehensive token system:

### Colors
- **Primary**: #0057b8 (Becker brand blue)
- **Success**: #059669 (confirmation states)
- **Warning**: #f59e0b (caution states)  
- **Danger**: #dc2626 (error states)
- **Grays**: 50-900 scale for neutral elements

### Spacing
4-point grid system: 4px, 8px, 12px, 16px, 20px, 24px, 32px, 48px, 64px, 80px, 96px

### Typography
Modular scale: 12px, 14px, 16px, 20px, 24px, 30px, 36px, 48px, 60px

## Available Components

### Form Components
- `Button` - Primary actions with multiple variants
- `Input` - Text inputs with validation states
- `Select` - Dropdown selection with options
- `Textarea` - Multi-line text input
- `Checkbox` - Binary selection with indeterminate state
- `Radio` - Single selection from multiple options
- `Toggle` - On/off switch control

### Layout Components  
- `Card` - Container with padding and shadow options
- `Modal` - Overlay dialogs with focus management
- `Tabs` - Horizontal navigation tabs
- `Accordion` - Collapsible content sections
- `Divider` - Visual separation with optional text

### Data Display
- `Table` - Sortable data tables with empty states
- `Badge` - Status indicators and labels
- `Avatar` - User profile images and initials
- `Progress` - Linear progress indicators
- `Skeleton` - Loading placeholders

### Feedback Components
- `Alert` - Contextual messages with dismissal
- `Toast` - Temporary notifications
- `Tooltip` - Contextual help on hover/focus
- `Loading` - Spinner with overlay options

### Navigation
- `Breadcrumb` - Navigation path indicators
- `Pagination` - Page navigation with responsive design
- `Dropdown` - Action menus with icons and separators

## Usage Examples

### Form Layout
```tsx
import { Card, Input, Select, Button, Alert } from '@becker-platform/ui';

const energyOptions = [
  { value: 'solar', label: 'Solar Power' },
  { value: 'wind', label: 'Wind Power' },
  { value: 'hydro', label: 'Hydroelectric' },
];

function TenderForm() {
  return (
    <Card className="max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Create Energy Tender</h2>
      
      <div className="space-y-4">
        <Input
          label="Tender Name"
          placeholder="Enter tender name"
          required
        />
        
        <Select
          label="Energy Type"
          options={energyOptions}
          placeholder="Select energy type"
        />
        
        <Input
          label="Volume (MWh)"
          type="number"
          placeholder="0"
          helperText="Enter required energy volume"
        />
        
        <Alert type="info">
          All tenders are subject to REMIT reporting requirements.
        </Alert>
        
        <Button variant="primary" className="w-full">
          Create Tender
        </Button>
      </div>
    </Card>
  );
}
```

### Data Table
```tsx
import { Table, Badge, Button } from '@becker-platform/ui';

const columns = [
  { key: 'id', header: 'Tender ID', sortable: true },
  { key: 'volume', header: 'Volume (MWh)', sortable: true },
  { key: 'price', header: 'Price (€/MWh)', sortable: true },
  { 
    key: 'status', 
    header: 'Status',
    render: (item) => (
      <Badge variant={item.status === 'active' ? 'success' : 'warning'}>
        {item.status}
      </Badge>
    )
  },
  {
    key: 'actions',
    header: 'Actions',
    render: (item) => (
      <Button size="sm" variant="ghost">
        View Details
      </Button>
    )
  },
];

const tenderData = [
  { id: 'T-001', volume: 1000, price: 45.50, status: 'active' },
  { id: 'T-002', volume: 2500, price: 47.25, status: 'pending' },
];

function TenderTable() {
  return (
    <Table
      columns={columns}
      data={tenderData}
      onSort={(key, direction) => console.log('Sort:', key, direction)}
    />
  );
}
```

## Accessibility

All components are built with accessibility in mind:

- **Semantic HTML** - Proper HTML elements and structure
- **ARIA Attributes** - Screen reader support with proper labels
- **Keyboard Navigation** - Full keyboard accessibility
- **Focus Management** - Logical focus order and visible focus indicators
- **Color Contrast** - WCAG AA compliant color combinations (≥4.5:1 ratio)

## Development

```bash
# Install dependencies
pnpm install

# Build package
pnpm run build

# Run Storybook (after dependencies)
pnpm run storybook

# Build Storybook
pnpm run build-storybook
```

## Contributing

This package is part of the Becker Platform monorepo. See the main repository for contribution guidelines.

## License

Proprietary - Becker Solutions Pte. Ltd.