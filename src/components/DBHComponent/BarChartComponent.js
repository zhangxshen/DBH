import React from "react";
// import echarts from "echarts";
import ReactEcharts from 'echarts-for-react';
import {Card, Icon, } from "antd";

// let echart_obj = null;

class BarChartComponent extends React.Component{

  constructor(props) {
    super(props);

    this.state = {
      scene:null,
      isShowEffect:false,
      city:null,
      modal_visible: false
    };
  }
  componentWillUnmount() {
    // this.scene.destroy();
  }
  componentDidMount() {
    // // // 指定图表的配置项和数据
  }

  render() {

    const {h, bar_option, card_title, loading, onChartClick} = this.props;

    const onEvents = {
      'click': onChartClick,
    };

    return (
      <Card
        style={{height:h,}}
        bodyStyle={{padding:"0px 10px"}}
        title={<span style={{}}><Icon style={{marginRight:10}} type="bar-chart" />{card_title}</span>}
        bordered={false}
        loading={loading}
      >
        <ReactEcharts style={{height:h  - 50}} option={bar_option}
                      // ref={(e) => echart_obj = e}
                      onEvents={onEvents} />
      </Card>
    )
  }

}


export default BarChartComponent;
