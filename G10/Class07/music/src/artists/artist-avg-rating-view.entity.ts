import { ViewColumn, ViewEntity } from "typeorm";

@ViewEntity({
  expression: `
        SELECT ar.artist_name, AVG(al.rating) AS avg_rating
        FROM artists ar
        INNER JOIN albums al ON ar.artist_id = al.artist_id
        GROUP BY ar.artist_name
    `,
})
export class ArtistAvgRatingView {
  @ViewColumn()
  artist_name: string;

  @ViewColumn()
  avg_rating: number;
}
