export default interface ISpotifyUser {
  country: string;
  display_name: string;
  email: string;
  explicit_content: any;
  external_urls: {
    spotify: string;
  };
  followers: {
    href: any;
    total: Number;
  };
  href: string;
  id: string;
  images: [
    {
      height: Number;
      url: string;
      width: Number;
    }
  ];
  product: string;
  type: string;
  uri: string;
}
