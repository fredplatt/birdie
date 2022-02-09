import { useState } from "react";
import { CleanTimestamp } from "../../common/functions/CleanTimestamp";
import GraphicRepresentation from "../GraphicRepresentation/GraphicRepresentation";
import { ReactComponent as DownChevron } from "../../images/chevron-down.svg";
import { ReactComponent as UpChevron } from "../../images/chevron-up.svg";
import { Visit } from "../../common/types";
import { VisitItem } from "../VisitItem/VisitItem";
import "./DateContainer.scss";

type DateContainerProps = {
  date: string;
  items: Visit[];
};

export var DateContainer = function (props: DateContainerProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  function compare(a: Visit, b: Visit) {
    if (a.payload.timestamp < b.payload.timestamp) {
      return -1;
    }
    if (a.payload.timestamp > b.payload.timestamp) {
      return 1;
    }
    return 0;
  }

  const sortedByTime = props.items.sort(compare);
  const chevron = dropdownOpen ? (
    <UpChevron
      className="chevron"
      onClick={() => setDropdownOpen(!dropdownOpen)}
    />
  ) : (
    <DownChevron
      className="chevron"
      onClick={() => setDropdownOpen(!dropdownOpen)}
    />
  );
  return (
    <div className="container">
      <h5>
        {CleanTimestamp(props.date)}
        {chevron}
      </h5>
      <div className="images-container">
        {sortedByTime.map((x) => (
          <GraphicRepresentation
            key={x.payload.id}
            event={x.payload.event_type}
          />
        ))}
      </div>
      {dropdownOpen
        ? sortedByTime.map((x) => <VisitItem key={x.payload.id} item={x} />)
        : null}
    </div>
  );
};
