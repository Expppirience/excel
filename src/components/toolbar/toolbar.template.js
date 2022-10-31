function createBtn(btn) {
  return `
      <div
		class="button ${btn.isActive ? "active" : ""}"
	 	data-type="button"
	  >
        <i class="material-icons" data-value='${JSON.stringify(btn.value)}'>${
    btn.icon
  }</i>
      </div>	
	`;
}

export function createToolbar(state) {
  const buttons = [
    {
      icon: "format_align_left",
      isActive: state.textAlign === "left",
      value: { textAlign: "left" },
    },
    {
      icon: "format_align_center",
      isActive: state.textAlign === "center",
      value: { textAlign: "center" },
    },
    {
      icon: "format_align_right",
      isActive: state.textAlign === "right",
      value: { textAlign: "right" },
    },
    {
      icon: "format_bold",
      isActive: state.fontWeight === "700",
      value: { fontWeight: state.fontWeight === "700" ? "normal" : "700" },
    },
    {
      icon: "format_italic",
      isActive: state.fontStyle === "italic",
      value: { fontStyle: state.fontStyle === "italic" ? "normal" : "italic" },
    },
    {
      icon: "format_underline",
      isActive: state.textDecoration === "underline",
      value: {
        textDecoration:
          state.textDecoration === "underline" ? "none" : "underline",
      },
    },
  ];
  return buttons.map(createBtn).join("");
}
