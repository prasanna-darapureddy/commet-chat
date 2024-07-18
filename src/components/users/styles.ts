import { SxProps } from "@mui/material";
import { bgImg } from "../../assets/assets";

export const styles = {
    bgContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundImage: `url(${bgImg})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    chatPage: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 3,
        p: 2,
    },
    totalChatPaper: {
        width: '100%',
        display: 'flex',
        height: '620px',
        border: '1px solid #ccc',
    },
    usersListBar: {
        borderRight: '1px solid #ccc',
        width: '30%',
    },
    usersBox: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#efe6ff'
    },
    headerBox: {
        p: 2
    },
    logoutBtn: {
        color: '#fff',
        textTransform: 'capitalize',
        width: '50px',
        height: '30px',
        alignSelf: 'flex-end',
        borderRadius: '10px',
        "&:hover": {
            color: '#fff',
        }
    },
    usersListBox: {
        height: '489px',
        overflow: 'auto',
    },
    noConversations: {
        height: '489px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    eachUserBox: {
        backgroundColor: '#efe6ff',
        display: 'flex',
        justifyContent: 'space-between',
        cursor: 'pointer',
        p: 2
    },
    unreadBadge: {
        backgroundColor: '#6851d6',
        color: '#fff',
        height: '20px',
        width: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '50px',
        alignSelf: 'flex-end'
    },
    iconBtn: {
        alignSelf: 'flex-end'
    },
    addIcon: {
        color: '#5820ac',
        fontSize: '50px',
    },
    labelTxt: {
        color: '#6851d6',
        fontWeight: 600,
    },
    textField: {
        "& .MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: "1px solid #6851d6",
        },
        "&:hover": {
            "& .MuiOutlinedInput-root fieldset": {
                border: "1px solid #6851d6",
            },
        },
        "& .MuiOutlinedInput-root": {
            borderRadius: '25px',
        },
    },
    cancelBtn: {
        color: '#6851d6',
        border: '1px solid #6851d6',
        textTransform: 'capitalize',
        width: '80px',
        alignSelf: 'flex-end',
        borderRadius: '20px',
        "&:hover": {
            color: '#6851d6',
            border: '1px solid #6851d6',
        }
    },
    saveBtn: {
        backgroundColor: '#6851d6',
        textTransform: 'capitalize',
        width: '80px',
        alignSelf: 'flex-end',
        borderRadius: '20px',
        "&:hover": {
            backgroundColor: '#6851d6',
        }
    },
    chatBox: {
        width: '70%',
    }
} satisfies Record<string, SxProps>