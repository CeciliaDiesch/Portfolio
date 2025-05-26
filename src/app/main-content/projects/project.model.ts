export interface TechItem {
  icon: string;  // Pfad zur SVG/URL
  name: string;  // z.B. 'Angular'
}
export interface Project {
    index: number;
    name: string;
    description: string;
    tech: TechItem[];
    github: string;
    live: string;
    image: string;
  }
  