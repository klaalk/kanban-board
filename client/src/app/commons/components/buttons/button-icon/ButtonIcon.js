import React, {useState} from "react";
import "./ButtonIcon.css";

function ButtonIcon({label, active, check, onClick, children}) {
    const [checked, setChecked] = useState(false);

    const classChecked = (checked || active) ? "--checked" : ""
    return (
        <div className={"app-button-icon"+classChecked} onClick={() => {
            if (check) setChecked(!checked)
            onClick();
        }}>
            {label && <div className="app-button-icon--label">{label}</div>}
            <div className="app-button-icon--icon">{children}</div>
        </div>
    );
}

export default ButtonIcon;
