import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Genre } from "./genres.entity";

@Injectable()
export class GenresService {
  constructor(
    @InjectRepository(Genre)
    private readonly genresRepository: Repository<Genre>
  ) {}

  // getGenres() {
  //   return this.genresRepository.find();
  // }

  // getGenres() {
  //   return this.genresRepository
  //     .createQueryBuilder("genre")
  //     .leftJoinAndSelect("genre.songs", "song")
  //     .leftJoinAndSelect("song.album", "album")
  //     .leftJoinAndSelect("album.artist", "artists")
  //     .getMany();
  // }

  // Get the count of songs in each genre

  getGenres() {
    return this.genresRepository
      .createQueryBuilder("genre")
      .leftJoin("genre.songs", "song")
      .select("genre.genre_name", "genre_name")
      .addSelect("COUNT(song.song_id)", "song_count")
      .groupBy("genre.genre_name")
      .getRawMany();
  }
}
