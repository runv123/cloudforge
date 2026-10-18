
const $ = (selector) => document.querySelector(selector);

const apiInput = $("#apiUrl");
const checkButton = $("#checkApi");
const apiBadge = $("#apiBadge");
const apiResult = $("#apiResult");
const apiStatus = $("#apiStatus");

const savedUrl = localStorage.getItem("cloudforge.apiUrl");

if (savedUrl) {
  apiInput.value = savedUrl;
}

function showStatus(state, message) {
  apiBadge.className = "badge";
  apiResult.className = "connection-result";

  if (state === "online") {
    apiBadge.textContent = "在线";
    apiBadge.classList.add("online");
    apiResult.classList.add("success");
    apiStatus.textContent = "在线";
  } else if (state === "offline") {
    apiBadge.textContent = "连接失败";
    apiBadge.classList.add("offline");
    apiResult.classList.add("error");
    apiStatus.textContent = "异常";
  } else {
    apiBadge.textContent = "检测中";
    apiStatus.textContent = "检测中";
  }

  apiResult.textContent = message;
}

async function checkApi() {
  let rootUrl;

  try {
    rootUrl = new URL(apiInput.value.trim());
  } catch {
    showStatus("offline", "请先输入有效的 API Worker 地址。");
    return;
  }

  if (rootUrl.protocol !== "https:") {
    showStatus("offline", "为了安全，API 地址必须使用 HTTPS。");
    return;
  }

  if (rootUrl.username || rootUrl.password) {
    showStatus("offline", "地址中不能包含用户名或密码。");
    return;
  }

  if (rootUrl.search || rootUrl.hash) {
    showStatus("offline", "请填写不带查询参数和片段的 API 根地址。");
    return;
  }

  const apiRoot = rootUrl.origin + rootUrl.pathname.replace(/\/+$/, "");

  checkButton.disabled = true;
  checkButton.textContent = "检测中…";
  showStatus("checking", "正在请求 API 健康检查接口…");

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch(`${apiRoot}/api/health`, {
      method: "GET",
      headers: { Accept: "application/json" },
      cache: "no-store",
      signal: controller.signal
    });

    const contentType = response.headers.get("content-type") || "";

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    if (!contentType.includes("application/json")) {
      throw new Error("服务器没有返回 JSON，请检查 API 地址。");
    }

    const data = await response.json();

    if (data.ok !== true || data.service !== "cloudforge-api") {
      throw new Error("返回内容不符合 CloudForge API 健康检查格式。");
    }

    localStorage.setItem("cloudforge.apiUrl", apiRoot);

    showStatus(
      "online",
      `连接成功：${data.service} · ${data.status} · ${data.time}`
    );
  } catch (error) {
    const message = error.name === "AbortError"
      ? "请求超时：请检查网络或 API Worker 是否在线。"
      : error instanceof TypeError
        ? "网络请求失败。请检查网址、网络状态及后端 CORS 配置。"
        : error.message;

    showStatus("offline", message);
  } finally {
    clearTimeout(timeout);
    checkButton.disabled = false;
    checkButton.textContent = "检查连接";
  }
}

checkButton.addEventListener("click", checkApi);

apiInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    checkApi();
  }
});

const menuButton = $("#menuButton");
const sidebar = $("#sidebar");
const backdrop = $("#sidebarBackdrop");

function closeSidebar() {
  sidebar.classList.remove("open");
  backdrop.classList.remove("show");
}

menuButton.addEventListener("click", () => {
  sidebar.classList.toggle("open");
  backdrop.classList.toggle("show");
});

backdrop.addEventListener("click", closeSidebar);

document.querySelectorAll(".navigation a").forEach((link) => {
  link.addEventListener("click", closeSidebar);
});

$("#homeStatus").textContent = "已加载";

console.info("CloudForge Home initialized.");
