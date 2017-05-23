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
                    <div className="note-editor-bot-dock col-xs-7">
                    </div>
                    <div className="col-xs-5">
                        <button className="add-button btn btn-success" onClick={this.handleTodoAdd}>Add</button>
                    </div>
                </div>
            </div>
        );
    }
});

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

ReactDOM.render(
    <TodosApp />,
    document.getElementById("mount-point")
);