import React, {Component} from "react";
import HeadPageComponent from "../DBHComponent/HeadPageComponent";
import SearchFormComponent from './SearchFormComponent';
import SearchTableComponent from './SearchTableComponent';
import config_text from "@/assets/config";
import {Layout} from "antd";

class GDZJComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      select_seriesName:'问题工单',
    }
  }

  componentWillUnmount() {
    // this.scene.destroy();
  }
  componentDidMount() {

  }

  onMenuClick = () => this.props.dispatch({type:"DBH/save", payload:{menu_visible: true}});

  scrollToAnchor = (anchorName) => {
    if (anchorName) {
      let anchorElement = document.getElementById(anchorName);
      if(anchorElement) { anchorElement.scrollIntoView();}
    }
  };
  checkActive = (cur, act) => (cur === act) ? "primary" : null;

  onCellClicked = (params) => {
    console.log(params);
    const data = params["data"];
    this.props.dispatch({type:"GDZJ/save",payload:{modal_visible: true, detail_data: data, }});
  };
  onSearchClick = (search_props) => {
    this.props.dispatch({type:"GDZJ/search_alarm", payload:{"search_props": search_props}});
    this.scrollToAnchor('anchorId');
    if(search_props.test_type == 2){
      this.setState({select_seriesName: '疑似制造工单'})
    }
    else if(search_props.test_type == 1){
      this.setState({select_seriesName: '问题工单'})
    }

  };
  onChange = (activeKey) => this.setState({select_seriesName:activeKey,});

  handleCancel = () => this.props.dispatch({type:"GDZJ/save",payload:{modal_visible: false, }});


  render() {
    const {Cookies_user, Cookies_auth} =this.props;
    console.log(Cookies_auth)
    const {search_data, search_count, search_total, search_loading} = this.props.GDZJ;
    const SearchForm_props = {search_data, search_loading, onSearchClick:this.onSearchClick, };
    const SearchTable_props = {search_data,  search_count, search_total,  search_loading, onCellClicked: this.onCellClicked, 
      select_seriesName: this.state.select_seriesName, tab_onChange:this.onChange};

    return(
      <div>
        <HeadPageComponent onMenuClick={this.onMenuClick} title={config_text.GDZJ} desc_text={config_text.GDZJ_desc} icon={"avatar_icon"} />
        <Layout.Content >
          <div>
          <SearchFormComponent  {...SearchForm_props} Cookies_user={Cookies_user} Cookies_auth={Cookies_auth}  />
          <SearchTableComponent {...SearchTable_props} />
          </div>
        </Layout.Content>
      </div>
    )
  }

}

export default GDZJComponent;