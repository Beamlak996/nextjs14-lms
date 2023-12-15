"use client"

import dynamic from "next/dynamic"
import { useMemo } from "react"
import "react-quill/dist/quill.snow.css"

type EditorProps = {
    onChange: (value: string) => void
    value: string
}

export const Editor = ({onChange, value}: EditorProps) => {
    // Even when using 'use client' it renders in ther server once so we import react-quill like this
    const ReactQuill = useMemo(()=> dynamic(() => import("react-quill"), {ssr: false}), [])

    return (
        <div className="bg-white" >
            <ReactQuill 
              theme="snow"
              value={value}
              onChange={onChange}
            />
        </div>
    )
}