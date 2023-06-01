import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository } from "typeorm";
import { Album } from "./albums.entity";

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album)
    private readonly albumsRepository: Repository<Album>
  ) {}

  // Get albums where album name starts with G. ordered by rating ASC

  // getAlbums() {
  //   return this.albumsRepository.find({
  //     where: {
  //       album_name: Like("G%"),
  //     },
  //     order: {
  //       rating: "ASC",
  //     },
  //   });
  // }

  // Get albums with songs

  // getAlbums() {
  //   return this.albumsRepository.find({
  //     relations: ["songs"],
  //   });
  // }

  // Get average rating of all albums
  // SELECT AVG(rating) from albums

  // getAlbums() {
  //   return this.albumsRepository
  //     .createQueryBuilder("album")
  //     .select("AVG(album.rating)", "averageRating")
  //     .getRawOne();
  // }

  // -- Get the maximum rating among albums in a specific genre.
  //   SELECT MAX(rating)
  //   FROM albums a
  //   INNER JOIN songs s ON a.album_id = s.album_id
  //   INNER JOIN songs_genres sg ON s.song_id = sg.song_id
  //   WHERE sg.genre_id = 1

  getAlbums() {
    return this.albumsRepository
      .createQueryBuilder("album")
      .select("MAX(rating)", "max_rating")
      .innerJoin("album.songs", "song")
      .innerJoin("song.genres", "genre")
      .where("genre.genre_id = :genreId", { genreId: 1 })
      .getRawOne();
  }
}
