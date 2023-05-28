import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Song } from "./songs.entity";

@Injectable()
export class SongsService {
  constructor(@InjectRepository(Song) private readonly songsRepository: Repository<Song>) {}

  getSongs() {
    return this.songsRepository.find()
  }
}
