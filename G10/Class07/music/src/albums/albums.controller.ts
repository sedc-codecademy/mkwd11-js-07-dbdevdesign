import { Controller, Get } from "@nestjs/common";
import { AlbumsService } from "./albums.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('albums')
@Controller('albums')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Get()
  getAlbums() {
    return this.albumsService.getAlbums();
  }
}
