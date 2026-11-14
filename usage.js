// For a custom domain, enter "owner/repository" here.
const repositoryOverride = "";

const owner = location.hostname.split(".")[0];
const firstPath = location.pathname.split("/").filter(Boolean)[0];
const repository = repositoryOverride || owner + "/" +
  (firstPath && !firstPath.endsWith(".html") ? firstPath : location.hostname);

const releasePage = "https://github.com/" + repository + "/releases/tag/first_upload";
const note = document.querySelector("#usage-note");
let loading = false;

async function loadDownloads() {
  if (loading) return;
  loading = true;

  try {
    const response = await fetch(
      "https://api.github.com/repos/" + repository + "/releases/tags/first_upload",
      { cache: "no-cache" }
    );

    if (!response.ok) throw new Error(String(response.status));

    const release = await response.json();
    const files = release.assets.filter(file => file.state === "uploaded");
    const total = files.reduce((sum, file) => sum + file.download_count, 0);
    const highest = Math.max(0, ...files.map(file => file.download_count));
    const title = file => file.label || file.name;

    document.querySelector("#downloads").textContent = total.toLocaleString();
    document.querySelector("#available").textContent = files.length;
    document.querySelector("#popular").textContent = highest
      ? files.filter(file => file.download_count === highest).map(title).join(" · ")
      : "No downloads yet";

    const list = document.querySelector("#files");

    list.replaceChildren(...files.map(file => {
      const item = document.createElement("li");
      const link = document.createElement("a");

      link.href = file.browser_download_url;
      link.textContent = "Download " + title(file);
      item.append(link, " · " + file.download_count.toLocaleString() + " downloads");

      return item;
    }));

    list.hidden = !files.length;
    note.textContent = files.length
      ? "Counts reported by GitHub for the files listed below."
      : "No dataset files have been attached yet.";
  } catch (error) {
    if (error.message === "404") {
      note.textContent = "The public datasets release could not be found.";
    } else {
      const link = document.createElement("a");
      link.href = releasePage;
      link.textContent = "Browse dataset downloads on GitHub";
      note.replaceChildren("Statistics are temporarily unavailable. ", link);
    }
  } finally {
    loading = false;
  }
}

window.addEventListener("pageshow", loadDownloads);
window.addEventListener("focus", loadDownloads);
