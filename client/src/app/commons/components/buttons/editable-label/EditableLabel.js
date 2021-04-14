import React from "react";
import "./EditableLabel.css";

class EditableLabel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tmpTitle: "",
            editable: this.props.focus,
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.editable) {
            this.editableInput.focus();
        }
    }

    toggleEditable(edit) {
        if (this.props.disabled === true)
            return;
        if (!edit && this.state.tmpTitle !== "") {
            this.setState({...this.state, editable: edit});
            if (this.props.onSubmit && this.props.title !== this.state.tmpTitle)
                this.props.onSubmit(this.state.tmpTitle);
        }
        else {
            this.setState({...this.state, editable: edit, tmpTitle: this.props.title});
            if (this.props.onReset) {
                this.props.onReset();
            }
        }
    }

    updateTmpTitle(value) {
        this.setState({...this.state, tmpTitle: value})
    }

    render() {
        return (
            <div style={{display: 'flex', flex: 'auto'}}>
                {
                    this.state.editable ?
                    <input className="app-editable-label--input"
                           value={this.state.tmpTitle}
                           placeholder="Insert title"
                           type="text"
                           onChange={(e) => this.updateTmpTitle(e.target.value)}
                           onBlur={() => this.toggleEditable(false)}
                           onKeyDown={(e) => {if (e.key === 'Enter') this.toggleEditable(false)}}
                           ref={(input) => { this.editableInput = input; }} />
                        :
                    <div className={`app-editable-label--title${this.props.disabled ? "--disabled" : ""}`}
                         onClick={() => !this.props.block ? this.toggleEditable(true) : this.props.onLabelClick()}>
                        {this.props.title || this.state.tmpTitle}
                    </div>
                }
            </div>
        );
    }
}

export default EditableLabel;
