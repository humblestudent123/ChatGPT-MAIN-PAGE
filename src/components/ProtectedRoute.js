export default function ProtectedRoute({ user, children }) {
  if (!user) {
    return <p style={{ padding: '50px', textAlign: 'center' }}>Пожалуйста, войдите чтобы продолжить</p>;
  }
  return children;
}
