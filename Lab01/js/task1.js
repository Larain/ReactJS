var POSTS = 
[
    {
        id: 1,
        title: 'Darth Vader comes back!',
        author: 'Darth Vader',
        body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore, veritatis, tempora, necessitatibus inventore nisi quam quia repellat ut tempore laborum possimus eum dicta id animi corrupti debitis ipsum officiis rerum.',
        url: '#'
    },
    {
        id: 2,
        title: 'New Apple RED Iphone',
        author: 'Yura',
        body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore, veritatis, tempora, necessitatibus inventore nisi quam quia repellat ut tempore laborum possimus eum dicta id animi corrupti debitis ipsum officiis rerum.',
        url: '#'
    },
    {
        id: 1,
        title: 'Sony PlayStation 4 PRO',
        author: 'Lara1n',
        body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore, veritatis, tempora, necessitatibus inventore nisi quam quia repellat ut tempore laborum possimus eum dicta id animi corrupti debitis ipsum officiis rerum.',
        url: '#'
    }
];

var PostsList = React.createClass({
    render: function() {
        return (
            <div>
                <Post post={POSTS[0]}/>
                <Post post={POSTS[1]}/>
                <Post post={POSTS[2]}/>
            </div>
        );
    }
});

var Post = React.createClass({
    render: function() {
        return (
            <div>
                <Title text={this.props.post.title}/>
                <Author text={this.props.post.author}/>
                <Body text={this.props.post.body}/>
                <Footer url={this.props.post.url}/>
                <hr />
            </div>
        );
    }
});
        
var Title = React.createClass({
    render: function() {
        return (
            <h2>
                <a href="#"> {this.props.text} </a>
            </h2>
        );
    }
});

var Author = React.createClass({
    render: function() {
        return (
            <p className="lead">
                by <a href="#"> {this.props.text} </a>
            </p>
        );
    }
});

var Body = React.createClass({
    render: function() {
        return (
            <div>
                <p><span className="glyphicon glyphicon-time"></span> Posted on August 28, 2013 at 10:00 PM</p>
                <hr />
                <img className="img-responsive" src="http://placehold.it/900x300" alt="" />
                <hr />
                <p>
                    {this.props.text}
                </p>
            </div>
        );
    }
});

var Footer = React.createClass({
    render: function() {
        return (              
            <a className="btn btn-primary" href={this.props.url}> Read More <span className="glyphicon glyphicon-chevron-right"></span></a>       
        );
    }
});


ReactDOM.render(
    <PostsList/>,
    document.getElementById('page-content')
);