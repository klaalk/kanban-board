import React, {useState} from "react";
import AddButton from "../buttons/add-button/AddButton";
import BoardPreview from "../board-preview/BoardPreview";
import "./AddBoard.css";


function AddBoard({onAddBoard}) {
    const [state, setState] = useState({showForm: false});
    return (
        <>
            {
                !state.showForm ?
                    <div className="app-add-board--button">
                        <AddButton onClick={() => setState({...state, showForm: true}) }/>
                    </div>
                    :
                    <BoardPreview focus={true}
                                  board={{}}
                                  onEditBoard={onAddBoard}
                                  onResetBoard={() => setState({...state, showForm: false})}
                                  onDeleteBoard={() => setState({...state, showForm: false})}
                    />
            }
        </>
    );
}

export default AddBoard;
