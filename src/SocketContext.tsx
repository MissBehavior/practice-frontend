import React from 'react'
import io, { Socket } from 'socket.io-client'

export const socket = io('http://localhost:3000', {
    transports: ['websocket'],
    upgrade: false,
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: 3,
})

export const SocketContext = React.createContext<Socket>(socket)
