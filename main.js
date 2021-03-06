// const wassups = [ 
//     {
//         "userName": 'Michael',
//         "id": 1,
//         "body": "If I had a gun with two bullets and I was in a room with Hitler, Bin Laden, and Toby, I would shoot Toby twice.",
//     },
//     {
//         "userName": 'Jim',
//         "id": 2,
//         "body": "Beets, Bears, Battlestar Galactica."
//     },
//     {
//         "userName": 'Kelly',
//         "id": 3,
//         "body": "I have alot of questions. Number one, how dare you?"
//     },
//     {
//         "userName": 'Andy',
//         "id": 4,
//         "body": "Sorry I annoyed you with my friendship."
//     },
//     {
//         "userName": 'Pam',
//         "id": 5,
//         "body": "I feel God in this Chili’s tonight."
//     },
//     {
//         "userName": 'Dwight',
//         "id": 6,
//         "body": "Whenever I'm about to do something, I think, 'Would an idiot do that?' And if they would, I do not do that thing."
//     },
//     {
//         "userName": "Michael",
//         "id": 8,
//         "body": "Would I rather be feared or loved? Easy. Both. I want people to be afraid of how much they love me."
//     }
// ]

let WassupRow = props => 
    <div className='rows'>
        <h3>{props.wassup.content}</h3>
        <p className="author">-{props.wassup.user}</p>
    </div>;


let WassupList = props => 
    <div>
        {props.wassups.map(wassup => 
<WassupRow props={props} wassup={wassup} key={wassup.id}/>)
    }
    </div>;

let WassupForm = (props) => {
    return (
    <form className="input-fields" onSubmit={props.handleSubmit}>
        <input type="text" placeholder="What's up?" value={props.newWassup} onChange={props.handleNewWassup}/>
        <input type="text" placeholder="Username" value={props.user} onChange={props.handleNewUser}/>
        <input type='submit' value="Post"/>
    </form>)
}

class WassupFormContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newWassup: "",
            user: ""
        }
    }
    render() {
        let handleSubmit = (event) => {
            event.preventDefault();
            this.props.addWassup({ content: this.state.newWassup, user: this.state.user });
            this.setState({ newWassup: "" });
        }
        let handleNewWassup = (event) => this.setState({ newWassup: event.target.value });
        let handleNewUser = (event) => this.setState({ user: event.target.value })
        return <WassupForm handleSubmit={handleSubmit} handleNewUser={handleNewUser} handleNewWassup={handleNewWassup} user={this.state.user} newWassup={this.state.newWassup}/>
    }
}

let Homepage = props => {
    return (
    <div className="homepage">
        <h1>Wassup</h1>
        <WassupFormContainer addWassup={props.addWassup}/>
        <WassupList wassups={props.wassups}/>
    </div>)
}

class HomepageContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            wassups: [],
            id: 4
        }
    }
    componentDidMount() {
        fetch('http://0.tcp.ngrok.io:11971/wassups.json')
            .then(response => {
                return response.json();
            })
            .then(wassups => {
                this.setState({ wassups: wassups })
             });
    }
    render() {
        let addWassup = (props) => {
            this.setState({
                id: this.state.id += 1
            })
            this.setState({ 
                wassups: [
                    {
                        user: props.user,
                        id: this.state.id,
                        content: props.content
                    }
                ].concat(this.state.wassups)
             })
        }
        return <Homepage addWassup={addWassup} wassups={this.state.wassups}/>;
    }
 }

 ReactDOM.render(
     <HomepageContainer></HomepageContainer>, document.querySelector('.react-root')
 );