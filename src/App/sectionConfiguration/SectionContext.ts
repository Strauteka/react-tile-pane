import { TileProviderContext } from "components"

export interface Constr<T> {
    new (...args: any[]): T
  }
  
export interface SectionContext<T> {
    context: TileProviderContext
    instruction: unknown
    sectionProps: T
  }