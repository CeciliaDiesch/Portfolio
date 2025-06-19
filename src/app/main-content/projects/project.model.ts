export interface TechItem {
  icon: string;
  name: string;
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
  