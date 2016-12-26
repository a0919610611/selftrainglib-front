/**
 * Created by fuyu0425 on 2016/12/21.
 */
import React,{Component} from 'react'
import PostItem from './PostItem'
import TopBar from './TopBar'
import Axios from 'axios'
import $ from 'jquery';
const API_HOST=(process.env.NODE_ENV=='development')?'':'http://lib_back.twleo.com';
class PostList extends Component{
    constructor(props){
        super(props);
        this.state={
            year:this.props.params.year?this.props.params.year:'',
            item1 : [],
            item2:[],
            item3:[],
            item4:[],
            page: 1,
            isLoading:false,
            isOver:false,
        }
    }

    componentDidMount(){
        window.addEventListener('scroll',this.listenScrollEvent);
        Axios.get(`${API_HOST}/api/galleryList/${this.state.page}/${this.state.year}`).then(
            function (response){
                var nodes=[];
                nodes.push($("#PostList1"));
                nodes.push($("#PostList2"));
                nodes.push($("#PostList3"));
                nodes.push($("#PostList4"));

                var data=response.data.data;
                var status=response.data.status;
                if(status!=200){
                    this.setState({isOver:true});
                    return ;
                }

                for(let i=0;i<data.length;i++){
                    var h=[];
                    h.push (nodes[0].height());
                    h.push (nodes[1].height());
                    h.push(nodes[2].height());
                    h.push (nodes[3].height());
                    var min=100000;
                    var min_num=0;
                    for (let j=0;j<4;j++){
                        if(h[j]<min){
                            min=h[j];
                            min_num=j;
                        }
                    }
                    this.change(min_num,data[i]);
                }
                this.setState({page:this.state.page+1});
            }.bind(this)
        ).catch(
            function (error) {
                alert(error);
            }
        );
    }
    listenScrollEvent =() => {

        var winHeight=$(window).height();
        var docHeight=$(document).height();
        var top=$(window).scrollTop();
        if(this.state.isLoading  || this.state.isOver) return;
        if((docHeight-winHeight)*0.5<top){
            this.setState({isLoading:true});
            Axios.get(`${API_HOST}/api/galleryList/${this.state.page}/${this.state.year}`).then(
                function (response){

                    var nodes=[];
                    nodes.push($("#PostList1"));
                    nodes.push($("#PostList2"));
                    nodes.push($("#PostList3"));
                    nodes.push($("#PostList4"));

                    var data=response.data.data;
                    var status=response.data.status;
                    if(status!=200){
                        this.setState({isOver:true});
                        return ;
                    }

                    for(let i=0;i<data.length;i++){
                        var h=[];
                        h.push (nodes[0].height());
                        h.push (nodes[1].height());
                        h.push(nodes[2].height());
                        h.push (nodes[3].height());
                        var min=100000;
                        var min_num=0;
                        for (let j=0;j<4;j++){
                            if(h[j]<min){
                                min=h[j];
                                min_num=j;
                            }
                        }
                        this.change(min_num,data[i]);
                    }
                    this.setState({page:this.state.page+1});
                    this.setState({isLoading:false});

                }.bind(this)
            ).catch(
                function (error) {
                    alert(error);
                }
            );
        }
    }
    change =(num,data) => {
        var arrays=[];
        arrays.push(this.state.item1);
        arrays.push(this.state.item2);
        arrays.push(this.state.item3);
        arrays.push(this.state.item4);
        arrays[num].push(data);
        this.setState({item1:arrays[0],item2:arrays[1],item3:arrays[2],item4:arrays[3]});

    }
    componentWillReceiveProps(nextProps){
        var newyear=nextProps.params.year?nextProps.params.year:'';
        this.setState({year:newyear,item1:[],item2:[],item3:[],item4:[],page:1,isLoading:false,isOver:false});
        Axios.get(`${API_HOST}/api/galleryList/1/${newyear}`).then(
            function (response){
                var nodes=[];
                nodes.push($("#PostList1"));
                nodes.push($("#PostList2"));
                nodes.push($("#PostList3"));
                nodes.push($("#PostList4"));

                var data=response.data.data;
                var status=response.data.status;
                if(status!=200){
                    this.setState({isOver:true});
                    return ;
                }

                for(let i=0;i<data.length;i++){
                    var h=[];
                    h.push (nodes[0].height());
                    h.push (nodes[1].height());
                    h.push(nodes[2].height());
                    h.push (nodes[3].height());
                    var min=100000;
                    var min_num=0;
                    for (let j=0;j<4;j++){
                        if(h[j]<min){
                            min=h[j];
                            min_num=j;
                        }
                    }
                    this.change(min_num,data[i]);
                }
                this.setState({page:this.state.page+1});
            }.bind(this)
        ).catch(
            function (error) {
                alert(error);
            }
        );

    }

    render(){
        return(
            <div>
                <TopBar year={this.state.year}/>
                <div className="row">
                    <div className="col-md-3" id="PostList1">
                    <ul className="list-group" ref="list1">
                    {
                        this.state.item1.map(function(item){
                            return <PostItem key={item.serial} serial={item.serial} title={item.title} cover={item.cover} begin={item.begin} end={item.end}/>
                        })
                    }
                    </ul>
                    </div>
                    <div className="col-md-3"  id="PostList2"  >
                        <ul className="list-group" ref="list2">
                    {

                    this.state.item2.map(function(item){
                        return <PostItem key={item.serial} serial={item.serial} title={item.title} cover={item.cover} begin={item.begin} end={item.end}/>
                    })
                    }
                        </ul>
                     </div>
                    <div className="col-md-3" id="PostList3"  >
                        <ul className="list-group" ref="list3">
                    {
                        this.state.item3.map(function(item){
                            return <PostItem key={item.serial} serial={item.serial} title={item.title} cover={item.cover} begin={item.begin} end={item.end}/>
                        })
                    }
                        </ul>
                    </div>
                    <div className="col-md-3" id="PostList4"  >
                        <ul className="list-group" ref="list4">
                    {
                        this.state.item4.map(function(item){
                            return <PostItem key={item.serial} serial={item.serial} title={item.title} cover={item.cover} begin={item.begin} end={item.end}/>
                        })
                    }
                        </ul>
                    </div>
                </div>
            </div>
            )
    }
}

export default PostList;