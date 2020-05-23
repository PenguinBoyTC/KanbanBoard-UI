import React from "react";
import { Card } from 'antd'

class CardItem extends React.Component {
    render() {
        const{ name, education, phone, status, backgroundColor} = this.props.card
        return (
            <div>
                <Card
                    title={`${name}`}
                    // style={{ width: 100, height: 100 }}
                    bordered={true}
                >
                    <p>{`Contact: ${phone}`}</p>
                </Card>
            </div>
        );
    }
}

export default CardItem;