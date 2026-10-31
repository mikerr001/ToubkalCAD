import type { PBRComponentDefinition } from './types';

const unknown = { classification: 'unknown' as const, note: 'No project-specific value is assumed.' };

export const PBR_COMPONENT_CATALOGUE: readonly PBRComponentDefinition[] = [
  {
    kind: 'culture-vessel', label: 'Culture vessel', domain: 'culture-liquid',
    description: 'Parametric vessel containing the liquid culture volume.',
    ports: [
      { id: 'liquid-in', medium: 'liquid', direction: 'in' },
      { id: 'liquid-out', medium: 'liquid', direction: 'out' },
      { id: 'gas-transfer', medium: 'gas', direction: 'bidirectional' },
      { id: 'thermal', medium: 'heat', direction: 'bidirectional' }
    ],
    parameters: [
      { id: 'inner-diameter', label: 'Inner diameter', symbol: 'D', unit: 'm', minimum: 0, provenance: unknown },
      { id: 'straight-height', label: 'Straight height', symbol: 'H', unit: 'm', minimum: 0, provenance: unknown },
      { id: 'wall-thickness', label: 'Wall thickness', symbol: 't', unit: 'm', minimum: 0, provenance: unknown }
    ]
  },
  {
    kind: 'gas-headspace', label: 'Gas headspace', domain: 'gas-headspace',
    description: 'Gas volume above the culture liquid; composition and pressure are explicit states.',
    ports: [{ id: 'vent', medium: 'gas', direction: 'bidirectional' }],
    parameters: [
      { id: 'volume', label: 'Headspace volume', symbol: 'Vg', unit: 'm³', minimum: 0, provenance: unknown },
      { id: 'pressure', label: 'Absolute pressure', symbol: 'P', unit: 'Pa', minimum: 0, provenance: unknown }
    ]
  },
  {
    kind: 'pipe', label: 'Pipe segment', domain: 'culture-liquid',
    description: 'Circular single-phase liquid conduit; geometry and roughness are explicit.',
    ports: [
      { id: 'inlet', medium: 'liquid', direction: 'in' },
      { id: 'outlet', medium: 'liquid', direction: 'out' }
    ],
    parameters: [
      { id: 'length', label: 'Length', symbol: 'L', unit: 'm', minimum: 0, provenance: unknown },
      { id: 'inner-diameter', label: 'Inner diameter', symbol: 'D', unit: 'm', minimum: 0, provenance: unknown },
      { id: 'roughness', label: 'Absolute roughness', symbol: 'ε', unit: 'm', minimum: 0, provenance: unknown }
    ]
  },
  {
    kind: 'pump', label: 'Pump', domain: 'culture-liquid',
    description: 'Hydraulic energy input; an actual pump curve is required for operating-point prediction.',
    ports: [
      { id: 'suction', medium: 'liquid', direction: 'in' },
      { id: 'discharge', medium: 'liquid', direction: 'out' }
    ],
    parameters: [
      { id: 'rated-flow', label: 'Rated flow', symbol: 'Q', unit: 'm³/s', minimum: 0, provenance: unknown },
      { id: 'rated-head', label: 'Rated head', symbol: 'H', unit: 'm', minimum: 0, provenance: unknown }
    ]
  },
  {
    kind: 'sparger', label: 'Gas sparger', domain: 'culture-liquid',
    description: 'Gas injection interface; bubble and mass-transfer models are not yet implemented.',
    ports: [
      { id: 'gas-in', medium: 'gas', direction: 'in' },
      { id: 'liquid-contact', medium: 'liquid', direction: 'bidirectional' }
    ],
    parameters: [
      { id: 'orifice-count', label: 'Orifice count', symbol: 'n', unit: '1', minimum: 1, provenance: unknown },
      { id: 'orifice-diameter', label: 'Orifice diameter', symbol: 'do', unit: 'm', minimum: 0, provenance: unknown }
    ]
  },
  {
    kind: 'light-panel', label: 'Light panel', domain: 'solid',
    description: 'Optical boundary condition; PAR photon flux and irradiance are distinct.',
    ports: [{ id: 'optical-output', medium: 'optical', direction: 'out' }],
    parameters: [
      { id: 'irradiance', label: 'Irradiance', symbol: 'E', unit: 'W/m²', minimum: 0, provenance: unknown },
      { id: 'distance', label: 'Panel distance', symbol: 'd', unit: 'm', minimum: 0, provenance: unknown }
    ]
  },
  {
    kind: 'crop-module', label: 'Crop module', domain: 'crop-root-zone',
    description: 'Crop/root-zone volume with explicit water, nutrient, light and gas interfaces.',
    ports: [
      { id: 'water-in', medium: 'liquid', direction: 'in' },
      { id: 'drain', medium: 'liquid', direction: 'out' },
      { id: 'air-interface', medium: 'gas', direction: 'bidirectional' },
      { id: 'light', medium: 'optical', direction: 'in' }
    ],
    parameters: [
      { id: 'cultivation-area', label: 'Cultivation area', symbol: 'A', unit: 'm²', minimum: 0, provenance: unknown },
      { id: 'root-zone-volume', label: 'Root-zone volume', symbol: 'Vr', unit: 'm³', minimum: 0, provenance: unknown }
    ]
  }
];
