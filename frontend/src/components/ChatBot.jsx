import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { analyzeImage, getChats } from "../services/analyze";
import { LucideImage, UploadIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";

const ChatBot = () => {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [chat, setChat] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file && text) {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("text", text);
      analyzeImage(formData)
        .then((data) => {
          console.log(data?.analysis);
          setChat([...chat, data?.analysis]);
        })
        .catch((error) => {
          console.error(error);
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
        console.error(error);
      });
  }, []);

  return (
    <div className="flex flex-col h-screen bg-background w-full">
        <ScrollArea className="flex-1">
      <div className=" p-4 gap-4 w-full">
        {chat.map((message, index) => (
          <Card>
            <CardContent className="grid grid-cols-1 md:grid-cols-4 ">
              <div className="col-span-1 p-5 flex justify-center items-center">
                <Avatar className="w-8 h-8 border">
                  <AvatarImage src="https://static.vecteezy.com/system/resources/thumbnails/003/337/584/small/default-avatar-photo-placeholder-profile-icon-vector.jpg" />
                  <AvatarFallback>YOU</AvatarFallback>
                </Avatar>
                <div className="bg-card p-3 rounded-lg max-w-[70%] text-card-foreground">
                  <p>{message?.originalText}</p>
                </div>
              </div>

              <div className="col-span-3">
                <Card className="m-3">
                  <CardHeader>
                    <CardTitle>
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
                  <CardHeader>
                    <CardTitle>
                      <div className="flex gap-2 items-center">
                        <LucideImage className="h-6 w-6" />
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
        </ScrollArea>
      <Card className="p-4 items-center gap-2">
        <form onSubmit={handleSubmit} className=" flex justify-center items-center">
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-1/3"
          />
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter your message"
            className="w-full"
          />
          <Button type="submit" disabled={!file || !text}>
            Analyze
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default ChatBot;
