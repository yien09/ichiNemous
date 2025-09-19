import { Movie, TVShow, TMDBResponse } from './tmdb';

// Mock data for demonstration purposes
const mockMovies: Movie[] = [
  {
    id: 1,
    title: "The Dark Knight",
    overview: "Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets.",
    poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    backdrop_path: "/hqkIcbrOHL86UncnHIsHVcVmzue.jpg",
    release_date: "2008-07-18",
    vote_average: 8.5,
    vote_count: 27000,
    genre_ids: [28, 80, 18],
    adult: false,
    original_language: "en",
    original_title: "The Dark Knight",
    popularity: 85.5,
    video: false
  },
  {
    id: 2,
    title: "Inception",
    overview: "Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets is offered a chance to regain his old life as payment for a task considered to be impossible.",
    poster_path: "/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    backdrop_path: "/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
    release_date: "2010-07-16",
    vote_average: 8.8,
    vote_count: 31000,
    genre_ids: [28, 878, 53],
    adult: false,
    original_language: "en",
    original_title: "Inception",
    popularity: 92.3,
    video: false
  },
  {
    id: 3,
    title: "Interstellar",
    overview: "The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.",
    poster_path: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    backdrop_path: "/xu9zaAevzQ5nnrsXN6JcahLnG4i.jpg",
    release_date: "2014-11-07",
    vote_average: 8.6,
    vote_count: 28000,
    genre_ids: [18, 878],
    adult: false,
    original_language: "en",
    original_title: "Interstellar",
    popularity: 88.7,
    video: false
  },
  {
    id: 4,
    title: "The Matrix",
    overview: "Set in the 22nd century, The Matrix tells the story of a computer hacker who joins a group of underground insurgents fighting the vast and powerful computers who now rule the earth.",
    poster_path: "/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    backdrop_path: "/fNG7i7RqMErkcqhohV2a6cV1Ehy.jpg",
    release_date: "1999-03-31",
    vote_average: 8.7,
    vote_count: 24000,
    genre_ids: [28, 878],
    adult: false,
    original_language: "en",
    original_title: "The Matrix",
    popularity: 89.1,
    video: false
  },
  {
    id: 5,
    title: "Avengers: Endgame",
    overview: "After the devastating events of Avengers: Infinity War, the universe is in ruins due to the efforts of the Mad Titan, Thanos. With the help of remaining allies, the Avengers must assemble once more.",
    poster_path: "/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
    backdrop_path: "/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg",
    release_date: "2019-04-26",
    vote_average: 8.4,
    vote_count: 25000,
    genre_ids: [28, 12, 878],
    adult: false,
    original_language: "en",
    original_title: "Avengers: Endgame",
    popularity: 95.2,
    video: false
  }
];

const mockTVShows: TVShow[] = [
  {
    id: 101,
    name: "Breaking Bad",
    overview: "A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his family's future.",
    poster_path: "/ggFHVNu6YYI5L9pCfOacjizRGt.jpg",
    backdrop_path: "/tsRy63Mu5cu8etL1X7ZLyf7UP1M.jpg",
    first_air_date: "2008-01-20",
    vote_average: 9.5,
    vote_count: 15000,
    genre_ids: [18, 80],
    origin_country: ["US"],
    original_language: "en",
    original_name: "Breaking Bad",
    popularity: 94.8
  },
  {
    id: 102,
    name: "Stranger Things",
    overview: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.",
    poster_path: "/49WJfeN0moxb9IPfGn8AIqMGskD.jpg",
    backdrop_path: "/56v2KjBlU4XaOv9rVYEQypROD7P.jpg",
    first_air_date: "2016-07-15",
    vote_average: 8.7,
    vote_count: 12000,
    genre_ids: [18, 9648, 10765],
    origin_country: ["US"],
    original_language: "en",
    original_name: "Stranger Things",
    popularity: 91.3
  }
];

// Create mock responses
export const createMockResponse = <T>(data: T[]): TMDBResponse<T> => ({
  page: 1,
  results: data,
  total_pages: 1,
  total_results: data.length
});

export const mockResponses = {
  trending: createMockResponse(mockMovies.slice(0, 3)),
  popular: createMockResponse(mockMovies),
  topRated: createMockResponse(mockMovies.slice().reverse()),
  nowPlaying: createMockResponse(mockMovies.slice(1, 4)),
  upcoming: createMockResponse(mockMovies.slice(2)),
  popularTV: createMockResponse(mockTVShows),
  search: (query: string) => createMockResponse(
    [...mockMovies, ...mockTVShows].filter(item => {
      const title = 'title' in item ? item.title : item.name;
      return title.toLowerCase().includes(query.toLowerCase());
    })
  )
};