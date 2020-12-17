import React, { useEffect } from 'react'
import './Keyboard.scss'

export default function Keyboard() {
    const rows = []
    rows.push(['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']'])
    rows.push(['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\''])
    rows.push(['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/'])

    useEffect(() => {

    }, [])

    return (
        <>
            <div id="keyboard-outer-container">
                {rows.map((row) => {
                    return (
                        <div key={row} id={`row-${row}`} className="key-row">
                            {row.map((key) => {
                                return (
                                    <div className="key-container" key={key} id={`key-${key}`}>
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
