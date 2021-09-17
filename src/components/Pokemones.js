// Aquí vamos a mostrar el listado de pokemones. 

// Si no vamos a la consola del navegador, en la parte en la que podemos visualizar nuestra store, gracias a la extinsión que instalamos, vamos a ver 
// que ya estamos leyendo nuestro state que por el momento sigue siendo un array vacío porque todavía no ejecutamos nuestra acción.
// Esa acción la podríamos ejecutar incluso en App.jsx o en la misma store para que consuma de inmediato a los pokemones, pero para entender como vamos
// a consumir futuras acciones la vamos a consumir acá, en nuestro componente Pokemones.jsx.

// Vamos a utilizar dos hooks interesantes: useDispatch y useSelector, los mismos vienen ya configurados desde react-redux. Dos hooks muy paecidos a useState
// y useEffect de react, solo que de esta manera estamos colocando nuestros datos de forma global para que los llamemos desde cualquier componente de una 
// manera sencilla.

// useDispatch nos va a servir para consumir nuestra acción y useSelector nos va a servir para leer el array de nuestro estado inicial. 

// Primero leemos la acción 


import React from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { obtenerPokemonesAccion } from '../redux/pokeDucks'

const Pokemones = () => {
    const dispatch = useDispatch() // Este dispatch a poder disparar nuestra acción, obvio tenemos que importarla.

    
    const pokemones = useSelector(store => store.pokemones.array)

    return (
        <div>
            Lista de Pokemones
            <button onClick={() => dispatch(obtenerPokemonesAccion())}>Get Pokemones</button> 

            <ul>
                {
                    pokemones.map(item => (
                        <li key={item.name}>{item.name}</li>
                    ))
                }
            </ul>
        </div> 
    )
}
// El dispatch, como ya dijimos, llama a la acción. Con esto nuestra lista de Pokemones va a viajar directamente a el array destino jeje.
// El useSelector va a leer ese array, que en este momento es toda nuestra lista de Pokemones. Creamos una constante bajo de dispatch, puede tener
// cualquier nombre y la misma va a ser igual useSelector.
// useSelector devuelve a traves de una arrow function nuestra store, por lo que accedemos al array directamente.



export default Pokemones;