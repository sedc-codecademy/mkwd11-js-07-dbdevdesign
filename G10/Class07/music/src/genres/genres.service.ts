import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Genre } from "./genres.entity";

@Injectable()
export class GenresService {
  constructor(@InjectRepository(Genre) private readonly genresRepository: Repository<Genre>) {}

  getGenres() {
    return this.genresRepository.find()
  }
}
