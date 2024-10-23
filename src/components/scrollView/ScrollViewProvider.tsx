import React, {createContext, MutableRefObject, useRef} from "react";
import {ScrollView} from "react-native";

interface IScrollViewContext {
  ref: MutableRefObject<ScrollView>
}

export const ScrollViewContext = createContext<IScrollViewContext>({ref: null})


export function ScrollViewProvider({children}) {

  const ref = useRef<ScrollView>()

  return (
    <ScrollViewContext.Provider value={{
      ref: ref
    }}>
      <ScrollView ref={ref} style={{
        marginBottom: 80,
      }}>
        {children}
      </ScrollView>
    </ScrollViewContext.Provider>
  )

}