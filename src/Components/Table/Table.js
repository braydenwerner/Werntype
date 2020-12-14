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
                        <th>Age</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(tableData).map((key) => {
                        return (
                            <tr key={key}>
                                <th>{tableData[key].Name}</th>
                                <th>{tableData[key].Age}</th>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}
