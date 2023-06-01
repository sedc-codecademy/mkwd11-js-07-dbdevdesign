import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Artist } from "./artists.entity";
import { Repository } from "typeorm";
import { ArtistAvgRatingView } from "./artist-avg-rating-view.entity";

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistsRepository: Repository<Artist>,
    @InjectRepository(ArtistAvgRatingView)
    private readonly artistAvgRatingViewRepository: Repository<ArtistAvgRatingView>
  ) {}

  // -- Retrieve the names of all artists along with a comma-separated list of their album names.
  // SELECT ar.artist_name, STRING_AGG(al.album_name, ', ') AS album_names
  // FROM artists ar
  // JOIN albums al ON ar.artist_id = al.artist_id
  // GROUP BY ar.artist_name

  // getArtists() {
  //   return this.artistsRepository
  //     .createQueryBuilder("artist")
  //     .select("artist.artist_name", "artist_name")
  //     .addSelect(`STRING_AGG(album.album_name,  ', ')`, "album_names")
  //     .innerJoin("artist.albums", "album")
  //     .groupBy("artist.artist_name")
  //     .getRawMany();
  // }

  // -- Retrieve the names of all artists who have albums with more than 1 song.
  // SELECT ar.artist_name
  // FROM artists ar
  // JOIN albums al ON ar.artist_id = al.artist_id
  // JOIN songs s ON al.album_id = s.album_id
  // GROUP BY ar.artist_name
  // HAVING COUNT(*) > 1

  // getArtists() {
  //   return this.artistsRepository
  //     .createQueryBuilder("artist")
  //     .select("artist.artist_name", "artist_name")
  //     .innerJoin("artist.albums", "album")
  //     .innerJoin("album.songs", "song")
  //     .groupBy("artist.artist_name")
  //     .having("COUNT(*) > 1")
  //     .getRawMany();
  // }

  // -- Retrieve the names of all artists who have albums with a rating higher than the average
  // -- rating of all albums and have at least one song longer than 4 minutes.
  // SELECT ar.artist_name
  // FROM artists ar
  // JOIN albums al ON ar.artist_id = al.artist_id
  // JOIN songs s ON s.album_id = al.album_id
  // WHERE al.rating > (SELECT AVG(rating) FROM albums)
  // GROUP BY ar.artist_name
  // HAVING MAX(s.duration) > INTERVAL '4:00'

  // getArtists() {
  //   return this.artistsRepository
  //     .createQueryBuilder("ar")
  //     .innerJoin("ar.albums", "al")
  //     .innerJoin("al.songs", "s")
  //     .where("al.rating > (SELECT AVG(rating) FROM albums)")
  //     .groupBy("ar.artist_name")
  //     .having("MAX(s.duration) > :duration", { duration: "4:00" })
  //     .select("ar.artist_name", "artist_name")
  //     .getRawMany();
  // }

  // async getArtists() {
  //   const query = `
  //       SELECT ar.artist_name
  //       FROM artists ar
  //       JOIN albums al ON ar.artist_id = al.artist_id
  //       JOIN songs s ON s.album_id = al.album_id
  //       WHERE al.rating > (SELECT AVG(rating) from albums)
  //       GROUP BY ar.artist_name
  //       HAVING MAX(s.duration) > '00:04:00'
  //     `;

  //   const results = await this.artistsRepository.query(query);
  //   console.log(results);
  //   return results.map(r => r.artist_name);
  // }

  // getArtists() {
  //   return this.artistsRepository.createQueryBuilder("artist").getMany();
  // }

  // getArtists() {
  //   return this.artistAvgRatingViewRepository.find();
  // }

  async getArtist(id: number) {
    return this.artistsRepository
      .createQueryBuilder("artist")
      .where("artist.artist_id = :id", { id })
      .getOne();
  }

  async createArtist(artist: Artist) {
    const response = await this.artistsRepository
      .createQueryBuilder()
      .insert()
      .into(Artist)
      .values(artist)
      .execute();

    console.log(response);
    return artist;
  }

  async updateArtist(id: number, artist: Artist) {
    console.log(artist, id);
    const response = await this.artistsRepository
      .createQueryBuilder("artist")
      .update(Artist)
      .set(artist)
      .where("artist_id = :id", { id })
      .returning("*")
      .execute();

    console.log(response);

    return artist;
  }

  async removeArtist(id: number) {
    const response = await this.artistsRepository
      .createQueryBuilder()
      .delete()
      .from(Artist)
      .where("artist_id = :id", { id })
      .execute();

    console.log(response);
  }

  // get TOP 3 artists by album rating

  // getArtists() {
  //   return this.artistsRepository
  //     .createQueryBuilder("artist")
  //     .leftJoinAndSelect("artist.albums", "album")
  //     .groupBy("artist.artist_id")
  //     .addGroupBy("album.album_id")
  //     .orderBy("AVG(album.rating)", "DESC")
  //     .limit(3)
  //     .getMany();
  // }

  // Get all artists which have "a" or "e" in their name
  // getArtists() {
  //   return this.artistsRepository
  //     .createQueryBuilder("artist")
  //     .where("artist.artist_name ILIKE :pattern", { pattern: "%a%" })
  //     .orWhere("artist.artist_name ILIKE :pattern", { pattern: "%e%" })
  //     .getMany();
  // }

  // Get all artists that HAVE albums

  // getArtists() {
  //   return this.artistsRepository
  //     .createQueryBuilder("artist")
  //     .leftJoinAndSelect("artist.albums", "album")
  //     .where("album.album_id IS NOT NULL")
  //     .getMany();
  // }

  // Get artists that DON'T HAVE albums

  getArtists() {
    return this.artistsRepository
      .createQueryBuilder("artist")
      .leftJoinAndSelect("artist.albums", "album")
      .where("album.album_id IS NULL")
      .getMany();
  }
}
