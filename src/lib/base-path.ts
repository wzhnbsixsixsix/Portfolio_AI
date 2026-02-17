const normalizeBasePath = (rawBasePath: string) => {
  if (!rawBasePath) {
    return '';
  }

  const withLeadingSlash = rawBasePath.startsWith('/')
    ? rawBasePath
    : `/${rawBasePath}`;

  return withLeadingSlash.endsWith('/')
    ? withLeadingSlash.slice(0, -1)
    : withLeadingSlash;
};

export const withBasePath = (path: string) => {
  if (!path.startsWith('/')) {
    return path;
  }

  const basePath = normalizeBasePath(process.env.NEXT_PUBLIC_BASE_PATH ?? '');
  if (!basePath || path === basePath || path.startsWith(`${basePath}/`)) {
    return path;
  }

  return `${basePath}${path}`;
};
