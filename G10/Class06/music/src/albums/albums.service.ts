import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Album } from "./albums.entity";

@Injectable()
export class AlbumsService {
  constructor(@InjectRepository(Album) private readonly albumsRepository: Repository<Album>) {}

  getAlbums() {
    return this.albumsRepository.find()
  }
}
