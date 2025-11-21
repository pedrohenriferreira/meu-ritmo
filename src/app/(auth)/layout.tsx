export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Layout sem sidebar para telas de autenticação
  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
}
