var Note = React.createClass({
    render: function() {
        return (
            <div className="note">Note</div>
        );
    }
});

var NoteEditor = React.createClass({
    render: function() {
        return (
            <div className="note-editor">NoteEditor</div>
        );
    }
});

var NotesGrid = React.createClass({
    render: function() {
        return (
            <div className="notes-grid" ref="grid">
                <Note />
                <Note />
                <Note />
            </div>
        );
    }
});

var NotesApp = React.createClass({
    render: function() {
        return (
            <div className="notes-app">
                <h2 className="app-header">NotesApp</h2>
                <NoteEditor />
                <NotesGrid />
            </div>
        );
    }
});

ReactDOM.render(
    <NotesApp />,
    document.getElementById('mount-point')
);