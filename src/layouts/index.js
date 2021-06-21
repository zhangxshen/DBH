import styles from './index.css';
import { Layout, Menu, Icon, Drawer } from 'antd';
import React from "react";
import { connect } from 'dva';
import Cookies from 'js-cookie';

class BasicLayout extends React.Component {

  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {

    console.log("props", this.props);
    const {dispatch, DBH} = this.props;
    const {menu_list, menu_visible, defaultSelectedKeys} = DBH;

    const onCloseHandler = () => dispatch({type:"DBH/save", payload:{menu_visible: false,}});
    const user = Cookies.get('user');
    const auth = (Cookies.get('auth')) ? JSON.parse(Cookies.get('auth')) : {};
    const user_type = (auth) ? auth.user_type : "";
    // console.log("auth,user_type", auth,user_type);

    const menu = (menu_list) ? menu_list.map( menu_list_item => {
      let rtn_item = null;
      const{key, LinkTo, title, Icon_type, children} = menu_list_item;
      //没有children，说明是主用
      if(!children) {
        rtn_item = <Menu.Item key={key}><a href={LinkTo}> <Icon type={Icon_type} />{title}</a></Menu.Item>;
      } else { //有children，说明是子用
        const children_list = children.map(children_item => <Menu.Item key={children_item.key}><a href={children_item.LinkTo}> <Icon type={children_item.Icon_type} />{children_item.title}</a></Menu.Item>);
        rtn_item = <Menu.SubMenu key={key} title={<span><Icon type={Icon_type} /><span>{title}</span></span>}>{children_list}</Menu.SubMenu>;
      }

      if(user_type === "all") {
        return rtn_item;
      } else {
        if(key === user_type) {
          return rtn_item;
        }
      }



    }) : null;

    return (
      <Layout >
        <Drawer placement={"left"} closable={false} onClose={onCloseHandler} visible={menu_visible} width={210} bodyStyle={{padding:0,height:'100%',background:"black"}}>
          <Menu theme="dark" defaultSelectedKeys={[defaultSelectedKeys]} defaultOpenKeys={["3"]} mode="inline" >
            {menu}
          </Menu>
        </Drawer>
        <Layout>
          {this.props.children}
        </Layout>
      </Layout>
    )
  }
}

// 指定订阅数据，这里关联了 users
function mapStateToProps({DBH}) {
  return {DBH};
}

export default connect(mapStateToProps)(BasicLayout);
