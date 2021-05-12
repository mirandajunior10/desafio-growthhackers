export default interface IRickAndMorty {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string | null;
  gender: string;
  episode: string[];
  created: string;
  url: string;
  origin: {
    name: string;
  };
  location: {
    name: string;
  };
}
