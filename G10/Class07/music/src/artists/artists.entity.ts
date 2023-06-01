import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Album } from "../albums/albums.entity";

@Entity("artists")
@Index(["artist_name"])
export class Artist {
  @PrimaryGeneratedColumn()
  artist_id: number;

  @Column({ type: "varchar", length: 50 })
  artist_name: string;

  @OneToMany(() => Album, album => album.artist)
  albums: Album[];
}
