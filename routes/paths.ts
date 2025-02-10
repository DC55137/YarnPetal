// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = "/auth";
const ROOTS_DASHBOARD = "/dashboard";

// ----------------------------------------------------------------------

export const PATH_AUTH = {};

export const PATH_PAGE = {
  root: "/",
  create: "/create",
  bundles: "/bundles",
  about: "/about",
  contact: "/contact",
  checkout: "/checkout",
  gallery: "/gallery",
};
