var CONTACTS = [
    {
        id: 1,
        name: 'Darth Vader',
        phoneNumber: '+250966666666',
        image: 'vader.gif',
        birthday: '29.04.1995',
        description: 'Some text here as a description of contact'
    }, {
        id: 2,
        name: 'Princessssssss Leia',
        phoneNumber: '+250966344466',
        image: 'leia.gif',
        birthday: '29.04.1995',
        description: 'Some text here as a description of contact'
    }, {
        id: 3,
        name: 'Luke Skywalker',
        phoneNumber: '+250976654433',
        image: 'luke.gif',
        birthday: '29.04.1995',
        description: 'Some text here as a description of contact'
    }, {
        id: 4,
        name: 'Chewbacca',
        phoneNumber: '+250456784935',
        image: 'chewbacca.gif',
        birthday: '29.04.1995',
        description: 'Some text here as a description of contact'
    }
];


var Contact = React.createClass({
	getInitialState: function () {
	    return { 
	    	isInfoVisible: false 
	    };
	},
	
    handleCick: function(event) {
    	console.log('li clicked');
    	console.log(this.state.isInfoVisible);

    	this.setState({isInfoVisible: !this.state.isInfoVisible});
    },

    render: function() {
        return (
            <div className="row contact" onClick={this.handleCick}>
            	<div className="row">
            		<div className="col-xs-3">
            			<img className="contact-image" src={this.props.image} width="60px" height="60px" />
            		</div>
	                <div className="col-xs-9">
	                    <div className="contact-name">{this.props.name}</div>
	                    <div className="contact-number">{this.props.phoneNumber}</div>
	                </div>
                </div>
                { 
                	this.state.isInfoVisible ? 
                	<ContactAdditionalInfo
	                	birthday={this.props.birthday}
	                	description={this.props.description} 
                	/> : null
                }
        	</div>
        );
    }
});

var ContactAdditionalInfo = React.createClass({
	render: function() {
		return (
			<div className="row">
		        <div className="col-xs-3">{this.props.birthday}</div>
			    <div className="col-xs-9">{this.props.description}</div>
		    </div>
		);
	}
});

var ContactsList = React.createClass({
    
    // Храним состояние компонента
    getInitialState: function() {
        return {
            displayedContacts: CONTACTS
        };
    },


    handleSearch: function(event) {
        var searchQuery = event.target.value.toLowerCase();
        var displayedContacts = CONTACTS.filter(function(el) {
            var searchValue = el.name.toLowerCase();
            return searchValue.indexOf(searchQuery) !== -1;
        });

        this.setState({
            displayedContacts: displayedContacts
        });
    },

    render: function() {
        return (
            <div className="contacts">
                <input type="text" className="search-field" onChange={this.handleSearch} />
                <div className="contacts-list">
                    {
                        this.state.displayedContacts.map(function(el){
                            return <Contact 
                                key={el.id} 
                                name={el.name}
                                phoneNumber={el.phoneNumber} 
                                image={el.image}
                                birthday={el.birthday}
                                description={el.description}
                             />;
                        })
                    }
                </div>
            </div>
        );
    }
});

ReactDOM.render(
    <ContactsList />,
    document.getElementById("content")
);