/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {useStateValue} from "../../state/state.provider";
import {
    GetBoard,
} from "./state/work-board.action";
import Board from "./components/board/Board";
import {SetBoard} from "../list-boards/state/list-boards.action";
import TrialBoard from "../../constants/trial-board.constant";

function WorkBoard({id, trial}) {
    // Load state
    const [state, dispatch] = useStateValue();
    const board = state.board || {};

    // Load boards info
    useEffect(() => {
        if (id && !state.board)
            dispatch(GetBoard(id));
        if (trial && !state.board)
            dispatch(SetBoard(TrialBoard));

    }, [dispatch, id, trial]);

    return (<Board key={board.id} board={board} />);
}

export default WorkBoard;
