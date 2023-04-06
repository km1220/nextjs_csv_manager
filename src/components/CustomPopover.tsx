import React, { ReactNode, MouseEventHandler } from 'react';
import Image from 'next/image'

import { Box, BoxProps, Popover, PopoverProps, IconButton, Typography, Divider } from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'
import ImgCopy from '@/assets/images/copy.svg';
import ImgTrash from '@/assets/images/trash.svg';




const EditPopoverComponent = styled(Popover)(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: '0.5rem',
        '& > div': {
            display: 'flex',
            alignItems: 'center',
            padding: '0.5rem 1rem',
        }
    }
}))
const EditPopover = ({ children, ...others }: PopoverProps) => {
    return (
        <EditPopoverComponent {...others}>
            {children}
        </EditPopoverComponent>
    )
}
export default EditPopover;


interface PopoverItemProps extends BoxProps {
    Icon: ReactNode,
    label: string,
    onClick: MouseEventHandler<HTMLDivElement>
};

export const PopoverItem = ({ Icon, label, onClick, style, ...others }: PopoverItemProps) => {
    return (
        <Box onClick={onClick} style={{ ...style, cursor: 'pointer' }}  {...others}>
            {Icon}
            <Typography variant='overline'>{label}</Typography>
        </Box>
    )
};