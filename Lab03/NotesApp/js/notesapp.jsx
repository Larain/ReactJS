﻿var Note = React.createClass({
    handleTagClick: function (event) {
        var tag = event.target.textContent;
        this.props.onTagClick(tag.toLowerCase());
    },

    render: function () {
        var style = { backgroundColor: this.props.color, color: this.props.foreColor };
        var tagArr = this.props.tags;
        return (
            <div className="note" style={style}>
                <span className="delete-note" onClick={this.props.onDelete}> × </span>
                <div>{this.props.children}</div>
                <div className="tag-holder">
                    {
                        tagArr.map(function (tag, i) {
                            return (
                                <a
                                    key={i}
                                    className="tag"
                                    onClick={this.handleTagClick}>
                                    {tag}
                                </a>
                            );
                        }, this)
                    }
                </div>
            </div>
        );
    }
});

var ColorPicker = React.createClass({
    getInitialState: function () {
        return {
            color: "",
            foreColor: ""
        }
    },

    handleColorClick: function (event) {
        var item = event.target.className;
        var color = "yellow";
        var foreColor = "black";

        if (item.includes("red")) {
            color = "red";
            foreColor = "white";
        }
        if (item.includes("blue")) {
            color = "blue";
            foreColor = "white";
        }
        if (item.includes("light")) {
            color = "#00ccff";
        }
        if (item.includes("green")) {
            color = "green";
            foreColor = "white";
        }
        if (item.includes("purple")) {
            color = "purple";
            foreColor = "white";
        }
        if (item.includes("pink")) {
            color = "pink";
        }

        this.setState({ color: color });
        this.setState({ foreColor: foreColor });
    },

    isSelected: function (elem) {
        return this.state.color == elem ? "selected" : "";;
    },
    getColor: function () {
        return this.state.color;
    },
    getForeColor: function () {
        return this.state.foreColor;
    },

    render: function () {
        return (
            <div className="color-picker-panel" onClick={this.handleColorClick}>
                <div id={this.isSelected("yellow")} className="color-picker-item yellow" />
                <div id={this.isSelected("red")} className="color-picker-item red" />
                <div id={this.isSelected("blue")} className="color-picker-item blue" />
                <div id={this.isSelected("#00ccff")} className="color-picker-item light-blue" />
                <div id={this.isSelected("green")} className="color-picker-item green" />
                <div id={this.isSelected("purple")} className="color-picker-item purple" />
                <div id={this.isSelected("pink")} className="color-picker-item pink" />
            </div>
        );
    }
});

var NoteEditor = React.createClass({
    getInitialState: function () {
        return {
            text: "",
            tags: "",
            color: "",
            foreColor: ""
        };
    },

    handleTextChange: function (event) {
        this.setState({ text: event.target.value });
    },

    handleTagsChange: function (event) {
        this.setState({ tags: event.target.value });
    },

    handleNoteAdd: function () {
        var tagsArr = this.state.tags.replace(/\s/g, "").split(",");

        var newNote = {
            text: this.state.text,
            tags: tagsArr,
            color: this.refs.colorPicker.getColor(),
            foreColor: this.refs.colorPicker.getForeColor(),
            id: Date.now()
        };

        this.props.onNoteAdd(newNote);
        this.setState({ text: "" });
        this.setState({ tags: "" });
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
                <textarea
                    placeholder="Enter note tags here..."
                    rows={2}
                    className="textarea tags"
                    value={this.state.tags}
                    onChange={this.handleTagsChange}
                />
                <div className="row">
                    <div className="note-editor-bot-dock col-xs-7">
                        <ColorPicker onClick={this.handleColorChange} ref="colorPicker" />
                    </div>
                    <div className="col-xs-5">
                        <button className="add-button btn btn-success" onClick={this.handleNoteAdd}>Add</button>
                    </div>
                </div>
            </div>
        );
    }
});

var NotesGrid = React.createClass({

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
        if (this.props.notes.length !== prevProps.notes.length) {
            this.msnry.reloadItems();
            this.msnry.layout();
        }
    },

    handleFilterTags: function (tag) {
        this.props.onFilterTags(tag);
    },

    render: function () {
        var onNoteDelete = this.props.onNoteDelete;

        return (
            <div className="notes-grid" ref="grid">
                {
                    this.props.notes.map(function (note) {
                        return (
                            <Note
                                key={note.id}
                                onDelete={onNoteDelete.bind(null, note)}
                                color={note.color}
                                foreColor={note.foreColor}
                                tags={note.tags}
                                onTagClick={this.handleFilterTags}>
                                {note.text}
                            </Note>
                        );
                    }, this)
                }
            </div>
        );
    }
});

var NotesApp = React.createClass({
    getInitialState: function () {
        return {
            notes: [],
            displayedNotes: [],
            currentTag: ""
        };
    },

    componentDidMount: function () {
        //localStorage.clear();
        var localNotes = JSON.parse(localStorage.getItem("notes"));
        if (localNotes) {
            this.setState({ notes: localNotes });
            this.setState({ displayedNotes: localNotes });
        }
    },

    handleResetTag: function () {
        this.setState({ currentTag: "" });
        var allNotes = this.state.notes;
        this.setState({ displayedNotes: allNotes });
    },

    componentDidUpdate: function () {
        this._updateLocalStorage();
    },

    handleNoteDelete: function (note) {
        var noteId = note.id;
        var newNotes = this.state.notes.filter(function (note) {
            return note.id !== noteId;
        });
        this.setState({ notes: newNotes });
        this.setState({ displayedNotes: newNotes });
        this.setState({ currentTag: "" });
    },

    handleNoteAdd: function (newNote) {
        var newNotes = this.state.notes.slice();
        newNotes.unshift(newNote);
        this.setState({ notes: newNotes });
        this.setState({ displayedNotes: newNotes });
        this.setState({ currentTag: "" });
    },

    handleFilterTags: function (tag) {
        this.setState({ currentTag: tag });
        var newNotes = this.state.notes.filter(function (note) {
            return note.tags.indexOf(tag) !== -1;
        });
        this.setState({ displayedNotes: newNotes });
    },

    render: function () {
        return (
            <div className="notes-app">
                <h2 className="app-header">NotesApp</h2>
                <NoteEditor onNoteAdd={this.handleNoteAdd} />
                <div className="grid-header row">
                    <div className="col-xs-2"></div>
                    <div className="col-xs-6">
                        <textarea ref="tagDisplayer"
                            className="textarea tag-displayer form-control"
                            placeholder="Enter note tags here..."
                            rows={1}
                            value={this.state.currentTag} />
                    </div>
                    <div className="col-xs-4">
                        <button className="btn btn-danger" onClick={this.handleResetTag}>Reset tag filter</button>
                    </div>
                </div>
                <NotesGrid onFilterTags={this.handleFilterTags} notes={this.state.displayedNotes} onNoteDelete={this.handleNoteDelete} />
            </div>
        );
    },

    _updateLocalStorage: function () {
        var notes = JSON.stringify(this.state.notes);
        localStorage.setItem("notes", notes);
    }
});

ReactDOM.render(
    <NotesApp />,
    document.getElementById("mount-point")
);