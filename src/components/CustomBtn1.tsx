// import { ReactNode } from "react";
// import type { NextComponentType } from 'next'
import { Button, ButtonProps } from '@mui/material'
import { styled } from '@mui/material/styles'

const CustomButton = styled(Button)(({ theme, variant }) => ({
    display: 'flex',
    height: 'fit-content',
    padding: '1rem 1.5rem',
    boxShadow: theme.shadows[3],

    background: variant === 'contained' ?
        `linear-gradient(296.13deg, ${theme.palette.primary.dark} 21.5%, ${theme.palette.primary.light} 76.69%);`
        :
        ''
    ,
    '&:disabled': {
        background: theme.palette.action.disabledBackground,
        color: theme.palette.action.disabled,
    },
}))

const CustomBtn1 = ({ children, variant = "contained", ...others }: ButtonProps) => {
    return <CustomButton variant={variant} {...others}>
        {children}
    </CustomButton>
}

export default CustomBtn1;