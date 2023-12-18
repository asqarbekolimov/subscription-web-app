const base_url = process.env.NEXT_PUBLIC_API_DOMAIN as string;
const api_key = process.env.NEXT_PUBLIC_API_KEY as string;
const public_domain = process.env.NEXT_PUBLIC_DOMAIN as string;

export const API_REQUEST = {
  trending: `${base_url}/trending/all/week?api_key=${api_key}&language=en-Us`,
  top_rated: `${base_url}/movie/top_rated?api_key=${api_key}&language=en-Us`,
  tv_top_rated: `${base_url}/tv/top_rated?api_key=${api_key}&language=en-Us`,
  popular: `${base_url}/movie/popular?api_key=${api_key}&language=en-Us`,
  documentary: `${base_url}/discover/movie?api_key=${api_key}&language=en-Us&with_genres=99`,
  comedy: `${base_url}/discover/movie?api_key=${api_key}&language=en-Us&with_genres=35`,
  family: `${base_url}/discover/movie?api_key=${api_key}&language=en-Us&with_genres=10751`,
  history: `${base_url}/discover/movie?api_key=${api_key}&language=en-Us&with_genres=36`,
  products_list: `${public_domain}/api/products`,
};
