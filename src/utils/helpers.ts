export const customEventEmitter = (eventType: string, detail?: object) => {
  document.dispatchEvent(
    new CustomEvent(eventType, {
      detail,
    }),
  );
};
