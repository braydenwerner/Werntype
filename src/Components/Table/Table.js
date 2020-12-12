import React, { useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { names as namesAtom } from '../../recoil'

import './Table.scss'

export default function Table() {
    const tableData = useRecoilValue(namesAtom)

    useEffect(() => {
        console.log(tableData)
    }, [tableData])

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((n) => {
                        return (
                            <tr key={n}>
                                <th>{n}</th>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}
