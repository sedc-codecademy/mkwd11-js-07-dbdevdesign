import { Controller, Get } from "@nestjs/common";
import { ArtistsService } from "./artists.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("artists")
@Controller('artists')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Get()
  getArtists() {
    return this.artistsService.getArtists();
  }
}
