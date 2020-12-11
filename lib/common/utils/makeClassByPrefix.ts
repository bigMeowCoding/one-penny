export default function (prefix: string): (param?: string) => string {
  return (className?: string) => {
    return [prefix, className].filter(Boolean).join("-");
  };
}
