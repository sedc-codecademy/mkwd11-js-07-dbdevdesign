import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Artist } from "../artists/artists.entity";
import { Song } from "../songs/songs.entity";

@Entity("albums")
@Index(["album_name", "rating"])
export class Album {
  @PrimaryGeneratedColumn()
  album_id: number;

  @Column({ type: "varchar", length: 50 })
  album_name: string;

  @Column({ type: "decimal", precision: 3, scale: 2 })
  rating: number;

  @Column({ type: "int" })
  artist_id: number;

  @ManyToOne(() => Artist, { cascade: true })
  @JoinColumn({ name: "artist_id" })
  artist: Artist;

  @OneToMany(() => Song, song => song.album)
  songs: Song[];
}
