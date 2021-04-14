/* eslint-disable react-hooks/exhaustive-deps */
import React, {createContext, useContext, useEffect, useReducer} from "react";
import {useHistory} from "react-router";


export const StateContext = createContext({});

export const StateProvider = ({reducer, effect, initialState = {}, children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const history = useHistory();
    useEffect(() => effect(state.action, dispatch, history), [state.action, dispatch, history]);

    return (
        <StateContext.Provider value={[state, dispatch]}>
            {children}
        </StateContext.Provider>
    );
}

export const useStateValue = () => useContext(StateContext);
