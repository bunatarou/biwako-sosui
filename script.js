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
    description: "水道と増大する電力需要に応えるため建設。水道原水を守る目的で、全線を主にトンネルや埋設管で通し、新旧両水連絡洗堰から第1疏水系統へ連絡して蹴上で合流します。",
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

const flowIndexGroups = [
  { key: "first", selector: "#first .first-facility-row h4" },
  { key: "second", selector: "#second .facility-cards h3" },
  { key: "keage", selector: "#keage .keage-facility-row h4" },
  { key: "branch", selector: "#branch .facility-cards h4" },
  { key: "downstream", selector: "#downstream .downstream-list article h3" },
  { key: "related", selector: "#downstream .facility-note h3" }
];

const iconPaths = {
  water: ["M12 2C9 6 5 10 5 14a7 7 0 0 0 14 0c0-4-4-8-7-12Z", "M8 15a4 4 0 0 0 4 4"],
  tunnel: ["M3 21V12a9 9 0 0 1 18 0v9M3 21h18M7 21v-6m10 6v-6"],
  bridge: ["M3 20V9h18v11M3 13h18M5 20v-7m7 7v-7m7 7v-7M2 20h20"],
  control: ["M3 8h18M5 8v10h14V8M2 18h20M7 11v4m5-4v4m5-4v4"],
  power: ["m13 2-8 12h6l-1 8 9-13h-6z"],
  boat: ["M3 17h18l-3 4H7l-4-4ZM7 14l5-8 5 8M12 6V3"],
  building: ["M4 21V4h16v17M8 21V9h8v12M2 21h20M7 6h2m6 0h2"]
};

function flowIconFor(label) {
  if (/閘門|洗堰|堰|ダム|放水/.test(label)) return iconPaths.control;
  if (/発電|電所|水圧鉄管/.test(label)) return iconPaths.power;
  if (/舟|船|インクライン/.test(label)) return iconPaths.boat;
  if (/トンネル|隧道|導水路/.test(label)) return iconPaths.tunnel;
  if (/橋|水路閣/.test(label)) return iconPaths.bridge;
  if (/水|取水|池/.test(label)) return iconPaths.water;
  return iconPaths.building;
}

if (document.querySelector(".flow-index")) {
  const normalizeFacilityName = (name) => name.replace(/[\s・／/（）()]/g, "");
  const heritageEntries = [...document.querySelectorAll("#inventory .inventory-groups > div")]
    .flatMap((group, index) => [...group.querySelectorAll("li")].map((item) => ({
      name: normalizeFacilityName(item.textContent.trim()),
      status: index === 0 ? "国宝" : "重要文化財"
    })));
  const heritageAliases = new Map([
    ["大津閘門", ["大津閘門及び堰門"]],
    ["大津堰門", ["大津閘門及び堰門"]],
    ["第一トンネル東口洞門", ["第一トンネル"]],
    ["第一トンネル西口洞門", ["第一トンネル"]],
    ["蹴上インクライン", ["インクライン"]],
    ["蹴上船溜インクライン", ["インクライン"]],
    ["蹴上浄水場第一高区配水池", ["蹴上浄水場第一高区配水池"]],
    ["蹴上発電所水圧鉄管", ["蹴上発電所旧本館"]],
    ["夷川閘門夷川発電所", ["夷川閘門", "夷川発電所本館"]],
    ["旧御所水道大日山水源地喞筒所本願寺水道水源池", ["旧御所水道大日山水源地喞筒所", "本願寺水道水源池"]],
    ["新旧両水連絡洗堰合流トンネル", ["新旧両水連絡洗堰", "合流トンネル"]]
  ]);
  const heritageBadgeLabels = new Map([
    ["蹴上船溜インクライン", "インクライン：国宝"],
    ["蹴上浄水場第一高区配水池", "第一高区配水池：重要文化財"],
    ["蹴上発電所水圧鉄管", "旧本館：重要文化財"]
  ]);

  const heritageStatusFor = (label) => {
    const name = normalizeFacilityName(label);
    const targets = heritageAliases.get(name) || [name];
    const matches = targets.map((target) => heritageEntries.find((entry) => entry.name === normalizeFacilityName(target)));
    if (matches.some((entry) => !entry) || new Set(matches.map((entry) => entry.status)).size !== 1) return null;
    return {
      status: matches[0].status,
      badgeLabel: heritageBadgeLabels.get(name) || matches[0].status
    };
  };

  flowIndexGroups.forEach(({ key, selector }) => {
    const list = document.querySelector(`[data-flow-list="${key}"]`);
    const heading = list?.closest(".flow-index-group")?.querySelector("h4");
    const items = [...document.querySelectorAll(selector)];

    if (!list || !heading || items.length === 0) {
      console.error(`Facility index group "${key}" could not be populated.`);
      if (list) {
        const errorItem = document.createElement("li");
        errorItem.textContent = "施設一覧を読み込めませんでした。";
        list.append(errorItem);
      }
      return;
    }

    const count = document.createElement("span");
    count.className = "flow-index-count";
    count.textContent = `（${items.length}件）`;
    heading.append(count);

    items.forEach((item, index) => {
      const label = item.textContent.trim();
      if (!item.id) item.id = `facility-index-${key}-${index + 1}`;

      const link = document.createElement("a");
      link.className = "flow-index-link";
      link.href = `#${item.id}`;

      const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      icon.classList.add("flow-index-icon");
      icon.setAttribute("viewBox", "0 0 24 24");
      icon.setAttribute("aria-hidden", "true");
      flowIconFor(label).forEach((pathData) => {
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", pathData);
        icon.append(path);
      });

      const text = document.createElement("span");
      text.className = "flow-index-label";
      text.textContent = label;
      link.append(icon, text);

      const heritage = heritageStatusFor(label);
      if (heritage) {
        const badge = document.createElement("span");
        badge.className = "flow-heritage-badge";
        badge.textContent = heritage.badgeLabel;
        link.append(badge);
      }

      const entry = document.createElement("li");
      entry.append(link);
      list.append(entry);
    });
  });
}
