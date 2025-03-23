import React, { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { chatContext } from "../context/Context";
import { addMessageToChat } from "../redux/chatSlice";
import "../style/Rightsection.css";
import { RootState } from "../store";
import { useTranslation } from "react-i18next";
import "../Translate/i18";
import { LuImagePlus } from "react-icons/lu";
import "./Typewriter";
import Typewriter from "./Typewriter";

const Rightsection: React.FC = () => {
  const dispatch = useDispatch();
  const chatCtx = useContext(chatContext);
  const { t } = useTranslation();
  const activeChatId = useSelector((state: RootState) => state.chat.activeChatId);
  const chats = useSelector((state: RootState) => state.chat.chats);
  const activeChat = chats.find((chat) => chat.id === activeChatId);
  const chatHistory = activeChat?.history || [];

  if (!chatCtx) {
    return <div>Error: Chat context is not available.</div>;
  }

  const { message, setMessage,disable, generateAnswer,selectImage,setselectImage,imagepreview,setimagepreview
  ,loading,handleImageClick,handleImageupload,handleImagequestion,inputRef} = chatCtx;

  const handleSend = () => {
    if (!activeChatId || !message.trim()) return;
    dispatch(addMessageToChat({ chatId: activeChatId, message, sender: "You" ,image:imagepreview}));

    if(selectImage){
      handleImagequestion(selectImage,message);
    }else{
      generateAnswer();
    }
    setMessage("");
    setimagepreview(undefined);
    setselectImage(undefined)
  };

  return (
    <div className="rightsection">
      <div className="nochat">
        {chatHistory.length > 0 ? (
        <div className="messages">
        {chatHistory.map((msg: { sender: string; message: string; image?: string }, index: number) => (
          <div key={index} className="message">
            <div className="details">
              <h2>{msg.sender === "You" ? "You:" : "AI:"}</h2>
              {msg.image && <img src={msg.image} alt="uploaded" className="sent-img" />}
              <Typewriter text={msg.message} delay={5}/>
            </div>
          </div>
        ))}
      </div>
      
        ) : (
          <div>
            <h1 className="h1">{t("greeting")}</h1>
          </div>
        )}

        <div className="bottom">
          <div className="msgbar">
            <LuImagePlus onClick={handleImageClick} />
            <input type="file" ref={inputRef} style={{ display: "none" }} onChange={handleImageupload} />
            {imagepreview && (<div><img src={imagepreview} alt="ImagePreview" style={{width:"100px" ,height:"100px"}}/></div>)}
            <input
              className="input"
              type="text"
              placeholder={t('ask')}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && message.trim()) handleSend();
              }}
              disabled={disable || loading}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
              onClick={handleSend}
              
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rightsection;
