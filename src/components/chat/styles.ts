import { SxProps } from "@mui/material";
import { chatBgImg } from "../../assets/assets";

export const styles = {
    chatingBox: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
    },
    chatHeaders: {
        backgroundColor: '#efe6ff',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        px: 1.5,
    },
    chatSpace: {
        backgroundImage: `url(${chatBgImg})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundAttachment: 'revert'
    },
    chatBox: {
        backgroundColor: 'rgb(0, 0, 0, 0.4)',
        display: 'flex',
        flexDirection: 'column',
        height: '468px',
        overflow: 'auto',
        p: 1,
    },
    textFieldBg: {
        backgroundColor: '#efe6ff',
        position: 'relative',
    },
    emojiBox: {
        position: 'absolute', bottom: '50px', left: '0px', zIndex: 1
    },
    emptyChatingBg: {
        backgroundColor: '#5820ac',
        color: '#fff',
    },
    fileInput: {
        display: 'none',
    },
    receiverMsg: {
        backgroundColor: '#e3e1f7',
        borderRadius: '15px',
        alignSelf: 'flex-start',
        p: 1,
        pb: 0.5,
        display: 'flex',
        gap: 0.5,
        position: 'relative',
        maxWidth: '50%',
        textWrap: 'wrap'
    },
    senderMsg: {
        backgroundColor: '#5820ac',
        borderRadius: '15px',
        alignSelf: 'flex-end',
        color: '#fff',
        p: 0.8,
        pb: 0.5,
        display: 'flex',
        gap: 0.5,
        position: 'relative',
        maxWidth: '50%',
        textWrap: 'wrap'
    },
    messagePopup: {
        position: 'absolute', bottom: '-28px', right: '0px', zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
    },
    textSentTime: {
        mt: 1,
        fontSize: '8px',
        textAlign: "right",
    },
    deleteItem: {
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        p: 0.8
    },
    imagesBox: {
        display: 'flex',
        gap: 1,
        flexWrap: 'wrap'
    },
    imageMsg: {
        height: '200px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    },
    senderDeletedMsgs: {
        borderRadius: '15px',
        display: 'flex',
        alignItems: 'center',
        gap: 0.3,
        ":disabled": `${true}`,
        cursor: 'not-allowed',
        color: '#888',
        alignSelf: 'flex-end',
        fontStyle: 'italic'
    },
    receiverDeletedMsgs: {
        backgroundColor: '#e0dede',
        borderRadius: '15px',
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        p: 1,
        cursor: 'not-allowed',
        color: '#888',
        alignSelf: 'flex-start',
    },
    noDataBox: {
        backgroundColor: '#efe6ff',
        height: '100%',
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
    sendBtn: {
        width: '10%'
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
} satisfies Record<string, SxProps>