import { Button } from 'antd'
import React from 'react'

const CButton = (props) => {
    let { styles, extra, callBackFunction, text, type, variant } = props

    if (type) {
        return (
            <Button type={type} variant={variant} style={styles} className={extra} onClick={() => { callBackFunction() }}> {text}</Button>
        )
    } else {
        return (
            <Button style={styles} className={extra} onClick={() => { callBackFunction() }}> {text}</Button>
        )
    }
}

export default CButton
