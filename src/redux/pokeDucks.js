import axios from "axios";

// -constantes

const dataInicial = {
    array: [],
    offset: 0
}

// Algo que no se menciono aún es que nuestro state inicial puede tener más propiedades.

// Hasta el momento pintabamos 20 pokemos en la pantalla, porque si vemos el parametro offset en la URL de la API pokemon "offset=0&limit=20"
// arranca en 0 hasta 20. 
// El parametro offset sirve para marcar desde que elemento del set de resultados queres paginarlo. En conjunto con el parametro limit te sirve
// para paginar los resultados de la busqueda.
// Si cambiaramos el 0 por un 20, es decir de 20 hasta 20, me pintaría los siguientes 20 pokemones.
// Lo que vamos a hacer es generar un botón que diga "Siguientes" para que nos muestre los siguiente 20 resultados.

// Existen varias formas de hacer esto. Lo primero que hacemos es agregarle la propiedad offset a nuestra dataInicial y el mismo va a iniciar en 0.


// types

const OBTENER_POKEMONES_EXITO = 'OBTENER_POKEMONES_EXITO'
const SIGUIENTES_POKEMONES_EXITO = 'SIGUIENTES_POKEMONES_EXITO'

// -reducer

export default function pokeReducer(state = dataInicial, action){
    switch(action.type){
        case OBTENER_POKEMONES_EXITO:
            return {...state, array: action.payload}
        case SIGUIENTES_POKEMONES_EXITO:
            return {...state, array: action.payload.array}
        default: 
            return state
    } 
}

// -actions

export const obtenerPokemonesAccion = () => async (dispatch, getState) => {

    const offset = getState().pokemones.offset

    try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`)
        
        dispatch({
            type: OBTENER_POKEMONES_EXITO,
            payload: res.data.results
        })
    } catch (err) {
        console.log(err)
    }
}

// Nuestra acción esta recibiendo además del dispatch un getState. 
// Este getState en las acciones recibe, efectivamente, nuestro state ya sea que lo modifiquemos o no. 
// Lo que vamos a hacer es que antes del try es llamar a getState() que es una función.

// Si la mostramos por consola lo que nos devuelve es: 

// {pokemones: {…}}
//     pokemones: {array: Array(0), offset: 0}

// Este getState, para no confundirse, no devuelve de inmediato nuestro state, lo que hace es leer la tienda y en la store tenemos pokemones 
// por lo tanto vamos a acceder a su propiedad "pokemones".

// {array: Array(0), offset: 0}
//    array: []
//    offset: 0

// Ahora si estamos dentro de nuestro state inicial. Por último accedemos a su propiedad offset. Esto nos devulve 0

// ¿Para que queremos ese 0? Porque si guardamos esto (getState().pokemones.offset) en una const llamada offset ya podríamos acceder al offset
// Ahora podemos reemplazar en la URL de la API el 0 que viene de forma estatica por la const offset.

// De esta forma el offset esta siendo leído de nuestro state. No es necesario hacerlo, pero de esta forma podemos usar el getState.

// Ahora creemos la nueva acción:

export const siguientePokemonAccion = (numero) => async (dispatch, getState) => {

    // Primera alternativa:
    const offset = getState().pokemones.offset
    const siguiente = offset + numero

    try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${siguiente}&limit=20`)
        dispatch({
            type: SIGUIENTES_POKEMONES_EXITO,
            payload: {
                array: res.data.results,
                offset: siguiente
            }
        })
    } catch (err) {
        console.log(err)
    }
}

// En esta URL el offset tiene que se 20, cada vez que nosotros presionemos el botón de "siguiente" tiene que ser 20 y múltiplos de 20.
// Para hacer esto tenemos más de una alternativa. 

// La primera alternativa sería copiar la constante offset de la acción anterior, que viene de getState, y podemos crear abajo otra constante 
// que sea igual a offset + 20. Reemplamos la const offset por siguiente en la URL. 

// Como el offset en nuestro state comienza en 0, en la primera vuelta, al presionar el botón "siguiente" va ser 20, en la siguiente vuelta nuestro
// offset, que lo definimos también dentro de nuestro reducer, va a ser 40. 

// Hacemos el dispatch con la primera alternativa. Ya sabemos que dispatch recibe un ojeto que va a tener la propiedad type (creamos esee type en las 
// constantes) y nuestro payload. 
// Hasta el momento el offset no esta modificado, solo tenemos la const siguiente que toma el offset y le suma 20. 
// ¿Donde vamos a modificar el offset? Tenemos 2 alternativas.
// Al payload lo podemos devolver con un objeto.

// Podemos decir que el payload sea un objeto que tenga la key/propiedad array con el resultado de la llamada a la API 
// y además va a tener el offset que va a ser igual a "siguiente" que vale, en este caso 20. 

// Nos vamos a nuestro reducer y en switch agregamos un nuevo 'case' que va a ser SIGUIENTES_POKEMONES_EXITO, el cuál va a retornar lo que 
// venga del state (...state), en este caso ya viene modificado,  ahora, el array va a ser igual a "action.payload.array"
// ¿Por qué? porque ya tenemos otro array con los 20 siguientes pokemones, pero además vamos a decirle que el offset va a ser igual a
// "action.payload.offset"

// Nos vamos al componente Pokemones.jsx para crear el nuevo botón.












