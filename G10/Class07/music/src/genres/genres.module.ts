import { Module } from '@nestjs/common';
import { GenresController } from './genres.controller';
import { GenresService } from './genres.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Genre } from "./genres.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Genre])],
  controllers: [GenresController],
  providers: [GenresService]
})
export class GenresModule {}
