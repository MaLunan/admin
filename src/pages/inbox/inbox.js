import React,{Fragment,Component} from 'react';
import { Input , Button ,Table ,Drawer, Popconfirm, message} from 'antd';
import {dataSource} from '../../components/inboxdata/inboxdata'
import Add from '../../components/drawer/drawer'
import axios from 'axios'
const { Search } = Input;


 
class Inbox extends Component{
  constructor(){
    super()
    this.state={
      foods:[],
      visible:false, 
      addupdate:true,
    }
    this.columns = [
      {
          title: '商品ID',
          dataIndex:'_id',
          width:100,
         
          ellipsis:true,
          
      },
      {
        title: '商品名称',
        dataIndex: 'goods_name',
        width:100,
        height:50,
      },
      {
        title: '价格',
        dataIndex: 'goods_price',
        width:60,
        height:50,
        align:'center'
      },
      {
        title: '数量',
        dataIndex: 'goods_number',
        width:60,
        height:50,
      },
      {
          title: '重量',
          dataIndex: 'goods_weight',
          width:60,
          height:50,
      },
      {
          title: '商品状态',
          dataIndex: 'goods_state',
          width:60,
          height:50,
      },
      {
          title: '添加时间',
          dataIndex: 'add_time',
          width:60,
          height:50,
      },
      {
          title: '热销品数量',
          dataIndex: 'hot_mumber',
          width:60,
          height:50,
      },
      {
          title: '是否是热销品',
          dataIndex: 'is_promote',
          width:150,
          height:50,
          render:(dataIndex)=>{
            if(dataIndex!=='false'){
              return '是'
            }else{
              return '否'
            }
          }
      },
      {
        title:'商品图片',
        dataIndex:'goods_img',
        width:150,
        height:50,
        render:(h)=>{
          return (
            <img width='50' height='50' src={'http://localhost:3000'+h} alt=''/>
          )
        }
      },
      {
          title: '操作',
          width:200,
          align:'center',
          render:(h)=>{
            return (
              <Fragment>
                <Popconfirm
                title="是否要删除"
                onConfirm={()=>{

                  axios('/api/food/delFood?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTE2YmE3Zjc0M2MxZTI2ZTA5Y2E2YWEiLCJvdCI6NjA0ODAwMDAwLCJjdGltZSI6MTU3ODU0ODAwMTQzMCwiaWF0IjoxNTc4NTQ4MDAxfQ.yqX3qd1aNN5zz3_bX3L733hXCQteBQstDw2hrv5n-y8',{
                    params:{
                      foodId:h._id
                    }
                  }).then(res=>{
                    this.getfoods()
                    }).catch(err=>{console.log(err)})
                  message.success('删除成功');
                }}
                onCancel={()=>{
                  message.error('取消删除');
                }}
                okText="是的"
                cancelText="否"
                >
                <Button type="danger">删除</Button>
                </Popconfirm>
                
                <Button type="primary" onClick={()=>{
                  this.setState({visible:true})
                   this.refs.add.setgoods(h,'getByID')
                }}>修改</Button>
              </Fragment>
              
            )
          }
      },
    ];

  }
  componentDidMount(){
   this.getfoods()
  }
  showdrawer=()=>{
    this.setState({
        visible:false,
          })
  }
  getfoods=()=>{
    axios('/api/food/getFoods?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTE2YmE3Zjc0M2MxZTI2ZTA5Y2E2YWEiLCJvdCI6NjA0ODAwMDAwLCJjdGltZSI6MTU3ODU0ODAwMTQzMCwiaWF0IjoxNTc4NTQ4MDAxfQ.yqX3qd1aNN5zz3_bX3L733hXCQteBQstDw2hrv5n-y8',{
      params:{
        page:'1',
        pageSize:'100'
      }
      
    }).then(res=>{
      console.log(res.data.list.foods)
      this.setState({foods:res.data.list.foods})}).catch(err=>{console.log(err)})
  }
  render(){
    return (
        <Fragment>
            <Search
            placeholder="请输入内容"
            onSearch={value => console.log(value)}
            style={{ width: 300 }}
            size="large"
            enterButton
            />
            <Button 
            style={{left:10}}
            size="large"
            type="primary"
            onClick={()=>{
              this.setState({visible:true})
              this.refs.add.setstate()
            }}
            >添加商品</Button>
            <Table 
            rowKey={(a)=>{
              return a._id
            }} dataSource={this.state.foods} columns={this.columns} bordered/>;
          <Add ref='add' showdrawer={this.showdrawer} visible={this.state.visible} getfoods={this.getfoods} addupdate={this.state.addupdate} showaddupdate={this.showaddupdate}></Add>
        </Fragment>
        

    )
  }
  showaddupdate=(a)=>{
    console.log(a)
    this.setState({addupdate:a})
  }
}

export default Inbox;
