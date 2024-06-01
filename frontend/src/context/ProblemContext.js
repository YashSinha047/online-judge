import { createContext, useReducer } from "react";

// Create the ProblemsContext
export const ProblemsContext = createContext();

export const problemsReducer = (state,action) => {
    switch(action.type){
        case 'SET_PROBLEMS':
            return{
                problems: action.payload
            }
        case 'CREATE_PROBLEM':
            return{
                problems: [action.payload, ...state.problems]
            }    
        case 'DELETE_PROBLEM':
            return{
                problems: state.problems.filter((p) => p._id !== action.payload._id)
            }    
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
