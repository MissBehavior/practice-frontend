import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import { Button } from './ui/button'

function MyEditor() {
    const [valueLT, setValueLT] = useState('')
    const [valueEN, setValueEN] = useState('')

    function handleChangeLT(valueLT: string) {
        console.log(valueLT)
        setValueLT(valueLT)
    }
    function handleChangeEN(valueEN: string) {
        console.log(valueEN)
        setValueEN(valueEN)
    }
    function handleSubmit() {
        console.log('clicggked')
    }

    return (
        <>
            LITHUANIAN chirp
            <ReactQuill
                theme="snow"
                value={valueLT}
                onChange={handleChangeLT}
            />
            ENGLISH pusik
            <ReactQuill
                theme="snow"
                value={valueEN}
                onChange={handleChangeEN}
            />
            ;<Button onClick={handleSubmit}>Submit</Button>
        </>
    )
}

export default MyEditor
