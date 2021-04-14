import React, {useState} from "react";
import Lane from "../../../components/work-board/components/lane/Lane";
import AddButton from "../buttons/add-button/AddButton";

import "./AddLane.css";

function AddLane ({disabled, onAddLane}) {
    const [state, setState] = useState({showForm: false});
    return (
            <>
            {
                !state.showForm ?
                    <div className="app-add-lane--button">
                        <AddButton disabled={disabled} onClick={() => setState({...state, showForm: true}) }/>
                    </div>
                    :
                    <Lane focus={true}
                          lane={{title: '', cards: [], archivedCards: []}}
                          onSubmitLane={onAddLane}
                          onResetLane={() => setState({...state, showForm: false})}
                          onDeleteLane={() => setState({...state, showForm: false})}
                    />
            }
            </>
    );
}

export default AddLane;
