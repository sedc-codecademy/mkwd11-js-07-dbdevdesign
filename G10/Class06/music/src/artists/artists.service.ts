import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Artist } from "./artists.entity";
import { Repository } from "typeorm";

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistsRepository: Repository<Artist>
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

  async getArtists() {
    const query = `
        SELECT ar.artist_name
        FROM artists ar
        JOIN albums al ON ar.artist_id = al.artist_id
        JOIN songs s ON s.album_id = al.album_id
        WHERE al.rating > (SELECT AVG(rating) from albums)
        GROUP BY ar.artist_name
        HAVING MAX(s.duration) > '00:04:00'
      `;

    const results = await this.artistsRepository.query(query);
    console.log(results);
    return results.map(r => r.artist_name);
  }
}
