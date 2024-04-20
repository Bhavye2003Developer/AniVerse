const cheerio = require("cheerio");
const fs = require("fs");

const GOGOANIME_LINK = "https://gogoanime3.co";
const CONSUMET_API = "https://api-consumet-org2.vercel.app/";

const fetchSite = async (url) => {
  const response = await fetch(url);
  const doc = response.text();
  return doc;
};

const get_anime_id = ($) =>
  $(".anime_info_episodes_next").children("#movie_id").attr("value");

const get_anime_list = async (anime) => {
  let searchedURL = GOGOANIME_LINK;
  if (anime) {
    searchedURL = `${GOGOANIME_LINK}/search.html?keyword=${encodeURIComponent(
      anime.toLocaleLowerCase()
    )}`;
  }
  const res = await fetchSite(searchedURL);
  const $ = cheerio.load(res);

  const ul = $(".items").children("li");

  const user_searched_anime_list = [];
  for (const li of ul) {
    const div = $(li).children("div");

    const anime_name = $(div).children("a").attr("title");
    const anime_link = $(div).children("a").attr("href");
    const img_link = $(div).children("a").children("img").attr("src");
    const relased_date = $(li).children(".released").text().trim();

    user_searched_anime_list.push({
      anime_name,
      anime_link,
      img_link,
      relased_date,
    });
  }
  return user_searched_anime_list;
};

// get_anime_list("yamada kun").then((res) => {
//   console.log(res);
// });

const get_batched_episodes = async (id, start_ep = 0, end_ep) => {
  const res = await fetchSite(
    `https://ajax.gogocdn.net/ajax/load-list-episode?ep_start=${start_ep}&ep_end=${end_ep}&id=${id}`
  );
  const $ = cheerio.load(res);
  const ul = $("#episode_related").children("li");
  const episode_seq = [];
  for (const li of ul) {
    const ep_number = $($(li).children("a")[0]).children(".name").text();
    episode_seq.push(ep_number.split(" ")[1]);
  }
  return episode_seq;
};

const get_episode_batches = ($) => {
  const ul = $("#episode_page").children("li");
  const batches = [];
  for (const li of ul) {
    const a = $(li).children("a")[0];
    const ep_start = $(a).attr("ep_start");
    const ep_end = $(a).attr("ep_end");
    batches.push({ ep_start, ep_end });
  }
  return batches;
};

const get_anime_info = async (anime_name) => {
  const res = await fetch(CONSUMET_API + `/anime/gogoanime/info/${anime_name}`);
  const json = await res.json();
  return json;
};

// get_anime_info("/category/naruto-shippuuden-movie-1");

const get_episode = (name, episode_num) =>
  `${GOGOANIME_LINK}/${name}-episode-${episode_num}`;

// console.log(get_episode("naruto-shippuuden-movie-1", 1));

const get_servers = async (episode_id) => {
  const res = await fetch(
    CONSUMET_API + `/anime/gogoanime/servers/${episode_id}`
  );
  const json = res.json();
  return json;
};

// get_servers(
//   "https://gogoanime3.co/yamada-kun-to-lv999-no-koi-wo-suru-episode-13"
// );

export {
  get_anime_list,
  get_anime_info,
  get_batched_episodes,
  get_episode,
  get_servers,
};

// fetch(CONSUMET_API + "/anime/gogoanime/servers/spy-x-family-episode-1")
//   .then((res) => res.json())
//   .then((res) => {
//     console.log(res);
//   });
