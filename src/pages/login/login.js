import React,{Component} from 'react';
import { Form, Card ,Icon ,Input,Checkbox,Button,message} from 'antd';
import stylus from './login.module.less'
import {UserLogin} from '../../api/user'
class Login extends Component{
  login=()=>{
this.props.form.validateFields((err,data)=>{
  if(err) return message.error('输入有误')
  let {username,password}=data
  UserLogin(username,password)
  .then((res)=>{
    console.log(res)
  })
  .catch((err)=>{
    console.log(err)
  })
})
  }
  render(){
    const {getFieldDecorator} = this.props.form
    return (
        <div className={stylus.login}>
        <Card title="登陆" >
        <Form.Item>
        {getFieldDecorator('username',{
           rules: [{ required: true, message: '不能为空' }],
        })(
          <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />
        )}
        </Form.Item>
         <Form.Item>
         {getFieldDecorator('password',{
           rules: [{ required: true, message: '不能为空' }],
        })(
         <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="password"
            />,
        )}
         </Form.Item>
           <Form.Item>
          <Button type="primary" onClick={this.login}>
            Log in
          </Button>
           </Form.Item>
        </Card>
        </div>
    )
  }
}

export default Form.create()(Login);
