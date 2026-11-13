// Add one entry per post. Image paths are relative to index.html.
const maps = [
  {
    topic: "Public health",
    "title": "Women aged 20–24 who married before 18, 2019–21",
    "image": "cm_labeled.webp",
    "alt": "NFHS-5 map showing the percentage by state and union territory.",
    "post": "https://www.instagram.com/desidata.info/"
  },
  {
    topic: "Politics",
    "title": "Dynasty in Democracy",
    "image": "dynasty.webp",
    "alt": "Share of sitting MPs, MLAs and MLCs with dynastic backgrounds by state and union territory.",
    "post": "https://www.instagram.com/desidata.info/"
  },
  {
    topic: "Business",
    "title": "Startups with a woman director, 2025",
    "image": "female_director.webp",
    "alt": "Statewise counts of startups with at least one woman director.",
    "post": "https://www.instagram.com/desidata.info/"
  },
  {
    topic: "Search trends",
    "title": "Where India searched for “Ghibli”",
    "image": "ghibli.webp",
    "alt": "Relative Google search interest by state, March 24–31, 2025.",
    "post": "https://www.instagram.com/desidata.info/"
  },
  {
    topic: "Public health",
    "title": "HIV prevalence in India, 2023",
    "image": "hiv_pos.webp",
    "alt": "Map of HIV prevalence percentages by state and union territory.",
    "post": "https://www.instagram.com/desidata.info/"
  },
  {
    topic: "Search trends",
    question: "Where did a cockroach become a political curiosity?",
    teaser: "From Delhi to Mizoram, trace Google search interest in the Cockroach Janta Party.",
    title: "How India googled the Cockroach Janta Party",
    image: "cockroach_trend.png",
    alt: "Google Trends map of relative search interest across India, May 19–21",
    post: "https://www.instagram.com/desidata.info/"
  },
  {
    topic: "Connectivity",
    question: "How connected is rural India?",
    teaser: "Look beyond state averages with a district-by-district view of rural internet penetration.",
    title: "Internet penetration in rural India",
    image: "internet-preview.jpg",
    alt: "Frame from a district-by-district animation of rural internet penetration",
    post: "https://www.instagram.com/desidata.info/"
  },
  {
    topic: "Public health",
    question: "How does condom use vary across India?",
    teaser: "Compare states and territories using the same measure: couples using condoms per 10,000 unsterilized couples in 2019–20.",
    title: "Condom use in India, 2019–20",
    image: "condom_north.png",
    alt: "Map showing couples using condoms per 10,000 unsterilized couples across Indian states and territories",
    post: "https://www.instagram.com/p/C8BgXSPthpH/"
  }
];

const gallery = document.querySelector("#gallery");
const template = document.querySelector("#card");
for (const map of maps) {
  const card = template.content.cloneNode(true);
  card.querySelector("a").href = map.post;
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
