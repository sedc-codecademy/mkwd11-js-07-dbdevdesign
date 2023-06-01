import { Module } from '@nestjs/common';
import { SongsModule } from './songs/songs.module';
import { ArtistsModule } from './artists/artists.module';
import { AlbumsModule } from './albums/albums.module';
import { GenresModule } from './genres/genres.module';
import { DatabaseModule } from "./database/database.module";

@Module({
  imports: [DatabaseModule, SongsModule, ArtistsModule, AlbumsModule, GenresModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
