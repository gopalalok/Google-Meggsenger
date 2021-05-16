import styled from "styled-components";
import { Avatar, IconButton, Button } from "@material-ui/core";
import Message from "../components/Message";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AttachFileIcon from '@material-ui/icons/AttachFile';
import {useRouter} from "next/router";
import { auth,db } from "../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import {useAuthState} from 'react-firebase-hooks/auth';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import { useRef,useState } from 'react';
import firebase from 'firebase';
import getRecipientEmail from "../utils/getRecipientEmail";
import TimeAgo from "timeago-react";
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import SendIcon from '@material-ui/icons/Send';



function ChatScreen({ chat,messages }) {
    const router = useRouter();
    const endOfMessageRef = useRef(null);
    const [input, setInput] = useState("");
    const [user] = useAuthState(auth);
    const recipientEmail = getRecipientEmail(chat.users,user);
    const [recipientSnapshot] = useCollection(
        db.collection('users').where('email','==',getRecipientEmail(chat.users,user))
    );
    const recipient = recipientSnapshot?.docs?.[0]?.data();
    const [messageSnapshot] = useCollection(db.collection("chats").doc(router.query.id).collection("messages").orderBy("timestamp","asc"));
    const showMessages = () =>{
        if(messageSnapshot){
            return messageSnapshot.docs.map((message)=>(
                
                <Message
                    key={message.id}
                    user={message.data().user}
                    message={{
                        ...message.data(),
                        timestamp: message.data().timestamp?.toDate().getTime(),
                    }}

                />
                
            ));
        }
        else
        {
            return JSON.parse(messages).map((message)=>{
                <Message key={message.id} user={message.user} message={message} />
            });
        }
    };

    const scrollToBottom = ()=>{
        endOfMessageRef.current.scrollIntoView({
            behaviour: 'smooth',
            block: 'start',
        });
    }

    const sendMessage = (e) =>{
        e.preventDefault();
        db.collection("users").doc(user.uid).set(
            {
                lastseen: firebase.firestore.FieldValue.serverTimestamp(),
            },
            {merge: true}
        );

        db.collection("chats").doc(router.query.id).collection("messages").add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            user: user.email,
            photoURL: user.photoURL,
        });

        setInput("");
        scrollToBottom();
    };



    return (
        <Container>
            <Header>
                { recipient ?(
                    <Avatar src={recipient?.photoURL} />
                ) : (
                    <Avatar>{recipientEmail[0].toUpperCase()}</Avatar>
                )}
                <HeaderInformation>
                    <h3>{recipientEmail}</h3>
                    {recipientSnapshot?(
                        <p>
                            active status : {" "}
                            {recipient?.lastSeen?.toDate()?(
                                <TimeAgo datetime={recipient?.lastSeen?.toDate()}/>
                            ):(
                                "not available"
                            )}
                        </p>
                    ):(
                            <p>loading last status...</p>
                    )}
                </HeaderInformation>
                <HeaderIcons>
                    <IconButton>
                        <AttachFileIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </HeaderIcons>    
            </Header>

            <MessageContainer>
                {showMessages()}
                <EndOfMessage ref={endOfMessageRef} />
            </MessageContainer>

            <InputContainer>
                <InsertEmoticonIcon>
                    <Picker />
                </InsertEmoticonIcon>

                <Input value={input} onChange={e=>setInput(e.target.value)}/>
                <button  disabled={!input} type="submit" onClick={sendMessage}>
                    <SendIcon />
                </button>
            </InputContainer>
        </Container>
    )
}

export default ChatScreen;

const Container = styled.div`
    
`;


const Header = styled.div`
    display: flex;
    position: sticky;
    top: 0;
    background-color: white;
    z-index: 100;
    align-items: center;
    padding: 11px;
    height: 80px;
    border-bottom: 1px solid whitesmoke;
`;

const HeaderInformation = styled.div`
    margin-left: 15px;
    flex: 1;
    > h3{
        margin-bottom: 3px;
    }

    > p{
        font-size: 14px;
        color: grey;
    }
    
`;


const HeaderIcons = styled.div`
    
`;

const MessageContainer = styled.div`
    padding: 30px;
    background: url(https://i.postimg.cc/MZc6KmKV/202978.jpg);
    min-height: 90vh;
    
`;

const EndOfMessage = styled.div`
    margin-bottom: 50px;
`;

const InputContainer = styled.form`
    display: flex;
    align-items: center;
    padding: 10px;
    position: sticky;
    bottom: 0;
    background-color:white;
    z-index: 100;
`;

const Input = styled.input`
    flex: 1;
    outline: 0;
    border: none;
    border-radius: 10px;
    background-color: whitesmoke;
    padding: 20px;
    margin-left: 15px;
    margin-right: 15px;
`;
