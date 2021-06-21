import React,{Component} from "react";
import styles2 from "@/components/DBHComponent/DBHComponent.less";
import {Select} from "antd";

class CheckTimeComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      init_time : 5 * 60,
      reload_time:5 * 60,
      reloadTableData: this.props.reloadTableData,
    }
  }

  componentWillUnmount() {
    // this.scene.destroy();
  }
  componentDidMount() {
    // //定时刷洗数据
    setInterval(this.reloadTableDataHandler,1000);
  }
  selectTimeChangeHandler = (newTime) => this.setState({reload_time: newTime, init_time: newTime});
  reloadTableDataHandler = () => {
    let last_time = 0;
    if(this.state.reload_time < 1) {
      this.state.reloadTableData();
      last_time = this.state.init_time;
    } else {
      last_time = this.state.reload_time - 1;
    }

    this.setState({reload_time: last_time});
  };

  render() {
    return (
      <div className={styles2.select_time}>设定告警数据每 <Select defaultValue={5 * 60} style={{ width: 90 }} onChange={(value) => this.selectTimeChangeHandler(value)}>
        <Select.Option value={60}>1分钟</Select.Option>
        <Select.Option value={5 * 60}>5分钟</Select.Option>
        <Select.Option value={10 * 60}>10分钟</Select.Option>
        <Select.Option value={15 * 60}>15分钟</Select.Option>
      </Select> 分钟刷新一次。
        距离下一次刷新还有 {this.state.reload_time} 秒。
      </div>
    );
  }

}

export default CheckTimeComponent;
