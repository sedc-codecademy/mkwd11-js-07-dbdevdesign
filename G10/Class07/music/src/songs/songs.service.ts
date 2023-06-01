import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Song } from "./songs.entity";

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(Song) private readonly songsRepository: Repository<Song>
  ) {}

  // getSongs() {
  //   return this.songsRepository.find()
  // }

  // Get songs in duration range 2m - 4m

  // getSongs() {
  //   return this.songsRepository
  //     .createQueryBuilder("song")
  //     .where("song.duration BETWEEN :minDuration AND :maxDuration", {
  //       minDuration: "02:00",
  //       maxDuration: "04:00",
  //     })
  //     .getMany();
  // }

  // Get songs in a list of IDs

  // getSongs() {
  //   const ids = [2, 4, 6];

  //   return this.songsRepository
  //     .createQueryBuilder("song")
  //     .where("song.song_id IN (:...ids)", { ids })
  //     .getMany();
  // }

  // Get all songs and the count of songs

  // async getSongs() {
  //   const response = await this.songsRepository
  //     .createQueryBuilder("song")
  //     .getManyAndCount();

  //   return {
  //     songs: response[0],
  //     count: response[1],
  //   };
  // }

  // Find the maximum duration of songs in an album

  // async getSongs() {
  //   const result = await this.songsRepository
  //     .createQueryBuilder("song")
  //     .select("MAX(song.duration)", "maxDuration")
  //     .where("song.album_id = :albumId", { albumId: 1 })
  //     .getRawOne();

  //   return result.maxDuration;
  // }

  // Get the count of songs in each album

  // getSongs() {
  //   return this.songsRepository
  //     .createQueryBuilder("song")
  //     .select("song.album_id", "album_id")
  //     .addSelect("COUNT(*)", "song_count")
  //     .groupBy("song.album_id")
  //     .getRawMany();
  // }
}
