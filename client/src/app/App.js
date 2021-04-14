import React from 'react';
import {withRouter} from 'react-router-dom';
import Header from "./components/header/Header";
import LoginModal from "./commons/components/modals/login-modal/LoginModal";
import {CloseLogin, SubmitLogin} from "./components/header/state/header.action";
import {useStateValue} from "./state/state.provider";
import Navigator from "./components/navigator/Navigator";
import Loader from "react-loader-spinner";
import "./App.css";
import ErrorModal from "./commons/components/modals/error-modal/ErrorModal";
import {CloseErrorModal} from "./state/app.action";

function App() {
    const [state, dispatch] = useStateValue();
    return (
        <>
            <div className="app">
                <Header title="Kanban"/>

                { state.loading ?
                    <div className="app-loader">
                        <Loader type="ThreeDots" color="#FFF" height={100} width={100}/>
                    </div>
                    :
                    <Navigator />
                }
            </div>
            <LoginModal props={state.login}
                onCancel={() => dispatch(CloseLogin())}
                onSubmit={(username, password) => dispatch(SubmitLogin(username, password))}/>
            <ErrorModal
                show={state.errorModal.show}
                message={state.errorModal.message}
                onSubmit={() => dispatch(CloseErrorModal())}
            />
        </>
    );
}
export default withRouter(App);
