"use client";

import { AddSongs } from "@/components/AddSongs";
import { Header } from "@/components/header";
import { Songcard } from "@/components/song-request-card";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function App() {
  const songs = useQuery(api.songs.get);

  return (
    <div className="container mx-auto p-4">
      <AddSongs />
      <Header/>
      {songs?.map((song) => (
        <Songcard
          key={song._id}
          id={song._id}
          songName={song.songName}
          songLink={song.songLink ?? "No link provided"}
          songFileId={song.songFileId}
          wishes={song.wishes}
          editedFile={song.editedFile ?? undefined}
          feedback={song.feedback}
        />
      ))}
    </div>
  );
}