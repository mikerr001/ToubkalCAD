/** PBR-07 domain contracts. Physical quantities use SI units unless stated. */
export type PhysicalDomain = 'external-water' | 'culture-liquid' | 'gas-headspace' | 'crop-root-zone' | 'internal-air' | 'solid';
export type PortMedium = 'liquid' | 'gas' | 'heat' | 'optical' | 'mechanical' | 'data';
export type FidelityTier = 0 | 1 | 2 | 3 | 4;
export type ValidationStatus = 'UNVALIDATED' | 'BENCHMARKED' | 'EXPERIMENTALLY_VALIDATED' | 'INVALID';

export interface Provenance {
  classification: 'measured' | 'literature-derived' | 'fitted' | 'estimated' | 'unknown';
  source?: string;
  note?: string;
}
export interface PBRComponentDefinition {
  kind: string;
  label: string;
  domain: PhysicalDomain;
  description: string;
  ports: ReadonlyArray<{ id: string; medium: PortMedium; direction: 'in' | 'out' | 'bidirectional' }>;
  parameters: ReadonlyArray<{
    id: string; label: string; symbol: string; unit: string;
    minimum?: number; defaultValue?: number; provenance: Provenance;
  }>;
}
export interface SolverMetadata {
  modelId: string; version: string; fidelityTier: FidelityTier;
  validation: ValidationStatus; assumptions: string[]; warnings: string[];
}
export interface SolverResult<T> {
  status: 'OK' | 'DEGRADED' | 'INVALID';
  metadata: SolverMetadata;
  value?: T;
  errors: string[];
}
export interface PBRProjectManifest {
  schemaVersion: '1.0.0';
  project: { id: string; name: string; createdAt: string; units: 'SI'; description?: string };
  world: { coordinateSystem: 'right-handed-cartesian'; gravity: [number, number, number] };
  components: Array<{
    id: string; kind: string; name: string; domain: PhysicalDomain;
    parameters: Record<string, number | string | boolean>;
    material?: string; provenance?: Record<string, Provenance>; geometryRef?: string;
  }>;
  connections: Array<{
    id: string; fromComponent: string; fromPort: string; toComponent: string;
    toPort: string; medium: PortMedium;
  }>;
  simulationRefs?: string[];
}
