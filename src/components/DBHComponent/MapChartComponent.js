import React from "react";
import {Card, Statistic, Row, Col, Icon, Tag, Drawer, Table} from 'antd';
import echarts from "echarts";
import ReactEcharts from 'echarts-for-react';
import GdMapJson from './guangdong_map_json';
import styles from './MapChartComponent.less';
// let echart_obj = null;

class MapChartComponent extends React.Component{

  constructor(props) {
    super(props);

    this.state = {
      scene:null,
      isShowEffect:false,
      drawer_visible:false,
    };
  }
  componentWillUnmount() {
    // this.scene.destroy();
  }
  componentDidMount() {
    // // // 指定图表的配置项和数据
    echarts.registerMap('广东', GdMapJson);
  }

  onClose = () => this.setState({drawer_visible: false,});
  showDrawer = () => this.setState({drawer_visible: true,});

  render() {
    // console.log(this.props);
    const {h, trans_loop_loading, map_option, map_title, statistic_data, total_data, onChartClick } = this.props;
    const{Total, HuiJu, JieRu, Important, HuiJuLow} = statistic_data;
    const onEvents = {
      'click': onChartClick,
    };
    const columns = [
      {
        title: '地市',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '汇聚骨干中断',
        dataIndex: 'HuiJu',
        key: 'HuiJu',
      },
      {
        title: '汇聚骨干弱光',
        dataIndex: 'HuiJuLow',
        key: 'HuiJuLow',
      },
      {
        title: '接入',
        dataIndex: 'JieRu',
        key: 'JieRu',
      },
      {
        title: '接入重要',
        dataIndex: 'important',
        key: 'important',
      },
      {
        title: '超100分接入重要单边环',
        dataIndex: 'very_important',
        key: 'very_important',
      },
    ];

    return (
      <Card
        style={{height:h}}
        bodyStyle={{padding:"10px 10px 0 40px"}}
        title={<div><Icon style={{marginRight:10}} type="global" />{map_title}<Tag onClick={this.showDrawer} color="#2db7f5" style={{float:"right"}}>地市汇总统计</Tag></div>}
        bordered={false}
        loading={trans_loop_loading}
      >
        <Row>
          <Col md={5} sm={12} xs={24}><Statistic title="全省中断弱光" value={Total} /></Col>
          <Col md={5} sm={12} xs={24}><div style={{cursor:"pointer"}} onClick={()=> onChartClick({componentType: "statistic", seriesName:"汇聚骨干"})}><Statistic title="汇聚骨干中断" value={HuiJu} /></div></Col>
          <Col md={5} sm={12} xs={24}><div style={{cursor:"pointer"}} onClick={()=> onChartClick({componentType: "statistic", seriesName:"传输接入"})}><Statistic title="接入中断" value={JieRu} /></div></Col>
          <Col md={4} sm={12} xs={24}><Statistic title="接入重要环中断" value={Important} /></Col>
          <Col md={5} sm={12} xs={24}><div style={{cursor:"pointer"}} onClick={()=> onChartClick({componentType: "statistic", seriesName:"传输接入"})}><Statistic title="汇聚骨干弱光" value={HuiJuLow} /></div></Col>
          
        </Row>
        <ReactEcharts style={{height:h - 135}} option={map_option}
                      onEvents={onEvents}
          // ref={(e) => echart_obj = e}
        />

        <Drawer
          width={"50%"}
          title="地市汇总统计"
          placement="right"
          // closable={false}
          onClose={this.onClose}
          visible={this.state.drawer_visible}
        >
          <Table  dataSource={total_data} columns={columns} pagination={false} bordered={true} size={"small"} />
        </Drawer>
      </Card>

    )
  }

}


export default MapChartComponent;
