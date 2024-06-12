import { createContext, useReducer } from "react";

// Create the ProblemsContext
export const ProblemsContext = createContext();

export const problemsReducer = (state,action) => {
    switch(action.type){
        case 'SET_PROBLEMS':
            return {
                ...state, // Make sure to preserve other state properties
                problems: action.payload
            };
        case 'CREATE_PROBLEM':
            return {
                ...state,
                problems: [action.payload, ...state.problems]
            };
        case 'DELETE_PROBLEM':
            // Filter out the problem with the given ID
            return {
                ...state,
                problems: state.problems.filter((p) => p._id !== action.payload)
            };
        default: 
            return state    
    }
}
// Define and export the ProblemContextProvider component
export const ProblemContextProvider = ({ children }) => {

    const [state,dispatch] = useReducer(problemsReducer, {
        problems: null
    })

    return (
        <ProblemsContext.Provider value={{...state,dispatch}}>
            {children}
        </ProblemsContext.Provider>
    );
};
