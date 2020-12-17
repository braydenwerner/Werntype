import React, { useRef, useState, useEffect } from 'react'
import { useRecoilState } from 'recoil'

import { pageState } from '../../recoil'

import './TypingForm.scss'

export default function TypingForm() {
    //  these will be set upon every render but will not update the useState again, maybe there's a better way to declare
    const tempPrompts = ['I need to add cool text! Very fun!', 'Cool string of text', 'Use an api for text or database or something better.']
    const rand = tempPrompts[Math.floor(Math.random() * tempPrompts.length)]

    const formRef = useRef(null)

    //  the prompt the user types
    const [currentPrompt, setCurrentPrompt] = useState(rand)

    //  corresponds to the index of each word in currentPrompt.split(" ")
    const [currentWordIndex, setCurrentWordIndex] = useState(0)

    //  the index in currentPrompt where current word starts
    const [currentWordStartIndex, setCurrentWordStartIndex] = useState(0)

    //  the index up to the first incorrect key
    const [currentCorrectIndex, setCurrentCorrectIndex] = useState(0)

    //  the current index the user is on, including incorrect keys
    const [currentIndex, setCurrentIndex] = useState(0)

    //  toggles state and renders components accordingly
    const [currentPageState, setCurrentPageState] = useRecoilState(pageState)

    //  0 -> currentCorrectIndex is green
    //  currentCorrectIndex + 1 -> currentIndex is red
    //  currentCurrentIndex + 1 -> currentPrompt.length is white
    const handleKeyDown = (e) => {
        const currentWord = currentPrompt.split(' ')[currentWordIndex]
        const formValue = formRef.current.value

        let correctChars = 0
        while (formValue[correctChars] && (formValue[correctChars] === currentWord[correctChars])) {
            correctChars++
        }

        const totalCorrectIndex = currentWordStartIndex + correctChars
        const totalIndex = currentWordStartIndex + formValue.length

        if (formValue[formValue.length - 1] === ' ' && formValue.substring(0, formValue.length - 1) === currentWord) {
            setCurrentWordIndex((oldCurrentWord) => {
                return oldCurrentWord + 1
            })

            setCurrentWordStartIndex((oldCurrentWOrdStartIndex) => {
                return oldCurrentWOrdStartIndex + formValue.length
            })

            formRef.current.value = ''
        }

        if (currentWordIndex === currentPrompt.split(' ').length - 1 && formValue === currentWord) {
            setCurrentPageState('test')
        }

        setCurrentCorrectIndex(totalCorrectIndex)
        setCurrentIndex(totalIndex)
    }

    return (
        <>
            { currentPageState === 'typingState' && (
                <div id="typingForm-outer-container">
                    <div id="text-prompt">
                        <span style={{ color: '9EE493' }}>{currentPrompt.substring(0, currentCorrectIndex)}</span>
                        <span style={{ color: 'RED' }}>{currentPrompt.substring(currentCorrectIndex, currentIndex)}</span>
                        <span style={{ color: 'WHITE' }}>{currentPrompt.substring(currentIndex, currentPrompt.length)}</span>
                    </div>

                    <input id="typing-form" type="text" placeholder="Type Here" maxLength={15} onChange={handleKeyDown} ref={formRef} autoFocus></input>
                </div>
            )
            }
        </>
    )
}
