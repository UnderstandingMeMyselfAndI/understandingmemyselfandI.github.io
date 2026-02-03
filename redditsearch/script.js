let after = "";
let before = "";
let count = 0;

document.getElementById("searchButton").addEventListener("click", () => {
    count = 0;
    fetchResults();
});

document.getElementById("prevButton").addEventListener("click", () => {
    count -= 25;
    fetchResults(before);
});

document.getElementById("nextButton").addEventListener("click", () => {
    count += 25;
    fetchResults(after);
});

function fetchResults(page = "") {
    const searchTerm = document.getElementById("searchInput").value;
    const subreddit = document.getElementById("subredditInput").value.trim();
    const timeFilter = document.getElementById("timeFilter").value;
    const resultsContainer = document.getElementById("results");
    const loader = document.getElementById("loader");
    const errorContainer = document.getElementById("error");
    const paginationContainer = document.getElementById("pagination");
    const statsContainer = document.getElementById("stats");
    const resultsCount = document.getElementById("resultsCount");
    const pageInfo = document.getElementById("pageInfo");

    resultsContainer.innerHTML = "";
    errorContainer.classList.add("hidden");
    paginationContainer.classList.add("hidden");
    statsContainer.classList.add("hidden");

    if (searchTerm) {
        loader.classList.remove("hidden");
        let url = "";
        if (subreddit) {
            url = `https://www.reddit.com/r/${subreddit}/search.json?q=${searchTerm}&restrict_sr=on&t=${timeFilter}&count=${count}`;
        } else {
            url = `https://www.reddit.com/search.json?q=${searchTerm}&t=${timeFilter}&count=${count}`;
        }
        
        if (page && count > 0) {
            url += `&after=${page}`;
        } else if (page && count < 0) {
            url += `&before=${page}`;
        }

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data => {
                loader.classList.add("hidden");
                after = data.data.after;
                before = data.data.before;

                if (data.data.children.length === 0) {
                    resultsContainer.innerHTML = "No results found.";
                    return;
                }
                
                statsContainer.classList.remove("hidden");
                resultsCount.innerText = `Showing ${data.data.children.length} results`;
                pageInfo.innerText = `Page ${Math.floor(count / 25) + 1}`;

                paginationContainer.classList.remove("hidden");
                document.getElementById("prevButton").disabled = !before;
                document.getElementById("nextButton").disabled = !after;

                data.data.children.forEach(child => {
                    const post = child.data;
                    const postElement = document.createElement("div");

                    const title = post.title || "";
                    const selftext = post.selftext || "";
                    const searchTerm = document.getElementById("searchInput").value;
                    
                    if (!searchTerm.trim()) {
                        postElement.innerHTML = `
                            <p class="subreddit">r/${post.subreddit}</p>
                            <a href="https://www.reddit.com${post.permalink}" target="_blank">${title}</a>
                        `;
                        resultsContainer.appendChild(postElement);
                        return;
                    }

                    const regex = new RegExp(searchTerm.trim(), "gi");

                    const highlightedTitle = title.replace(regex, (match) => `<span class="highlight">${match}</span>`);
                    
                    let selftextHTML = "";
                    if (selftext) {
                        const highlightedSelftext = selftext.replace(regex, (match) => `<span class="highlight">${match}</span>`);
                        if (highlightedSelftext !== selftext) {
                            selftextHTML = `<p class="selftext">${highlightedSelftext}</p>`;
                        }
                    }

                    postElement.innerHTML = `
                        <p class="subreddit">r/${post.subreddit}</p>
                        <a href="https://www.reddit.com${post.permalink}" target="_blank">${highlightedTitle}</a>
                        ${selftextHTML}
                    `;
                    resultsContainer.appendChild(postElement);
                });
            })
            .catch(error => {
                loader.classList.add("hidden");
                errorContainer.innerText = `Error: ${error.message}`;
                errorContainer.classList.remove("hidden");
                console.error("Error fetching data:", error);
            });
    }
}