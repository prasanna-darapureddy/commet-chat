import { Container, Paper, Typography, Stack, TextField, Button, InputLabel, Box, } from '@mui/material'
import { CometChat } from "@cometchat/chat-sdk-javascript";
import React, { Component } from 'react'
import { styles } from '../loggedIn/styles'
import { Navigation } from '../navigation/NavigationHOC';
import { User } from '../../assets/assets';

interface IState {
    newUser: User;
    warning: string;
}

class RegisterUser extends Component<{}, IState> {
    state = {
        newUser: {
            name: '',
            uid: '',
            avatar: '',
        },
        warning: '',
    };

    createUser = async () => {
        const authKey = "86dbcff39f1322cad195ed41a81cb5ca04d12cef";
        const { newUser } = this.state

        const user = new CometChat.User(newUser.uid);
        user.setName(newUser.name);

        try {
            const newUser = await CometChat.createUser(user, authKey)
            alert(`${newUser.getName()} created successfully`)

        } catch (error) {
            alert('Please try after some time...')
        }
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { newUser } = this.state;
        const { name, value } = event.target
        this.setState({ newUser: { ...newUser, [name]: value } })
    }

    handleSave = () => {
        const { newUser } = this.state
        if (newUser.name !== '' && newUser.uid !== "") {
            this.createUser()
            this.setState({ newUser: { name: '', uid: '', avatar: '' }, warning: '', })
        } else {
            this.setState({ warning: 'Please fill all fields' })
        }
    }

    handleLogin = () => {
        this.setState({ warning: '', newUser: { name: '', uid: '', avatar: '' } })
        Navigation.navigate('/login')
    };


    render() {
        const { newUser, warning } = this.state

        return (
            <Box sx={styles.loginBg}>
                <Container maxWidth={'md'} sx={styles.containerBg}>
                    <Paper sx={styles.loginPaper}>
                        <Stack direction={'column'} gap={3} p={5}>
                            <Typography variant='h2' color={'#000'} mb={4}>Add User</Typography>
                            <Stack>
                                <InputLabel sx={styles.labelTxt}>Name</InputLabel>
                                <TextField name='name' value={newUser.name} placeholder='Enter user name' sx={styles.textField} onChange={this.handleChange} />
                            </Stack>
                            <Stack>
                                <InputLabel sx={styles.labelTxt}>User Id</InputLabel>
                                <TextField name='uid' value={newUser.uid} placeholder='Enter user Id' sx={styles.textField} onChange={this.handleChange} />
                            </Stack>
                            {warning && <Typography variant={'subtitle2'} color={'red'} textAlign={'center'}>{warning}</Typography>}
                            <Stack direction={'row'} gap={3} alignSelf={'flex-end'} mt={3}>
                                <Button variant='outlined' sx={styles.cancelBtn} onClick={this.handleLogin}>Login</Button>
                                <Button variant='contained' sx={styles.saveBtn} onClick={this.handleSave}>Register</Button>
                            </Stack>
                        </Stack>
                    </Paper>
                </Container>
            </Box>
        )
    }
}
export default RegisterUser
