import React from 'react'
import { RichTableType } from 'sanity-plugin-rich-table'
import { PortableText } from 'next-sanity'

interface RichTableProps {
    tableData: RichTableType
}

export const RichTable: React.FC<RichTableProps> = ({ tableData }) => {
    const { rows, columnHeaders, hasColumnTitles, hasRowTitles } = tableData

    return (
        <table>
            <thead>
                {hasColumnTitles && (
                    <tr>
                        {hasRowTitles && <th></th>}
                        {columnHeaders?.map((header, index) => (
                            <th key={index}>{header.title}</th>
                        ))}
                    </tr>
                )}
            </thead>
            <tbody>
                {rows?.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {hasRowTitles && <th>{row.title}</th>}
                        {row.cells?.map((cell, cellIndex) => (
                            <td key={cellIndex}>
                                <PortableText value={cell.content} />
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}