
import React, { useState, MouseEvent } from 'react';

import { Button as MUIButton, ButtonProps } from "@mui/material";
import { Add } from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles'

const Button = styled(MUIButton)(({ theme }) => ({
    background: alpha(theme.palette.primary.light, 0.2),
    color: theme.palette.primary.dark,
    '&:hover': {
        background: alpha(theme.palette.primary.light, 0.5),
        color: theme.palette.common.white,
    },
}))
const AddButton = (props: ButtonProps) => {
    return (
        <Button variant='contained' {...props}>
            <Add />
        </Button>
    )
}

export default AddButton;