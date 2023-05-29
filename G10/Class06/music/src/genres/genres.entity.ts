import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import { Song } from "../songs/songs.entity";

@Entity('genres')
export class Genre {
  @PrimaryGeneratedColumn()
  genre_id: number;

  @Column({ length: 50 })
  genre_name: string;

  @ManyToMany(() => Song, { cascade: true })
  @JoinTable({
    name: "songs_genres",
    joinColumn: {
      name: "genre_id",
      referencedColumnName: "genre_id",
    },
    inverseJoinColumn: {
      name: "song_id",
      referencedColumnName: "song_id",
    },
  })
  songs: Song[];
}
