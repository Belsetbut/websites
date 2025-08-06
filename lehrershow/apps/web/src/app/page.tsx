import { AddSongs } from "@/components/AddSongs";
import { Header } from "@/components/header";
import {Songcard} from "@/components/song-request-card";
import {allSongCards} from "@/components/SongCard";
import { Button } from "@/components/ui/button";

export default function App() {
  return (
    <div className="container mx-auto p-4">

      <AddSongs />
      <Header/>
      {allSongCards.map((song) => (
      <Songcard
       key={song.id}
       id={song.id}
       songName={song.songName}
       artist={song.artist}
       songLink={song.songLink}
       songFile={song.songFile}
       wishes={song.wishes}
       editedFile={song.editedFile}
       feedback={song.feedback}
      />
      ))}
    </div>
  );
}