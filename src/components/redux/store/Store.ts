import { configureStore } from '@reduxjs/toolkit'
import CometChatSlice from '../reducers/CometChatSlice'


const store = configureStore({
    reducer: {
        cometChat: CometChatSlice,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store