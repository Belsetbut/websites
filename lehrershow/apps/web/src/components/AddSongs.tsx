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
import { Form } from "radix-ui";
import { z } from "zod";

const formSchema = z.object({
  songName: z.string().min(1, "Song name is required"),
  artist: z.string().min(1, "Artist is required"),
  songLink: z.string().url("Invalid URL").optional(),
  songFile: z.instanceof(File).optional(),
  wishes: z.string().optional(),
})
.refine(
    (data) => {
        return !!data.songLink|| !!data.songFile;
    },
    {
        message: "Bitte entweder einen Link oder eine Datei angeben",
        path: ["songLink", "songFile"],
    }
);

export function AddSongs() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    function handleSongSubmit() {
        console.log("Song submitted");
        setIsDrawerOpen(false);
    }

    return (
        <div>
    <Button className="flex float-right mt-5 cursor-pointer" onClick={() => setIsDrawerOpen(true)}>Füge ein Lied hinzu</Button>

  <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
  <DrawerContent className="scroll-auto">
    <div className="flex-grow overflow-y-auto">
    <DrawerHeader>
      <DrawerTitle>Ein Lied hinzufügen</DrawerTitle>
      <DrawerDescription>Fülle bitte alle Felder mit * aus</DrawerDescription>
    </DrawerHeader>
    <form className="flex flex-col gap-4 p-4">
        <Form.Root schema={formSchema} onSubmit={handleSongSubmit}>
            <Form.Field name="songName" label="Song Name" required />
            <Form.Field name="artist" label="Artist" required />
            <Form.Field name="songLink" label="Song Link (optional)" type="url" />
            <Form.Field name="songFile" label="Song File (optional)" type="file" accept=".mp3,.wav" />
            <Form.Field name="wishes" label="Wishes (optional)" type="textarea" />
        </Form.Root>
    </form>
    <DrawerFooter>
        <Button onClick={handleSongSubmit}>Abspeichern</Button>
      <DrawerClose>
        <Button variant="outline">Abbrechen</Button>
      </DrawerClose>
    </DrawerFooter>
    </div>
  </DrawerContent>
</Drawer>
        </div>
    )}