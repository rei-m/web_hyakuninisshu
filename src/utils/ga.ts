export const gaEvent = (category: string, action: string, label: string) => {
  if (window.ga) {
    window.ga(`send`, `event`, {
      eventCategory: category,
      eventAction: action,
      eventLabel: label,
    });
  } else {
    console.info(`[ga send]`, {
      category,
      action,
      label,
    });
  }
};
