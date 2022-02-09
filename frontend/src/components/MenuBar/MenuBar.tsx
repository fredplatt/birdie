import { PersonSelector } from "../PersonSelector/PersonSelector";
import LogoLight from "../../images/birdie-logo-light.svg";
import "./MenuBar.scss";

export function MenuBar() {
  return (
    <div className="menu-bar">
      <a href="https://www.birdie.care">
        <img src={LogoLight} alt="birdie" />
      </a>
      <PersonSelector />
      <a
        className="menu-text-element"
        href="mailto:support@birdie.care?subject=Family Portal"
      >
        Contact
      </a>
    </div>
  );
}
