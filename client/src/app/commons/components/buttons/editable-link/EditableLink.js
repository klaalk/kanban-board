import React, {useState} from "react";
import {Button, FormControl, InputGroup} from "react-bootstrap";

import './EditableLink.css';

function EditableLink({link, disabled, editable, lock, onSaveLink, onDeleteLink}) {

    const [localLink, setLocalLink] = useState(link);
    const [localEditable, setLocalEditable] = useState(editable);

    const changeLink = (event) => {
        if (event.target !== null) {
            setLocalLink({...localLink, value: event.target.value});
        }
    };

    const saveLink = () => {
        if (link.value !== localLink.value)
            onSaveLink(localLink);

        if (!lock) {
            setLocalEditable(false);
        }
        if (lock)
            setLocalLink({...localLink, value: ''});
    }

    const deleteLink = () => {
        onDeleteLink(localLink);
        if (!lock)
            setLocalEditable(false);
    }
    return (
        <div className="app-editable-link">
            {
                localEditable ?
                <InputGroup size="sm">
                    <FormControl aria-label="Small" type="text" aria-describedby="inputGroup-sizing-sm"
                                 placeholder="http://..."
                                 disabled={disabled}
                                 value={localLink.value}
                                 onChange={(ev) => changeLink(ev)}/>
                    <InputGroup.Append>
                        <Button variant="outline-primary" size="sm"
                                disabled={localLink.value === ''}
                                onClick={saveLink}>Save</Button>
                        <Button variant="outline-danger" size="sm"
                                disabled={!localLink.id}
                                onClick={deleteLink}>Delete</Button>
                    </InputGroup.Append>
                </InputGroup>
                    :
                <>
                    <div className="app-editable-link--ref" onClick={() => window.open(link.value, '_blank')}>{link.value}</div>
                    <Button variant="light" size="sm" onClick={() => setLocalEditable(true)}>Edit</Button>
                </>
            }
        </div>

    );
}

export default EditableLink;
