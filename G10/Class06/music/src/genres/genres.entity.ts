import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Song } from "../songs/songs.entity";

@Entity('genres')
export class Genre {
  @PrimaryGeneratedColumn()
  genre_id: number;

  @Column({ length: 50 })
  genre_name: string;

  @ManyToMany(() => Song, { cascade: true })
  songs: Song[];
}
