
import React, { Component } from 'react';

import { connect } from 'dva';
import LoginComponents from '../../../components/Login';
import styles from './style.less';
import bac from '../../../assets/jsons/pic.json';

const { Tab, UserName, Password, Submit } = LoginComponents;

@connect(({ login }) => ({
  global_model:login,
  // userLogin: login,
  // submitting: loading.effects['login/login'],
}))
class Login extends Component {
  loginForm = undefined;
  state = {
    type: 'account',
  };
  handleSubmit = ( err, values) => {
    console.log(err, values,);
    if(!err) {
      const {userName, password} = values;

      this.props.dispatch({
        type:'login/login',
        payload:{
          usr_name:userName,
          usr_pwd:password,
        }
      });
    }
  };

  render() {
    console.log(this.props);
    const {dispatch, global_model} = this.props;

    return (
      <div className={styles.background} style={{background:`url("${bac.background}") no-repeat center `, backgroundSize:"cover"}}>

          <div className={styles.title}>省市运维 E+轻</div>
          <div className={styles.eng_title}>Easy DevOps</div>
          <div className={styles.eng_title2}>
            <div >
            通过设备告警与性能状态完全同步并完成数字化模型，集成多专业、多地市、多维度、多兼容的管理过程，
            根据指令学习、历史告警分析等结构现有情况，及时做出分析评估并形成构型管理以及产生相关派生数据，
            可以预见关键事件的系统管理通过与各级实体系统响应，揭示设备、网元、告警等多角度中存在的未知问题。
            </div>
          </div>
          <div className={styles.main} >
          <LoginComponents
            defaultActiveKey={'account'}
            onSubmit={this.handleSubmit}
            onCreate={form => {
              this.loginForm = form;
            }}
          >
            <Tab
              key="account"
              tab={"账号密码登录"}
            >

              <UserName
                name="userName"
                placeholder={`账户名：请填写用户名`}
                rules={[
                  {
                    required: true,
                    message: "请填写账户名称",
                  },
                ]}
              />
              <Password
                name="password"
                placeholder={`密码：请填写密码`}
                rules={[
                  {
                    required: true,
                    message: "请填写密码",
                  },
                ]}
                onPressEnter={e => {
                  e.preventDefault();

                  if (this.loginForm) {
                    this.loginForm.validateFields(this.handleSubmit);
                  }
                }}
              />
            </Tab>


            <Submit loading={global_model.login_loading}>
              {(global_model.login_loading) ? "登录中，请稍后" : "登录"}
            </Submit>

          </LoginComponents>
        </div>

      </div>
    );
  }
}

export default Login;
