import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Album } from "../albums/albums.entity";
import { Genre } from "../genres/genres.entity";

@Entity("songs")
@Index(["song_name", "duration"])
export class Song {
  @PrimaryGeneratedColumn()
  song_id: number;

  @Column({ type: "varchar", length: 50 })
  song_name: string;

  @Column({ type: "interval" })
  duration: string;

  @Column()
  album_id: number;

  @ManyToOne(() => Album, { cascade: true })
  @JoinColumn({ name: "album_id" })
  album: Album;

  @ManyToMany(() => Genre, { cascade: true })
  @JoinTable({
    name: "songs_genres",
    joinColumn: { name: "song_id", referencedColumnName: "song_id" },
    inverseJoinColumn: { name: "genre_id", referencedColumnName: "genre_id" },
  })
  genres: Genre[];
}
