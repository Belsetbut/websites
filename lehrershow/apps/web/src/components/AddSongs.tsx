"use client";

import { Button } from "./ui/button";
import { useState } from "react";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "./ui/drawer";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { set, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Alert, AlertTitle, AlertDescription } from "./ui/alert";
import { Check } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const formSchema = z.object({
  songName: z.string().min(1, "Song name is required"),

  songLink: z.preprocess((val) => (val === "" ? undefined : val), z.string().url("Bitte gib eine echte Url an").optional()),
  
  songFile: z.instanceof(File).optional().nullable(),
  wishes: z.string().optional(),
})
.refine(
    (data) => {
        return !!data.songLink|| !!data.songFile;
    },
    {
        message: "Bitte entweder einen Link oder eine Datei angeben",
        path: ["songLink"],
    }
);

export function AddSongs() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema) as any,
      defaultValues: {
        songName: "",
        songLink: "",
        songFile: undefined,
        wishes: "",
      },
    });
    console.log("Current Form Errors:", form.formState.errors);
        function onSubmit(values: z.infer<typeof formSchema>) {
        console.log("Song submitted with valid data", values);
        setIsDrawerOpen(false);
        form.reset();
        toast.success("Lied erfolgreich hinzugefügt!", {
            icon: <Check className="h-4 w-4" />,
            duration: 3000,
        });
    }


    return (
        <div>
    <Button 
      className="flex float-right mt-5 cursor-pointer" 
      onClick={() => setIsDrawerOpen(true)}>
        Füge ein Lied hinzu
    </Button>

  <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
  <DrawerContent className="scroll-auto">
    <div className="flex-grow overflow-y-auto">
    <DrawerHeader>
      <DrawerTitle>Ein Lied hinzufügen</DrawerTitle>
      <DrawerDescription>Fülle bitte alle Felder mit * aus</DrawerDescription>
    </DrawerHeader>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="songName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lied Name *</FormLabel>
              <FormControl>
                <Input placeholder="Never Gonna Give you Up" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          />
        <FormField
          control={form.control}
          name="songLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Song Link</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/song.mp3" {...field} />
              </FormControl>
              <FormDescription>
                Optional: Hier kannst du einen Link zum Lied angeben. Z.B. YouTube oder Spotify.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
          />
        <FormField
          control={form.control}
          name="songFile"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Song Datei</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="audio/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      field.onChange(e.target.files[0]);
                    } else {
                      field.onChange();
                    }
                  }}
                />
              </FormControl>
              <FormDescription>
                Optional: Hier kannst du eine bearbeitete Lieddatei abgeben.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
          />
        <FormField
          control={form.control}
          name="wishes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Wünsche</FormLabel>
              <FormControl>
                <Input placeholder="Wünsche für das Lied" {...field} />
              </FormControl>
              <FormDescription>
                Optional: Irgendwelche Wünsche für das Lied oder das Licht?
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
          />
          <Button type="submit">Abspeichern</Button>
      </form>
      </Form>
    <DrawerFooter>
      <DrawerClose>
        <Button variant="outline">Abbrechen</Button>
      </DrawerClose>
    </DrawerFooter>
    </div>
  </DrawerContent>
</Drawer>
        </div>
    )}