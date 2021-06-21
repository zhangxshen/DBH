import React, {Component} from "react";
import HeadPageComponent from "@/components/DBHComponent/HeadPageComponent";
import config_text from "@/assets/config";
import {Layout} from "antd";

class TDRComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {}
  }

  componentWillUnmount() {
    // this.scene.destroy();
  }
  componentDidMount() {

  }

  onMenuClick = () => this.props.dispatch({type:"DBH/save", payload:{menu_visible: true}});


  render() {

    const h = document.body.clientHeight;

    return(
      <div>
      <HeadPageComponent onMenuClick={this.onMenuClick} title={config_text.TDR} desc_text={config_text.TDR_desc} icon={"avatar_icon"} />
        <Layout.Content >
          <iframe src={"/TDR"} width={"100%"} frameBorder={0} scrolling={"no"} height={h - 100}/>
        </Layout.Content>
      </div>
    )
  }

}

export default TDRComponent;