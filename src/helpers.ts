async function upsertUser(wallet: string) {
  const res = await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sui_address: wallet }),
  });

  return res.json();
}

async function createCircle(data: {
  sui_object_id: string;
  creator_id: string;
  name: string;
  description: string;
}) {
  const res = await fetch('/api/circles', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  return res.json();
}

async function addWallet(circleId: string, wallet: string) {
  await fetch(`/api/circles/${circleId}/add-wallet`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sui_address: wallet }),
  });
}
 