const EntryList = (props) => {
	return <div className="row">
    <div className="large-12 columns">
      <ul>{props.items.map((itemText, index) => 
        {
	       return <li key={index + itemText}>{itemText}</li>;
        })}
      </ul>
    </div>
  </div>;
};

const CalculateApp = React.createClass({
	getInitialState() {
		return {items: [], text: ""};
	},
  
	onChange(e) {
		this.setState({text: e.target.value});
	},

	handleSubmit(e) {
		e.preventDefault();
		const value = this.state.text;
		const entry = value + " = " + eval(value);
		const nextItems = this.state.items;
		const nextText = "";
		this.state.items.unshift(entry);
		this.setState({items: nextItems, text: nextText});
	},
  
	render() {
		return (
      <div className="row">
        <div className="col-xs-12">
        <h3>Calculate</h3>
        <form onSubmit={this.handleSubmit}>
          <br/>
          <div className="row">
            <input className="form-input col-xs-12" type="text" onChange={this.onChange} value={this.state.text} />
          </div>
          <div className="row">
            <button className="btn btn-default col-xs-12" type="submit">Submit</button>
          </div>
        </form>
        <EntryList items={this.state.items} />
      </div>
      </div>
		);
	}
});

ReactDOM.render(
  <CalculateApp />,
  document.getElementById("content")
);