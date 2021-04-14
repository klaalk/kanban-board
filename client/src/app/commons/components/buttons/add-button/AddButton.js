import React from "react";
import {MdAdd} from "react-icons/all";
import "./AddButton.css";

function AddButton({dark, disabled, onClick}) {

    const classDisabled = disabled ? " --disabled" : ""
    const classDark = dark ? " --dark" : "";
    return (

        <div className={`app-add-button${classDark}${classDisabled}`} >
            <div className="app-add-button--container" onClick={() => { if (!disabled) onClick(); }}>
                <div className={`app-add-button--icon${classDark}${classDisabled}`}><MdAdd/></div>
            </div>
        </div>
    );
}

export default AddButton;
