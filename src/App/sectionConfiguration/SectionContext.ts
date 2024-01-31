

export interface Constr<T> {
    new (...args: any[]): T
  }
  
export interface SectionContext<T> {
    instruction: unknown
    sectionProps: T
  }