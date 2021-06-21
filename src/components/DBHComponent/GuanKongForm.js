import React,{Component} from "react";
import {Form, Input, Tooltip, Icon, Button, Divider, Spin, message, Upload} from 'antd';
import moment from 'moment';
import table_option from './tables_options';
import Cookies from 'js-cookie';
import UrlList from "@/service/UrlList";

class GuanKongForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      fileList: [],
    };
  }
  componentWillUnmount() {
    // this.scene.destroy();
  }
  componentDidMount() {
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const kong_data = this.props.kong_data;
        let post_fps = [], post_log_json = {};

        kong_data.forEach( detail_data => {
          values["create_time"] = moment().format("YYYY-MM-DD HH:mm");
          if(detail_data) {
            const {fps, post_log} = table_option.markGuanKongData(detail_data, values);
            fps.forEach(fps_item => post_fps.push(fps_item));
            post_log_json = post_log;
            //保存上传图片
            if(this.state.fileList && this.state.fileList.length > 0) {
              post_log_json["fileList"] = this.state.fileList;
            }
          }
        });

        if(post_fps.length > 0) {
          // console.log({fps: post_fps, manage_log:JSON.stringify(post_log_json)});
          this.props.saveGuanKong({fps: post_fps, manage_log:JSON.stringify(post_log_json)});
        }

        this.props.form.setFieldsValue({
          content_text: null,
        });
      }
    });
  };

  render() {

    const { getFieldDecorator } = this.props.form;
    //样式
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    const {kong_data, guan_kong_loading} = this.props;
    const ne_label_list = (kong_data.length > 0) ? kong_data.map( (detail_data,index) => <div key={"detail_" + index}><b>{index+1}。</b>{detail_data.ne_label}</div>) : null;

    const user = Cookies.get('user');
    const auth = Cookies.get('auth');

    const props = {
      data:{fp:"test_fp"},
      action: UrlList.uploadPic, //'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      listType: 'picture',
      onChange:(info)=> {
        // console.log("info", info);
        if (info.file.status !== 'uploading') {
          // console.log(info.file, info.fileList);
          let rtn_list = [];
          info.fileList.forEach(list_item => {
            const {name, status,  response} = list_item;
            let item_status = (status === "done") ? "done" : "error";
            let url = null;
            if(response) {
              const {code, data, } = response;
              if(code !== 0) {
                item_status = "error";
                message.error(`${name} 文件上传失败！原因：` + JSON.stringify(response));
              } else {
                if(data["suc"].length > 0) {
                  url = data["suc"][0];
                } else {
                  item_status = "error";
                  message.error(`${name} 文件上传失败！原因：` + JSON.stringify(response));
                }
              }
            }
            if(url) rtn_list.push({name, url});
          });

          this.setState({fileList: rtn_list});

          if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
          } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }

        }
      },
      // defaultFileList: [...fileList],
    };

    return (
      <div>
        {/*<div style={{ marginBottom:30}}>*/}
          <Divider  orientation="left">管控对象：</Divider>
        {ne_label_list}

        <Divider  orientation="left">管控内容：</Divider>
        <Spin spinning={guan_kong_loading} tip={"数据提交中。。。"}>
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Form.Item label={<span>
                管控人员&nbsp;
                  <Tooltip title="请输入名称">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
              }   >
                {getFieldDecorator('nickname', {
                  initialValue:user,
                rules: [{ required: true, message: '请输入“管控人员”名称！', whitespace: true }],
              })(<Input />)}
            </Form.Item>

            <Form.Item label={<span>
                管控内容&nbsp;
              <Tooltip title="请输入内容">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            } >
              {getFieldDecorator('content_text', {
                rules: [{ required: true, message: '请输入管控内容！', whitespace: true }],
              })(<Input.TextArea autoSize={{ minRows: 6, maxRows: 6 }} />)}
            </Form.Item>

            <div style={{margin:"10px 0"}}>
              可选择上传图片：
              <Upload {...props}>
                <Button>
                  <Icon type="upload" /> 上传图片
                </Button>
              </Upload>
            </div>

            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                提交“管控记录”
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </div>
    )
  }

}

const GuanKongFormComponent = Form.create({ name: 'register' })(GuanKongForm);

export default GuanKongFormComponent;
