import React from "react";
import { Card } from 'antd'

class CardItem extends React.Component {
    render() {
        const{id, name, education, number, status, backgroundColor} = this.props.card
        return (
            <div>
                <Card
                    title={`Name: ${name}`}
                    // style={{ width: 100, height: 100 }}
                    bordered={true}
                >
                    <p>{`Contact: ${number}`}</p>
                </Card>
            </div>
        );
    }
}

export default CardItem;