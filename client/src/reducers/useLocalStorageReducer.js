// import React from "react"
// import { useState, useEffect, useReducer} from "react";

// function UseLocalStorageReducer(key, defaultVal, reducer) {

//     const [state, dispatch] = useReducer(reducer, defaultVal, () => {
//         let val;
//         try {
//             val = JSON.parse(window.localStorage.getItem(key) || String(defaultVal))
//         } catch (error) {
//             val = defaultVal
//         }
//         return val
//     })

//     useEffect(() => {
//         window.localStorage.setItem(key, JSON.stringify(state))
//     }, [state])
    
//     return [state, dispatch]
// }

// export {UseLocalStorageReducer};