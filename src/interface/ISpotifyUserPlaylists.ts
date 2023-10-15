import ISpotifyPlaylist from "./ISpotifyPlaylist";

export default interface ISpotifyUserPlaylists {
  href: string;
  limit: Number;
  next: string;
  offset: Number;
  previous: string;
  total: Number;
  items: Array<ISpotifyPlaylist>;
}
