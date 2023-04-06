import { useEffect } from 'react';
import PropTypes from 'prop-types';
import type { AppProps } from 'next/app';
import ReduxWrapper from '../store';

import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider, CssBaseline } from '@mui/material';

import createEmotionCache from '@/utility/createEmotionCache';
import { theme } from '@/theme/theme'
import '@/styles/globals.css'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



interface CustomAppProps extends AppProps {
	emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();

const CustomApp = ({ Component, emotionCache = clientSideEmotionCache, pageProps }: CustomAppProps) => {
	useEffect(() => {
		// Remove the server-side injected CSS.
		const jssStyles = document.querySelector('#jss-server-side')
		if (jssStyles) {
			jssStyles.parentElement?.removeChild(jssStyles)
		}
	}, [])
	return (
		<CacheProvider value={emotionCache}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Component {...pageProps} />
				<ToastContainer
					position="top-right"
					autoClose={2000} hideProgressBar={false} newestOnTop={true} rtl={false}
					closeOnClick pauseOnFocusLoss draggable pauseOnHover theme="light"
				/>
			</ThemeProvider>
		</CacheProvider>
	)
}

CustomApp.propTypes = {
	Component: PropTypes.elementType.isRequired,
	emotionCache: PropTypes.object,
	pageProps: PropTypes.object.isRequired,
};


export default ReduxWrapper.withRedux(CustomApp);