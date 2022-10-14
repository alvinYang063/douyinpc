let content = document.querySelector(".main .content")

async function init() {

    // 请求数据
    const res = await fetch("./js/data.json").then(resp => {
        return resp.json()
    })
    for (const iterator of res) {
        createItem(iterator);
    }
    console.log(res);
}


function createItem(data) {
    // 创建item
    let div = document.createElement("div");
    div.classList.add("item");
    let videoFlag = false;
    div.innerHTML = `<a href="https://www.douyin.com/video/${data.videoId}" target="_blank" class="cover">
    <img src="${data.cover}" alt="" />
    <div class="footer">
      <i class="iconfont icon-zan"></i>
      <div class="play">${data.favor}</div>
      <div class="timelong">${data.time}</div>
    </div>
    <div class="progress">
        <span></span>
    </div>
  </a>
  <h2 class="title">
    ${data.title}
  </h2>
  <div class="author">
    <a href="">
      <img
        src="${data.author.avatar}"
        alt=""
      />
      <span>${data.author.name}</span>
    </a>
    <div class="pubdate">${data.date}</div>
  </div>`
    content.appendChild(div);
    let pro = div.querySelector(".progress span");
    let proce = div.querySelector(".progress")
    console.log(pro);
    let cover = div.querySelector(".cover")
    let vd = new VideoController(data.video, function () {
        pro.style.width = vd.progess + "%";
    })
    let coverI = div.querySelector(".cover")
    coverI.addEventListener("mouseenter", async function () {
        div.classList.add("playing");
        let vdom = await vd.play();
        if (!videoFlag) {
            div.querySelector(".cover").insertBefore(vdom, proce)
        }
    })
    coverI.addEventListener("mouseleave", async function () {
        div.classList.remove("playing");
        await vd.pause();
    })

}

init();