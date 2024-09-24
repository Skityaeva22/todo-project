export function defineStatus(isCompleted: boolean): { type: "success" | "warning" | "info" | "primary" | "danger", text: string } {
  switch (isCompleted) {
    case true:
      return {
        type: "success",
        text: "Выполнено",
      };
    case false:
      return {
        type: "danger",
        text: "Не выполнено",
      };
    default:
      return {
        type: "info",
        text: "Неизвестно",
      };
  };
};
