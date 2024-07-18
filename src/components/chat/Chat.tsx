import {
    Avatar,
    Badge,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    InputAdornment,
    Menu,
    MenuItem,
    Paper,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import React, { Component } from "react";
import { CometChat } from "@cometchat/chat-sdk-javascript";
import { styles } from "./styles";
import {
    AttachFile,
    Delete,
    DoNotDisturbAlt,
    MoreVert,
    Send,
    InsertEmoticon,
    Circle,
} from "@mui/icons-material";
import { Conversation, ImageFiles, Messages, User } from "../../assets/assets";

import EmojiPicker, { EmojiClickData } from "emoji-picker-react";

interface IProps {
    selectedUser: {
        uid: string;
        name: string;
        avatar: string;
        status: string;
    };
    loggedInUser: User;
    messagesList: Messages[];
    getMessagesList: (uid: string) => void;
    getConversations: () => void;
    generateUUID: () => string;
    messagesEndRef: React.RefObject<HTMLElement | null>;
    scrollToBottom: () => void;
    selectedUserEmpty: () => void;
    isTyping: boolean;
    getTypingIndicator: () => void;
    conversationsList: Conversation[];
    startTyping: () => void;
    endTyping: () => void;
}

interface IState {
    messageText: string;
    moreEl: null | HTMLElement;
    messageId: string | undefined;
    attachments: File[]
    isEmojis: boolean;
}

class Chat extends Component<IProps, IState> {
    state = {
        messageText: "",
        moreEl: null,
        messageId: "",
        attachments: [],
        isEmojis: false,
    };

    sendAMessage = async () => {
        const { messageText } = this.state;
        const { getMessagesList, selectedUser, getConversations } = this.props;

        try {
            let receiverID = selectedUser.uid;
            let receiverType = CometChat.RECEIVER_TYPE.USER;
            let textMessage = new CometChat.TextMessage(
                receiverID,
                messageText,
                receiverType
            );
            await CometChat.sendMessage(textMessage);
            getMessagesList(selectedUser.uid);
            getConversations();
            this.props.scrollToBottom();
        } catch (error) {
            alert("Message sent failed");
        }
    };

    receiveMessagaes = () => {
        const { selectedUser } = this.props;

        let listenerID: string = selectedUser.uid;

        CometChat.addMessageListener(
            listenerID,
            new CometChat.MessageListener({
                onTextMessageReceived: (textMessage: CometChat.TextMessage) => {
                    alert("You received a message");
                    this.props.scrollToBottom();
                },
            })
        );
    };

    sendMediaMessage = async (attachment: ImageFiles[]) => {
        const { selectedUser, getConversations, getMessagesList } = this.props;

        let mediaType = "";
        attachment.filter(eachAttachment => {
            switch (eachAttachment.type) {
                case "image/png" || "image/jpg" || "image/jpeg":
                    return mediaType = CometChat.MESSAGE_TYPE.IMAGE;
                case "":
                    return mediaType = CometChat.MESSAGE_TYPE.FILE;
                case "video/webm" || "video/mp4" || "video/ogg":
                    return mediaType = CometChat.MESSAGE_TYPE.VIDEO;
                case "audio/mpeg" || "audio/ogg":
                    return mediaType = CometChat.MESSAGE_TYPE.AUDIO;
                default:
                    return null
            }
        })

        let receiverID: string = selectedUser.uid,
            messageType: string = mediaType,
            receiverType: string = CometChat.RECEIVER_TYPE.USER,
            mediaMessage: CometChat.MediaMessage = new CometChat.MediaMessage(
                receiverID,
                attachment,
                messageType,
                receiverType
            );

        try {
            await CometChat.sendMediaMessage(mediaMessage);
            getMessagesList(selectedUser.uid);
            getConversations();

        } catch (error) {
            alert("Media message sending failed with error");
        }
    };

    deleteConversation = async () => {
        let UID: string = this.props.selectedUser.uid;
        let type: string = "user";
        try {
            const deletedConversation = await CometChat.deleteConversation(UID, type);
            alert(deletedConversation);
            this.props.getConversations();
            this.props.selectedUserEmpty();
        } catch (error) {
            alert(error);
        }
    };

    deleteMessage = async (msgId: string) => {
        let messageId = msgId;

        await CometChat.deleteMessage(messageId);
        try {
            alert("Message deleted successfully");
            this.props.getConversations();
            this.props.getMessagesList(this.props.selectedUser.uid);
        } catch (error) {
            alert("Message delete failed with error");
        }
    };

    componentDidMount(): void {
        this.receiveMessagaes();
        this.props.getTypingIndicator();
    }

    handleMoreIconClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        this.setState({ moreEl: event.currentTarget });
    };
    handleMoreIconClose = () => {
        this.setState({ moreEl: null });
    };

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { startTyping, endTyping } = this.props
        this.setState({ messageText: event.target.value });
        startTyping();
        // endTyping();
    };

    handleSendAMessage = (event: React.SyntheticEvent) => {
        event?.preventDefault();
        this.state.messageText !== "" && this.sendAMessage();
        this.setState({ messageText: "" });
    };

    handleDeleteChart = () => {
        this.deleteConversation();
        this.setState({ moreEl: null });
    };

    handleMessageHover = (messageId: string) => {
        const { messagesList } = this.props;
        const getMessage = messagesList.find((message) => message.id === messageId);
        this.setState({ messageId: getMessage?.id });
    };

    handleMessageOffHover = () => {
        this.setState({ messageId: "" });
    };

    handleDeleteAMessage = (messageId: string) => {
        this.deleteMessage(messageId);
    };

    handleEmoji = () => {
        this.setState({ isEmojis: !this.state.isEmojis });
    };

    onEmojiClick = (emojiData: EmojiClickData, event: MouseEvent) => {
        const { messageText } = this.state;
        this.setState({ messageText: messageText + emojiData.emoji });
    };

    handleDialogClose = () => {
        this.setState({ attachments: [] });
    };

    handleSendAttachment = () => {
        const { attachments } = this.state;
        this.sendMediaMessage(attachments);
        this.setState({ attachments: [] });
    };

    handleImageAttach = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { attachments } = this.state;
        const files = Object.values(event.target.files!);
        files && this.setState({ attachments: [...attachments, ...files] });
    };

    sendMessagesView = (message: Messages) => {
        const { generateUUID } = this.props

        switch (message.type) {
            case 'text':
                return (
                    <>
                        {message.text}
                        <Typography
                            variant="subtitle2"
                            mt={1}
                            fontSize={10}
                            textAlign={"right"}
                        >
                            {new Date(
                                message.updatedAt * 1000
                            ).toLocaleString("en-US", {
                                hour: "numeric",
                                minute: "numeric",
                                hour12: true,
                            })}
                        </Typography>
                    </>
                )
            case 'image':
                return (
                    <Box>
                        {message.data.attachments.map((image) => (
                            <Box sx={styles.imagesBox} key={generateUUID()} >
                                <Box component={'img'} src={image.url} sx={styles.imageMsg} />
                            </Box>
                        ))}
                        <Typography
                            variant="subtitle2"
                            mt={0.3}
                            pb={0}
                            fontSize={10}
                            textAlign={"right"}
                        >
                            {new Date(
                                message.sentAt * 1000
                            ).toLocaleString("en-US", {
                                hour: "numeric",
                                minute: "numeric",
                                hour12: true,
                            })}
                        </Typography>
                    </Box >
                )
            case 'file':
                return (
                    <Box sx={styles.imageMsg}>
                        <>
                            {message.data.attachments.map((file) => (
                                <Box
                                    key={generateUUID()}
                                >
                                    {/* file */}
                                    <Typography
                                        variant="subtitle2"
                                        mt={1}
                                        fontSize={10}
                                        textAlign={"right"}
                                    >
                                        {new Date(
                                            message.sentAt * 1000
                                        ).toLocaleString("en-US", {
                                            hour: "numeric",
                                            minute: "numeric",
                                            hour12: true,
                                        })}
                                    </Typography>
                                </Box>
                            ))}
                        </>
                    </Box>
                )
            case 'video':
                return (
                    <Box sx={styles.imageMsg}>
                        {message.data.attachments.map((video) => (
                            <React.Fragment key={generateUUID()}>
                                <video width="100%" height="90%" controls >
                                    <source src={video.url} type={video.mimeType} />
                                </video>
                                <Typography
                                    variant="subtitle2"
                                    mt={0.3}
                                    pb={0}
                                    fontSize={10}
                                    textAlign={"right"}
                                >
                                    {new Date(
                                        message.sentAt * 1000
                                    ).toLocaleString("en-US", {
                                        hour: "numeric",
                                        minute: "numeric",
                                        hour12: true,
                                    })}
                                </Typography>
                            </React.Fragment>
                        ))}
                    </Box>
                )
            case 'audio':
                return (
                    <>
                        {message.data.attachments.map((audio) => (
                            <Box key={generateUUID()}>
                                <audio controls>
                                    <source src={audio.url} type={audio.mimeType} />
                                </audio>
                                <Typography
                                    variant="subtitle2"
                                    pb={0}
                                    fontSize={10}
                                    textAlign={"right"}
                                >
                                    {new Date(
                                        message.sentAt * 1000
                                    ).toLocaleString("en-US", {
                                        hour: "numeric",
                                        minute: "numeric",
                                        hour12: true,
                                    })}
                                </Typography>
                            </Box>
                        ))}
                    </>
                )
            default:
                break;
        }
    }

    render() {
        const { messageText, moreEl, messageId, isEmojis, attachments } = this.state;
        const { selectedUser, messagesList, loggedInUser, isTyping } = this.props;
        const open = Boolean(moreEl);

        return (
            <Box sx={styles.chatingBox}>
                {selectedUser.uid ? (
                    <>
                        <Paper sx={styles.chatHeaders}>
                            <Stack direction={"row"} alignItems={"center"} gap={1} p={0.7}>
                                <Box>
                                    {selectedUser.status === "online" ? (
                                        <Badge
                                            anchorOrigin={{
                                                vertical: "bottom",
                                                horizontal: "right",
                                            }}
                                            color="success"
                                            overlap="circular"
                                            badgeContent="  "
                                            variant='dot'
                                        >
                                            <Avatar
                                                src={selectedUser.avatar}
                                                alt={selectedUser.name}
                                            />
                                        </Badge>
                                    ) : (
                                        <Avatar
                                            src={selectedUser.avatar}
                                            alt={selectedUser.name}
                                        />
                                    )}
                                </Box>

                                <Box>
                                    <Typography color={"#5820ac"} fontWeight={600}>
                                        {selectedUser.name}
                                    </Typography>
                                    <Typography variant="subtitle1" color="#9a6efa">
                                        {isTyping ? "typing..." : selectedUser.status}
                                    </Typography>
                                </Box>
                            </Stack>
                            <Box>
                                <IconButton onClick={this.handleMoreIconClick}>
                                    <MoreVert />
                                </IconButton>
                                <Menu
                                    anchorEl={this.state.moreEl}
                                    open={open}
                                    onClose={this.handleMoreIconClose}
                                    anchorOrigin={{
                                        vertical: "bottom",
                                        horizontal: "right",
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                >
                                    <MenuItem onClick={this.handleDeleteChart}>
                                        <Delete />
                                        Delete Conversation
                                    </MenuItem>
                                </Menu>
                            </Box>
                        </Paper>
                        <Box sx={styles.chatSpace}>
                            <Box sx={styles.chatBox} gap={0.8}>
                                {messagesList.length > 0 ? (
                                    <>
                                        {messagesList.map((message: Messages) => (
                                            <React.Fragment key={this.props.generateUUID()}>
                                                {message.text !== undefined ||
                                                    message.data.url !== undefined ? (
                                                    <Box sx={message.sender.name === loggedInUser.name
                                                        ? styles.senderMsg
                                                        : styles.receiverMsg
                                                    }
                                                        onMouseEnter={() =>
                                                            this.handleMessageHover(message.id)
                                                        }
                                                        onMouseLeave={this.handleMessageOffHover}
                                                    >

                                                        {this.sendMessagesView(message)}

                                                        {messageId === message.id &&
                                                            message.sender.name === loggedInUser.name ? (
                                                            <Paper sx={styles.messagePopup}>
                                                                <Typography
                                                                    sx={styles.deleteItem}
                                                                    onClick={() =>
                                                                        this.handleDeleteAMessage(messageId)
                                                                    }
                                                                >
                                                                    <Delete />
                                                                </Typography>
                                                            </Paper>
                                                        ) : null}
                                                    </Box>
                                                ) : (
                                                    <Box
                                                        sx={
                                                            message.sender.name === loggedInUser.name
                                                                ? styles.senderMsg
                                                                : styles.receiverMsg
                                                        }
                                                    >
                                                        <Box sx={styles.senderDeletedMsgs}>
                                                            <DoNotDisturbAlt />
                                                            Message deleted
                                                            <Typography
                                                                variant="subtitle2"
                                                                mt={1}
                                                                fontSize={10}
                                                                textAlign={"right"}
                                                            >
                                                                {new Date(
                                                                    message.updatedAt * 1000
                                                                ).toLocaleString("en-US", {
                                                                    hour: "numeric",
                                                                    minute: "numeric",
                                                                    hour12: true,
                                                                })}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                )}
                                                <Box ref={this.props.messagesEndRef}></Box>
                                            </React.Fragment>
                                        ))}
                                    </>
                                ) : (
                                    <>
                                        <Stack
                                            direction={"column"}
                                            height={"450px"}
                                            justifyContent={"center"}
                                            alignItems={"center"}
                                        >
                                            <Typography variant="h5" color="#fff">
                                                No Messages yet
                                            </Typography>
                                        </Stack>
                                    </>
                                )}
                            </Box>
                        </Box>
                        <Stack
                            direction={"row"}
                            justifyContent={"center"}
                            gap={1}
                            p={1}
                            borderTop={"1px solid #ccc"}
                            sx={styles.textFieldBg}
                        >
                            <IconButton onClick={this.handleEmoji}>
                                <InsertEmoticon />
                            </IconButton>
                            {isEmojis && (
                                <Box sx={styles.emojiBox}>
                                    <EmojiPicker onEmojiClick={this.onEmojiClick} />
                                </Box>
                            )}
                            <Box
                                component={"form"}
                                onSubmit={this.handleSendAMessage}
                                width={"90%"}
                            >
                                <TextField
                                    name="uid"
                                    value={messageText}
                                    placeholder="Message"
                                    sx={styles.textField}
                                    onChange={this.handleChange}
                                    fullWidth
                                    InputProps={{
                                        endAdornment: messageText ? (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={this.handleSendAMessage}
                                                    edge="end"
                                                    type={"submit"}
                                                >
                                                    <Send />
                                                </IconButton>
                                            </InputAdornment>
                                        ) : null,
                                    }}
                                />
                            </Box>
                            <IconButton component={"label"} htmlFor="image">
                                <AttachFile />
                            </IconButton>
                            <Box
                                sx={styles.fileInput}
                                component={"input"}
                                id="image"
                                onChange={this.handleImageAttach}
                                type="file"
                                multiple
                            />
                            <Dialog
                                open={attachments.length > 0}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">
                                    Send Attachment
                                </DialogTitle>
                                <DialogContent>
                                    {attachments ?
                                        <Box
                                            display={'flex'}
                                            flexWrap={'wrap'}
                                            overflow={'auto'}
                                            height={'400px'}
                                            width={'500px'}
                                            gap={1}
                                        >
                                            {attachments && attachments.map((eachAttachment) => (
                                                <React.Fragment key={this.props.generateUUID()}>
                                                    {/* {eachAttachment.type === "image/png" || "image/jpg" || "image/jpeg" && */}
                                                    <Box
                                                        component={"img"}
                                                        src={URL.createObjectURL(eachAttachment)}
                                                        height={"300px"}
                                                        width={"250px"}
                                                        key={this.props.generateUUID()}
                                                    />
                                                    {/* } */}
                                                </React.Fragment>
                                            ))}
                                        </Box>
                                        : <Typography>No attachments</Typography>}
                                </DialogContent>
                                <DialogActions>
                                    <Button
                                        variant="outlined"
                                        sx={styles.cancelBtn}
                                        onClick={this.handleDialogClose}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        variant="contained"
                                        sx={styles.saveBtn}
                                        onClick={this.handleSendAttachment}
                                    >
                                        Send
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </Stack>
                    </>
                ) : (
                    <>
                        <Paper sx={styles.emptyChatingBg}>
                            <Typography p={2} variant="h5">
                                Chating
                            </Typography>
                        </Paper>
                        <Stack
                            direction={"column"}
                            justifyContent={"center"}
                            alignItems={"center"}
                            sx={styles.noDataBox}
                        >
                            <Typography variant="h5">No selected user</Typography>
                        </Stack>
                    </>
                )
                }
            </Box>
        );
    }
}
export default Chat;
