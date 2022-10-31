import { storage } from "./../core/utils";
function toHTML(key) {
  const { currentTitle, lastSeen } = storage(key, false);
  return `
		<li class="db__record">
			<a href="#excel/${key.split("-")[1]}">${currentTitle}</a>
			<strong>${lastSeen}</strong>
		</li>
	`;
}

function getAllKeys() {
  const keys = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key.includes("excel")) {
      continue;
    }
    keys.push(key);
  }
  return keys;
}

export function createRecordsTable() {
  const keys = getAllKeys();
  if (!keys.length) {
    return `<p>Вы пока не создали ни одной таблицы</p>`;
  }

  return `
			<div class="db__list-header">
				<span>Название</span>
				<span>Дата открытия</span>
			</div>

			<ul className="db__list">
				${keys.map(toHTML).join("")}
			</ul>

`;
}
