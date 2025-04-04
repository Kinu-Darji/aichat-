import React, { createContext, useState , useRef} from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { addMessageToChat, deleteChat } from "../redux/chatSlice";
import { RootState } from "../store";
import "../Translate/i18";
import { useTranslation } from 'react-i18next';
import { GoogleAuthProvider, signOut } from "firebase/auth";
import{signInWithPopup}from "firebase/auth"
import { auth } from "../Firebase/Firebase";

interface ChatContextProps {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  disable: boolean;
  setDisable :React.Dispatch<React.SetStateAction<boolean>>,
  generateAnswer: () => void;
  chatDelete: number | null;
  setChatDelete: React.Dispatch<React.SetStateAction<number | null>>;
  showAlert: boolean;
  setShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
  handleClickDelete: (chatId: number) => void;
  handleConfirmDelete: () => void;
  visible:boolean;
  setvisible:React.Dispatch<React.SetStateAction<boolean>>;
  selectImage:File | undefined;
  setselectImage:React.Dispatch<React.SetStateAction<File | undefined>>;
  imagepreview:string | undefined;
  setimagepreview:React.Dispatch<React.SetStateAction<string | undefined>>;
  loading:boolean;
  setloading:React.Dispatch<React.SetStateAction<boolean>>;
  handleImageClick:()=>void;
  handleImageupload:(event: React.ChangeEvent<HTMLInputElement>)=>void
  handleImagequestion:(file: File, question: string)=>void;
  menu:"Themes" | "Languages" | null;
  setMenu:React.Dispatch<React.SetStateAction<"Themes" | "Languages" | null>>;
  inputRef:React.RefObject<HTMLInputElement |null>;
  handleMenu:(menu: "Themes" | "Languages")=>void;
  handleThemes:(event: React.MouseEvent<HTMLLIElement>)=>void;
  handleLanguages:(lang: string)=>void;
  generateImage:()=>void;
  ailoading: boolean;
  setAiloading: React.Dispatch<React.SetStateAction<boolean>>;
  ailoadingmsg: string;
  setAiloadingmsg: React.Dispatch<React.SetStateAction<string>>;
  handleLogin:()=>void;
  handlelogout:()=>void;
  user:any;
  setuser:React.Dispatch<React.SetStateAction<any>>;
}

export const chatContext = createContext<ChatContextProps | undefined>(undefined);

const API_KEY = "AIzaSyCXqrQwH7Swe7EOIAV-tvzRtlaIrSgRjVk";
const API = "AIzaSyAM1BcXaE-oQGVVVjxO3BRHpi9PoHfDsNo";
const image_api="AIzaSyANwDx-4J6GaquSXi5xajm8wseulKYFMhQ";

const ContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useDispatch();
  const activeChatId = useSelector((state: RootState) => state.chat.activeChatId);
  const [message, setMessage] = useState<string>("");
  const [disable, setDisable] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [chatDelete, setChatDelete] = useState<number | null>(null);
  const [visible,setvisible]=useState<boolean>(false);
  const [selectImage, setselectImage] = useState<File|undefined>();
  const [imagepreview, setimagepreview] = useState<string|undefined>();
  const [loading ,setloading]=useState<boolean>(false);
  const [menu, setMenu] = useState<"Themes" | "Languages" | null>(null);
  const [ailoading, setAiloading] = useState<boolean>(false); 
  const [ailoadingmsg, setAiloadingmsg] = useState<string>(""); 
  const [user,setuser]=useState<any>(null);
  const inputRef = useRef<HTMLInputElement >(null);
  const { i18n } = useTranslation();


  const handleLogin=async()=>{
      const provider=new GoogleAuthProvider();
      try{
        const result=await signInWithPopup(auth,provider);
        setuser(result.user);
        alert(`welcome,${result.user.displayName || result.user.email}!`);
      }catch(error){
        console.error("Login Error",error)
      }
    }
  
    const handlelogout=async()=>{
      try{
        await signOut(auth);
        setuser(null);
        alert("You have been logout ");
      }catch{
        console.log("logout error..");
      }
    }


  const handleMenu = (menu: "Themes" | "Languages") => {
    setMenu(menu);
};

const handleThemes = (event: React.MouseEvent<HTMLLIElement>) => {
    const theme = event.currentTarget.id;
    console.log(`${theme} mode selected`);
};

const handleLanguages = (lang: string) => {
    i18n.changeLanguage(lang);
};

  const handleClickDelete = (chatId: number) => {
    setChatDelete(chatId);
    setShowAlert(true);
  };

  const handleConfirmDelete = () => {
    if (chatDelete !== null) {
      dispatch(deleteChat(chatDelete));
    }
    setShowAlert(false);
  };
  const handleImageClick = () => {
    inputRef.current?.click();
  };

  const handleImageupload = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      console.log(file)
      if (!file) return;
      setselectImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setimagepreview(reader.result?.toString());
        console.log(reader);
      }
      reader.readAsDataURL(file);
    }
    const handleImagequestion = async (file: File, question: string) => {
      setloading(true);
      const reader = new FileReader();
    
      reader.onloadend = async () => {
        const result = reader.result; 
    
        if (!result || typeof result !== "string") {
          console.error("Failed to read file.");
          setloading(false);
          return;
        }        
        const base64Data = result.split(",")[1]; 
        try {
          const requestBody = {
            contents: [
              {
                parts: [
                  { text: question },
                  {
                    inline_data: { 
                      mime_type: file.type || "image/jpeg", 
                      data: base64Data,
                    },
                  },
                ],
              },
            ],
          };
          const { data } = await axios.post(
            `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${API}`,
            requestBody,
            { headers: { "Content-Type": "application/json" } }
          );
          const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response received.";
          let aiText=responseText
          .replace(/\n/g, "<br>")
            .replace(/\*\*(.*?)\*\*/g, "<b><strong>$1</strong></b>")
            .replace(/\*/g, "&bull;");
          dispatch(addMessageToChat({ chatId: activeChatId, message: aiText,sender: "AI" }));
        } catch (error) {
          console.error("Error processing image:", error);
        } finally {
          setloading(false);
        }
      };
    
      reader.readAsDataURL(file); 
    };

    async function generateImage() {
      if (!message.trim() || activeChatId == null) {
        console.log("Error fetching..");
        return;
      }
    
      setDisable(true);
      setAiloading(true); 
      setAiloadingmsg("AI is thinking..."); 
    
      try {
        const response = await axios.post(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp-image-generation:generateContent?key=${image_api}`,
          {
            contents: [{ parts: [{ text: message }] }],
            generationConfig: { responseModalities: ["TEXT", "IMAGE"] }
          },
          { headers: { "Content-Type": "application/json" } }
        );
    
        let imagesrc = "";
        if (response.data.candidates && response.data.candidates.length > 0) {
          const parts = response.data.candidates[0].content.parts as { inlineData?: { data: string } }[];
          const imagePart = parts.find((part) => part.inlineData)?.inlineData?.data;
    
          if (imagePart) {
            imagesrc = `data:image/png;base64,${imagePart}`;
          }
        }
    
        if (imagesrc) {
          dispatch(
            addMessageToChat({
              chatId: activeChatId,
              message: "",
              sender: "AI",
              image: imagesrc,
            })
          );
        } else {
          console.error("No image found in API response");
        }
      } catch (error) {
        console.error("Image is not loading", error);
      }
    
      setAiloading(false); 
      setAiloadingmsg("");
      setDisable(false);
    }
    
    
    async function generateAnswer() {
      if (!message.trim() || activeChatId === null) {
        console.error("No active chat selected or empty message.");
        return;
      }
  
      setDisable(true);
      console.log("disable func",disable);
      setMessage("");
  
      try {
        const response = await axios.post(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
          { contents: [{ parts: [{ text: message }] }] }
        );
  
        let aiText = "No response from AI.";
        if (response.data.candidates && response.data.candidates.length > 0) {
          aiText = response.data.candidates[0].content.parts[0].text || aiText;
        }
  
        let formattedText = aiText
          .replace(/\n/g, "<br>")
          .replace(/\*\*(.*?)\*\*/g, "<b><strong>$1</strong></b>")
          .replace(/\*/g, "&bull;");
  
        dispatch(addMessageToChat({ chatId: activeChatId, message: formattedText, sender: "AI" }));
      } catch (error) {
        console.error("Error fetching response:", error);
      }
      setDisable(false);
      console.log("disable false",disable)
    }

  return (
    <chatContext.Provider
      value={{
        message,
        setMessage,
        disable,
        setDisable,
        generateAnswer,
        chatDelete,
        setChatDelete,
        showAlert,
        setShowAlert,
        handleClickDelete,
        handleConfirmDelete,
        visible,
        setvisible,
        selectImage,
        setselectImage,
        imagepreview,
        setimagepreview,
        loading,
        setloading,
        handleImageClick,
        handleImageupload,
        handleImagequestion,
        inputRef,
        menu,
        setMenu,
        handleLanguages,
        handleMenu,
        handleThemes,
        generateImage,
        ailoading, 
        setAiloading, 
        ailoadingmsg, 
        setAiloadingmsg,
        handleLogin,
        handlelogout,
        user,
        setuser
      }}
    >
      {children}
    </chatContext.Provider>
  );
};

export default ContextProvider;
