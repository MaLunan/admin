import React,{Fragment,Component} from 'react';
import { Layout, Menu, Icon } from 'antd';
import stylus from './admin.module.less'
import Sildernav from '../../components/Sildernav/Sildernav';
const { Header, Sider, Content, Footer} = Layout; 
class Admin extends Component{
  render(){
    return (
      <Layout className={stylus.box}>
      <Sider collapsible collapsed={false}>
          <Sildernav></Sildernav>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }}>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            background: '#fff',
            minHeight: 1000,
          }}
        >
          {this.props.children}
        </Content>  
      </Layout>
    </Layout>
    )
  }
}

export default Admin;
