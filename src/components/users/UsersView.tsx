import React, { Component } from 'react'
import { CometChat } from "@cometchat/chat-sdk-javascript";
import { Avatar, Badge, Box, Container, IconButton, Paper, Stack, Typography } from '@mui/material';
import { AddCircle, ArrowCircleLeft, Headphones, Image, Logout, Videocam } from '@mui/icons-material';
import { Navigation } from '../navigation/NavigationHOC';
import Chat from '../chat/Chat';
import { styles } from './styles';

import { Conversation, Messages, ParticularUser, User, UsersList } from '../../assets/assets';

interface IState {
    usersList: User[]
    areAllUsers: boolean;
    selectedUser: {
        uid: string;
        name: string;
        avatar: string;
        status: string;
    };
    conversationsList: [] | Conversation[],
    loggedInUser: {
        uid: string | undefined;
        name: string | undefined;
        avatar: string | undefined;
    },
    messagesList: Messages[]
    isTyping: boolean
}

class UsersView extends Component<{}, IState> {
    state = {
        usersList: [],
        areAllUsers: false,
        selectedUser: { uid: '', name: '', avatar: '', status: '' },
        conversationsList: [],
        loggedInUser: { uid: '', name: '', avatar: '' },
        messagesList: [],
        isTyping: false
    };
    messagesEndRef = React.createRef<null | HTMLElement>();
    scrollToBottom = () => {
        if (this.messagesEndRef.current && this.state.messagesList) {
            this.messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    };

    getLoggedInUser = async () => {
        const { loggedInUser } = this.state

        try {
            const user = await CometChat.getLoggedinUser() as ParticularUser | null
            this.setState({
                loggedInUser: {
                    ...loggedInUser,
                    uid: user?.uid,
                    name: user?.name,
                    avatar: user?.avatar
                }
            })
        } catch (error) {
            alert("Something went wrong")
        }
    }

    getUsersList = async () => {
        try {
            const usersRequest = new CometChat.UsersRequestBuilder().setLimit(20).build();
            const users = await usersRequest.fetchNext() as UsersList
            this.setState({ usersList: users });
        } catch (error) {
            alert("Something went wrong")
        }
    }

    getConversations = async () => {
        try {
            let conversationsRequest = new CometChat.ConversationsRequestBuilder()
                .setLimit(30)
                .setConversationType(CometChat.RECEIVER_TYPE.USER)
                .build();
            let conversationList = await conversationsRequest.fetchNext() as Conversation[]
            this.setState({ conversationsList: conversationList })
        } catch (error) {
            alert('Conversations list fetching failed')
        }
    }

    getSelectedUser = (UID: string) => {
        const { selectedUser, conversationsList } = this.state
        const convrSelectedUser = conversationsList.filter((conversation: Conversation) =>
            conversation.conversationWith.uid === UID)[0] as Conversation
        const { name, uid, avatar, status } = convrSelectedUser.conversationWith

        this.setState({
            selectedUser: {
                ...selectedUser, name, uid, avatar, status
            }
        });
        this.getMessagesList(uid)
        this.getTypingIndicator()
        this.scrollToBottom()
    }

    getMessagesList = async (uid: string) => {
        try {
            let UID: string = uid,
                limit: number = 30,
                messagesRequest: CometChat.MessagesRequest = new CometChat.MessagesRequestBuilder()
                    .setUID(UID)
                    .setLimit(limit)
                    .build();
            const messages = await messagesRequest.fetchPrevious() as Messages[]
            this.setState({ messagesList: messages })
        } catch (error) {
            alert('Messages fetching failed')
        }
    };

    startTyping = () => {
        const { selectedUser } = this.state
        let receiverId: string = selectedUser.uid;
        let receiverType: string = CometChat.RECEIVER_TYPE.USER;

        let typingNotification: CometChat.TypingIndicator = new CometChat.TypingIndicator(receiverId, receiverType);
        CometChat.startTyping(typingNotification);
    };

    endTyping = () => {
        const { selectedUser } = this.state
        let receiverId: string = selectedUser.uid;
        let receiverType: string = CometChat.RECEIVER_TYPE.USER;

        let typingNotification: CometChat.TypingIndicator = new CometChat.TypingIndicator(receiverId, receiverType);
        CometChat.endTyping(typingNotification);
    }

    getTypingIndicator = () => {
        const { selectedUser } = this.state
        let listenerId: string = selectedUser.uid;

        CometChat.addMessageListener(
            listenerId,
            new CometChat.MessageListener({
                onTypingStarted: (typingIndicator: CometChat.TypingIndicator) => {
                    console.log('typing strted', typingIndicator)
                    this.setState({ isTyping: true })
                },
                onTypingEnded: (typingIndicator: CometChat.TypingIndicator) => {
                    console.log('typing ended', typingIndicator)
                    this.setState({ isTyping: false })
                }
            })
        );
    };

    componentDidMount(): void {
        this.getLoggedInUser()
        this.getUsersList()
        this.getConversations()
        this.getTypingIndicator()
    }

    selectedUserEmpty = () => {
        this.setState({ selectedUser: { name: '', uid: '', avatar: '', status: '' } })
    };

    handleSwitchUsersList = () => {
        const { areAllUsers } = this.state;
        this.setState({ areAllUsers: !areAllUsers })
    }

    handleLogout = () => {
        CometChat.logout()
        Navigation.navigate('/login')
    }

    handleSelectUser = (uid: string) => {
        this.getSelectedUser(uid)
        this.getTypingIndicator()
    }

    generateUUID = () => {
        let d = new Date().getTime();
        let d2 =
            (performance !== undefined &&
                performance.now &&
                performance.now() * 1000) ||
            0;
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
            /[xy]/g,
            function (c) {
                let r = Math.random() * 16;
                if (d > 0) {
                    r = (d + r) % 16 | 0;
                    d = Math.floor(d / 16);
                } else {
                    r = (d2 + r) % 16 | 0;
                    d2 = Math.floor(d2 / 16);
                }
                return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
            }
        );
    };

    chatUsersListView = () => {
        const { loggedInUser, conversationsList, selectedUser, isTyping } = this.state
        const chatUsers = conversationsList.filter((conversation: Conversation) =>
            conversation.conversationWith.name !== loggedInUser.name)
        const chatUsersOnly = chatUsers.filter(((conversation: Conversation) => conversation.conversationId))

        return (
            <>
                < Box sx={styles.usersBox}>
                    <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} p={2} color={'#fff'} bgcolor={'#5820ac'}>
                        <Stack direction={'row'} gap={1}>
                            <Typography variant='h6'>{loggedInUser.name}</Typography>
                            <Typography variant='h6'>Chats</Typography>
                        </Stack>
                        <IconButton sx={styles.logoutBtn} onClick={this.handleLogout}><Logout /></IconButton>
                    </Stack>
                    {chatUsersOnly.length > 0 ?
                        <Stack sx={styles.usersListBox} gap={0.8}>
                            {chatUsersOnly && chatUsersOnly.map((eachUser: Conversation) => (
                                <Paper key={this.generateUUID()}
                                    sx={{ ...styles.eachUserBox, borderRight: selectedUser.uid === eachUser.conversationWith.uid ? '6px solid #5820ac' : 'none' }}
                                    onClick={() => this.handleSelectUser(eachUser.conversationWith.uid)}
                                >
                                    <Stack direction={'row'} gap={1} alignItems={'center'}>
                                        {eachUser.conversationWith.status === 'online' ?
                                            <Badge
                                                anchorOrigin={{
                                                    vertical: 'bottom',
                                                    horizontal: 'right',
                                                }}
                                                color='success'
                                                overlap="circular"
                                                badgeContent="  "
                                                variant="dot"
                                            >
                                                <Avatar src={eachUser.conversationWith.avatar} />
                                            </Badge>
                                            :
                                            <Avatar src={eachUser.conversationWith.avatar} />
                                        }
                                        <Stack direction={'column'}>
                                            <Typography color={'#5820ac'} fontWeight={600}>{eachUser.conversationWith.name}</Typography>
                                            {eachUser.conversationWith.status === 'offline' ?
                                                <>
                                                    {
                                                        eachUser.lastMessage?.type === 'text' &&
                                                        <Typography variant='subtitle2' color='#9a6efa'>
                                                            {eachUser.lastMessage.text && eachUser.lastMessage.text.length < 20 ?
                                                                eachUser.lastMessage.text : `${eachUser.lastMessage.text.slice(0, 10)}...`}
                                                        </Typography>
                                                    }
                                                    {eachUser.lastMessage?.type === 'image' && eachUser.lastMessage.data.url &&
                                                        <Typography variant='subtitle2' color='#9a6efa' display={'flex'} alignItems={'center'} fontSize={13} gap={0.5}><Image sx={{ fontSize: 15 }} /> Photo</Typography>
                                                    }

                                                    {eachUser.lastMessage?.type === 'video' && eachUser.lastMessage.data.url &&
                                                        <Typography variant='subtitle2' color='#9a6efa' display={'flex'} alignItems={'center'} fontSize={13} gap={0.5}><Videocam sx={{ fontSize: 15 }} /> Video</Typography>
                                                    }

                                                    {eachUser.lastMessage?.type === 'audio' && eachUser.lastMessage.data.url &&
                                                        <Typography variant='subtitle2' color='#9a6efa' display={'flex'} alignItems={'center'} fontSize={13} gap={0.5}><Headphones sx={{ fontSize: 15 }} /> Audio</Typography>
                                                    }
                                                </>
                                                :
                                                <>
                                                    {isTyping &&
                                                        <Typography variant='subtitle2' color='#9a6efa' display={'flex'} alignItems={'center'} fontSize={13} gap={0.5}>typing...</Typography>
                                                    }
                                                </>
                                            }
                                        </Stack>

                                    </Stack>
                                    <Box>
                                        <Typography variant='subtitle2' mt={1} fontSize={10} textAlign={'right'} color='#888'>
                                            {new Date(eachUser.lastMessage?.sentAt * 1000).toLocaleString('en-US',
                                                { hour: 'numeric', minute: 'numeric', hour12: true })}
                                        </Typography>
                                    </Box>
                                </Paper>
                            ))}
                        </Stack>
                        :
                        <Box sx={styles.noConversations}>
                            <Typography variant='h6' textAlign={'center'}>No conversations yet</Typography>
                        </Box>}
                    <IconButton onClick={this.handleSwitchUsersList} sx={styles.iconBtn}>
                        <AddCircle sx={styles.addIcon} />
                    </IconButton>
                </Box >
            </>
        )
    }

    allUsersListView = () => {
        const { loggedInUser, usersList, areAllUsers, selectedUser } = this.state
        return (
            <>
                <Box sx={styles.usersBox}>
                    <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} p={2} color={'#fff'} bgcolor={'#5820ac'}>
                        <Stack direction={'row'} gap={1}>
                            <Typography variant='h6'>{loggedInUser.name}</Typography>
                            <Typography variant='h6'>Contacts</Typography>
                        </Stack>
                        <IconButton sx={styles.logoutBtn} onClick={this.handleLogout}><Logout /></IconButton>
                    </Stack>
                    {usersList.length > 0 ?
                        <Stack sx={styles.usersListBox} gap={0.8}>
                            {usersList && usersList.map((eachUser: User) => (
                                <Paper key={this.generateUUID()}
                                    onClick={() => this.handleSelectUser(eachUser.uid)}
                                    sx={{ ...styles.eachUserBox, borderRight: selectedUser.uid === eachUser.uid ? '6px solid #5820ac' : 'none' }}
                                >
                                    <Stack direction={'row'} alignItems={'center'} gap={1}>
                                        <Avatar src={eachUser.avatar} alt={eachUser.name} />
                                        <Typography color={'#5820ac'} fontWeight={600}>{eachUser.name}</Typography>
                                    </Stack>
                                </Paper>
                            ))}
                        </Stack>
                        :
                        <Box sx={styles.noConversations}>
                            <Typography variant='h6' textAlign={'center'}>No Contacts</Typography>
                        </Box>}
                    <IconButton onClick={this.handleSwitchUsersList} sx={styles.iconBtn}>
                        {areAllUsers ? <ArrowCircleLeft sx={styles.addIcon} /> : <AddCircle sx={styles.addIcon} />}
                    </IconButton>
                </Box>
            </>
        )
    }

    render() {
        const { areAllUsers, selectedUser, messagesList, loggedInUser, isTyping, conversationsList } = this.state
        return (
            <>
                <Box sx={styles.bgContainer}>
                    <Typography variant='h2' color={'#fff'}>Live chat</Typography>
                    <Container maxWidth={'lg'} sx={styles.chatPage}>
                        <Paper sx={styles.totalChatPaper}>
                            <Box sx={styles.usersListBar}>
                                {areAllUsers ? this.allUsersListView() : this.chatUsersListView()}
                            </Box>

                            <Box sx={styles.chatBox}>
                                <Chat
                                    selectedUser={selectedUser}
                                    loggedInUser={loggedInUser}
                                    messagesList={messagesList}
                                    getMessagesList={this.getMessagesList}
                                    getConversations={this.getConversations}
                                    getTypingIndicator={this.getTypingIndicator}
                                    generateUUID={this.generateUUID}
                                    messagesEndRef={this.messagesEndRef}
                                    scrollToBottom={this.scrollToBottom}
                                    selectedUserEmpty={this.selectedUserEmpty}
                                    isTyping={isTyping}
                                    conversationsList={conversationsList}
                                    startTyping={this.startTyping}
                                    endTyping={this.endTyping}
                                />
                            </Box>
                        </Paper>
                    </Container>
                </Box>
            </>
        )
    }
}
export default UsersView
