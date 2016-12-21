import React,{Component} from 'react';
import {Link,IndexLink} from 'react-router';
import 'bootstrap'
class TopBar extends  Component{
    constructor(props){
        super(props);
        this.state={
            selyear:this.props.year?this.props.year:'其他年份'
        }
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps.year);
        this.setState({selyear: (nextProps.year?nextProps.year:'其他年份')});
    }
    render(){
        var years=[];
        for(let i=2016;i>=2004;i--){
            years.push(i);
        }

        return (
            <nav className="navbar navbar-default">
                <div className="navbar-header">
                     <IndexLink className="navbar-brand"  to={"/"}>浩然大廳藝文展</IndexLink>
                </div>

                <ul className="nav navbar-nav">
                        <li> <IndexLink role="button"to={"/"}>全部年份</IndexLink></li>
                       <li className="dropdown">
                        <a className="dropdown-toggle" id="menu1" role="button" data-toggle="dropdown">{this.state.selyear}<span className="caret"/></a>
                                <ul className="dropdown-menu">

                            {
                                years.map(function (year) {
                                    return (<li><Link role="menuitem" key={year} to={`/${year}/`}>{year}</Link></li>)
                                })
                            }
                                </ul>
                        </li>
                </ul>
            </nav>
        )
    }
}

export  default TopBar;