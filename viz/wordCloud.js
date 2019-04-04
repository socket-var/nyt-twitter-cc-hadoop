const cloudContainer = document.querySelector(".word-cloud");
console.log(cloudContainer);
const layout = d3.layout
  .cloud()
  .size([cloudContainer.clientWidth, window.innerHeight]);

function draw(words) {
  d3.select("div.word-cloud")
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

const handleClick = evt => {
  filename = evt.target.dataset.href;
  history.pushState((data = {}), (title = filename), (url = `/${filename}`));

  d3.text(`./${filename}.txt`).then(result => {
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

    layout
      .words(
        results.slice(1, 20).map(function(d) {
          return { text: d, size: 10 + Math.random() * 90 };
        })
      )
      .rotate(function() {
        return ~~(Math.random() * 2) * 90;
      })
      .fontSize(function(d) {
        return d.size;
      })
      .on("end", draw)
      .start();
  });
};

const onLoad = event => {
  const navItems = document.querySelectorAll(".nav-item");
  navItems.forEach(node => {
    node.addEventListener("click", handleClick);
  });
};

window.addEventListener("DOMContentLoaded", onLoad);
