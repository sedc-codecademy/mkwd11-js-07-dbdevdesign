import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Artist } from "./artists.entity";
import { Repository } from "typeorm";

@Injectable()
export class ArtistsService {

  constructor(@InjectRepository(Artist) private readonly artistsRepository: Repository<Artist>) {}

  getArtists() {
    return this.artistsRepository.find()
  }
}
