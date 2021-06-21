import React from "react";
// import echarts from "echarts";
import 'echarts-liquidfill';
import ReactEcharts from 'echarts-for-react';
import {Card, Icon, } from "antd";

// let echart_obj = null;

class PaiChartComponent extends React.Component{

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

    const {h, pai_title, options, loading} = this.props;

    return (
      <Card
        style={{height:h / 2 - 10,}}
        bodyStyle={{padding:"0px 10px"}}
        title={<span style={{}}><Icon style={{marginRight:10}} type="pie-chart" />{pai_title}</span>}
        bordered={false}
        loading={loading}
      >
        <ReactEcharts style={{height:h / 2 - 50}} option={options}
                      // ref={(e) => echart_obj = e}
        />
      </Card>
    )
  }

}


export default PaiChartComponent;
