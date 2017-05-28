var React = require('react');

require('./styles/Todo.css');

var Todo = React.createClass({
    getInitialState: function () {
        return {
            text: "",
            isCompleted: false
        };
    },

    componentDidMount: function () {
        this.setState({ text: this.props.text });
        this.setState({ isCompleted: this.props.isCompleted });
    },

    handleCompletedClick: function (event) {
        var newState = !this.state.isCompleted;
        var id = this.props.id;

        this.setState({ isCompleted: newState });
        this.props.onCompletedChanged(newState, id);
    },

    handleTextChange: function (event) {
        var newText = event.target.value;
        var id = this.props.id;

        this.setState({ text: newText });
        this.props.onTextChanged(newText, id);
    },

    render: function () {
        var style = { backgroundColor: this.props.color, color: this.props.foreColor };
        return (
            <div className="note" style={style}>
                <span className="delete-note" onClick={this.props.onDelete}> × </span>
                <div className={this.props.isCompleted ? "completed" : ""}>
                    <input type="text" onChange={this.handleTextChange} value={this.state.text} className="form-control todo-text"/>
                    <label><input onClick={this.handleCompletedClick} checked={this.state.isCompleted} className="checkbox" type="checkbox"/></label>
                </div>
            </div>
        );
    }
});

module.exports = Todo;