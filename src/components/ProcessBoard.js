import React from "react";
import CardItem from "./CardItem";
import AddCardForm from "./AddCardForm";
import {Space, Divider, Button, Modal} from 'antd';


class ProcessBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            cardList: [{
                id: 1,
                name: "TC",
                education: "KS",
                number: "12345",
                email: "asdf",
                status: "applied",
                comment: "hello",
            }, {
                id: 2,
                name: "TC2",
                education: "KS",
                number: "12345",
                email: "asdf",
                status: "phoneScreen",
                comment: "hello",
            }, {
                id: 3,
                name: "TC3",
                education: "KS",
                number: "12345",
                email: "asdf",
                status: "onSite",
                comment: "hello",
            }, {
                id: 4,
                name: "TC4",
                education: "KS",
                number: "12345",
                email: "asdf",
                status: "offered",
                comment: "hello",
            }
            ]
        }
    }

    onDragStart = (event, id) => {
        event.dataTransfer.setData("id", id);
    }
    onDragOver = (event) => {
        event.preventDefault();
    }

    onDrop = (event, curStatus) => {
        let id = event.dataTransfer.getData("id");

        let cardList = this.state.cardList.filter((card) => {
            if (card.id == id) {
                card.status = curStatus
            }
            return card
        });

        this.setState({
            ...this.state,
            cardList
        });
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    closeModel = () => {
        this.setState({ visible: false });
    };

    renderColumnComponent = (status, cards) => {
        return (
            <div
                className={`column`}
                onDragOver={(event) => this.onDragOver(event)}
                onDrop={(event) => {
                    this.onDrop(event, status)
                }}>
                <center><h2>{status}</h2></center>
                <Divider/>
                {cards[status]}
            </div>
        )
    }

    render() {
        const cards = {
            applied: [],
            phoneScreen: [],
            onSite: [],
            offered: [],
            accepted: [],
            rejected: [],
        }
        const {cardList, visible} = this.state
        cardList.forEach((card) => {
            cards[card.status].push(
                <div
                    key={card.id}
                    onDragStart={(event) => this.onDragStart(event, card.id)}
                    draggable
                    className="card-container"
                >
                    {<CardItem card={card}/>}
                </div>
            );
        });

        return (
            <>
                <Button type="primary" onClick={this.showModal}>Add</Button>
                <Button type="primary">Save</Button>
                <div className="drag-container">
                    <Space size={155} align="baseline">
                        {this.renderColumnComponent("applied", cards)}
                        {this.renderColumnComponent("phoneScreen", cards)}
                        {this.renderColumnComponent("onSite", cards)}
                        {this.renderColumnComponent("offered", cards)}
                        {this.renderColumnComponent("accepted", cards)}
                        {this.renderColumnComponent("rejected", cards)}
                    </Space>
                </div>
                <Modal
                    visible={visible}
                    title="Create a new profile"
                    onCancel={this.closeModel}
                    footer={null}
                >
                    <AddCardForm closeModel={this.closeModel} />
                </Modal>
            </>
        );
    }
}

export default ProcessBoard;