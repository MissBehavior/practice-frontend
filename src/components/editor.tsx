import React, { useState } from 'react'
import ReactQuill from 'react-quill'

interface EditorProps {
    valueEn?: string
    setValueEn: React.Dispatch<React.SetStateAction<string>>
}

function MyEditor({ valueEn, setValueEn }: EditorProps) {
    const [valueLT, setValueLT] = useState('')
    const CustomUndo = () => (
        <svg viewBox="0 0 18 18">
            <polygon
                className="ql-fill ql-stroke"
                points="6 10 4 12 2 10 6 10"
            />
            <path
                className="ql-stroke"
                d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9"
            />
        </svg>
    )
    const CustomRedo = () => (
        <svg viewBox="0 0 18 18">
            <polygon
                className="ql-fill ql-stroke"
                points="12 10 14 12 16 10 12 10"
            />
            <path
                className="ql-stroke"
                d="M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5"
            />
        </svg>
    )
    const myColors = [
        'purple',
        '#785412',
        '#452632',
        '#856325',
        '#963254',
        '#254563',
        'white',
    ]
    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ align: ['right', 'center', 'justify'] }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image'],
            [{ color: myColors }],
            [{ background: myColors }],
        ],
    }
    const formats = [
        'header',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'link',
        'color',
        'image',
        'background',
        'align',
    ]
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
                modules={modules}
                formats={formats}
                theme="snow"
                value={valueEn ? valueEn : ''}
                onChange={handleChangeEN}
                className="w-full"
            />
        </>
    )
}

export default MyEditor
