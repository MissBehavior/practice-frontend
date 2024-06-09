import React, { useState } from 'react'
import ReactQuill from 'react-quill'

interface EditorProps {
    valueEn?: string
    setValueEn: React.Dispatch<React.SetStateAction<string>>
}

function MyEditor({ valueEn, setValueEn }: EditorProps) {
    const [valueLT, setValueLT] = useState('')

    function handleChangeLT(valueLT: string) {
        console.log(valueLT)
        setValueLT(valueLT)
    }
    function handleChangeEN(valueEn: string) {
        console.log(valueEn)
        setValueEn(valueEn)
    }

    return (
        <>
            {/* LITHUANIAN chirp
            <ReactQuill
                theme="snow"
                value={valueLT}
                onChange={handleChangeLT}
            /> */}
            <ReactQuill
                theme="snow"
                value={valueEn ? valueEn : ''}
                onChange={handleChangeEN}
                className="w-full"
            />
        </>
    )
}

export default MyEditor
