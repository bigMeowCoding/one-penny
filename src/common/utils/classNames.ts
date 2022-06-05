function classNames(...names: (string | undefined | null)[]): string {
  return names
    .filter(Boolean)
    .map((item) => {
      return item?.trim();
    })
    .join(" ");
}

export default classNames;
