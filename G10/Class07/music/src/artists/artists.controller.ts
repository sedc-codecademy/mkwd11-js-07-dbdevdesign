import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Delete,
} from "@nestjs/common";
import { ArtistsService } from "./artists.service";
import { ApiTags } from "@nestjs/swagger";
import { Artist } from "./artists.entity";

@ApiTags("artists")
@Controller("artists")
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Get()
  getArtists() {
    return this.artistsService.getArtists();
  }

  @Get(":id")
  async getArtist(@Param("id", ParseIntPipe) id: number) {
    return this.artistsService.getArtist(id);
  }

  @Post()
  async createArtist(@Body() artist: Artist) {
    return this.artistsService.createArtist(artist);
  }

  @Put(":id")
  async updateArtist(
    @Param("id", ParseIntPipe) id: number,
    @Body() artist: Artist
  ): Promise<Artist> {
    return this.artistsService.updateArtist(id, artist);
  }

  @Delete(":id")
  async removeArtist(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.artistsService.removeArtist(id);
  }
}
