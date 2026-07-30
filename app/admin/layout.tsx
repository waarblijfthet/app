/**
 * Doorgeefluik. De echte shell (auth + zijmenu) zit in
 * app/admin/(beheer)/layout.tsx, in een eigen route-groep zodat
 * /admin/login buiten die auth-check valt (anders ontstaat een
 * redirect-lus: zie de toelichting daar).
 * Dit bestand kon niet verwijderd worden (schrijfrechten op de NTFS-mount,
 * zie CLAUDE.md "Technische lessen" punt 4), vandaar dat het blijft staan
 * als lege wrapper in plaats van weg te zijn.
 */
export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
