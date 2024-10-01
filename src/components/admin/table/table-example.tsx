import React from 'react'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'

export default function TableExample(props: any) {
    return (
        <Table>
            <Thead>
                <Tr>
                    <Th>
                        <input
                            className="text-slate-800"
                            value={'Test'}
                            placeholder="testing"
                        />
                    </Th>
                    <Th>Date</Th>
                    <Th>Location</Th>
                </Tr>
            </Thead>
            <Tbody>
                <Tr>
                    <Td>
                        {' '}
                        <input
                            className="text-slate-800"
                            value={'tttt'}
                            placeholder="testing"
                        />
                    </Td>
                    <Td>
                        {' '}
                        <input
                            className="text-slate-800"
                            value={'aaa'}
                            placeholder="testing"
                        />
                    </Td>
                    <Td>East Annex</Td>
                </Tr>
                <Tr>
                    <Td>Capstone Data</Td>
                    <Td>19 May 2019</Td>
                    <Td>205 Gorgas</Td>
                </Tr>
                <Tr>
                    <Td>Tuscaloosa D3</Td>
                    <Td>29 June 2019</Td>
                    <Td>Github</Td>
                </Tr>
            </Tbody>
        </Table>
    )
}
