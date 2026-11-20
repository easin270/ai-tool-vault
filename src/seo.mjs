// Only emit URL-bearing structured data after the real origin is configured.
export function breadcrumbSchema(base, path, title, section) {
  if (!base || path === '/' || path === '/404/') return '';
  const crumbs = [{ name: 'Home', item: base + '/' }];
  if (section) crumbs.push({ name: 'Guides', item: base + '/guides/' });
  crumbs.push({ name: title, item: base + path });
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, i) => ({ '@type': 'ListItem', position: i + 1, ...crumb })),
  };
  return '<script type="application/ld+json">' + JSON.stringify(schema).replace(/</g, '\\u003c') + '</script>';
}
