import React from "react";
import AddCardFormModal from './AddCardFormModal';
import {fetchCardList, deleteCardById, updateCardStatusById} from '../asyncActions'
import {Space, Button, List, Avatar, Popconfirm} from 'antd';
import {DeleteTwoTone} from '@ant-design/icons';
import InfiniteScroll from 'react-infinite-scroller';
import CardDrawer from './CardDrawer';


class ProcessBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openCardInfo: null,
            isDrawerVisible: false,
            isModalVisible: false,
            submitButtonReload: false,
            cardList: []
        }
    }

    componentDidMount() {
        fetchCardList()
            .then((cardList) => {
                this.setState({
                    cardList: cardList,
                })
            })
        // updateCardStatusById('5ec9ca205a1b6b745c481775', 'applied')
    }

    componentDidUpdate(prevProps, prevState, _) {
        const {submitButtonReload, openCardInfo} = this.state
        if (submitButtonReload && prevState.submitButtonReload !== submitButtonReload) {
            fetchCardList()
                .then((cardList) => {
                    this.setState({
                        cardList: cardList,
                        submitButtonReload: false,
                    })
                })
        }
        if (!openCardInfo && prevState.openCardInfo !== openCardInfo) {
            fetchCardList()
                .then((cardList) => {
                    this.setState({
                        cardList: cardList,
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
            if (card._id === id) {
                card.status = curStatus
            }
            return card
        });
        updateCardStatusById(id, curStatus)
            .then(() => {
                this.setState({
                    ...this.state,
                    cardList
                });
            })
    }

    setReloadValue = (value) => {
        this.setState({
            submitButtonReload: value
        })
    }

    showModal = () => {
        this.setState({
            isModalVisible: true,
        });
    };

    closeModel = () => {
        this.setState({isModalVisible: false});
    };

    showDrawer = (openCardInfo) => {
        this.setState({
            isDrawerVisible: true,
            openCardInfo,
        });
    };

    closeDrawer = () => {
        this.setState({
            isDrawerVisible: false,
            openCardInfo: null,
        });
    };
    handleDeleteConfirm = (cardId) => {
        deleteCardById(cardId)
            .then(() => {
                this.setReloadValue(true)
            })
    }
    handleInfiniteOnLoad = () => {
        // TODO: for handling infinite scrolling window

    };

    renderColumnComponent = (status, cards) => {
        return (
            <div>
                <center><h2>{status}</h2></center>
                <div
                    className="card-infinite-container"
                    onDragOver={(event) => this.onDragOver(event)}
                    onDrop={(event) => this.onDrop(event, status)}
                >
                    <InfiniteScroll
                        loadMore={this.handleInfiniteOnLoad}
                        initialLoad={false}
                        pageStart={0}
                        useWindow={false}
                    >
                        <List
                            dataSource={cards[status]}
                            renderItem={item => (
                                <List.Item
                                    key={item._id}
                                    actions={[
                                        <Popconfirm
                                            title="Are you sure delete this task?"
                                            onConfirm={() => this.handleDeleteConfirm(item._id)}
                                            okText="Yes"
                                            cancelText="No"
                                        >
                                            <DeleteTwoTone twoToneColor="#eb2f96"/>
                                        </Popconfirm>
                                    ]}
                                    onDragStart={(event) => this.onDragStart(event, item._id)}
                                    draggable
                                >
                                    <List.Item.Meta
                                        // avatar={
                                        //     <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                        // }
                                        title={<a href="#" onClick={() => this.showDrawer(item)}>{item.name}</a>}
                                        description={item.email}
                                    />
                                </List.Item>
                            )}
                        >
                        </List>
                    </InfiniteScroll>
                </div>
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
        const {cardList, isModalVisible, isDrawerVisible, openCardInfo} = this.state
        cardList && cardList.forEach((card) => {
            cards[card.status].push(card)
        })

        return (
            <>
                <div className="drag-container">
                    <Space size={25} align="baseline">
                        {this.renderColumnComponent("applied", cards)}
                        {this.renderColumnComponent("phoneScreen", cards)}
                        {this.renderColumnComponent("onSite", cards)}
                        {this.renderColumnComponent("offered", cards)}
                        {this.renderColumnComponent("accepted", cards)}
                        {this.renderColumnComponent("rejected", cards)}
                    </Space>
                </div>
                <Button type="primary" onClick={this.showModal}>Add</Button>
                <AddCardFormModal
                    isModalVisible={isModalVisible}
                    closeModel={this.closeModel}
                    setReloadValue={this.setReloadValue}
                />
                <CardDrawer
                    isDrawerVisible={isDrawerVisible}
                    openCardInfo={openCardInfo}
                    closeDrawer={this.closeDrawer}
                />
            </>
        );
    }
}

export default ProcessBoard;