// load issues from API
let allIssues = [];

const loadIssues = async () => {
  showLoader();

  const res = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues",
  );

  const data = await res.json();

  allIssues = data.data;

  displayIssues(allIssues);

  updateIssueCount(allIssues.length);

  hideLoader();
};

//spinner
const showLoader = () => {
  document.getElementById("loader").classList.remove("hidden");
};

const hideLoader = () => {
  document.getElementById("loader").classList.add("hidden");
};

// display issues
const displayIssues = (issues) => {
  const container = document.getElementById("issues");

  container.innerHTML = "";

  issues.forEach((issue) => {
    const div = document.createElement("div");

    div.onclick = () => openModal(issue);

    const borderColor =
      issue.status === "open" ? "border-green-400" : "border-indigo-400";

    div.className = `bg-white rounded-2xl border-t-[6px] ${borderColor} shadow-sm p-6 hover:shadow-xl transition`;

    div.innerHTML = `
<div class="flex justify-between items-start mb-4">

  <div class="p-2 bg-green-50 rounded-lg text-green-500">
    <i class="fa-solid fa-bug"></i>
  </div>

  <span class="text-[10px] font-black px-3 py-1 rounded-md text-red-600 bg-red-50 border border-red-100">
    ${issue.priority?.toUpperCase()}
  </span>

</div>

<h3 class="font-bold text-slate-800 text-base mb-2 leading-snug">
  ${issue.title}
</h3>

<p class="text-slate-500 text-xs mb-5 line-clamp-2 leading-relaxed">
  ${issue.description}
</p>

<div class="flex flex-wrap gap-2 mb-6">

  <span class="text-[10px] font-black text-red-500 bg-red-50 px-2 py-1 rounded border border-red-100 flex items-center gap-1 uppercase">
    <span class="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
    ${issue.labels}
  </span>

  ${
    issue.helpWanted
      ? `<span class="text-[10px] font-black text-orange-500 bg-orange-50 px-2 py-1 rounded border border-orange-100 flex items-center gap-1 uppercase">
        <span class="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
        Help Wanted
      </span>`
      : ""
  }

</div>

<div class="pt-4 border-t border-gray-100 flex justify-between items-center text-[11px] text-slate-400 font-medium">
  <span>#${issue.id || 1} by ${issue.author}</span>
  <span>${new Date(issue.createdAt).toLocaleDateString()}</span>
</div>
`;

    container.appendChild(div);
  });
};

loadIssues();

const updateIssueCount = (count) => {
  document.getElementById("issueCount").innerText = `${count} Issues`;
};

const filterIssues = (status, btn) => {
  setActiveButton(btn);

  if (status === "all") {
    displayIssues(allIssues);
    updateIssueCount(allIssues.length);
    return;
  }

  const filtered = allIssues.filter(
    (issue) => issue.status.toLowerCase() === status,
  );

  displayIssues(filtered);
  updateIssueCount(filtered.length);
};

const setActiveButton = (clickedBtn) => {
  const buttons = document.querySelectorAll(".tab-btn");

  buttons.forEach((btn) => {
    btn.classList.remove("bg-[#5800FF]", "text-white");
    btn.classList.add("text-slate-500");
  });

  clickedBtn.classList.add("bg-[#5800FF]", "text-white");
};

// search

const searchIssues = async () => {
  showLoader();

  const searchText = document.getElementById("searchInput").value;

  const res = await fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchText}`,
  );

  const data = await res.json();

  displayIssues(data.data);
  updateIssueCount(data.data.length);

  hideLoader();
};

// modal
const openModal = (issue) => {
  document.getElementById("modalTitle").innerText = issue.title;

  document.getElementById("modalDescription").innerText = issue.description;

  document.getElementById("modalAuthor").innerText = issue.author;

  document.getElementById("modalAssignee").innerText = issue.author;

  document.getElementById("modalDate").innerText = new Date(
    issue.createdAt,
  ).toLocaleDateString();

  document.getElementById("modalPriority").innerText =
    issue.priority?.toUpperCase();

  const statusEl = document.getElementById("modalStatus");

  statusEl.innerText = issue.status === "open" ? "Opened" : "Closed";

  // status color change
  if (issue.status === "open") {
    statusEl.className =
      "px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700";
  } else {
    statusEl.className =
      "px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700";
  }

  document.getElementById("issueModal").showModal();
};
