import React from "react";
import Pokemones from "./components/Pokemones";

import { Provider } from 'react-redux'
import generateStore from "./redux/store";

// En nuestro componente App vamos a tener múltiples componentes. Para que cada uno de esos componentes pueda leer la store y cada Duck que tengamos
// es necesario envolver a todos esos componentes en un Provider, el mismo viene configurado de react-redux.
// Este provider va a recibir la tienda, por lo tanto tenemos que importarla. 

// generateStore ya va a tener la configuración de nuestra store. Teniendo esa config, antes del 'return' creamos una constante que se llame store 
// que va a ser nuestra tienda que viene de generateStore.

// A la store, como ya la tenemos configurada, la mandamos como propiedad a Provider. 

function App() {
  const store = generateStore()

  return (
    <Provider store={store}>
      < Pokemones />
    </Provider>
  );
}

export default App;
