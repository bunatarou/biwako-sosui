const routeData = {
  first: {
    tab: "tab-first",
    title: "第1疏水",
    kicker: "THE ORIGINAL CANAL · 1890",
    description: "三保ヶ崎から長等山を抜け、山科を通って蹴上へ。舟運・動力・灌漑・防火を支え、鴨川沿いから伏見方面へ続く水路網の骨格となりました。",
    stats: [["8.35", "m³/s · 計画流量"], ["2,436", "m · 第1隧道"]],
    note: "1885年着工、1890年竣工。大津～鴨川合流点の完成後、伏見方面へ延伸。",
    routeClass: ".route-first"
  },
  second: {
    tab: "tab-second",
    title: "第2疏水",
    kicker: "A NEW WATERWAY · 1912",
    description: "水道と増大する電力需要に応えるため建設。水道原水を守る目的で、全線を主にトンネルや埋設管で通し、蹴上で第1疏水に合流します。",
    stats: [["15.3", "m³/s · 計画流量"], ["7.4", "km · 延長"]],
    note: "1908年着工、1912年完成。琵琶湖の水位低下に備える連絡トンネルは1999年通水。",
    routeClass: ".route-second"
  },
  branch: {
    tab: "tab-branch",
    title: "疏水分線",
    kicker: "THE BRANCH CANAL · 1890",
    description: "蹴上から分かれ、南禅寺・若王子・吉田山東北側を経て北へ向かう水路。沿線の水力利用、灌漑、防火用水を担い、哲学の道はその流れに沿う散策路です。",
    stats: [["8.4", "km · 明治期の延長"], ["3.3", "km · 現在の管理区間"]],
    note: "明治期の水路延長と、所管替え後の現在の管理区間は対象が異なります。",
    routeClass: ".route-branch"
  }
};

const tabs = [...document.querySelectorAll(".route-tab")];
const panel = document.querySelector("#route-panel");

function selectRoute(key, moveFocus = false) {
  const route = routeData[key];
  if (!route) return;

  tabs.forEach((tab) => {
    const selected = tab.id === route.tab;
    tab.classList.toggle("is-active", selected);
    tab.setAttribute("aria-selected", String(selected));
    tab.tabIndex = selected ? 0 : -1;
    if (selected && moveFocus) tab.focus();
  });

  panel.setAttribute("aria-labelledby", route.tab);
  document.querySelector("#route-title").textContent = route.title;
  document.querySelector("#route-kicker").textContent = route.kicker;
  document.querySelector("#route-description").textContent = route.description;
  document.querySelector("#route-note").textContent = route.note;
  const stats = document.querySelector("#route-stats");
  stats.replaceChildren(...route.stats.map(([value, label]) => {
    const item = document.createElement("div");
    const number = document.createElement("strong");
    const caption = document.createElement("span");
    number.textContent = value;
    caption.textContent = label;
    item.append(number, caption);
    return item;
  }));

  document.querySelectorAll(".map-route").forEach((line) => line.classList.remove("is-selected"));
  document.querySelector(route.routeClass).classList.add("is-selected");
}

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => selectRoute(tab.dataset.route));
  tab.addEventListener("keydown", (event) => {
    let nextIndex;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
    if (event.key === "ArrowLeft") nextIndex = (index - 1 + tabs.length) % tabs.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = tabs.length - 1;
    if (nextIndex !== undefined) {
      event.preventDefault();
      selectRoute(tabs[nextIndex].dataset.route, true);
    }
  });
});

document.querySelectorAll(".mobile-nav nav a").forEach((link) => {
  link.addEventListener("click", () => {
    document.querySelector(".mobile-nav").open = false;
  });
});
