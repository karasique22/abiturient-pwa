export async function getMe() {
  try {
    const res = await fetch('/api/users/me', {
      credentials: 'include',
      cache: 'no-store',
    });

    if (res.status === 401) return null; // гость
    if (!res.ok) throw new Error('failed');

    return (await res.json()) as { role: string | null; user: any };
  } catch {
    return null; // сеть упала -> считаем гостем
  }
}
