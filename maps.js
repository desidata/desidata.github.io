// Add one entry per post. Image paths are relative to index.html.
const maps = [
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

const stories = maps.filter(map => map.question);
const topicBar = document.querySelector(".topics");
function showStory(map) {
  document.querySelector("#question").textContent = map.question;
  document.querySelector("#teaser").textContent = map.teaser;
  document.querySelector("#story-link").href = map.post;
  document.querySelector("#art-link").href = map.post;
  const artwork = document.querySelector("#art");
  artwork.src = map.image;
  artwork.alt = map.alt;
  for (const button of topicBar.children) {
    button.setAttribute("aria-pressed", String(button.textContent === map.topic));
  }
}
for (const map of stories) {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = map.topic;
  button.addEventListener("click", () => showStory(map));
  topicBar.append(button);
}
showStory(stories[0]);
