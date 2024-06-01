import { ProblemsContext } from "../context/ProblemContext";
import { useContext } from "react";

export const useProblemsContext = () => {
    const context = useContext(ProblemsContext)

    if(!context){
        throw Error('useProblemsContext must be used inside an ProblemsContextProvider')
    }

    return context
}