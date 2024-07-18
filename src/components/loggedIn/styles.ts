import { bgImg } from "../../assets/assets";

export const styles = {
    loginBg: {
        backgroundImage: `url(${bgImg})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
    },
    containerBg: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginPaper: {
        p: 5,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 4,
        width: '60%',
        broderRadius: '30px',
        backgroundColor: '#efe6ff',
    },
    labelTxt: {
        color: '#6851d6',
        fontWeight: 600,
    },
    textField: {
        "& .MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: "1px solid #6851d6",
            "& input": { color: '#6851d6', "&::placeholder": { color: '#6851d6', opacity: 0.5 } },
        },
        "&:hover": {
            "& .MuiOutlinedInput-root fieldset": {
                border: "1px solid #6851d6",
            },
        },
        "& .MuiOutlinedInput-root": {
            borderRadius: '25px',
            border: '1px solid #6851d6',
        },
        "& input": { color: '#6851d6', "&::placeholder": { color: '#6851d6', opacity: 0.5 } },
    },
    errorMsg: {
        color: 'red',
        textAlign: 'center',
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
}