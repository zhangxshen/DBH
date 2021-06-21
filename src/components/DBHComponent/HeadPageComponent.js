import React from "react";
import styles from './HeadPageComponent.less';
import {Avatar, Icon} from 'antd';


const HeadPageComponent = ({onMenuClick, title, desc_text, icon}) => {
  return (
    <div className={styles.page_main}>
      <div className={styles.pageHeaderContent}>
        <div className={styles.avatar2}>
          <Icon type={'menu-fold'} style={{fontSize:32, marginTop:20}} onClick={onMenuClick} />
        </div>
        <div className={styles.avatar}>
          <Avatar size="large"  className={styles[icon]} />
        </div>
        <div className={styles.content}>
          <div className={styles.contentTitle}>{title}</div>
          <div>{desc_text}</div>
        </div>
      </div>
    </div>
  )
};


export default HeadPageComponent;
