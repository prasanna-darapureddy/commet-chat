import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { CometChat } from "@cometchat-pro/chat";

export interface cometChat {
    usersList: {
        uid: string;
        name: string;
        profile: string;
    }[],
}

const initialState: cometChat = {
    usersList: [{
        uid: '',
        name: '',
        profile: '',
    }]
}

export const fetchUsers = createAsyncThunk('fetchUsers', async () => {
    try {
        const usersRequest = new CometChat.UsersRequestBuilder().setLimit(30).build();
        const users = (
            await usersRequest.fetchNext()).map((user: CometChat.User) => ({
                uid: user.getUid(),
                name: user.getName(),
                profile: user.getAvatar(),
            }));
        console.log('Load Users:', users);
        return users
    } catch (error) {
        console.log('Load Users Error:', error);
    }
})


export const CometChatSlice = createSlice({
    name: 'CometChat',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchUsers.pending, (state) => {

            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                //@ts-ignore
                state.usersList = action.payload && action.payload
            })
            .addCase(fetchUsers.rejected, (state, action) => {

            })
    }
})

export const { } = CometChatSlice.actions
export default CometChatSlice.reducer