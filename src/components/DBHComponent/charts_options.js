import echarts from "echarts";
import React from "react";

const charts_options = {
  map_title  : "全省“传输单边弱光环”概况",
  pai_title1 : "“汇聚骨干中断”全省占比",
  pai_title2 : "“重要环中断”接入总数占比",
  bar_title1 : "“汇聚骨干中断”地市细分列表",
  bar_title2 : "“接入中断”地市细分列表",
  bar_title3 : "“汇聚骨干弱光”地市细分列表",
  line_title1 : "“汇聚骨干”中断数量折线图",
  line_title2 : "“接入中断”中断数量折线图",
  line_title3 : "“接入重要环”中断数量折线图",
  bar_color1 : new echarts.graphic.LinearGradient(0, 0, 1, 0, [{offset: 0, color: 'rgba(136, 32, 32,.5)'}, {offset: 1, color: 'rgba(136, 32, 32,1)'}], false),
  bar_color2 : new echarts.graphic.LinearGradient(0, 0, 1, 0, [{offset: 0, color: '#8d8feb'}, {offset: 1, color: '#6467d8'}], false),
  bar_color3 : new echarts.graphic.LinearGradient(0, 0, 1, 0, [{offset: 0, color: 'rgba(255, 165, 0,.5)'}, {offset: 1, color: 'rgba(255, 165, 0,1)'}], false),
  important_color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{offset: 0, color: '#fdab5b'}, {offset: 1, color: '#ff7e00'}], false),
  createGdGeoCoordMap : () => {
    return {
      '广州市': {loc:[113.607649675, 23.4000491021], count:0, HuiJu:0, JieRu:0, Important:0, HuiJuLow:0},
      '东莞市': {loc:[113.863433991, 22.9230238154], count:0, HuiJu:0, JieRu:0, Important:0, HuiJuLow:0},
      "中山市": {loc:[113.422060021, 22.5451775145], count:0, HuiJu:0, JieRu:0, Important:0, HuiJuLow:0},
      '云浮市': {loc:[111.650945959, 22.9379756855], count:0, HuiJu:0, JieRu:0, Important:0, HuiJuLow:0},
      "佛山市": {loc:[113.004025635, 23.0350948405], count:0, HuiJu:0, JieRu:0, Important:0, HuiJuLow:0},
      "惠州市": {loc:[114.61065808, 23.1135398524], count:0, HuiJu:0, JieRu:0, Important:0, HuiJuLow:0},
      "揭阳市": {loc:[116.079500855, 23.3479994669], count:0, HuiJu:0, JieRu:0, Important:0, HuiJuLow:0},
      "梅州市": {loc:[116.126403098, 24.304570606], count:0, HuiJu:0, JieRu:0, Important:0, HuiJuLow:0},
      "汕头市": {loc:[116.688650288, 23.3539084533], count:0, HuiJu:0, JieRu:0, Important:0, HuiJuLow:0},
      "汕尾市": {loc:[115.472924289, 22.9787305002], count:0, HuiJu:0, JieRu:0, Important:0, HuiJuLow:0},
      "江门市": {loc:[112.578125341, 22.1751167835], count:0, HuiJu:0, JieRu:0, Important:0, HuiJuLow:0},
      "河源市": {loc:[114.913721476, 23.9572508505], count:0, HuiJu:0, JieRu:0, Important:0, HuiJuLow:0},
      "深圳市": {loc:[114.025973657, 22.5460535462], count:0, HuiJu:0, JieRu:0, Important:0, HuiJuLow:0},
      "清远市": {loc:[113.040773349, 24.1984685504], count:0, HuiJu:0, JieRu:0, Important:0, HuiJuLow:0},
      "湛江市": {loc:[110.065067263, 21.2574631038], count:0, HuiJu:0, JieRu:0, Important:0, HuiJuLow:0},
      "潮州市": {loc:[116.810075991, 23.8618116765], count:0, HuiJu:0, JieRu:0, Important:0, HuiJuLow:0},
      "珠海市": {loc:[113.262447026, 22.1069146461], count:0, HuiJu:0, JieRu:0, Important:0, HuiJuLow:0},
      "肇庆市": {loc:[112.17965337, 23.6786632829], count:0, HuiJu:0, JieRu:0, Important:0, HuiJuLow:0},
      "茂名市": {loc:[110.931245331, 22.0682257188], count:0, HuiJu:0, JieRu:0, Important:0, HuiJuLow:0},
      "阳江市": {loc:[111.677009756, 21.9715173045], count:0, HuiJu:0, JieRu:0, Important:0, HuiJuLow:0},
      "韶关市": {loc:[113.594461107, 24.8029603119], count:0, HuiJu:0, JieRu:0, Important:0, HuiJuLow:0},
    }
  },
  createTotalData : ({trans_loop_data, convergeAlarm_data, convergeAlarmLow_data}) => {
    let total_list = {};
    if(trans_loop_data && convergeAlarm_data && convergeAlarmLow_data) {
      trans_loop_data.forEach( trans_loop_data_item => {
        const {city_name, risk_score} = trans_loop_data_item;
        const is_important = (risk_score > 59) ? 1 : 0;
        const very_important = (risk_score > 100) ? 1 : 0;
        //
        if(!total_list[city_name]) {
          // if(trans_loop_data_item.city_name === "湛江市") console.log(total_list, risk_score, very_important);
          total_list[city_name] = {name: city_name, HuiJu: 0, HuiJuLow: 0, JieRu: 1, important: is_important, very_important: very_important};
        } else {
          // if(trans_loop_data_item.city_name === "湛江市") console.log(total_list, risk_score, very_important);
          total_list[city_name]["JieRu"] += 1;
          total_list[city_name]["important"] += is_important;
          total_list[city_name]["very_important"] += very_important;
        }
      });
      convergeAlarm_data.forEach( convergeAlarm_data_item => {
        const {city_name, } = convergeAlarm_data_item;
        if(!total_list[city_name]) {
          total_list[city_name] = {name: city_name, HuiJu: 1, HuiJuLow: 0, JieRu: 0, important: 0,  very_important: 0};
        } else {
          total_list[city_name]["HuiJu"] += 1;
        }
      });
      convergeAlarmLow_data.forEach( convergeAlarmLow_data_item => {
        const {city_name, } = convergeAlarmLow_data_item;
        if(!total_list[city_name]) {
          total_list[city_name] = {name: city_name, HuiJu: 0, HuiJuLow: 1, JieRu: 0, important: 0,  very_important: 0};
        } else {
          total_list[city_name]["HuiJuLow"] += 1;
        }
      });
    }
    //转数组
    let rtn = [];
    for(let total_list_name in total_list) {
      rtn.push(total_list[total_list_name]);
    }

    return rtn;
  },
  createStatisticData : ({trans_loop_data, convergeAlarm_data, convergeAlarmLow_data}) => {
    let Total = "暂缺", HuiJu = "暂缺", JieRu = "暂缺", Important = "暂缺", HuiJuLow = "暂缺";
    //添加汇聚骨干数据
    if(convergeAlarm_data) {
      Total = convergeAlarm_data.length;
      HuiJu = convergeAlarm_data.length;
    }
    //添加接入数据
    if(trans_loop_data) {
      Total = Total + trans_loop_data.length;
      JieRu = trans_loop_data.length;

      Important = 0;
      trans_loop_data.forEach( trans_loop_data_item => {
        if( trans_loop_data_item["risk_score"] &&  trans_loop_data_item["risk_score"] > 59) {
          Important += 1;
        }
      });
    }
    //添加汇聚骨干数据
    if(convergeAlarmLow_data) {
      HuiJuLow = convergeAlarmLow_data.length;
      Total = Total + HuiJuLow;
    }

    return {Total, HuiJu, JieRu, Important, HuiJuLow};
  },
  createMapData: ({trans_loop_data, convergeAlarm_data, convergeAlarmLow_data}) => {
    let map_data = [], gdGeoCoordMap = charts_options.createGdGeoCoordMap();
    if(trans_loop_data) {
      trans_loop_data.forEach( trans_loop_data_item => {
        const { city_name, } = trans_loop_data_item;
        //统计地市总数
        if(gdGeoCoordMap[city_name]) {
          gdGeoCoordMap[city_name]["count"] += 1;
          gdGeoCoordMap[city_name]["JieRu"] += 1;
        }
      });
    }
    if(convergeAlarm_data) {
      convergeAlarm_data.forEach( convergeAlarm_data_item => {
        const { city_name, } = convergeAlarm_data_item;
        //统计地市总数
        if(gdGeoCoordMap[city_name]) {
          gdGeoCoordMap[city_name]["count"] += 1;
          gdGeoCoordMap[city_name]["HuiJu"] += 1;
        }
      });
    }
    if(convergeAlarmLow_data) {
      convergeAlarmLow_data.forEach( convergeAlarmLow_data_item => {
        const { city_name, } = convergeAlarmLow_data_item;
        //统计地市总数
        if(gdGeoCoordMap[city_name]) {
          gdGeoCoordMap[city_name]["count"] += 1;
          gdGeoCoordMap[city_name]["HuiJuLow"] += 1;
        }
      });
    }
    // console.log("gdGeoCoordMap", gdGeoCoordMap);

    for(let gdGeoCoordMap_name in gdGeoCoordMap) {
      if(gdGeoCoordMap[gdGeoCoordMap_name]["count"] > 0) {
        const map_data_item = {
          name:gdGeoCoordMap_name,
          value:[gdGeoCoordMap[gdGeoCoordMap_name]["loc"][0], gdGeoCoordMap[gdGeoCoordMap_name]["loc"][1], gdGeoCoordMap[gdGeoCoordMap_name]["count"], gdGeoCoordMap[gdGeoCoordMap_name]["HuiJu"], gdGeoCoordMap[gdGeoCoordMap_name]["HuiJuLow"], gdGeoCoordMap[gdGeoCoordMap_name]["JieRu"]]
        };
        map_data.push(map_data_item);
      }
    }

    return map_data;
  },
  createMapOption : ({trans_loop_data, convergeAlarm_data, convergeAlarmLow_data}) => {
    const max = 6000, min = 10;
    const maxSize4Pin = 30, minSize4Pin = 20;
    const map_data = charts_options.createMapData({trans_loop_data, convergeAlarm_data, convergeAlarmLow_data});
    return {
      tooltip: {
        show: true ,
      },
      "geo": {
        "map": "广东",
        "layoutCenter": ["50%", "58%"],
        "layoutSize": "130%",
        roam: false,
        label: {
          normal: {
            show: false
          },
          emphasis: {
            show: false,
          }
        },
        itemStyle: {
          normal: {
            areaColor: '#373aa2',
            borderColor: '#FFF',//线
            shadowColor: '#FFF',//外发光
            shadowBlur: 4
          },
          emphasis: {
            areaColor: '#373aa2',
            borderColor: '#FFF',//线
            // shadowColor: '#092f8f',//外发光
            // shadowBlur: 4
          }
        }
      },
      series: [
        {
          type: 'scatter',
          name:"汇聚骨干",
          tooltip: {
            formatter : (params) => {
              const {name, value} = params;
              // console.log("params ", name, value );
              return (name + '<br>' +
                "中断弱光总量：" + value[2] + '<br>' +
                "汇聚中断：" + value[3] + '<br>' +
                "汇聚弱光：" + value[4] + '<br>' +
                "接入中断：" + value[5]);
            } ,
            backgroundColor: 'rgba(136, 32, 32,1)' ,
            borderColor: 'rgba(136, 32, 32,1)' ,
            borderWidth: 1 ,
            // padding: 5 ,
            // textStyle: {...} ,
          },
          coordinateSystem: 'geo',
          rippleEffect: {
            brushType: 'stroke'
          },
          showEffectOn: 'render',
          itemStyle: {
            normal: {
              color: {
                type: 'radial',
                x: 0.5,
                y: 0.5,
                r: 0.5,
                colorStops: [{
                  offset: 0,
                  color: 'rgba(151,101,5,0.2)'
                }, {
                  offset: 0.8,
                  color: 'rgba(141,156,73,0.8)'
                }, {
                  offset: 1,
                  color: 'rgba(255,162,0,0.7)'
                }],
                global: false // 缺省为 false
              },
            }

          },
          label: {
            normal: {
              show: true,
              color: '#002394',
              fontWeight: 'bold',
              position: 'inside',
              formatter: function (para) {
                return '{cnNum|' + para.data.value[2] + '}'
              },
              rich: {
                cnNum: {
                  fontSize: 13,
                  color: '#FFF',
                }
              }
            },
          },
          symbol: 'circle',
          symbolSize: function (val) {
            if (val[2] === 0) {
              return 0;
            }
            var a = (maxSize4Pin - minSize4Pin) / (max - min);
            var b = maxSize4Pin - a * max;
            return a * val[2] + b * 1.2;
          },
          data: map_data
        }

      ],
    };

  },
  pai_option :({labelColor, borderColor, backgroundColor, data}) => {
    return {
      title: {show:false,},
      grid: {
        left: 0,
        right: 20,
        bottom: 0,
        top:10,
        containLabel: true
      },
      series: [{
        name: '水球图',
        type: 'liquidFill',
        radius: '80%',
        center: ['50%', '47%'],
        waveAnimation: 10, // 动画时长
        amplitude: 3, // 振幅
        data: data,  // [0.6],
        color: 'rgba(68, 197, 253,1)',
        label: {
          normal: {
            color: labelColor,  //'#0000ff',
            textStyle: {
              fontSize: 32,
              fontWeight: 'normal'
            }
          }
        },
        outline: {
          show: true,
          borderDistance: 5,
          itemStyle: {
            borderColor: borderColor,  // 'rgba(68, 197, 253,1)',
            borderWidth: 2
          }
        },
        backgroundStyle: {
          color: backgroundColor,  // 'rgba(0, 0, 253,.3)'
        }
      }]
    }
  },
  bar_data_simple: ({barType, itemColor, series_data, isImportant }) => {
    const rtn = {
      name: barType,
      type: 'bar',
      barWidth: '12px',
      barGap: "-100%",
      showBackground: true,
      backgroundStyle: {
        color: 'rgba(220, 220, 220, 0.4)',
        barBorderRadius: [30, 30, 30, 30] //圆角大小
      },
      label: {
        show: true,
        fontFamily: 'Rubik-Medium',
        position: 'right',
        // color:"#4e51a0",
        fontSize: 14,
        formatter: (params) => (params.value > 0) ? params.value : "",
        distance: 10
      },
      itemStyle: {
        normal: {
          color: itemColor,  //  new echarts.graphic.LinearGradient(0, 0, 1, 0, [{offset: 0, color: '#8d8feb'}, {offset: 1, color: '#6467d8'}], false), //每个数据的颜色
          barBorderRadius: [30, 30, 30, 30], //圆角大小
          shadowBlur: 10,
          shadowColor: 'rgba(0, 103, 255, 0.2)',
          shadowOffsetX: -5,
          shadowOffsetY: 5,
        },
      },
      data: series_data,  // [5, 38, 3, 94, 141]
    };

    if(isImportant) {
      // rtn["backgroundStyle"] = {color: 'rgba(220, 220, 220, 0.0)',};
      rtn["label"]["position"] = "inside";
    }

    return rtn;
  },
  bar_option : ({barType, itemColor, yAxis_data, series_data, important_data}) => {
    //如果有important_data，要把important_data数据也加入important_data
    let chart_series_data =[charts_options.bar_data_simple({barType, itemColor, series_data, })];
    if(important_data)  chart_series_data.push(charts_options.bar_data_simple({barType:"重要环", itemColor:charts_options.important_color, series_data:important_data, isImportant:true}));

    return {
      title: {show:false,},
      tooltip: {trigger: 'axis', axisPointer: {type: 'shadow'}},
      legend: {show:false },
      dataZoom: [{
        show: false,
        type: 'slider',
        x:0,
        yAxisIndex: [0],
        start: 0,
        end: 100}],
      grid: {
        left: 0,
        right: 30,
        bottom: 0,
        top:10,
        containLabel: true
      },
      xAxis: {
        show:false,
        type: 'value',
        boundaryGap: [0, 0.01]
      },
      yAxis: {
        type: 'category',
        axisLine: {
          show: false //坐标线
        },
        axisTick: {
          show: false //小横线
        },
        axisLabel: {
          show : true,
          formatter:(value, index) => {
            const type_and_name = value.split("||");
            if(type_and_name.length > 1) {
              return type_and_name[1];
            } else {
              return value;
            }
          }
        },
        triggerEvent:true,
        data: yAxis_data,  // ['广州市', '深圳市', '东莞市', '中山市', '惠州市',]
      },
      series:chart_series_data,
    };
  },
  line_option : (trans_alarm_count_data, line_title, barType) => {
      const count_data = (trans_alarm_count_data) ? trans_alarm_count_data : [];
      // // severity_keycode 25,26是汇聚骨干，27是接入
      // const severity_keycode_type = (barType === "汇聚骨干") ? {"25":1, "26":1} : {"27":1};
      const select_type = (barType === "重要环") ? "is_important" : (barType === "汇聚骨干") ? "HuiJu" : "JieRu";
      const GdMapList = charts_options.createGdGeoCoordMap();
      //创建legend //创建xAxis
      let times_obj = {}, xAxis = [], legend = [];
      let series = [];
      count_data.forEach( trans_alarm_count_data_item => {
        // HuiJu: "2"
        // HuiJu_guan_kong: "0"
        // Id: "1"
        // JieRu: "234"
        // JieRu_guan_kong: "4"
        // city_name: "东莞市"
        // crate_time: "2020-10-28"
        // is_important: "80"
        // total: "236"
        const  { crate_time, } = trans_alarm_count_data_item;
        if(!times_obj[crate_time]) times_obj[crate_time] = 1;
      });
      //
      //转换成数组
      for(let xAxis_item in times_obj) {
      xAxis.push(xAxis_item);
      }
      for(let city_item in GdMapList) {
        //存储 legend数
        legend.push(city_item);
        //存储series数
        //计算城市的line数组
        let city_total = [];
        xAxis.forEach(times_item => {
          //找出当前日期的总数
          let count = 0;
          for(let i = 0; i< count_data.length; i++) {
            const  {crate_time, city_name} = count_data[i];
            const value = parseInt(count_data[i][select_type]);
            if (city_name === city_item &&  crate_time === times_item) {
              count = value;
              break;
            }
          }
          city_total.push(count);
        });
        //
        series.push({
          name: city_item,
          type: 'line',
          // stack: line_title,
          data: city_total,
        })
      }

      return {
        tooltip: {trigger: 'axis'},
        legend: {
          data: legend, // ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
        },
        grid: { left: '2%', right: '2%', bottom: '6%', containLabel: true},
        xAxis: {type: 'category',
          data: xAxis,  //['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {type: 'value',},
        series: series,
        //   [
        //   {
        //     name: '邮件营销',
        //     type: 'line',
        //     stack: '总量',
        //     data: [120, 132, 101, 134, 90, 230, 210]
        //   },
        //   {
        //     name: '联盟广告',
        //     type: 'line',
        //     stack: '总量',
        //     data: [220, 182, 191, 234, 290, 330, 310]
        //   },
        //   {
        //     name: '视频广告',
        //     type: 'line',
        //     stack: '总量',
        //     data: [150, 232, 201, 154, 190, 330, 410]
        //   },
        //   {
        //     name: '直接访问',
        //     type: 'line',
        //     stack: '总量',
        //     data: [320, 332, 301, 334, 390, 330, 320]
        //   },
        //   {
        //     name: '搜索引擎',
        //     type: 'line',
        //     stack: '总量',
        //     data: [820, 932, 901, 934, 1290, 1330, 1320]
        //   }
        // ]
      };
  },
  count_bar_list: (loop_data, type_name) => {
    let init_data = {};
    let yAxis_data = [], series_data = [], important_data = [];
    if(loop_data) {
      loop_data.forEach( loop_data_item => {
        // console.log(trans_loop_data_item);
        const { city_name, is_important, risk_score} = loop_data_item;
        //统计地市总数
        //初始化
        if(!init_data[city_name]) init_data[city_name] = {count: 0, important: 0, };
        //数数加1
        init_data[city_name]["count"] += 1;
        if(risk_score && risk_score > 59) init_data[city_name]["important"] += 1;
      });
    }
    //转化数组
    for(let init_data_name in init_data) {
      series_data.push({name:init_data_name, value:init_data[init_data_name]["count"]});
      // important_data.push({name:init_data_name, value:init_data[init_data_name]["important"]})
    }
    //排序
    series_data.sort((a, b) => a.value - b.value);
    series_data.forEach(series_data_item => {
      yAxis_data.push(type_name + "||" + series_data_item.name);
      important_data.push({name:series_data_item.name, value:init_data[series_data_item.name]["important"]});
    });

    return { yAxis_data, series_data, important_data};
  },

};

export default charts_options;
