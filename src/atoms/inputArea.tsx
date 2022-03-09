import { TextField } from '@mui/material'
import React from 'react'

type Props = {
    label: string;
    name: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function InputArea(props: Props) {
    const {label, name, onChange} = props;
    return (
        <TextField  fullWidth id="outlined-basic" label={label} name={name} onChange={onChange}/>
    )
}

export default InputArea
