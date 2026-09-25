export interface ArchitecturalProject {
  id: string;
  refCode: string;
  title: string;
  location: string;
  area: string;
  year: string;
  category: 'modular' | 'residencial' | 'domotica' | 'pabellon';
  categoryLabel: string;
  imageUrl: string;
  imageAlt: string;
  materialHighlight: string;
  materialColor: string;
  shortDescription: string;
  fullDescription: string;
  specs: {
    label: string;
    value: string;
  }[];
  features: string[];
  has3DModel: boolean;
  modelKey: 'modular' | 'travertino' | 'cristal' | 'domotica' | 'pabellon';
  blueprintSvg?: string;
  galleryImages: string[];
}

export type LightingMode = 'sunset' | 'night' | 'day' | 'wireframe';
export type CameraPreset = 'hero' | 'axonometric' | 'top' | 'facade' | 'entrance';

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  summary: string;
  details: string;
  tags: string[];
  deliverables: string[];
  timeline: string;
}
