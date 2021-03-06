function printOnPage(methodName) {
    var ul = document.getElementById('screen');
    var li = document.createElement('li');
    li.appendChild(document.createTextNode(methodName));
    li.className = methodName;
    ul.appendChild(li);
    ul.scrollTop = ul.scrollHeight;
}

var App = React.createClass({
    getInitialState: function() {
        return {
            id: 0,
            mounted: false
        };
    },

    handleUpdateProps: function() {
        this.setState({id: this.state.id + 1});
    },

    handleMountOrUnmount: function() {
        this.setState({mounted: !this.state.mounted});
    },

    render: function() {
        return (
            <div className='App'>
                {
                    this.state.mounted
                        ? <Component id={this.state.id} />
                        : false
                }
                <button onClick={this.handleUpdateProps}>
                    Update props
                </button>
                <button onClick={this.handleMountOrUnmount}>
                    {this.state.mounted ? 'Unmount' : 'Mount'}
                </button>
            </div>
        );
    }
});

var Component = React.createClass({
    getDefaultProps: function() {
        printOnPage('getDefaultProps');

        return {
            id : 0
        };
    },

    getInitialState: function() {
        printOnPage('getInitialState');

        return {
            id: 0
        };
    },

    componentWillMount: function() {
        printOnPage('componentWillMount');
    },

    componentDidMount: function() {
        printOnPage('componentDidMount');
    },

    componentWillReceiveProps: function() {
        printOnPage('componentWillReceiveProps');
    },

    componentWillUpdate: function() {
        printOnPage('componentWillUpdate');
    },

    componentDidUpdate: function() {
        printOnPage('componentDidUpdate');
    },

    shouldComponentUpdate: function(nextProps) {
        printOnPage('shouldComponentUpdate');

        return true;
    },

    componentWillUnmount: function() {
        printOnPage('componentWillUnmount');
    },

    handleUpdateState: function()  {
        this.setState({id: this.state.id + 1});
    },

    render: function() {
        printOnPage('render');

        return (
            <div>
                <div> Component state : {this.state.id} </div>
                <div> Component props : {this.props.id} </div>
                <button onClick={this.handleUpdateState}>
                    Update state
                </button>
            </div>
        );
    }
});

ReactDOM.render(
<App />,
document.getElementById('mount-point')
);