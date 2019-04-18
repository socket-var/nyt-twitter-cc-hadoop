const cloudContainer = document.querySelector(".word-cloud-container");

function draw(layout, selector, words) {
  d3.select(selector)
    .append("svg")
    .attr("width", layout.size()[0])
    .attr("height", layout.size()[1])
    .append("g")
    .attr(
      "transform",
      `translate(${layout.size()[0] / 2}, ${layout.size()[1] / 2})`
    )
    .selectAll("text")
    .data(words)
    .enter()
    .append("text")
    .style("font-size", function(d) {
      return d.size + "px";
    })
    .attr("text-anchor", "middle")
    .attr("transform", function(d) {
      return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
    })
    .text(function(d) {
      return d.text;
    });
}

const showWordCloud = async (source, filename, selector) => {
  console.log(`./src/${source}/${source}_${filename}.txt`);
  const result = await d3.text(`./src/${source}/${source}_${filename}.txt`);
  words = result.split("\n");
  rows = words.map(word => {
    [w, count] = word.split("\t");
    count = parseInt(count);
    return { word: w, count };
  });

  sorted_words = rows.sort((a, b) => {
    return a.count < b.count;
  });

  results = sorted_words.map(item => item.word);

  const layout = d3.layout
    .cloud()
    .size([cloudContainer.clientWidth, window.innerHeight]);
  layout
    .words(
      results.slice(1, 100).map(function(d) {
        return { text: d, size: 10 + Math.random() * 90 };
      })
    )
    .rotate(function() {
      return ~~(Math.random() * 2) * 90;
    })
    .fontSize(function(d) {
      return d.size;
    })
    .on("end", draw.bind(null, layout, selector))
    .start();
};

const handleClick = async evt => {
  const wordClouds = document.querySelectorAll("div.word-cloud");
  // check if came from "/"

  if (window.location.push)
    wordClouds.forEach(cloud => {
      cloud.innerHTML = "";
    });

  filename = evt.target.dataset.href;
  history.pushState((data = {}), (title = filename), (url = `/${filename}`));

  showWordCloud("nyt", filename, "div.wc-nyt");
  showWordCloud("nyt", `${filename}_cooc`, "div.wcooc-nyt");
  showWordCloud("common_crawl", filename, "div.wc-cc");
  showWordCloud("common_crawl", `${filename}_cooc`, "div.wcooc-cc");
  // showWordCloud("twitter", filename);
};

const onLoad = event => {
  if (window.location.pathname == "/") {
    const cloudContainer = document.querySelector("div.word-cloud-container");
    cloudContainer.style.display = "none";
  }

  const listener = () => {
    const jumbotron = document.querySelector(".jumbotron");
    const cloudContainer = document.querySelector("div.word-cloud-container");
    if (window.location.pathname == "/") {
      jumbotron.style.display = "block";
      cloudContainer.style.display = "none";
    } else {
      jumbotron.style.display = "none";
      cloudContainer.style.display = "block";
    }
  };

  window.addEventListener("popstate", listener);

  const navItems = document.querySelectorAll(".nav-item");
  navItems.forEach(node => {
    node.addEventListener("click", handleClick);
  });
};

window.addEventListener("DOMContentLoaded", onLoad);
