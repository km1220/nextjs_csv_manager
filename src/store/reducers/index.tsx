import { combineReducers } from '@reduxjs/toolkit';
import counterReducer from './counter';

import settingReducer from './settings';
import fileInfoReducer from './file_info';


const rootReducer = combineReducers({
    counter: counterReducer,

	settings: settingReducer,
    file: fileInfoReducer,
});

// export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
