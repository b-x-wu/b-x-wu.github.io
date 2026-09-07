import { getById } from "~/lib/dom";
import type { ColorToken } from "~/styles/tokens";

export type IconLinkProps = {
  "aria-label": string;
  src: string;
  href: string;
  id?: string;
  rel?: string;
  target?: astroHTML.JSX.HTMLAttributeAnchorTarget;
  color?: ColorToken;
};

export const updateIconLink = (
  id: string,
  { "aria-label": ariaLabel, src, color, href }: Partial<IconLinkProps>,
): void => {
  const link = getById(id);
  const span = link.querySelector("span");

  if (span === null) {
    throw new Error();
  }

  if (src !== undefined) {
    span.style.setProperty("--bg-image", `url(${src})`);
  }

  if (color !== undefined) {
    span.style.setProperty("--icon-color", `var(--color-${color})`);
  }

  if (ariaLabel !== undefined) {
    link.setAttribute("aria-label", ariaLabel);
  }

  if (href !== undefined) {
    link.setAttribute("href", href);
  }
};
