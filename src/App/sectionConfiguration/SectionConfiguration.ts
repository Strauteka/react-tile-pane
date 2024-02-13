import { TileCharacteristic } from "components"

export interface SectionConfiguration {
    isSelection?: boolean //default true
    isParentPropsPersistent?: boolean //default false
    tabTitle: string,
    characteristic?: TileCharacteristic
  }
  