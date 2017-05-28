var React = require('react');
var TodosEditor = require('./TodosEditor.jsx');
var TodosGrid = require('./TodosGrid.jsx');

require('./styles/TodosApp.css');

var TodosApp = React.createClass({
    getInitialState: function () {
        return {
            todos: []
        };
    },

    componentDidMount: function () {
        //localStorage.clear();
        var localTodos = JSON.parse(localStorage.getItem("todos"));
        if (localTodos) {
            this.setState({ todos: localTodos });
        }
    },

    componentDidUpdate: function () {
        this._updateLocalStorage();
    },

    handleTodoDelete: function (todo) {
        var todoId = todo.id;
        var newTodos = this.state.todos.filter(function (todo) {
            return todo.id !== todoId;
        });
        this.setState({ todos: newTodos });
    },

    handleTodoAdd: function (newTodo) {
        var newTodos = this.state.todos.slice();
        newTodos.unshift(newTodo);
        this.setState({ todos: newTodos });
    },

    handleCompletedChanged: function (newCompletedValue, id) {
        var newTodos = this.state.todos;
        for (var i in newTodos) {
            if (newTodos.hasOwnProperty(i)) {
                if (newTodos[i].id === id) {
                    newTodos[i].isCompleted = newCompletedValue;
                    break;
                }
            }
        }

        this.setState({ todos: newTodos });
    },

    handleTextChanged: function (newText, id) {
        var newTodos = this.state.todos;
        for (var i in newTodos) {
            if (newTodos.hasOwnProperty(i)) {
                if (newTodos[i].id === id) {
                    newTodos[i].text = newText;
                    break;
                }
            }
        }

        this.setState({ todos: newTodos });
    },

    render: function () {
        return (
            <div className="notes-app">
                <h2 className="app-header">TodosApp</h2>
                <TodosEditor onTodoAdd={this.handleTodoAdd} />
                <TodosGrid
                    todos={this.state.todos}
                    onTodoDelete={this.handleTodoDelete}
                    textChangedCallback={this.handleTextChanged}
                    completedChangedCallback={this.handleCompletedChanged}/>
            </div>
        );
    },

    _updateLocalStorage: function () {
        var todos = JSON.stringify(this.state.todos);
        localStorage.setItem("todos", todos);
    }
});

module.exports = TodosApp;