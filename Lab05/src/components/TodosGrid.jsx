var React = require('react');
var Todo = require('./Todo.jsx');

require('./styles/TodosGrid.css');

var TodosGrid = React.createClass({

    componentDidMount: function () {
        var grid = this.refs.grid;
        this.msnry = new Masonry(grid, {
            itemSelector: ".note",
            columnWidth: 200,
            gutter: 10,
            isFitWidth: true
        });
    },

    componentDidUpdate: function (prevProps) {
        if (this.props.todos.length !== prevProps.todos.length) {
            this.msnry.reloadItems();
            this.msnry.layout();
        }
    },

    handleCompletedChanged: function (isCopletedValue, id) {
        console.log(isCopletedValue);
        console.log(id);
        this.props.completedChangedCallback(isCopletedValue, id);
    },

    handleTextChange: function(newText, id) {
        console.log(newText);
        console.log(id);
        this.props.textChangedCallback(newText, id);
    },

    render: function () {
        var onTodoDelete = this.props.onTodoDelete;

        return (
            <div className="notes-grid" ref="grid">
                {
                    this.props.todos.map(function (todo) {
                        return (
                            <Todo
                                key={todo.id}
                                id={todo.id}
                                text={todo.text}
                                color={todo.color}
                                foreColor={todo.foreColor}
                                isCompleted={todo.isCompleted}
                                onDelete={onTodoDelete.bind(null, todo)}
                                onTextChanged={this.handleTextChange}
                                onCompletedChanged={this.handleCompletedChanged}>
                            </Todo>
                        );
                    }, this)
                }
            </div>
        );
    }
});

module.exports = TodosGrid;