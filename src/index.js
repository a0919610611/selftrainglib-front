import React,{Component} from 'react';
import ReactDOM from 'react-dom'
import Axios from 'axios'
import PostList from './components/PostList'
import PostDetail from './components/PostDetail'
import TopBar from './components/TopBar'
import { browserHistory } from 'react-router'
import { Router, Route, Link } from 'react-router'
const URL="http://localhost:8000/api";
import 'bootstrap';
import '../style/style.sass';
// import config from 'config';
//
// console.log(config.API_HOST);
console.log(process.env.NODE_ENV);
class App extends Component{
    constructor(props){
        super(props);
        this.state={
        }
    }
    render(){
        return(
            <div>
                <TopBar/>
                {this.props.children}
            </div>
        )
    }
}
ReactDOM.render((
    <Router history={browserHistory}>

            <Route path="/" component={PostList}/>
            <Route  path="/:year" component={PostList}/>
            <Route path="/post/:serial" component={PostDetail}/>
    </Router>
    )
,document.querySelector('.container'));
