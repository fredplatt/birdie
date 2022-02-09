import { Visit } from "../../common/types";
import { Fluid } from "../Fluid/Fluid";
import Alert from "../../images/alert-triangle.svg";
import "./VisitItem.scss";

type VisitItemProps = {
  item: Visit;
};

export function VisitItem(props: VisitItemProps) {
  return (
    <div className="visit-item">
      <p>{props.item.payload.task_definition_description}</p>
      <p>{props.item.payload.task_schedule_note}</p>
      {props.item.payload.alert_id ? <img alt="Alert" src={Alert} /> : null}
      <p>{props.item.payload.event_type.replaceAll("_", " ")}</p>
      <i>{props.item.payload.note}</i>
      <p>{props.item.payload.meal}</p>
      <p>{props.item.payload.medication_failure_reason}</p>
      {props.item.payload.fluid && props.item.payload.consumed_volume_ml ? (
        <Fluid
          beverage={props.item.payload.fluid}
          quantity={props.item.payload.consumed_volume_ml}
        />
      ) : null}
      <p>{props.item.payload.observed}</p>
    </div>
  );
}
