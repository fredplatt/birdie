import { ReactComponent as Alert } from "../../images/alert-triangle.svg";
import { ReactComponent as CheckIn } from "../../images/log-in.svg";
import { ReactComponent as CheckOut } from "../../images/log-out.svg";
import { ReactComponent as Flag } from "../../images/flag.svg";
import { ReactComponent as Drink } from "../../images/coffee.svg";
import { ReactComponent as Food } from "../../images/pie-chart.svg";
import { ReactComponent as Eye } from "../../images/eye.svg";
import { ReactComponent as Heart } from "../../images/heart.svg";
import { ReactComponent as Physical } from "../../images/activity.svg";
import { ReactComponent as MaybeMeds } from "../../images/user-minus.svg";
import { ReactComponent as YesMeds } from "../../images/user-check.svg";
import { ReactComponent as NoMeds } from "../../images/user-x.svg";
import { ReactComponent as TaskComplete } from "../../images/check-square.svg";
import { ReactComponent as TaskIncomplete } from "../../images/x-square.svg";
import { ReactComponent as TaskSchedule } from "../../images/calendar.svg";
import { ReactComponent as VisitComplete } from "../../images/check.svg";
import { ReactComponent as Cross } from "../../images/x.svg";
import { ReactComponent as Pocket } from "../../images/pocket.svg";
import "./GraphicRepresentation.scss";

type GraphicRepresentationProps = {
  event: string;
};

export default function GraphicRepresentation(
  props: GraphicRepresentationProps
) {
  const icon =
    props.event === "alert_qualified" || props.event === "alert_raised" ? (
      <Alert className="icon" title={props.event.replaceAll("_", " ")} />
    ) : props.event === "check_in" ? (
      <CheckIn className="icon" title={props.event.replaceAll("_", " ")} />
    ) : props.event === "check_out" ? (
      <CheckOut className="icon" title={props.event.replaceAll("_", " ")} />
    ) : props.event === "concern_raised" ? (
      <Flag className="icon" title={props.event.replaceAll("_", " ")} />
    ) : props.event === "fluid_intake_observation" ? (
      <Drink className="icon" title={props.event.replaceAll("_", " ")} />
    ) : props.event === "food_intake_observation" ? (
      <Food className="icon" title={props.event.replaceAll("_", " ")} />
    ) : props.event === "general_observation" ? (
      <Eye className="icon" title={props.event.replaceAll("_", " ")} />
    ) : props.event === "mental_health_observation" ||
      props.event === "mood_observation" ? (
      <Heart className="icon" title={props.event.replaceAll("_", " ")} />
    ) : props.event === "regular_medication_partially_taken" ||
      props.event === "no_medication_observation_received" ||
      props.event === "regular_medication_maybe_taken" ? (
      <MaybeMeds className="icon" title={props.event.replaceAll("_", " ")} />
    ) : props.event === "physical_health_observation" ? (
      <Physical className="icon" title={props.event.replaceAll("_", " ")} />
    ) : props.event === "regular_medication_not_taken" ? (
      <NoMeds className="icon" title={props.event.replaceAll("_", " ")} />
    ) : props.event === "regular_medication_taken" ? (
      <YesMeds className="icon" title={props.event.replaceAll("_", " ")} />
    ) : props.event === "task_completed" ? (
      <TaskComplete className="icon" title={props.event.replaceAll("_", " ")} />
    ) : props.event === "task_completion_reverted" ? (
      <TaskIncomplete className="icon" title={props.event.replaceAll("_", " ")} />
    ) : props.event === "visit_completed" ? (
      <VisitComplete className="icon" title={props.event.replaceAll("_", " ")} />
    ) : props.event === "visit_cancelled" ? (
      <Cross className="icon" title={props.event.replaceAll("_", " ")} />
    ) : props.event === "toilet_visit_recorded" ||
      "catheter_observation" ||
      "incontinence_pad_observation" ? (
      <Pocket className="icon" title={props.event.replaceAll("_", " ")} />
    ) : props.event === "task_schedule_created" ||
      "medication_schedule_created" ||
      "medication_schedule_updated" ? (
      <TaskSchedule className="icon" title={props.event.replaceAll("_", " ")} />
    ) : null;

  return icon;
}
