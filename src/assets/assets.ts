export const bgImg = require('./chat_bg.jpg');
export const chatBgImg = require('./chating_bg.jpg');


export type Messages = {
    action: string
    actionBy: {
        avatar: string
        blockedByMe: boolean
        deactivatedAt: number
        hasBlockedMe: boolean
        lastActiveAt: number
        name: string
        role: string
        status: string
        uid: string
    }
    actionFor: {
        avatar: string
        blockedByMe: boolean
        deactivatedAt: number
        hasBlockedMe: boolean
        lastActiveAt: number
        name: string
        role: string
        status: string
        uid: string
    }
    category: string;
    conversationId: string;
    data: {
        attachments: {
            extension: string;
            mimeType: string;
            name: string;
            size: number;
            url: string
        }[],
        category: string;
        entities: {
            receiver: {
                entity: {
                    avatar: string;
                    conversationId: string;
                    name: string;
                    role: string;
                    status: string;
                    uid: string;
                },
                entityType: string
            },
            sender: {
                entity: {
                    avatar: string;
                    lastActiveAt: string;
                    name: string;
                    role: string;
                    status: string;
                    uid: string;
                },
                entityType: string
            },
        },
        resource: string;
        text: string;
        type: string;
        url: string
    },
    id: string;
    mentionedMe: string;
    mentionedUsers: [];
    rawMessage: {
        category: string;
        conversationId: string;
        data: {
            attachments: {
                extension: string;
                mimeType: string;
                name: string;
                size: number;
                url: string;
            }[],
            category: string;
            entities: {
                receiver: {
                    entity: {
                        avatar: string
                        conversationId: string
                        name: string
                        role: string
                        status: string
                        uid: string
                    }
                    entityType: string
                }
                sender: {
                    entity: {
                        avatar: string
                        lastActiveAt: number
                        name: string
                        role: string
                        status: string
                        uid: string
                    }
                    entityType: string
                }
            },
            resource: string;
            text: string;
            type: string;
            url: string
        }
        id: string;
        mentionedMe: boolean;
        mentionedUsers: []
        reactions: []
        receiver: {
            avatar: string
            blockedByMe: boolean
            deactivatedAt: number
            hasBlockedMe: boolean
            name: string
            role: string
            status: string
            uid: string
        }
        receiverId: string
        receiverType: string
        sender: {
            avatar: string
            blockedByMe: boolean
            deactivatedAt: number
            hasBlockedMe: boolean
            lastActiveAt: number
            name: string
            role: string
            status: string
            uid: string
        }
        sentAt: number
        text: string
        type: string
        updatedAt: number
    }
    reactions: [];
    receiver: {
        avatar: string
        blockedByMe: boolean
        deactivatedAt: number
        hasBlockedMe: boolean
        name: string
        role: string
        status: string
        uid: string
    },
    receiverId: string
    receiverType: string
    sender: {
        avatar: string
        blockedByMe: boolean
        deactivatedAt: number
        hasBlockedMe: boolean
        lastActiveAt: number
        name: string
        role: string
        status: string
        uid: string
    }
    sentAt: number;
    text: string
    type: string
    updatedAt: number
}

export type ConversationWith = {
    avatar: string;
    blockedByMe: boolean;
    conversationId: string;
    deactivatedAt: number;
    hasBlockedMe: boolean;
    name: string;
    role: string;
    status: string;
    uid: string;
}

export type Conversation = {
    conversationId: string;
    conversationType: string;
    conversationWith: ConversationWith;
    lastMessage: Messages;
    lastReadMessageId: string
    unreadMentionsCount: number | undefined
    unreadMessageCount: number;
}

export type ImageFiles = {
    lastModified: number
    lastModifiedDate: Date
    name: string
    size: number
    type: string
    webkitRelativePath: string
}


export type ParticularUser = {
    avatar: string
    blockedByMe: boolean
    conversationId: string
    deactivatedAt: number
    hasBlockedMe: boolean
    lastActiveAt: number
    name: string
    role: string
    status: string
    uid: string
}

export type User = {
    uid: string;
    name: string;
    avatar: string;
}

export type UsersList = ParticularUser[]