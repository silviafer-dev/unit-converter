import { HiSwitchHorizontal } from "react-icons/hi";
import "./header.css";
export function Header() {
  return (
    <div>
      <div className="header">
        <HiSwitchHorizontal className="icon-header" />
        <h1>unit converter</h1>
      </div>
    </div>
  );
}
