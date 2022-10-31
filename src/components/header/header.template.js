import { defaultTitle } from "../../constants";

const generateName = (state) => {
  return `
     <input type="text" class="input" data-table-title value="${
       state.currentTitle || defaultTitle
     }" />
`;
};

const generateBtns = (btn) => {
  return `

        <div class="button">
          <i class="material-icons">${btn.icon}</i>
        </div>

	`;
};

export function createHeader(state) {
  const btns = [
    {
      icon: "delete",
    },
    {
      icon: "exit_to_app",
    },
  ];

  return generateName(state) + btns.map(generateBtns).join("");
}
