import {
  createContext,
  ReactElement,
  ReactNode,
  useEffect,
  useReducer,
  useRef,
} from "react";
import { ContextType, GlobalStateInterface } from "../types";
import { IndividualsInCare } from "./IndividualsInCare";
import Reducer from "./reducer";

export function GlobalStore({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  const [globalState, dispatch] = useReducer(Reducer, initialiseState());
  const initialRenderGlobalState = useRef(true);
  const initialRenderPersistenceType = useRef(true);

  useEffect(() => {
    if (initialRenderGlobalState.current) {
      initialRenderGlobalState.current = false;
      return;
    }
    const getPersistenceType = globalState.persistenceType;
    if (getPersistenceType === "sessionStorage") {
      sessionStorage.setItem("globalState", JSON.stringify(globalState));
    } else if (getPersistenceType === "localStorage") {
      localStorage.setItem("globalState", JSON.stringify(globalState));
    }
  }, [globalState]);

  useEffect(() => {
    if (initialRenderPersistenceType.current) {
      initialRenderPersistenceType.current = false;
      return;
    }
    const getPersistenceType = globalState.persistenceType;
    if (getPersistenceType === "sessionStorage") {
      localStorage.removeItem("globalState");
    } else if (getPersistenceType === "localStorage") {
      sessionStorage.removeItem("globalState");
    }
  }, [globalState.persistenceType]);

  return (
    <globalContext.Provider value={{ globalState, dispatch }}>
      {children}
    </globalContext.Provider>
  );
}

export const globalContext = createContext({} as ContextType);

export const initialState: GlobalStateInterface = {
  selectedIndividual: IndividualsInCare[0],
  persistenceType: "sessionStorage",
};

function initialiseState() {
  if (typeof Storage !== "undefined") {
  } else {
    throw new Error("You need to enable Storage to run this app.");
  }

  const fromLocalStorage = JSON.parse(
    localStorage.getItem("globalState") as string
  );
  const fromSessionStorage = JSON.parse(
    sessionStorage.getItem("globalState") as string
  );

  return fromSessionStorage || fromLocalStorage || initialState;
}
