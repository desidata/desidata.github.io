const maps = [
  {
    topic: "Public health",
    title: "Women aged 20–24 who married before 18, 2019–21",
    image: "maps_images/cm_labeled.webp",
    alt: "NFHS-5 map showing the percentage by state and union territory.",
    post: "https://www.instagram.com/desidata.info/",
    page: "maps/marriage-before-18.html",
  },
  {
    topic: "Politics",
    title: "Dynasty in Democracy",
    image: "maps_images/dynasty.webp",
    alt: "Share of sitting MPs, MLAs and MLCs with dynastic backgrounds by state and union territory.",
    post: "https://www.instagram.com/desidata.info/",
    page: "maps/dynasty-in-democracy.html",
  },
  {
    topic: "Business",
    title: "Startups with a woman director, 2025",
    image: "maps_images/female_director.webp",
    alt: "Statewise counts of startups with at least one woman director.",
    post: "https://www.instagram.com/desidata.info/",
    page: "maps/startups-woman-director.html",
  },
  {
    topic: "Search trends",
    title: "Where India searched for \"Ghibli\"",
    image: "maps_images/ghibli.webp",
    alt: "Relative Google search interest by state, March 24–31, 2025.",
    post: "https://www.instagram.com/desidata.info/",
    page: "maps/where-india-searched-ghibli.html",
  },
  {
    topic: "Public health",
    title: "HIV prevalence in India, 2023",
    image: "maps_images/hiv_pos.webp",
    alt: "Map of HIV prevalence percentages by state and union territory.",
    post: "https://www.instagram.com/desidata.info/",
    page: "maps/hiv-prevalence-india-2023.html",
  },
  {
    topic: "Search trends",
    question: "Where did a cockroach become a political curiosity?",
    teaser: "From Delhi to Mizoram, trace Google search interest in the Cockroach Janta Party.",
    title: "How India googled the Cockroach Janta Party",
    image: "maps_images/cockroach_trend.png",
    alt: "Google Trends map of relative search interest across India, May 19–21",
    post: "https://www.instagram.com/desidata.info/",
    page: "maps/cockroach-janta-party.html",
  },
  {
    topic: "Connectivity",
    question: "How connected is rural India?",
    teaser: "Look beyond state averages with a district-by-district view of rural internet penetration.",
    title: "Internet penetration in rural India",
    image: "maps_images/internet-preview.jpg",
    alt: "Frame from a district-by-district animation of rural internet penetration",
    post: "https://www.instagram.com/desidata.info/",
    page: "maps/internet-penetration-rural-india.html",
  },
  {
    topic: "Public health",
    question: "How does condom use vary across India?",
    teaser: "Compare states and territories using the same measure: couples using condoms per 10,000 unsterilized couples in 2019–20.",
    title: "Condom use in India, 2019–20",
    image: "maps_images/condom_north.png",
    alt: "Map showing couples using condoms per 10,000 unsterilized couples across Indian states and territories",
    post: "https://www.instagram.com/p/C8BgXSPthpH/",
    page: "maps/condom-use-india.html",
  },
  {
    topic: "Transport",
    title: "Number of Railway injury/death cases in India, 2022",
    image: "maps_images/accidents.png",
    alt: "Statewise number of railway injury and death cases in 2022.",
    post: "https://www.instagram.com/desidata.info/",
    page: "maps/railway-accidents-india-2022.html",
  },
  {
    topic: "Economics",
    question: "How much money is being spent in Ambani's wedding compared to average rural per capita annual consumption?",
    title: "Ambani's wedding vs rural per capita consumption",
    image: "maps_images/ambani_rural.png",
    alt: "Ambani's estimated wedding cost (₹5000 cr) expressed as a multiple of each state's average rural per capita annual consumption, 2022–23.",
    post: "https://www.instagram.com/desidata.info/",
    page: "maps/ambani-wedding-rural.html",
  },
  {
    topic: "Economics",
    question: "How much money is being spent in Ambani's wedding compared to average urban per capita annual consumption?",
    title: "Ambani's wedding vs urban per capita consumption",
    image: "maps_images/ambani_urban.png",
    alt: "Ambani's estimated wedding cost (₹5000 cr) expressed as a multiple of each state's average urban per capita annual consumption, 2022–23.",
    post: "https://www.instagram.com/desidata.info/",
    page: "maps/ambani-wedding-urban.html",
  },
  {
    topic: "Politics",
    title: "Statewise Billionaire MLAs in India",
    image: "maps_images/billionaires_num.png",
    alt: "Number of billionaire MLAs by state across various assembly elections.",
    post: "https://www.instagram.com/desidata.info/",
    page: "maps/billionaire-mlas-india.html",
  },
  {
    topic: "Search trends",
    question: "…But where's ChatGPT?",
    teaser: "Telangana and Tamil Nadu lead search interest in ChatGPT, while north India lags behind.",
    title: "…But where's ChatGPT? Google search trends across India",
    image: "maps_images/chatgpt_22_29_16_35.png",
    alt: "Statewise Google search intensity for \"ChatGPT\", Jan 22–29 2023.",
    post: "https://www.instagram.com/desidata.info/",
    page: "maps/chatgpt-search-india.html",
  },
  {
    topic: "Public health",
    title: "Female sex workers in targeted HIV interventions",
    image: "maps_images/female_sex_workers.png",
    alt: "Statewise count of female sex workers engaged in targeted HIV intervention projects as of September 2021.",
    post: "https://www.instagram.com/desidata.info/",
    page: "maps/female-sex-workers-india-2021.html",
  },
  {
    topic: "Governance",
    question: "How many times has the internet been shut down in your state?",
    title: "Internet shutdowns in India",
    image: "maps_images/internet_annotated.png",
    alt: "Statewise count of internet shutdowns as of February 2024, led by J&K with 433 shutdowns.",
    post: "https://www.instagram.com/desidata.info/",
    page: "maps/internet-shutdowns-india-2024.html",
  },
  {
    topic: "Education",
    title: "State wise public libraries in India",
    image: "maps_images/libraries.png",
    alt: "Number of public libraries by state across India.",
    post: "https://www.instagram.com/desidata.info/",
    page: "maps/public-libraries-india.html",
  },
  {
    topic: "Education",
    question: "How many schools have no students?",
    title: "Schools with zero enrollment in India, 2024–25",
    image: "maps_images/schools.png",
    alt: "Statewise count of schools with zero student enrollment, 2024–25.",
    post: "https://www.instagram.com/desidata.info/",
    page: "maps/schools-zero-enrollment-2024-25.html",
  },
  {
    topic: "Language",
    question: "How do Indians say the word 'Election'?",
    title: "How do Indians say the word 'Election'?",
    image: "maps_images/translated.png",
    alt: "Map showing the word for election in different Indian languages by state.",
    post: "https://www.instagram.com/desidata.info/",
    page: "maps/how-india-says-election.html",
  }
];

const gallery = document.querySelector("#gallery");
const template = document.querySelector("#card");
for (const map of maps) {
  const card = template.content.cloneNode(true);
  const link = card.querySelector("a");
  if (map.page) {
    link.href = map.page;
    link.removeAttribute("target");
    link.removeAttribute("rel");
  } else {
    link.href = map.post;
  }
  card.querySelector("h2").textContent = map.title;
  const image = card.querySelector("img");
  image.src = map.image;
  image.alt = map.alt;
  gallery.append(card);
}

const spotlight = document.querySelector(".spotlight");
const topicBar = spotlight.querySelector(".topics");
const controls = spotlight.querySelector(".slide-controls");
const pause = controls.querySelector(".pause");
const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
const groups = new Map();
for (const map of maps) {
  if (!map.topic) continue;
  if (!groups.has(map.topic)) groups.set(map.topic, []);
  groups.get(map.topic).push(map);
}
// Keep the original featured map first in each category.
for (const slides of groups.values()) {
  slides.sort((a, b) => Number(Boolean(b.question)) - Number(Boolean(a.question)));
}
let slides = [];
let index = 0;
let paused = motion.matches;
let timer;

function render() {
  const map = slides[index];
  spotlight.querySelector("#question").textContent = map.question || map.title;
  spotlight.querySelector("#teaser").textContent = map.teaser || map.alt;
  spotlight.querySelector("#story-link").href = map.post;
  spotlight.querySelector("#art-link").href = map.post;
  const art = spotlight.querySelector("#art");
  art.src = map.image;
  art.alt = map.alt;
  controls.querySelector("output").textContent = (index + 1) + " / " + slides.length;
  controls.hidden = slides.length < 2;
}

function move(step) {
  index = (index + step + slides.length) % slides.length;
  render();
}

function schedule() {
  clearInterval(timer);
  pause.textContent = paused ? "Play" : "Pause";
  if (!paused && !document.hidden && slides.length > 1) {
    timer = setInterval(() => move(1), 6500);
  }
}

const topicOrder = new Set(["Search trends", "Connectivity", "Public health", ...groups.keys()]);
for (const topic of topicOrder) {
  if (!groups.has(topic)) continue;
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = topic;
  button.onclick = () => {
    slides = groups.get(topic);
    index = 0;
    for (const item of topicBar.children) item.setAttribute("aria-pressed", String(item === button));
    render();
    schedule();
  };
  topicBar.append(button);
}

for (const button of controls.querySelectorAll("[data-step]")) {
  button.onclick = () => {
    paused = true;
    move(Number(button.dataset.step));
    schedule();
  };
}
pause.onclick = () => {
  paused = !paused;
  schedule();
};
document.addEventListener("visibilitychange", schedule);
motion.addEventListener("change", () => { paused = motion.matches; schedule(); });
topicBar.firstElementChild?.click();
