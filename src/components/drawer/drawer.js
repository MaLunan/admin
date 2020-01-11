import React,{Fragment,Component} from 'react';
import {Drawer,Button}from 'antd'
import axios from 'axios'
class add extends Component{
    constructor(){
        super()
        this.state={
            goods_name:'',
            goods_price:'',
            goods_number:'',
            goods_weight:'',
            goods_state:'',
            add_time:'12',
            old_time:'1221',
            is_promote:'false',
            goods_img:'', 
        }
    }
    
  render(){
    return (
    <Drawer
    title='添加商品'
    visible={this.props.visible}
    onClose={() => {
       this.props.showdrawer()
       }}
    ><div>
        <label htmlFor='name'>名称：</label><input id='name' value={this.state.goods_name} onChange={(e)=>{
          this.setState({goods_name:e.target.value})
        }}/><br/><br/>
        <label htmlFor='price'>价格：</label><input id='price' value={this.state.goods_price} onChange={(e)=>{
          this.setState({goods_price:e.target.value})
        }}/><br/><br/>
        <label htmlFor='number'>数量：</label><input id='number' value={this.state.goods_number} onChange={(e)=>{
          this.setState({goods_number:e.target.value})
        }}/><br/><br/>
        <label htmlFor='weight'>重量：</label><input id='weight' value={this.state.goods_weight} onChange={(e)=>{
          this.setState({goods_weight:e.target.value})
        }}/><br/><br/>
        <label htmlFor='state'>状态：</label><input id='state' value={this.state.goods_state} onChange={(e)=>{
          this.setState({goods_state:e.target.value})
        }}/><br/><br/>
        <label htmlFor='img'>图片：</label><input type='file' ref='file' 
        />
        <br/>  
        <img src={this.state.goods_img} width="100" height="100" alt=""/>
        <button onClick={this.upload}>上传图片</button>
        <br/>  
      </div>
      <Button
      style={{top:10}}
      size="large"
      type="primary"
      onClick={this.props.addupdate?this.addfoods:this.updatefoods}
      >
        确认
      </Button>
    </Drawer>
    )
  }
  upload=()=>{
    let file=this.refs.file.files[0]
    let formdata=new FormData()
    formdata.append('aa',file)
    console.log(formdata)
  }
  updatefoods=()=>{
    console.log(this.state)
    axios('/api/food/updateFood?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTE2YmE3Zjc0M2MxZTI2ZTA5Y2E2YWEiLCJvdCI6NjA0ODAwMDAwLCJjdGltZSI6MTU3ODU0ODAwMTQzMCwiaWF0IjoxNTc4NTQ4MDAxfQ.yqX3qd1aNN5zz3_bX3L733hXCQteBQstDw2hrv5n-y8',{params:this.state}
      ).then(res=>{
      this.props.getfoods()
      this.props.showdrawer()
     this.setstate()
      })
    this.props.showaddupdate(true)
  }
  addfoods=()=>{
    axios.post('/api/food/addFood?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTE2YmE3Zjc0M2MxZTI2ZTA5Y2E2YWEiLCJvdCI6NjA0ODAwMDAwLCJjdGltZSI6MTU3ODU0ODAwMTQzMCwiaWF0IjoxNTc4NTQ4MDAxfQ.yqX3qd1aNN5zz3_bX3L733hXCQteBQstDw2hrv5n-y8',this.state
    ).then(res=>{
      console.log(res)
      this.props.getfoods()
      this.props.showdrawer()
     this.setstate()
      })
    }
    setstate=()=>{
      this.setState({
        _id:'',
        goods_name:'',
        goods_price:'',
        goods_number:'',
        goods_weight:'',
        goods_state:'',
        add_time:'12',
        old_time:'1221',
        is_promote:'false',
        goods_img:'', 
      })
    }
    setgoods=(h,get)=>{
      axios(`/api/food/${get}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTE2YmE3Zjc0M2MxZTI2ZTA5Y2E2YWEiLCJvdCI6NjA0ODAwMDAwLCJjdGltZSI6MTU3ODU0ODAwMTQzMCwiaWF0IjoxNTc4NTQ4MDAxfQ.yqX3qd1aNN5zz3_bX3L733hXCQteBQstDw2hrv5n-y8`,{
        params:{
          _id:h._id
        }
      }).then(res=>{
        this.setState({_id:h._id})
      this.setState(res.data.list) 
      this.props.showaddupdate(false)
        }).catch(err=>{console.log(err)})
      }
}
export default add;
