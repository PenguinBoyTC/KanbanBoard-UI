import React from "react";
import {Drawer, Row, Col, Divider} from 'antd'
import {LOCAL_API_ROOT} from '../constants'

const DescriptionItem = ({title, content}) => (
    <div className="site-description-item-profile-wrapper">
        <p className="site-description-item-profile-p-label">{title}:</p>
        {content}
    </div>
);

class CardDrawer extends React.Component {
    render() {
        const {closeDrawer, isDrawerVisible, openCardInfo} = this.props
        return (
            openCardInfo &&
            <Drawer
                width={640}
                placement="right"
                closable={false}
                onClose={closeDrawer}
                visible={isDrawerVisible}
            >
                <p className="site-description-item-profile-p" style={{marginBottom: 24}}>
                    User Profile
                </p>
                <p className="site-description-item-profile-p">Personal</p>
                <Row>
                    <Col span={12}>
                        <DescriptionItem title="Full Name" content={openCardInfo.name}/>
                    </Col>
                    <Col span={12}>
                        <DescriptionItem title="Application Status" content={openCardInfo.status}/>
                    </Col>
                    <Col span={12}>
                        <DescriptionItem title="Comment" content={openCardInfo.comment}/>
                    </Col>
                </Row>
                <Divider/>
                <p className="site-description-item-profile-p">Contacts</p>
                <Row>
                    <Col span={12}>
                        <DescriptionItem title="Email" content={openCardInfo.email}/>
                    </Col>
                    <Col span={12}>
                        <DescriptionItem title="Phone Number" content={openCardInfo.phone}/>
                    </Col>
                    <Col span={24}>
                        <DescriptionItem title="Resume Link" content={
                            <a href={`${LOCAL_API_ROOT}/resumes/${openCardInfo.resume}`}>
                                {openCardInfo.resume}
                            </a>}
                        />
                    </Col>
                </Row>
            </Drawer>
        );
    }
}

export default CardDrawer;