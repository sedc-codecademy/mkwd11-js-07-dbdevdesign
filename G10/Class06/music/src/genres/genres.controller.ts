import { Controller, Get } from "@nestjs/common";
import { GenresService } from "./genres.service";
import { ApiTags } from "@nestjs/swagger";
import { Genre } from "./genres.entity";

@ApiTags('genres')
@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Get()
  getGenres() {
    return this.genresService.getGenres();
  }
}
