import React, { useReducer } from 'react';
import './App.scss';
import { FirstComponent } from './components/FirstComponent';
import { Ctx } from "./Context";
import { initialState, reducer } from "./globalState";
import { StateInterface } from './globalTypes';
function App() {
  const [state, dispatch] = useReducer(reducer, initialState())
  React.useEffect(() => {
    try {
      fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(data => dispatch({ type: "ADD_INITIAL_ITEMS", payload: data }))
    } catch (err) {
      dispatch({ type: "ERROR" })
    }
  }, [])
  return (
    <Ctx.Provider value={state}>
      <FirstComponent state={state as StateInterface}
        dispatch={dispatch}
        ctx={Ctx} />
    </Ctx.Provider>
  )
}

export default App;
