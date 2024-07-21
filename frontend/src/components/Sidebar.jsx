import React from "react";
import {
  Bell,
  CircleUser,
  Github,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Users,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ModeToggle } from "./ModeToggle";
import { deleteChats } from "@/services/analyze";
import { toast } from "sonner";

const Sidebar = ({ reRender, setReRender }) => {
  const handleClearChats = async () => {
    try {
      const response = await deleteChats();
      if (response?.success) {
        setReRender(!reRender);
        toast.success("Chats cleared successfully");
      } else {
        toast.error("An error occurred while clearing chats");
      }
    } catch (error) {
      toast.error("An error occurred while clearing chats");
      console.error(error);
    }
  };

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6 justify-between">
          <div className="flex justify-center items-center gap-2">
            <Package2 className="h-6 w-6" />
            <span className="">Img-BOT</span>
          </div>
          <ModeToggle />
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4 mt-5">
            <AlertDialog>
              <AlertDialogTrigger>
                <Button variant="destructive">Clear All Chats</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    all the chats.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleClearChats}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </nav>
        </div>
        <div className="mt-auto p-4">
          <Card x-chunk="dashboard-02-chunk-0">
            <CardHeader className="p-2 pt-0 md:p-4">
              <CardDescription>Made By Rishabh</CardDescription>
            </CardHeader>
            <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
              <a
                href="https://github.com/rishabhbizzle/img-analyze-bot"
                target="_blank"
              >
                <Button size="sm" className="w-full">
                  <Github className="h-4 w-4 mr-2" />
                  Github
                </Button>
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
