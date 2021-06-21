import React,{Component} from 'react';

import HeadPageComponent from '../HeadPageComponent';
import SearchFormComponent from './SearchFormComponent';
import SearchTableComponent from './SearchTableComponent';

import styles2 from "./HistoryComponent.less";
import {Layout, Button, Carousel, Divider, Drawer} from "antd";

import config_text from '../../../assets/config.json';
import table_option from "../../DBHComponent/tables_options";

class HistoryComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      carousel_obj:null,
      active_button:0,

    };
  }
  componentWillUnmount() {
    // this.scene.destroy();
  }
  componentDidMount() {
    this.props.dispatch({type: "DBH/save", payload:{"defaultSelectedKeys": "sub3_2"}});
  }

  scrollToAnchor = (anchorName) => {
    if (anchorName) {
      let anchorElement = document.getElementById(anchorName);
      if(anchorElement) { anchorElement.scrollIntoView();}
    }
  };
  checkActive = (cur, act) => (cur === act) ? "primary" : null;
  onMenuClick = () => this.props.dispatch({type:"DBH/save", payload:{menu_visible: true}});
  changeCarousel = (step) => {
    if(this.state.carousel_obj) {
      this.state.carousel_obj.goTo(step);
      this.setState({active_button:step});
    }
  };
  onCellClicked = (params) => {
    console.log(params);
    const data = params["data"];
    this.props.dispatch({type:"history_model/save",payload:{modal_visible: true, detail_data: data, }});
  };
  onSearchClick = (search_props) => {
    this.props.dispatch({type:"history_model/search_alarm", payload:{"search_props": search_props}});
    this.scrollToAnchor('anchorId');

  };

  handleCancel = () => this.props.dispatch({type:"history_model/save",payload:{modal_visible: false, }});


  render() {
    console.log(this.props);
    const {Cookies_user, Cookies_auth} =this.props;
    const {search_data, search_count, search_total, search_loading, modal_visible, detail_data} = this.props.history_model;
    const SearchForm_props = {search_data, search_loading, onSearchClick:this.onSearchClick, };
    const SearchTable_props = {search_data,  search_count, search_total,  search_loading, onCellClicked: this.onCellClicked, };
    // "primary"

    return (
      <div>
        <HeadPageComponent onMenuClick={this.onMenuClick} title={config_text.History} desc_text={config_text.History_desc} icon={"avatar_icon2"} />
        <Layout.Content className={styles2.content_style} >
          <div>
            <Button onClick={this.changeCarousel.bind(null,0)} type={this.checkActive(0,this.state.active_button)} icon="search">“最小环”历史记录查询</Button>
            <Button disabled={true} onClick={this.changeCarousel.bind(null,1)} type={this.checkActive(1,this.state.active_button)} icon="search" style={{marginLeft:20}}>基于某个端口或某个传输系统（暂未开发）</Button>
          </div>
          <Carousel dots={false}  ref={c => {
            if(c && !this.state.carousel_obj) this.setState({carousel_obj: c});
          }}  >
            <div>
              <SearchFormComponent  {...SearchForm_props} Cookies_user={Cookies_user} Cookies_auth={Cookies_auth}  />
              <SearchTableComponent {...SearchTable_props} />
            </div>
            <div>
              <h3>2</h3>
            </div>
          </Carousel>
          <div id="anchorId" />

          <Drawer title="告警详情" width={"50%"} onClose={this.handleCancel} visible={modal_visible}>
            <div>{table_option.createTimeLine(detail_data)}</div>
            <div style={{border:"1px solid #cbcfdb", padding:"15px"}}>
              {table_option.createDescriptions({select_seriesName: detail_data.severity_keycode , detail_data, })}

            </div>
          </Drawer>
        </Layout.Content>
      </div>
    )
  }
}

export default HistoryComponent;
