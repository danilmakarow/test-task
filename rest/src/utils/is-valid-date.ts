export const isValidDate = (date: Date): boolean =>
  !isNaN(date as unknown as number);
