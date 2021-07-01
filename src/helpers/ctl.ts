export default function ctl(template: string): string {
  const trimmedClassnames = template.replace(/\s+/gm, " ");
  const formattedClassnames = trimmedClassnames
    .split(" ")
    .filter((c) => c !== "false" && c !== "true" && c !== "undefined")
    .join(" ")
    .trim();

  return formattedClassnames;
}