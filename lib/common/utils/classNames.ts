function classNames(...names: (string | undefined)[]): string {
  return names.filter(Boolean).join(" ");
}

export default classNames;
