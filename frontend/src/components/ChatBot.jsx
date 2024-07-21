import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { analyzeImage, getChats } from "../services/analyze";
import { Loader2, LucideImage, Send, Sparkles, UploadIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { toast } from "sonner";
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const VALID_FILE_TYPES = ["image/jpeg", "image/png", "image/jpg"];

const ChatBot = ({
    reRender, setReRender
}) => {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef(null);

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    if (file && text) {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("text", text);
      analyzeImage(formData)
        .then((data) => {
            if (data?.success){
                setChat([...chat, data?.analysis]);
                toast.success("Image analyzed successfully");
            }
        })
        .catch((error) => {
        toast.error("An error occurred while analyzing the image");
          console.error(error);
        })
        .finally(() => {
          setLoading(false);
          e.target.reset();
          setText("");
          setFile(null);
        });
    }
  };

  useEffect(() => {
    getChats()
      .then((data) => {
        if (data) {
          setChat(data.chats);
        }
      })
      .catch((error) => {
        toast.error("An error occurred while fetching chats");
        console.error(error);
      });
  }, [reRender]);

  useEffect(() => {
    // Scroll to the bottom of the chat container when chat changes
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chat]);

  const validateFile = (file) => {
    if (!VALID_FILE_TYPES.includes(file.type)) {
      return "Invalid file type. Please upload an image (jpeg, jpg, png).";
    }
    if (file.size > MAX_FILE_SIZE) {
      return "File size exceeds 5MB. Please upload a smaller image.";
    }
    return "";
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files?.[0] || null;
    const validationError = selectedFile ? validateFile(selectedFile) : "";
    if (validationError) {
      toast.error(validationError);
      setFile(null);
    } else {
      setFile(selectedFile);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background w-full">
      <div className="flex-1 overflow-y-scroll h-full" ref={chatContainerRef}>
        <div className=" p-3 gap-4 w-full ">
          {chat.map((message, index) => (
            <Card key={index}>
              <CardContent className="grid grid-cols-1 md:grid-cols-4 ">
                <div className="col-span-1 p-5 flex justify-center items-center">
                  <Avatar className="w-8 h-8 border">
                    <AvatarImage src="https://static.vecteezy.com/system/resources/thumbnails/003/337/584/small/default-avatar-photo-placeholder-profile-icon-vector.jpg" />
                    <AvatarFallback>YOU</AvatarFallback>
                  </Avatar>
                  <div className="bg-card p-3 rounded-lg max-w-[70%] text-card-foreground text-xl font-semibold">
                    <p>{message?.originalText}</p>
                  </div>
                </div>

                <div className="col-span-3">
                  <Card className="m-3">
                    <CardHeader>
                      <CardTitle className="text-xl font-bold">
                        <div className="flex gap-2 items-center">
                          <LucideImage className="h-6 w-6" />
                          <p>Raw Extracted Text from Image:</p>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p> {message?.imageText}</p>
                    </CardContent>
                  </Card>

                  <Card className="m-3">
                    <CardHeader >
                      <CardTitle className="text-xl font-bold">
                        <div className="flex gap-2 items-center">
                          <Sparkles className="h-6 w-6" />
                          <p>Analysis:</p>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p> {message?.analysisByAi}</p>
                    </CardContent>
                  </Card>
                  {/* <Card className="m-3">
                  <CardHeader>
                    <CardTitle>
                      <div className="flex gap-2 items-center">
                        <LucideImage className="h-6 w-6" />
                        <p>Fomatted Extracted Text:</p>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p> {message?.analysisByAi?.formattedText}</p>
                  </CardContent>
                </Card> */}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <Card className="px-5 py-4 items-center gap-2">
        <form
          onSubmit={handleSubmit}
          className=" flex justify-center items-center gap-2"
        >
           <Input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-1/4"
          />
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter your message"
            className="w-full"
          />
          <Button type="submit" disabled={!file || !text || loading}>
            {loading ? <Loader2 className="h-6 w-6 mr-2 animate-spin" /> : <Send className="h-6 w-6 mr-2" />}
            {loading ? "Analyzing..." : "Send"}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default ChatBot;
