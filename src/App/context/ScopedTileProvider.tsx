import { PaneName, TileProvider, TileProviderProps } from 'components'
import { useState } from 'react'
import { AppScopeStateContext } from './AppScopeStateContext'
import { ContextStore } from 'App/store/global'

export const ScopedTileProvider: React.FC<
  TileProviderProps & { paneName: PaneName }
> = (props: TileProviderProps & { paneName: PaneName }) => {
  const [appScopeState, setAppScopeState] = useState({
    scopeName: props.paneName,
    paneState: {},
  })

  return (
    <AppScopeStateContext.Provider
      value={{
        appScopeState: appScopeState,
        setAppScopeState: (paneName: string, state: any) => {
          setAppScopeState({
            ...appScopeState,
            paneState: { ...appScopeState.paneState, [paneName]: state },
          })
        },
      }}
    >
      <TileProvider {...props}>
        {props.children}
        <ContextStore name={props.paneName} />
      </TileProvider>
    </AppScopeStateContext.Provider>
  )
}
