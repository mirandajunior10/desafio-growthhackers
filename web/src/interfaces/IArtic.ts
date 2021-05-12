export default interface IArtic {
  id: number;
  title: string;
  api_link: string;
  artist_display: string;
  place_of_origin: string;
  dimensions: string;
  artist_title: string;
  image_id?: string;
  image_link: string;
  thumbnail?: Thumbnail;
}

interface Thumbnail {
  lqip: string;
  width: number;
  height: number;
  alt_text: string;
}
