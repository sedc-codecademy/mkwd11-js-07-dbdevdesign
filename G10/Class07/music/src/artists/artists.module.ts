import { Module } from "@nestjs/common";
import { ArtistsController } from "./artists.controller";
import { ArtistsService } from "./artists.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Artist } from "./artists.entity";
import { ArtistAvgRatingView } from "./artist-avg-rating-view.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Artist, ArtistAvgRatingView])],
  controllers: [ArtistsController],
  providers: [ArtistsService],
})
export class ArtistsModule {}
