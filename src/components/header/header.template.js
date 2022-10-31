import { defaultTitle } from "../../constants";

const generateName = (state) => {
  return `
     <input type="text" class="input" data-table-title value="${
       state.currentTitle || defaultTitle
     }" />
`;
};

const generateBtns = ({ icon, action }) => {
  return `

        <div class="button" data-action="${action}">
          <i class="material-icons" >${icon}</i>
        </div>

	`;
};

export function createHeader(state) {
  const btns = [
    {
      icon: "delete",
      action: "delete",
    },
    {
      icon: "exit_to_app",
      action: "exit",
    },
  ];

  return generateName(state) + btns.map(generateBtns).join("");
}
