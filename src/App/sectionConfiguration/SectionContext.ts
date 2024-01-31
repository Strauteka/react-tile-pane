import { Bearer } from "./Bearer"


export interface Constr<T> {
    new (...args: any[]): T
  }
  
export interface SectionContext<T> {
    paneName: string,
    bearer: Bearer<T>
    parent: {}
  }