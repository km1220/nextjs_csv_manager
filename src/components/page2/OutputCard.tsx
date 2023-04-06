import React, { ReactNode } from 'react';
import Image from 'next/image'
import { Box, BoxProps, Paper, PaperProps, Typography } from '@mui/material'
import { FlagCircleOutlined } from '@mui/icons-material';
// import { styled, useTheme } from '@mui/material/styles'

import ImgFlagDE from '@/assets/images/flags/de.svg';
import ImgFlagPL from '@/assets/images/flags/pl.svg';


type OutputCardDataType = {
    content: string,
    inputLang: string,
    outputLang: string,
    formallity: string,
}
interface OutputCardProps extends BoxProps {
    IconFlag: ReactNode,
    data: OutputCardDataType
}

const OutputCard = ({ IconFlag, data, ...others }: OutputCardProps) => {
    let FlagComponent = IconFlag;
    if (data.outputLang === "German")
        FlagComponent = <Image src={ImgFlagDE} alt="germany flag" />
    else if (data.outputLang === "Polish")
        FlagComponent = <Image src={ImgFlagPL} alt="polish flag" />

    return (
        <Box className='flex flex-col space-y-2' {...others}>
            <Typography variant='caption'>05.03.23    19:58   -   Adidas Air Force One</Typography>
            <div className='flex items-center space-x-4'>
                {FlagComponent}
                <Typography variant='subtitle1'>{data.outputLang}, {data.formallity}</Typography>
            </div>
            <Typography>
                {data.inputLang}: Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et e
            </Typography>
        </Box>
    )
}
OutputCard.defaultProps = {
    IconFlag: <FlagCircleOutlined />,
    data: {
        content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et e',
        inputLang: 'English',
        outputLang: 'German',
        formallity: 'Professional',
    }
}

export default OutputCard;