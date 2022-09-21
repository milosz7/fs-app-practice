const fetchUserData = async () => {
  const response = await fetch('/auth/user', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const status = response.status;
  const output = (await response.json()) as
    | { username: string; avatar: string; phone: string }
    | { message: string };

  return { output, status };
};

export default fetchUserData;
