import { Button } from '@mui/material'
import React, { ReactNode } from 'react'

type Props = {
    color: any;
    children: React.ReactNode;
    onClick: () => void;
}

function PrimaryButton(props: Props) {
    const {color, children, onClick} = props;
    return (
        <Button variant="contained" color={color} onClick={onClick}>{children}</Button>
    )
}

export default PrimaryButton