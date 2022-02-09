import { ActionType, GlobalStateInterface } from "../types";

const Reducer = (state: GlobalStateInterface, action: ActionType): any => {
  switch (action.type) {
    case "SET_INDIVIDUAL":
      return {
        ...state,
        selectedIndividual: action.payload,
      };
    default:
      return state;
  }
};

export default Reducer;
