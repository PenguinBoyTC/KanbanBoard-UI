import {LOCAL_API_ROOT} from "./constants";
import {message} from 'antd';

export const fetchCardList = () => {
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
            message.success("Load Cards successfully!")
            const { cardList } = data;
            return cardList;
        })
        .catch((err) => {
            console.log(err)
            message.error('Failed to load')
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
            const { cardList } = data;
            return cardList;
        })
        .catch((err) => {
            console.log(err)
            message.error('Failed to create')
        })
}