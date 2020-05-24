import {LOCAL_API_ROOT} from "./constants";
import {message} from 'antd';

export const fetchCardList = () => {
    message.loading({content: 'Loading...', key: 'load-cardlist'});
    const params = {
        method: 'GET',
    };
    return fetch(`${LOCAL_API_ROOT}/cardlist`, params)
        .then((response) => {
            if (response.ok) {
                return response.json()
            }
            throw new Error()
        })
        .then((data) => {
            message.success({content: 'Load Cards successfully!', key: 'load-cardlist', duration: 10})
            const {cardList} = data;
            return cardList;
        })
        .catch((err) => {
            console.log(err)
            message.error({content: 'Failed to load Card', key: 'load-cardlist', duration: 3})
                .then(()=>{
                    message.warning({content: 'Make sure your api port is set to 5050', key: 'load-cardlist', duration: 0})
            })

        })
}

export const createNewCard = (body) => {
    const params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    };
    return fetch(`${LOCAL_API_ROOT}/card`, params)
        .then((response) => {
            if (response.ok) {
                return response.json()
            }
            throw new Error()
        })
        .then((data) => {
            message.success("Created successfully!")
            const {cardList} = data;
            return cardList;
        })
        .catch((err) => {
            console.log(err)
            message.error('Failed to create')
        })
}

export const deleteCardById = (cardId) => {
    const params = {
        method: 'DELETE',
    };
    return fetch(`${LOCAL_API_ROOT}/card/${cardId}`, params)
        .then((response) => {
            if (response.ok) {
                return response.json()
            }
            throw new Error()
        })
        .then((data) => {
            message.success("Deleted successfully!")
            const {removedCard} = data;
            return removedCard;
        })
        .catch((err) => {
            console.log(err)
            message.error('Failed to delete')
        })
}

export const updateCardStatusById = (cardId, status) => {
    const params = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({status: status}),
    };
    return fetch(`${LOCAL_API_ROOT}/card/${cardId}`, params)
        .then((response) => {
            if (response.ok) {
                return response.json()
            }
            throw new Error()
        })
        .then((data) => {
            message.success("Updated successfully!")
            const {removedCard} = data;
            return removedCard;
        })
        .catch((err) => {
            console.log(err)
            message.error('Failed to update')
        })
}