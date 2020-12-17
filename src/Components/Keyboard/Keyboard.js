import React, { useEffect } from 'react'
import './Keyboard.scss'

export default function Keyboard() {
    const keyRefs = []
    const rows = []
    rows.push(['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']'])
    rows.push(['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\''])
    rows.push(['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/'])

    let keyIndex = -1

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown)

        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [])

    const handleKeyDown = (e) => {
        let currentKey = -1
        rows.forEach((row) => {
            row.forEach((key) => {
                currentKey++
                if (e.key === key) {
                    console.log(key)
                    const keyElement = keyRefs[currentKey].current
                    keyElement.style.backgroundColor = 'Red'
                    setTimeout(function () { keyElement.style.backgroundColor = 'White' }, 100)
                }
            })
        })
    }

    return (
        <>
            <div id="keyboard-outer-container">
                {rows.map((row) => {
                    return (
                        <div key={row} id={`row-${row}`} className="key-row">
                            {row.map((key) => {
                                keyIndex++
                                keyRefs.push(React.createRef())
                                return (
                                    //  set each div to its corresponding reference
                                    <div className="key-container" key={key} ref={keyRefs[keyIndex]}>
                                        <span className="key">{key}</span>
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        </>
    )
}
