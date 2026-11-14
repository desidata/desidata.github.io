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
    const titles = {
      "child_marriage.csv": "Marriage before 18",
      "condoms.xls": "Condom use in India",
      "dynasty.xlsx": "Dynasty in Democracy",
      "female_director.csv": "Startups with a woman director",
      "hiv_2023.xlsx": "HIV prevalence"
    };

    function title(file) {
      return titles[file.name] || file.label ||
        file.name.replace(/\.[^.]+$/, "").replace(/[_-]+/g, " ");
    }

    document.querySelector("#downloads").textContent = total.toLocaleString();
    document.querySelector("#available").textContent = files.length;
    document.querySelector("#popular").textContent = highest
      ? files.filter(file => file.download_count === highest).map(title).join(" · ")
      : "No downloads yet";

    const filesByTitle = new Map(files.map(file => [title(file), file]));
    const sourceList = document.querySelector(".sources");

    // Remove rows generated on a previous refresh before rebuilding them.
    sourceList.querySelectorAll("[data-release-row]").forEach(row => row.remove());

    function showDownload(term, file) {
      const link = document.createElement("a");
      link.href = file.browser_download_url;
      link.textContent = title(file);
      link.setAttribute("aria-label", "Download " + title(file));
      link.style.color = "var(--accent)";
      link.style.textDecoration = "underline";
      link.style.textUnderlineOffset = "3px";
      term.replaceChildren(link);
    }

    for (const term of sourceList.querySelectorAll("dt")) {
      const name = term.textContent.trim();
      const file = filesByTitle.get(name);

      if (file) {
        showDownload(term, file);
        filesByTitle.delete(name);
      } else {
        term.textContent = name;
      }
    }

    // Show future uploads even before you add their source credits.
    for (const file of filesByTitle.values()) {
      const row = document.createElement("div");
      row.dataset.releaseRow = "";
      const term = document.createElement("dt");
      const source = document.createElement("dd");
      source.textContent = "Source details pending";
      showDownload(term, file);
      row.append(term, source);
      sourceList.append(row);
    }

    const list = document.querySelector("#files");
    list.replaceChildren();
    list.hidden = true;
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
