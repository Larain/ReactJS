var TextBox = React.createClass({

    getInitialState: function() {
        return {
            displayedText: "Hello, Stranger!"
        };
    },

    handleSearch: function(event) {
        var text = event.target.value;

        console.log(this.state.displayedText);
        if (text === null || text.trim() === '')
    		text = 'Stranger';

        this.setState({

            displayedText: 'Hello, ' + text + '!'
        });
    },

    render: function() {
        return (
        	<div className="container">
		    	<div className="row">
		            <div className="col-lg-12">
		                <input type="text" className="search-field" onChange={this.handleSearch} />
		                <br/>
		                <br/>
		                <p className="form-control" >{this.state.displayedText}</p>
		            </div>
		        </div>
            </div>
        );
    }
});

ReactDOM.render(
    <TextBox />,
    document.getElementById("content")
);