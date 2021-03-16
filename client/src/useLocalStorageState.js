import React from "react"
import { useState, useEffect} from "react";

function UseLocalStorageState(key, defaultVal) {

    const [state, setState] = useState(() =>  {
        let val;
        try {
            val = JSON.parse(window.localStorage.getItem(key) || String(defaultVal))
        } catch (error) {
            val = defaultVal
        }
        return val
    })

    useEffect(() =>  {
        window.localStorage.setItem(key, JSON.stringify(state))
    }, [state])
    return [state, setState]
}

export default UseLocalStorageState;