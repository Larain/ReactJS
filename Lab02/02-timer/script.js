var Timer = React.createClass({
    getInitialState: function() {
        return {
            seconds: 0,
            pausedSeconds: 0
        };
    },

    componentDidMount: function() {
        this.timer = setInterval(this.tick, 1000);
    },

    tick: function() {
        this.setState({ seconds: this.state.seconds + 1 });
    },

    componentWillUnmount: function() {
        clearInterval(this.timer);
    },

    handlePause: function(event) {
        this.setState({ pausedSeconds: this.state.seconds });
        clearInterval(this.timer);
    },

    handleStart: function(event) {
        this.setState({ seconds: 0 });
        clearInterval(this.timer);

        this.timer = setInterval(this.tick, 1000);
    },

    handleReset: function(event) {
        this.setState({ pausedSeconds: 0 });
        this.setState({ seconds: 0 });
        clearInterval(this.timer);
    },

    handleContinue: function(event) {
        this.setState({ seconds: this.state.pausedSeconds });
        clearInterval(this.timer);

        this.timer = setInterval(this.tick, 1000);
    },

    render: function() {
        return (
            <div className="row">
                <h4> Уже прошло {this.state.seconds} секунд </h4>
                <button className="btn btn-primary" onClick={this.handlePause}>Pause</button>
                <button className="btn btn-warning" onClick={this.handleStart}>Start</button>
                <button className="btn btn-danger" onClick={this.handleReset}>Reset</button>
                <button className="btn btn-info" onClick={this.handleContinue}>Continue</button>
            </div>
        );
    }
});

ReactDOM.render(
    <Timer />,
    document.getElementById('mount-point')
);