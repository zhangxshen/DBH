import React from "react";
// import echarts from "echarts";
import ReactEcharts from 'echarts-for-react';
import {Card, Icon, } from "antd";

// let echart_obj = null;

class LineChartComponent extends React.Component{

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

  legendSelected = (params) => {
    console.log("params", params, this.state);
    //第一次选中，进行反选操作
    if(this.state.scene) {
      const echarts_instance = this.state.scene.getEchartsInstance();
      if(!this.state.city) {
        echarts_instance.dispatchAction({type: 'legendInverseSelect'});
        this.setState({city: params.name});
      } else {
        if(params.name !== this.state.city) {
          echarts_instance.dispatchAction({
            type: 'legendUnSelect',
            // 图例名称
            name: this.state.city
          });
          echarts_instance.dispatchAction({
            type: 'legendSelect',
            // 图例名称
            name:  params.name
          });
          this.setState({city: params.name});

        }
      }
    }


    // //第一次选中，进行反选操作
    // if(!this.state.city) {
    //   let new_selected = {};
    //   for(let selected_city in params.selected) {
    //     new_selected[selected_city] = (!params.selected[selected_city]);
    //   }
    //   this.setState({city:new_selected});
    //   const echarts_instance = this.state.scene.getEchartsInstance();
    //   // console.log("this.state.scene", this.state.scene.action);
    //   echarts_instance.dispatchAction({type: 'legendInverseSelect'});
    //   // this.state.scene.action;
    // } else {
    //   let isAllSelected = true;
    //   for(let old_selected_city in this.state.city) {
    //     if(!this.state.city[old_selected_city]) {
    //       isAllSelected = false;
    //       break;
    //     }
    //   }
    //   //如果city已经全选了，也是反选
    //   let new_selected = {};
    //   if(isAllSelected) {
    //     for(let selected_city in params.selected) {
    //       new_selected[selected_city] = (!params.selected[selected_city]);
    //     }
    //   } else {
    //     for(let selected_city in params.selected) {
    //       new_selected[selected_city] = params.selected[selected_city];
    //     }
    //   }
    //   this.setState({city:new_selected});
    // }
    // //
  };
  saveEchartObj = (obj) => (!this.state.scene) ? this.setState({scene: obj}) : null;


  render() {

    const {h, card_title, line_option, loading, } = this.props;

    const onEvents = {'legendselectchanged': this.legendSelected,};

    // if(this.state.scene && this.state.city) {
    //   this.state.scene.action({});
    // }

    // console.log(card_title, "line_option", line_option);

    return (
      <Card
        style={{height:h,}}
        bodyStyle={{padding:"0px 10px"}}
        title={<span style={{}}><Icon style={{marginRight:10}} type="line-chart" />{card_title}</span>}
        bordered={false}
        loading={loading}
      >
        <ReactEcharts style={{height:h  - 50}} option={line_option}
                      ref={(e) => this.saveEchartObj(e)}
                      onEvents={onEvents}

        />
      </Card>
    )
  }

}


export default LineChartComponent;
