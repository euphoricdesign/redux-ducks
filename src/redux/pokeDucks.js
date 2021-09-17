// ¿Por qué colocamos Ducks en el nombre?
// Cuando trabajamos con redux existen dos formas de hacerlo: 

// Al realizar una aplicación con Redux es muy común manejar la siguiente estructura de archivos:

// |_ /actions   # Los creadores de acciones
// |_ /constants # Las constantes, como los tipos de acciones
// |_ /reducers  # Los reducers de la aplicación

// Aunque esta forma funciona, con el tiempo uno se encuentra casos donde un reducer tiene un solo tipo de
// acción posible y por lo tanto un solo creador de acciones. Y sin embargo terminamos creando al menos tres
// archivos para eso (aunque los tipos de acciones se pueden guardar todos juntos).

// Para solucionar eso existe Ducks. La segunda forma de trabajar con redux :D

// Ducks es una forma de modularizar partes de una aplicación de Redux juntando reducers, tipos de acciones y
// creadores de acciones juntos de una forma fácil de entender y portar.

// Cuando trabajamos con redux vamos a precisar tres cosillas básicas:

import axios from "axios";

// -constantes

const dataInicial = {
    array: []
}

// Esta constante toma una "dataInicial" (podría ser cualquier nombre). esta dataInicial va a tener nuestro estado que parte limpio. Como sabemos
// que vamos a tener una lista de pokemons que queremos pintar en nuestra aplicación creamos un array (a la propiedad tmb podríamos ponerle cualquier
// nombre, pero casi siempre se coloca lo que va a ser, si fuera un objet -> object: {}). Como tenemos esta data inicial pasamos a configurar nuestro 
// reducer.

// types

const OBTENER_POKEMONES_EXITO = 'OBTENER_POKEMONES_EXITO'


// -reducer

export default function pokeReducer(state = dataInicial, action){
    switch(action.type){
        case OBTENER_POKEMONES_EXITO:
            return {...state, array: action.payload}
        default: 
            return state
    } 
}


// Nuestro reducer va a ser una función que se va a exportar. Como argumentos: nuestro state inicial y las acciones. Se recomienda que el estado
// siempre parta con una data inicial, que ya definimos arriba, de modo que si no pasamos el state como parametro va a tomar el array vacío.
// Como vamos a tener diferentes acciones utilizamos dentro del reducer la condicional switch/case. El action.type que recibe el switch tmb los
// declaramos arriba en constantes.

// Cuando nosotros mandemos el type OBTENER_POKEMONES_EXITO en nuestro switch vamos a realizar la acción de mandar esos pokemons a nuestro array ahora vacío.
// Ese es el procedimiento, peeero nuestra acción no esta definida, es lo que vamos a hacer ahora:

// -actions

export const obtenerPokemonesAccion = () => async (dispatch, getState) => {
    try {
        const res = await axios.get("https://pokeapi.co/api/v2/pokemon?offset=0&limit=20")
        
        dispatch({
            type: OBTENER_POKEMONES_EXITO,
            payload: res.data.results
        })
    } catch (err) {
        console.log(err)
    }
}

// Nuestra action es una constante que se expota a la cuál le asignamos una arrow function que retorna otra arrow function ¿Por qué necesitamos
// dos funciones de flecha? Vamos a ver que hay acciones que van a precisar parametros y otras que no.
// Por ejemplo obtenerPokemonesAccion no necesita de un parametro inicial para ser ejecutada, pero la segunda función de flecha si va a necesitar
// "dispatch" y además un "getState". 
// Con "dispatch" vamos a activar a nuestro reducer y con el "getState" vamos a poder obtener la información que se este alamacenando en el state
// dataInicial.

// Como hacemos un llamado a una API a través de axios ocupamos async en la segunda arrow function.
// El try crea una constante que guarda la respuesta de la espera de axios. La API va a generar la paginación y nos va a devolver la lista de pokemones
// Esa lista esta dentro de "result". Como sabemos que axios genera la respuesta en "res.data" (la constante que guarda la respuesta de la espera de axios).
// a eso le sumamos la propiedad que nosotros queremos leer -> res.data.results

// Entonces para poder activar nuestro switch que se encuentra en el reducer ocupamos el método dispatch, al cuál le pasamos un objeto y señalamos el type

// El switch va a leer "action", que es la acción que acabamos de hacer, luego va a leer el "type", que en este caso es OBTENER_POKEMONES_EXITO
// y va a generar un caso.

// Entonces en caso de que nosotros mandemos el type: OBTENER_POKEMONES_EXITO vamos a generar un return de alguna modificación en nuestro state, 
// nuestra dataInicial. 

// Como lo que queremos es modificar nuestro array vacío, vamos a mandar la lista de pokemones que tenemos en la acción, dentro de la respuesta(res) 

// Para eso mandamos dentro de la action lo que es el "payload" -> payload: res.data.results

// Como tenemos ese payload, ahora en nuestro switch, en caso de que el type sea OBTENER_POKEMONES_EXITO vamos a abrir un objeto y le decimos 
// con el spread operator que el 'state' tiene que ser copiado de dataInicial, con los tres puntos accedemos al array.
// Le vamos a decir además que ese array va a ser igual a action.payload -> que es nuestro array de pokemones.

// Este es el procedimiento, nosotros hacemos acciones, las acciones se procesan en el reducer a traves de la condicional switch-case (ya que podemos 
// tener multiples casos) y eso va a retornar una acción que va a modificar nuestro state.

// Por otro lado, también es recomendable poner un default al final de nuestro reducer, o sea, en caso de que no se lean ninguna de todas las opciones
// que mandemos vamos a retornar simplemente 'state', que puede ser nuestro state inicial o ya modificado. 

// Con todo esto ya creamos nuestro primer Duck! Ahora a configurar la store.


