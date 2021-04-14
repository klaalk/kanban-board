import React from "react";

import {AiOutlineLogin, AiOutlineLogout, MdAccountCircle} from "react-icons/all";
import {useStateValue} from "../../state/state.provider";
import {Logout, OpenLogin} from "./state/header.action";
import ButtonIcon from "../../commons/components/buttons/button-icon/ButtonIcon";

import "./Header.css";
import {AppMode} from "../../enums/app-mode.enum";
import {LoadBoards} from "../list-boards/state/list-boards.action";
import {OverlayTrigger, Popover} from "react-bootstrap";
import {useLocation} from "react-router";

function Header({title = ""}) {
    const [state, dispatch] = useStateValue();
    const location = useLocation();
    const path = location.pathname;
    const user = state.user || {};
    return (
        <div className="app-header">
            <div className="app-header--title">
                {title.toUpperCase()}
            </div>
            { state.mode === AppMode.Authenticated &&
                <div className="app-header--actions">
                    <div className="app-header--action">
                        <ButtonIcon label="All boards" active={path==="/all-boards"}
                                    onClick={() => {dispatch(LoadBoards(state.user.id, false))}}/>
                    </div>
                    <div className="app-header--action">
                        <ButtonIcon label="Shared boards" active={path==="/shared-boards"}
                                    onClick={() => {dispatch(LoadBoards(state.user.id, true))}}/>
                    </div>
                </div>
            }
            <div className="app-header--container">
                { state.mode === AppMode.Authenticated ?
                    <>

                        <OverlayTrigger
                            trigger="click"
                            key="bottom"
                            placement="bottom"
                            overlay={
                                <Popover id="popover-positioned-bottom">
                                    <Popover.Title as="h3">Hi, {user.name} {user.surname}</Popover.Title>
                                    <Popover.Content>
                                        Your username is {user.username}
                                    </Popover.Content>
                                </Popover>
                            }
                        >
                            <ButtonIcon check={true}>
                                <MdAccountCircle/>
                            </ButtonIcon>

                        </OverlayTrigger>
                        <ButtonIcon label="Logout" onClick = {() => dispatch(Logout())}>
                            <AiOutlineLogout/>
                        </ButtonIcon>

                    </>
                :
                    <ButtonIcon label="Login" onClick={() => dispatch(OpenLogin())}>
                        <AiOutlineLogin/>
                    </ButtonIcon>
                }
            </div>

        </div>
    );
};

export default Header;
