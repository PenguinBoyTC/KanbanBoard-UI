import React from "react";
import CardItem from "./CardItem";
import AddCardForm from "./AddCardForm";
import {fetchCardList} from '../asyncActions'
import {Space, Divider, Button, Modal} from 'antd';
import {LOCAL_API_ROOT} from "../constants";


class ProcessBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            reload: false,
            cardList: []
        }
    }

    componentDidMount() {
        fetchCardList()
            .then((data) => {
                console.log(data)
                this.setState({
                    cardList: data,
                })
            })
        // fetch(`http://localhost:5050/cardlist`).then((response) => {
        //     console.log('response', response.json())
        // })
    }

    componentDidUpdate(prevProps, prevState, _) {
        if (this.state.reload && prevState.reload !== this.state.reload) {
            fetchCardList()
                .then((data) => {
                    console.log(data)
                    this.setState({
                        cardList: data,
                        reload: false,
                    })
                })
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
            if (card._id == id) {
                card.status = curStatus
            }
            return card
        });

        this.setState({
            ...this.state,
            cardList
        });
    }

    setReloadValue = (value) => {
        this.setState({
            reload: value
        })
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    closeModel = () => {
        this.setState({visible: false});
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
                    key={card._id}
                    onDragStart={(event) => this.onDragStart(event, card._id)}
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
                    <AddCardForm
                        closeModel={this.closeModel}
                        setReloadValue={this.setReloadValue}
                    />
                </Modal>
            </>
        );
    }
}

export default ProcessBoard;