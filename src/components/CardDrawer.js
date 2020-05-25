import React from "react";
import {Drawer, Row, Col, Divider, Rate} from 'antd'
import {LOCAL_API_ROOT} from '../constants'
import {updateCardRatesById} from '../asyncActions'

const DescriptionItem = ({title, content}) => (
    <div className="site-description-item-profile-wrapper">
        <p className="site-description-item-profile-p-label">{title}:</p>
        {content}
    </div>
);

class CardDrawer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rateDesc: ['terrible', 'bad', 'normal', 'good', 'wonderful'],
            phoneScreenRate: 0,
            onsiteRate: 0,
            behaviorRate: 0,
            averageRate: 0,
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {phoneScreenRate, onsiteRate, behaviorRate} = this.state
        const {openCardInfo} = this.props
        const prevSum = prevState.phoneScreenRate + prevState.onsiteRate + prevState.behaviorRate
        const curSum = phoneScreenRate + onsiteRate + behaviorRate
        if (openCardInfo && prevProps.openCardInfo !== openCardInfo) {
            this.setState({
                phoneScreenRate: openCardInfo.phoneScreenRate,
                onsiteRate: openCardInfo.onsiteRate,
                behaviorRate: openCardInfo.behaviorRate,
                averageRate: openCardInfo.averageRate,
            })
        }
        if (phoneScreenRate && onsiteRate && behaviorRate && prevSum !== curSum) {
            const averageRate = curSum / 3
            console.log('averageRate', averageRate)
            updateCardRatesById(this.props.openCardInfo._id, { averageRate: averageRate })
                .then(() => {
                    this.setState({ averageRate });
                })
        }

    }

    handlePhoneScreenRateChange = (rateValue) => {
        updateCardRatesById(this.props.openCardInfo._id, { phoneScreenRate: rateValue })
            .then(() => {
                this.setState({ phoneScreenRate: rateValue })
            })
    }

    handleOnsiteRateChange = (rateValue) => {
        updateCardRatesById(this.props.openCardInfo._id, { onsiteRate: rateValue })
            .then(() => {
                this.setState({ onsiteRate: rateValue });
            })
    }
    handleBehaviorRateChange = (rateValue) => {
        updateCardRatesById(this.props.openCardInfo._id, { behaviorRate: rateValue })
            .then(() => {
                this.setState({ behaviorRate: rateValue });
            })
    }

    render() {
        const {closeDrawer, isDrawerVisible, openCardInfo} = this.props
        const {rateDesc, phoneScreenRate, onsiteRate, behaviorRate, averageRate} = this.state;
        // console.log('averageRate', averageRate)
        return (
            openCardInfo &&
            <Drawer
                width={450}
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
                            <a href={`${LOCAL_API_ROOT}/assets/uploads/resumes/${openCardInfo.resume}`}>
                                {openCardInfo.resume}
                            </a>}
                        />
                    </Col>
                </Row>
                <Divider/>
                <p className="site-description-item-profile-p">Performance </p>
                <Row>
                    <Col span={24}>
                        <DescriptionItem title="Phone Screen" content={
                            <span>
                                <Rate
                                    tooltips={rateDesc}
                                    onChange={this.handlePhoneScreenRateChange}
                                    value={phoneScreenRate}
                                />
                                {phoneScreenRate ? <span className="ant-rate-text">{rateDesc[phoneScreenRate - 1]}</span> : ''}
                            </span>}
                        />
                    </Col>
                    <Col span={24}>
                        <DescriptionItem title="Onsite" content={
                            <span>
                                <Rate
                                    tooltips={rateDesc}
                                    onChange={this.handleOnsiteRateChange}
                                    value={onsiteRate}
                                />
                                {onsiteRate ? <span className="ant-rate-text">{rateDesc[onsiteRate - 1]}</span> : ''}
                            </span>}
                        />
                    </Col>
                    <Col span={24}>
                        <DescriptionItem title="Behavior" content={
                            <span>
                                <Rate
                                    tooltips={rateDesc}
                                    onChange={this.handleBehaviorRateChange}
                                    value={behaviorRate}
                                />
                                {behaviorRate ? <span className="ant-rate-text">{rateDesc[behaviorRate - 1]}</span> : ''}
                            </span>}
                        />
                    </Col>
                    <Col span={24}>
                        <DescriptionItem title="Average" content={
                            <span>
                                <Rate
                                    disabled
                                    tooltips={rateDesc}
                                    // onChange={this.handleAverageRateChange}
                                    value={Math.round(averageRate)}
                                />
                                {averageRate ? <span className="ant-rate-text">{`${rateDesc[Math.round(averageRate )- 1]}(${averageRate.toFixed(2)})`}</span> : 'No Rate'}
                            </span>}
                        />
                    </Col>
                </Row>
            </Drawer>
        );
    }
}

export default CardDrawer;