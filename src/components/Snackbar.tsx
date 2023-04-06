// import React from 'react';
// import { Snackbar, Alert as MuiAlert, } from '@mui/material';

// const Alert = React.forwardRef(function Alert(props, ref) {
// 	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });
// export default function MySnackbar(props) {
// 	const { open, onClose, autoHideDuration = 3000, severity, message, ...others } = props;
// 	return (
// 		<Snackbar open={open} autoHideDuration={autoHideDuration} onClose={onClose}>
// 			<Alert severity={severity}>{message}</Alert>
// 		</Snackbar >
// 	)
// }



import React, { forwardRef, RefObject, SyntheticEvent } from 'react';
import { Snackbar, Alert as MuiAlert, AlertProps, AlertColor, SnackbarCloseReason } from '@mui/material';

interface MySnackbarProps {
	open: boolean;
	onClose: (event?: Event | SyntheticEvent<any, Event>, reason?: SnackbarCloseReason) => void;
	autoHideDuration?: number;
	severity: AlertColor | undefined;
	message: string;
	[key: string]: any;
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function MySnackbar(props: MySnackbarProps) {
	const { open, onClose, autoHideDuration = 3000, severity, message, ...others } = props;
	return (
		<Snackbar open={open} autoHideDuration={autoHideDuration}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			onClose={onClose} {...others}
		>
			<Alert severity={severity}>{message}</Alert>
		</Snackbar>
	)
}