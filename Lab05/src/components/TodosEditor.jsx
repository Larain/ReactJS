var React = require('react');

require('./styles/TodosEditor.css');

var TodosEditor = React.createClass({
    getInitialState: function () {
        return {
            text: ""
        };
    },

    handleTextChange: function (event) {
        this.setState({ text: event.target.value });
    },

    handleTodoAdd: function () {
        var newTodo = {
            text: this.state.text,
            color: "#00ccff",
            foreColor: "black",
            id: Date.now(),
            isCompleted: false
        };

        this.props.onTodoAdd(newTodo);
        this.setState({ text: "" });
    },

    render: function () {
        return (
            <div className="note-editor">
                <textarea
                    placeholder="Enter your note here..."
                    rows={5}
                    className="textarea"
                    value={this.state.text}
                    onChange={this.handleTextChange}
                />
                <div className="row">
                    <div className="col-1"></div>
                    <div className="col-10">
                        <button className="add-button btn btn-success" onClick={this.handleTodoAdd}>Add</button>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = TodosEditor;