/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from "react";
import {useStateValue} from "../../state/state.provider";
import {
    DeleteBoard,
    LoadBoards,
    OpenShareBoard,
    PostBoard,
    SetBoard,
} from "./state/list-boards.action";
import BoardPreview from "../../commons/components/board-preview/BoardPreview";
import AddBoard from "../../commons/components/add-board/AddBoard";
import "./ListBoards.css";
import {AppMode} from "../../enums/app-mode.enum";

function ListBoards({shared}) {
    // Load app state
    const [state, dispatch] = useStateValue();

    const {boards} = state;

    // Load user boards
    useEffect(() => {
        if (state.mode === AppMode.Authenticated && state.user && state.user.id)
            dispatch(LoadBoards(state.user.id, shared));
    }, [dispatch, state.mode, state.user]);

    // Function when add board
    const addBoard = (title) => dispatch(PostBoard(title, state.user.id));

    const ListBoardPreview = ({title, boards, owned, shared}) => (
        <div className="app-list-boards--container">
            <div className="app-list-boards--header">{title}</div>
            <div className="app-list-boards--body">
                { owned && !shared &&
                <AddBoard key={"add-board-head"} onAddBoard={addBoard}/> }
                {
                    boards.sort((a,b) => b.id-a.id)
                        .map((board, index) => (
                            <div className="app-list-boards--element"
                                 key={board.id}>
                                <BoardPreview block={true}
                                              owned={owned}
                                              board={board}
                                              onOpenBoard={() => dispatch(SetBoard(board))}
                                              onDeleteBoard={() => dispatch(DeleteBoard(board.userId, board.id))}
                                              onOpenShareBoard={() => dispatch(OpenShareBoard(board.id))}
                                />
                            </div>
                        ))
                }

            </div>
        </div>
    );

    return(
        <div className="app-list-boards">
            <ListBoardPreview
                title={shared ? "Shared by me" : "My boards"}
                boards={boards.filter(b => b.userId === state.user.id)} owned={true} shared={shared}/>

            <ListBoardPreview
                title={"Shared with me"}
                boards={boards.filter(b => b.userId !== state.user.id)} owned={false} shared={true}/>
        </div>
    );
}

export default ListBoards;
