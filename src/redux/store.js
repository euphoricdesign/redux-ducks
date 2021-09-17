import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunk  from 'redux-thunk';

// Siempre en la store vamos a llamar a todos los reducers que tenga la aplicación 

import pokeReducer from './pokeDucks';

// Una vez que lo tenemos vamos a combinar en este archivo todos nuestros Ducks 

const rootReducer = combineReducers({
    pokemones: pokeReducer
})
// Creamos una constante "rootReducer" y la misma va a ser igual a combineReducers.
// combineReducers toma un objeto. Dentro del objeto vamos a colocar "pokemones" ya que lo que tenemos es una lista de pokemones, que es lo que vamos 
// a leer. Recuerden que el array de nuestro state inicial ya no va a estar vacío porque nuestra acción esta modificandolo.

// ¿Y de donde vienen esos pokemones? del pokeReducer, ahí se genera la acción que modifica nuestro state.

// Entonces cada vez que tengamos un Duck, de lo que sea, vamos a agregar aquí su/s reducer/s, los vamos a combinar.

// Una vez que los combinamos vamos a utilizar la extensión de chrome que instalamos. Esta extensión nos sirve para poder visualizar nuestra store
// en el navegador. Su configuración no es easy, but tampoco impossible. Ver video.

// Esta primera constante pregunta si nosotros tenemos instalada la extensión y en caso contrario va a ocupar el 'compose'. Si, el compose que estamos 
// llamando arriba from redux :D

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Ahora vamos a exportar por defecto una función que, generalmente, se llama "generateStore", dentro vamos a configurar nuestro middleware.
// Primero creamos una constante llamada "store" que va a ser igual al método createStore() que nos creará la tienda y como primer parametro le 
// pasamos nuestro rootReducer, que viene "combinado", como segundo parametro paso la extensión de chrome que también es una función, que va a recibir
// como parametro nuestro middleware que es nuestro caso es "thunk" (para trabajar con promesas)

export default function generateStore() {
    const store = createStore(rootReducer, composeEnhancers( applyMiddleware(thunk) ));
    return store
}

// Una vez que esta toda nuestra tienda configurada la devolvemos.