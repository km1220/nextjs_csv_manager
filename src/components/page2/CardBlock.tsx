import React, { useState, MouseEvent } from 'react';
import Image from 'next/image'

import { Box, BoxProps, Collapse, Divider, IconButton, Popover, PopoverProps, Typography } from "@mui/material";
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import { styled, useTheme } from '@mui/material/styles'

import CustomRadio1 from "../CustomRadio1";
import ImgTrippleDot from '@/assets/images/three-dots.svg';


//////////////////////////// CSV CARD Component /////////////////////////////////
interface PreviousCardProps extends BoxProps {
    title: string | undefined,
    expanded: boolean,
    handleEditClick: React.MouseEventHandler | undefined
}
const CardBlockComponent = styled(Box)(({ theme }) => ({
    display: 'flex', flexDirection: 'column',
    background: theme.palette.background.paper,
    padding: '1rem 1.5rem',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '1rem',
    '& > .card-cotainer': {
        display: 'flex',
        alignItems: 'center',
        '& > .card-title': { margin: '0 1.5rem', flexGrow: 1 },
    },
}))

const CardBlock = ({ title, expanded, handleEditClick, children, ...others }: PreviousCardProps) => {
    const [isExpanded, setIsExpanded] = useState(expanded || false);
    const ExpandIcon = isExpanded ? ExpandLess : ExpandMore
    return (
        <CardBlockComponent {...others}>
            <div className='card-cotainer'>
                <ExpandIcon sx={{ fontSize: '2rem' }} onClick={() => setIsExpanded(!isExpanded)} />
                <Typography className='card-title' variant='h6' sx={{ fontWeight: 900 }}>{title}</Typography>
                <IconButton className='card-edit-btn' onClick={handleEditClick}>
                    <Image src={ImgTrippleDot} width={24} height={24} alt='three dots' />
                </IconButton>
            </div>
            <Collapse in={isExpanded}>
                <Divider sx={{margin: '1rem 0'}} />
                {children}
            </Collapse>
        </CardBlockComponent>
    )
};
CardBlock.defaultProps = {
    title: '',
    expanded: false,
    children: '',
    handleEditClick: () => { }
}

export default CardBlock;