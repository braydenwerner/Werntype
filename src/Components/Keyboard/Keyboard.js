import React, { useState, useEffect } from 'react'
import './Keyboard.scss'

export default function Keyboard() {
    const rows = [
        ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']'],
        ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\''],
        ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/']
    ]

    const [keysToHighlight, setKeysToHighlight] = useState(new Set())

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown)

        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [])

    const handleKeyDown = (e) => {
        setKeysToHighlight((oldKeysToHighlight) => {
            const newKeysToHighlight = new Set(oldKeysToHighlight)
            newKeysToHighlight.add(e.key)
            return newKeysToHighlight
        })

        setTimeout(function () {
            setKeysToHighlight((oldKeysToHighlight) => {
                const newKeysToHighlight = new Set(oldKeysToHighlight)
                newKeysToHighlight.delete(e.key)
                return newKeysToHighlight
            })
        }, 100)

        console.log(keysToHighlight)
    }

    return (
        <div id="keyboard-outer-container">
            {rows.map((row) => {
                return (
                    <div className="key-row" key={row}>
                        {row.map((key) => {
                            console.log(`key-highlight-${keysToHighlight.has(key)}`)
                            return (
                                <div className={`key-highlight-${keysToHighlight.has(key)}`} key={key}>
                                    <span className="key">{key}</span>
                                </div>
                            )
                        })}
                    </div>
                )
            })}
        </div>
    )
}
