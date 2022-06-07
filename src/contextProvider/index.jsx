import React, { useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

const cardDataContext = React.createContext()

export const CardDataProvider = ({ children }) => {
    const [allCards, setAllCards] = useState([])
    const [checkedCard, setCheckedCard] = useState({})

    const getData = () => {
        axios
            .get(
                'https://raw.githubusercontent.com/BrunnerLivio/PokemonDataGraber/master/output.json'
            )
            .then((res) => {
                res.data.splice(0, 15).map((eachItem) =>
                    setAllCards((prevState) => [
                        ...prevState,
                        {
                            header: eachItem.Name,
                            body: eachItem.About,
                            id: eachItem.Number,
                        },
                    ])
                )
            })
    }
    useEffect(() => {
        getData()
    }, [])
    const value = {
        allCards,
        getNumberOfCards: () => allCards.length,
        addCard: (cardCreated) => {
            setAllCards((prevState) => [...prevState, cardCreated])
        },
        removeCard: (cardIds) => {
            cardIds.forEach((id) => {
                const cardIndex = allCards.findIndex((card) => card.id === id)
                allCards.splice(cardIndex, 1)
            })
        },
        checkedCard,
        setCheckedCard: (card) => {
            setCheckedCard(card)
        },
    }
    return (
        <cardDataContext.Provider value={value}>
            {children}
        </cardDataContext.Provider>
    )
}

CardDataProvider.propTypes = {
    children: PropTypes.node.isRequired,
}
export const useCardData = () => useContext(cardDataContext)
