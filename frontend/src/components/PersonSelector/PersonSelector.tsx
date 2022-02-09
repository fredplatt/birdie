import { useContext } from "react";
import { globalContext } from "../../common/state/store";
import { IndividualsInCare } from "../../common/state/IndividualsInCare";
import "./PersonSelector.scss";

export function PersonSelector() {
  const { dispatch, globalState } = useContext(globalContext);

  const setIndividual = (individual: number) => {
    if (globalState.selectedIndividual !== IndividualsInCare[individual]) {
      dispatch({
        type: "SET_INDIVIDUAL",
        payload: IndividualsInCare[individual],
      });
    }
  };

  return (
    <div className="person-selector">
      {IndividualsInCare.map((x, i) => {
        const itemClass =
          "menu-text-element" +
          (globalState.selectedIndividual === IndividualsInCare[i]
            ? " selected"
            : "");

        return (
          <p key={i} className={itemClass} onClick={() => setIndividual(i)}>
            Individual {i + 1}
          </p>
        );
      })}
    </div>
  );
}
