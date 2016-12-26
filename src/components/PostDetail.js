import React,{Component} from 'react';
import Axios from 'axios';
import TopBar from './TopBar'
import 'bootstrap'
import '../../style/detail.css'
const API_HOST=(process.env.NODE_ENV=='development')?'':'http://lib_back.twleo.com';
class PostDetail extends Component{
    constructor(props){
        super(props);
        this.state={
                serial:this.props.params.serial,
            title:'',
            photos:[],
            place:'',
            begin:'',
            end:'',
            people:'',
            description:'',
        }
    }
    componentWillMount(){
        console.log(this.state.serial);
        Axios.get(`${API_HOST}/api/artData/${this.state.serial}`).then(
            function (response) {
                var data=response.data.data;
                console.log(data);
                this.setState({title:data.title,place:data.place,begin:data.begin,end:data.end,
                                people:data.people,description:data.description,photos:data.items
                });
            }.bind(this)
        ).catch(
            function (error) {
                alert(error);
            }.bind(this)
        )
    }
    render(){

        return (

            <div>
                <TopBar/>
                <div className="row">
                    <div className="col-md-8">
                        <div id="myCarousel" className="carousel slide" data-ride="carousel">
                            <div className="carousel-inner" role="listbox">
                                {
                                    this.state.photos.map(function (photo,index) {
                                            if(index==0) {
                                                return (
                                                    <div key={index} className="item text-center active">
                                                        <img className="detail-img" src={photo.imgPath}
                                                            />
                                                        <div className="carousel-caption">
                                                            <h4>{photo.title}</h4>
                                                        </div>
                                                    </div>
                                                )
                                            }else {
                                                return (
                                                    <div key={index} className="item text-center">
                                                        <img className="detail-img" src={photo.imgPath}
                                                             />
                                                        <div className="carousel-caption">
                                                            <h4>{photo.title}</h4>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        }
                                    )
                                }
                            </div>
                            <a className="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
                                <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"/>
                                <span className="sr-only">Previous</span>
                            </a>
                            <a className="right carousel-control" href="#myCarousel" role="button" data-slide="next">
                                <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"/>
                                <span className="sr-only">Next</span>
                            </a>
                        </div>
                    </div>
                    <div className="jumbotron col-md-4">
                        <h2>
                        {this.state.title}
                        <br/>
                            <small> {this.state.people}</small>
                        </h2>

                        <p>
                            <span className="glyphicon glyphicon-info-sign"/>
                        {this.state.begin}~{this.state.end}
                        </p>
                        <p>
                            <span className="glyphicon glyphicon-home"/>
                            {this.state.place}
                        </p>
                        <p>
                            <span className="glyphicon glyphicon-question-sign"/>
                            {this.state.description}
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default PostDetail;