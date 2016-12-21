/**
 * Created by fuyu0425 on 2016/12/21.
 */
import React,{Component} from 'react'
import {Link} from 'react-router'
class PostItem extends Component{

    render(){
        return(
            <li className="list-group-item">
                <img className="img-responsive" src={this.props.cover}/>
                {this.props.title}
                <br/>
                活動日期 : {this.props.begin}-{this.props.end}
                <br/>
                <Link className="btn btn-default" to={`/post/${this.props.serial}`}>更多詳情</Link>
            </li>
        )
    }
}

export default PostItem