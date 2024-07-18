import React, { Component } from 'react'
import { CometChat } from "@cometchat/chat-sdk-javascript";
import { Box, Button, Container, Paper, Stack, TextField, Typography } from '@mui/material';
import { styles } from './styles';
import { Navigation } from '../navigation/NavigationHOC';


interface IState {
    uid: string,
    warning: string,
}

class LoggedInUser extends Component<{}, IState> {
    state = {
        uid: '', warning: '',
    }

    logInUser = async () => {
        const authKey = "86dbcff39f1322cad195ed41a81cb5ca04d12cef";
        const UID = this.state.uid

        try {
            const user = await CometChat.login(UID, authKey)
            alert(`${user.getName()} Successfully logged in`)
            Navigation.navigate('/chats')
        } catch (error) {
            alert('Login Failed')
        }
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ uid: event.target.value })
    }

    handleRegister = () => {
        this.setState({ uid: '', warning: '' })
        Navigation.navigate('/')
    }

    handleLogin = () => {
        const { uid } = this.state

        if (uid !== '') {
            this.logInUser()
            this.setState({ warning: '', uid: '' })
        } else {
            this.setState({ warning: 'Required', uid: '' })
        }
    }

    render() {
        const { uid, warning } = this.state;

        return (
            <Box sx={styles.loginBg}>
                <Container maxWidth={'md'} sx={styles.containerBg}>
                    <Paper sx={styles.loginPaper}>
                        <Typography variant='h2'>Login</Typography>
                        <Stack>
                            <TextField
                                name='uid'
                                value={uid}
                                placeholder='Enter user Id'
                                sx={styles.textField} onChange={this.handleChange}
                            />
                            {warning && <Typography variant={'subtitle2'} textAlign={'center'} color={'red'}>{warning}</Typography>}
                        </Stack>
                        <Stack direction={'row'} gap={3} mt={3}>
                            <Button variant='outlined' sx={styles.cancelBtn} onClick={this.handleRegister}>Register</Button>
                            <Button variant='contained' sx={styles.saveBtn} onClick={this.handleLogin}>Login</Button>
                        </Stack>
                    </Paper>
                </Container>
            </Box>
        )
    }
}

export default LoggedInUser


