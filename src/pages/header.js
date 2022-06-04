import { TbArrowsRightLeft } from "react-icons/tb";
import "./header.css";
export function Header() {
  return (
    <div>
      <div className="header">
        <TbArrowsRightLeft className="icon-header" />
        <h1>unit converter</h1>
      </div>
    </div>
  );
}
