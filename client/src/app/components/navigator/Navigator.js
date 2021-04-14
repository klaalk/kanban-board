import React, {useEffect} from "react";
import {Redirect, Switch} from "react-router";
import {Route} from "react-router-dom";
import ListBoards from "../list-boards/ListBoards";
import WorkBoard from "../work-board/WorkBoard";
import {useStateValue} from "../../state/state.provider";
import ShareModal from "../../commons/components/modals/share-modal/ShareModal";
import {CloseShareBoard, ShareBoard} from "../list-boards/state/list-boards.action";
import "./Navigator.css";
import {AppMode} from "../../enums/app-mode.enum";
import {NavigateTo} from "../../state/app.action";

function Navigator() {
    const [state, dispatch] = useStateValue();

    useEffect(() => {
        if  (state.mode === AppMode.NotAuthenticated)
            dispatch(NavigateTo('/trial-board'));

    }, [state.mode, dispatch]);

    return (
        <div className="app-navigator">
            <Switch>
                <Route path='/trial-board'>
                    <WorkBoard trial={true}/>
                </Route>
                <Route path='/all-boards'>
                    <ListBoards />
                </Route>
                <Route path='/shared-boards'>
                    <ListBoards shared={true}/>
                </Route>
                <Route path='/board/:id'
                       render={({match}) => (<WorkBoard id={match.params.id}/>)}/>
                <Route path='/'>
                    {
                        (state.mode === AppMode.NotAuthenticated) ?
                        <Redirect to='/trial-board'/>
                        :
                        <Redirect to='/all-boards'/>
                    }
                </Route>
            </Switch>
            <ShareModal
                props={state.shareModal}
                users={state.users}
                onSubmit={(elementId, username) => dispatch(ShareBoard(elementId, username))}
                onCancel={() => dispatch(CloseShareBoard())}
            />
        </div>
    );
}

export default Navigator;
