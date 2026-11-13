// Add one entry per post. Image paths are relative to index.html.
const maps = [
  {
    question: "Where did a cockroach become a political curiosity?",
    title: "How India googled the Cockroach Janta Party",
    image: "cockroach_trend.png",
    alt: "Google Trends map of relative search interest across India, May 19–21",
    post: "https://www.instagram.com/desidata.info/"
  },
  {
    question: "How connected is rural India?",
    title: "Internet penetration in rural India",
    image: "internet-preview.jpg",
    alt: "Frame from a district-by-district animation of rural internet penetration",
    post: "https://www.instagram.com/desidata.info/"
  },
  {
    question: "How does condom use vary across India?",
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
  card.querySelector(".question").textContent = map.question || "";
  const image = card.querySelector("img");
  image.src = map.image;
  image.alt = map.alt;
  gallery.append(card);
}
