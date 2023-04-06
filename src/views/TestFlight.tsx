import _ from 'lodash';
import React, { useState, MouseEvent } from 'react';
import PropTypes from 'prop-types';
import type { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import Head from 'next/head'
import Image from 'next/image'

import {
  Grid, Box, BoxProps, Popover, PopoverProps,
  Button, IconButton, Typography, Divider, OutlinedInput, Select, SelectChangeEvent, MenuItem, TextField, Chip,
  Tabs, Tab
} from '@mui/material'
import { styled, useTheme, alpha } from '@mui/material/styles'
import { ArrowForward, ArrowRightAlt, DeleteForeverOutlined, Add, ArrowBack } from '@mui/icons-material'

import MainLayout from '@/layouts/MainLayout'
import CustomPopover, { PopoverItem } from '@/components/CustomPopover'
import CustomBtn1 from '@/components/CustomBtn1'
import CardBlock from '@/components/page2/CardBlock';
import AddBtn from '@/components/page2/AddBtn';
import OutputCard from '@/components/page2/OutputCard';

import ImgInfo from '@/assets/images/info.svg';
import ImgCopy from '@/assets/images/copy.svg';
import ImgSave from '@/assets/images/tagcross.svg';
import ImgClear from '@/assets/images/archiveadd.svg';
import ImgTrash from '@/assets/images/trash.svg';
import ImgTranslate from '@/assets/images/translate.svg';
import ImgPlay from '@/assets/images/play.svg';
import ImgClock from '@/assets/images/clock.svg';
import ImgLightning from '@/assets/images/lightning.svg';


const PageBody = styled(Box)(({ theme }) => ({
	width: '100%',
	display: 'flex', flexDirection: 'column', flexGrow: 1,

  '& > .header': {
    display: 'flex',
    borderBottom: `1px solid ${theme.palette.divider}`,
    background: theme.palette.background.paper,
    padding: "1rem 3.5rem",
    '& > .header-content': {
    },
    '& > .btn-group': {
      display: 'flex',
      alignItems: 'center',
      gap: 20,
    }
  },
  '& > .content': {
    [theme.breakpoints.down('md')]: {
      gap: 4,
    },
    '& > .main-panel': {
      borderRight: `2px solid ${theme.palette.divider}`,
      '& > .main-panel-body': {
        padding: '2.5rem 1.5rem',
        gap: 20,
        '& .form-control-title': {},
        '& .form-control-input': {
          '& > *': { width: '100%' }
        },
      },
      '& > .main-panel-footer': {
        padding: '1rem 1.5rem',
        background: theme.palette.background.paper,

      }
    },
    '& > .right-panel': {
      '& img': { width: '1rem', height: '1rem' },
      '& > .right-panel-header': {
        background: theme.palette.background.paper,
        '& .Mui-selected': {
          background: alpha(theme.palette.background.default, 0.6),
        },
      },
      '& > .right-panel-body': {
        padding: '2rem 1rem',
      },
    },
  }
}))

const LanguageBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: '1rem',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: '0.25rem',
}))


const EditPopover = (props: PopoverProps) => {
  return (
    <CustomPopover {...props}>
      <PopoverItem Icon={<Image className='mr-2' src={ImgCopy} alt="copy icon" />} label="duplicate" onClick={() => console.log("Duplicate clicked")} />
      <PopoverItem Icon={<Image className='mr-2' src={ImgSave} alt="save icon" />} label="save" onClick={() => console.log("Save clicked")} />
      <PopoverItem Icon={<Image className='mr-2' src={ImgClear} alt="clear icon" />} label="clear" onClick={() => console.log("Clear clicked")} />
      <Divider className='border-b-1' />
      <PopoverItem Icon={<Image className='mr-2' src={ImgTrash} alt="trash icon" />} label="Delete" onClick={() => console.log("Delete clicked")} />
    </CustomPopover>
  )
}

type DataType = {
  what2gen: string;
  attrList: string[];
  mention: string;
  conceal: string;
  maxToken: number;
  toneOfVoice: string;
  lang: {
    input: string;
    output: string;
    formality: string;
  }[];
}
type OutputCardDataType = {
  content: string,
  inputLang: string,
  outputLang: string,
  formallity: string,
}

const initialDataItem: DataType = {
  what2gen: 'Description-Text',
  attrList: [],
  mention: '',
  conceal: '',
  maxToken: 500,
  toneOfVoice: 'friendly',
  lang: [
    { input: 'en', output: 'de', formality: 'default' },
  ]
};
const TestFlight: NextPage = () => {
  const router = useRouter();
  const theme = useTheme();
  const [editPopoverElem, setEditPopoverElem] = useState<HTMLButtonElement>();
  const [rightPanelTab, setRightPanelTab] = useState('new_outputs')
  const [outputDataList, setOutputDataList] = useState<OutputCardDataType[]>([
    {
      content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et e',
      inputLang: 'English',
      outputLang: 'German',
      formallity: 'Professional',
    },
    {
      content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et e',
      inputLang: 'English',
      outputLang: 'Polish',
      formallity: 'Default',
    }
  ])

  const [cardData, setCardData] = useState<DataType[]>([
    {
      what2gen: 'Description-Text',
      attrList: ['Product-Title', 'Lieferumfang enthält'],
      mention: 'Long Durability',
      conceal: 'Synthetic Materials',
      maxToken: 500,
      toneOfVoice: 'friendly',
      lang: [
        { input: 'en', output: 'de', formality: 'pro' },
        { input: 'en', output: 'pl', formality: 'default' },
      ]
    },
    {
      what2gen: 'Description-Text',
      attrList: ['Lieferumfang enthält'],
      mention: 'Long Durability',
      conceal: 'Synthetic Materials',
      maxToken: 200,
      toneOfVoice: 'friendly',
      lang: [
        { input: 'de', output: 'en', formality: 'default' },
        { input: 'de', output: 'pl', formality: 'pro' },
      ]
    },
  ]);
  const _updateDataItem = (parentData: DataType, newVal: object) => {
    const newData = cardData.map(each =>
      _.isEqual(each, parentData) ? { ...parentData, ...newVal } as DataType : each
    );
    setCardData(newData);
  }
  const _updateDataLangItem = (parentData: DataType, parentLang: object, newLangVal: object) => {
    const newData = cardData.map(each => {
      if (_.isEqual(each, parentData)) {
        const newLangList = parentData.lang.map(each_lang =>
          _.isEqual(each_lang, parentLang) ? { ...parentLang, ...newLangVal } : each_lang
        );
        return { ...parentData, lang: newLangList } as DataType
      }
      return each;
    });
    setCardData(newData);
  }
  const _addNewDataItem = () => setCardData([...cardData, initialDataItem]);


  const onPreviousCardEditClick = (e: MouseEvent) => {
    const targetBtn = e.target as HTMLButtonElement;
    setEditPopoverElem(targetBtn);
  }
  const onPreviousCardEditCancel = () => {
    setEditPopoverElem(undefined);
  }


  const mock_attributes = [
    'Product-Title', 'Car-Name', 'Lieferumfang enthält'
  ];
  const handleAttributeItemsChange = (parentData: DataType) => (event: SelectChangeEvent<string[]>) => {
    const newAttrValue = event.target.value;
    const newAttrList = typeof newAttrValue === 'string' ? newAttrValue.split(',') : newAttrValue;
    _updateDataItem(parentData, { attrList: newAttrList });
  };
  const getAttrItemsStyles = (name: string, selectedAttrItems: readonly string[]) => ({
    fontWeight:
      selectedAttrItems.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  });

  return (
    <>
      <Head>
        <title>CSV-Upload</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainLayout>
        <PageBody>
          <div className='header'>
            <Box className='flex flex-col mr-auto header-content'>
              <Typography variant='h4'>2. Test Flight</Typography>
              <Typography variant='body1'>Adjust the parameters for text-generation and priiew the Result for a Single Product</Typography>
            </Box>
            <Box className='btn-group'>
              <CustomBtn1 variant='contained' onClick={() => router.push('/page1_3')} disabled>
                <ArrowBack className='mr-2' />
                <span>Select Columns</span>
              </CustomBtn1>
              <CustomBtn1 variant='contained' onClick={() => router.push('/page3_1')}>
                <span>Launch Control</span>
                <ArrowForward className='ml-2' />
              </CustomBtn1>
            </Box>
          </div>

          <Grid container className='content grow'>
            <Grid item className='flex flex-col main-panel grow' sm={12} md={6} sx={{ background: "background.default" }}>
              <div className='flex flex-col main-panel-body grow'>
                {cardData.map((each_data, iData) =>
                  <CardBlock key={iData} title={`${each_data.what2gen} / ${each_data.maxToken} Token`} handleEditClick={onPreviousCardEditClick}>
                    <div className='flex flex-col space-y-6'>
                      <div className='flex flex-col'>
                        <div className='flex items-center gap-2 form-control-title'>
                          <Typography variant='subtitle1'>What to generate?</Typography>
                          <Typography variant='overline'>*</Typography>
                          <Image src={ImgInfo} alt="info icon" />
                          <div className='grow' />
                          <Typography variant='overline' sx={{ flexShrink: 0 }}>20 / 40</Typography>
                        </div>
                        <div className='flex form-control-input'>
                          <Select value={each_data.what2gen} onChange={e => _updateDataItem(each_data, { what2gen: e.target.value })}>
                            <MenuItem value='Description-Text'>Description-Text</MenuItem>
                            <MenuItem value='2'>Second</MenuItem>
                            <MenuItem value='3'>Third</MenuItem>
                          </Select>
                          {/* <TextField select label="Label"></TextField> */}
                        </div>
                      </div>
                      <div className='flex flex-col'>
                        <div className='flex items-center gap-2 form-control-title'>
                          <Typography variant='subtitle1'>What Attributes from your CSV should we Use for the Generation?</Typography>
                          <Typography variant='overline'>*</Typography>
                          <Image src={ImgInfo} alt="info icon" />
                          <div className='grow' />
                          <Typography variant='overline' sx={{ flexShrink: 0 }}>80 / 240</Typography>
                        </div>
                        <div className='flex form-control-input'>
                          <Select
                            multiple
                            value={each_data.attrList} onChange={handleAttributeItemsChange(each_data)}
                            input={<OutlinedInput className="select-multiple-attribute" />}
                            renderValue={(selected) => (
                              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                  <Chip key={value} label={value} onMouseDown={(event) => { event.stopPropagation(); }}
                                    onDelete={() => {
                                      const remainAttr = selected.filter(each => each !== value);
                                      _updateDataItem(each_data, { attrList: remainAttr });
                                    }} />
                                ))}
                              </Box>
                            )}
                          >
                            {mock_attributes.map(each => (
                              <MenuItem key={each} value={each} style={getAttrItemsStyles(each, each_data.attrList)}>
                                {each}
                              </MenuItem>
                            ))}
                          </Select>
                        </div>
                      </div>
                      <div className='flex flex-col'>
                        <div className='flex items-center gap-2 form-control-title'>
                          <Typography variant='subtitle1'>Is there anything else you would like to mention?</Typography>
                          <Typography variant='overline'>*</Typography>
                          <Image src={ImgInfo} alt="info icon" />
                          <div className='grow' />
                          <Typography variant='overline' sx={{ flexShrink: 0 }}>20 / 40</Typography>
                        </div>
                        <div className='flex form-control-input'>
                          <OutlinedInput value={each_data.mention} onChange={e => _updateDataItem(each_data, { mention: e.target.value })} />
                        </div>
                      </div>
                      <div className='flex flex-col'>
                        <div className='flex items-center gap-2 form-control-title'>
                          <Typography variant='subtitle1'>And anything you would like to conceal?</Typography>
                          <Typography variant='overline'>*</Typography>
                          <Image src={ImgInfo} alt="info icon" />
                          <div className='grow' />
                          <Typography variant='overline' sx={{ flexShrink: 0 }}>20 / 40</Typography>
                        </div>
                        <div className='flex form-control-input'>
                          <OutlinedInput value={each_data.conceal} onChange={e => _updateDataItem(each_data, { conceal: e.target.value })} />
                        </div>
                      </div>
                      <div className='flex flex-col'>
                        <div className='flex items-center gap-2 form-control-title'>
                          <Typography variant='subtitle1'>max. Token</Typography>
                          <Typography variant='overline'>*</Typography>
                          <Image src={ImgInfo} alt="info icon" />
                          <div className='grow' />
                        </div>
                        <div className='flex form-control-input'>
                          <OutlinedInput type='number' value={each_data.maxToken} onChange={e => _updateDataItem(each_data, { maxToken: e.target.value })} />
                        </div>
                      </div>
                      <div className='flex flex-col'>
                        <div className='flex items-center gap-2 form-control-title'>
                          <Typography variant='subtitle1'>Tone of Voice?</Typography>
                          <Typography variant='overline'>*</Typography>
                          <Image src={ImgInfo} alt="info icon" />
                          <div className='grow' />
                          <Typography variant='overline' sx={{ flexShrink: 0 }}>20 / 40</Typography>
                        </div>
                        <div className='flex form-control-input'>
                          <Select value={each_data.toneOfVoice} onChange={e => _updateDataItem(each_data, { toneOfVoice: e.target.value })}>
                            <MenuItem value='friendly'>Friendly</MenuItem>
                            <MenuItem value='man'>Man</MenuItem>
                            <MenuItem value='woman'>Woman</MenuItem>
                          </Select>
                        </div>
                      </div>
                      <LanguageBox className="space-y-2">
                        <div className='flex items-center gap-2'>
                          <Typography variant='subtitle1'>Language</Typography>
                          <Image src={ImgInfo} alt="info icon" />
                          <div className='grow' />
                        </div>
                        <div className='flex space-x-2 space-y-2 header'>
                          <div className='flex items-center gap-2' style={{ width: '30%' }}>
                            <Typography variant='subtitle2'>Input Language</Typography>
                            <Image src={ImgInfo} alt="info icon" />
                          </div>
                          <div className='grow' />
                          <div className='flex items-center gap-2' style={{ width: '30%' }}>
                            <Typography variant='subtitle2'>Output Language</Typography>
                            <Image src={ImgInfo} alt="info icon" />
                          </div>
                          <div className='flex items-center gap-2' style={{ width: '30%' }}>
                            <Typography variant='subtitle2'>Formality</Typography>
                            <Image src={ImgInfo} alt="info icon" />
                          </div>
                        </div>
                        {
                          each_data.lang.map((each_lang, iLang) => (
                            <div key={iLang} className='flex items-center justify-between space-x-2'>
                              <div className='form-control-input' style={{ width: '30%' }} >
                                <Select value={each_lang.input} onChange={e => _updateDataLangItem(each_data, each_lang, { input: e.target.value })}>
                                  <MenuItem value='en'>English</MenuItem>
                                  <MenuItem value='de'>German</MenuItem>
                                  <MenuItem value='pl'>Polish</MenuItem>
                                </Select>
                              </div>
                              <ArrowRightAlt className='grow' />
                              <div className='form-control-input' style={{ width: '30%' }} >
                                <Select value={each_lang.output} onChange={e => _updateDataLangItem(each_data, each_lang, { output: e.target.value })}>
                                  <MenuItem value='en'>English</MenuItem>
                                  <MenuItem value='de'>German</MenuItem>
                                  <MenuItem value='pl'>Polish</MenuItem>
                                </Select>
                              </div>
                              <div className='form-control-input' style={{ width: '30%' }} >
                                <Select value={each_lang.formality} onChange={e => _updateDataLangItem(each_data, each_lang, { formality: e.target.value })}>
                                  <MenuItem value='default'>Default</MenuItem>
                                  <MenuItem value='pro'>Professional</MenuItem>
                                </Select>
                              </div>
                            </div>
                          ))
                        }
                        <div className='flex items-center justify-between space-x-2'>
                          <div className='flex items-center w-auto form-control-input' style={{ width: '30%', padding: '0.875rem' }} >
                            <Image className='mr-4' src={ImgTranslate} alt='translate icon' />
                            <Typography sx={{ fontSize: '1.125rem' }}>Dictionary</Typography>
                          </div>
                          <DeleteForeverOutlined className='grow' />
                          <div className='form-control-input' style={{ width: '30%' }} >
                            <Select value='pl'>
                              <MenuItem value='en'>English</MenuItem>
                              <MenuItem value='de'>German</MenuItem>
                              <MenuItem value='pl'>Polish</MenuItem>
                            </Select>
                          </div>
                          <div className='form-control-input' style={{ width: '30%' }} >
                            <Select value='default' disabled>
                              <MenuItem value='default'>Default</MenuItem>
                              <MenuItem value='pro'>Professional</MenuItem>
                            </Select>
                          </div>
                        </div>
                        <div className='flex items-center justify-between space-x-2'>
                          <div className='form-control-input' style={{ width: '30%' }} >
                          </div>
                          <div className='grow' />
                          <div className='form-control-input' style={{ width: '30%' }} >
                            <Select value='empty' disabled>
                              <MenuItem value='empty'>Language</MenuItem>
                              <MenuItem value='en'>English</MenuItem>
                              <MenuItem value='de'>German</MenuItem>
                              <MenuItem value='pl'>Polish</MenuItem>
                            </Select>
                          </div>
                          <div className='form-control-input' style={{ width: '30%' }} >
                            <Select value='default' disabled>
                              <MenuItem value='default'>Default</MenuItem>
                              <MenuItem value='pro'>Professional</MenuItem>
                            </Select>
                          </div>
                        </div>
                      </LanguageBox>
                    </div>
                  </CardBlock>
                )}
                <EditPopover
                  open={editPopoverElem !== undefined ? true : false}
                  onClose={onPreviousCardEditCancel}
                  anchorEl={editPopoverElem}
                  anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'center',
                  }}
                />

                <AddBtn onClick={() => _addNewDataItem()} />
              </div>
              <div className='flex flex-col space-y-2 main-panel-footer'>
                <div className='flex items-center gap-2'>
                  <Typography variant='subtitle1'>Product for test flight</Typography>
                  <Image src={ImgInfo} alt="info icon" />
                  <div className='grow' />
                </div>
                <div className='flex space-x-4 form-control-input'>
                  <Select className='grow' classes={{ select: 'px-4 py-2' }} value='234' >
                    <MenuItem value='234'>
                      <Typography>234 - Adidas Air Force One 1999</Typography>
                    </MenuItem>
                  </Select>
                  <CustomBtn1 className='px-4 py-2'>
                    <span>Pilot Test</span>
                    <Image className='ml-2' src={ImgPlay} alt='play icon' />
                  </CustomBtn1>
                </div>
              </div>
            </Grid>
            <Grid item className='flex flex-col right-panel grow' sm={12} md={6}>
              <Tabs className='flex right-panel-header' value={rightPanelTab} onChange={(e, newTab) => setRightPanelTab(newTab)} sx={{ minHeight: 'fit-content' }} >
                <Tab 
                className='h-12 min-h-fit '
                  label="New Outputs" value='new_outputs'
                  icon={<Image src={ImgLightning} alt='lightning icon' />} iconPosition="start"
                // sx={{ minHeight: 'fit-content', height: '3rem', padding: '0.5rem' }}
                />
                <Tab className='h-12 min-h-fit '
                  label="History" value='history'
                  icon={<Image src={ImgClock} alt='clock icon' />} iconPosition="start"
                />
              </Tabs>
              <div className='flex flex-col space-y-8 right-panel-body grow'>
                {rightPanelTab === "new_outputs" &&
                  outputDataList.map((each, i) =>
                    <OutputCard key={i} data={each} />
                  )
                }
                {rightPanelTab === "history" &&
                  <div>history tab panel</div>
                }
              </div>
            </Grid>
          </Grid>
        </PageBody>
      </MainLayout>
    </>
  )
}

export default TestFlight;