const URL = "https://tok-bg.com/API/get.php?t=status1";

export const fetchDataForAllStations = async (user, token, code) => {
  const response = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      user,
      token,
      code,
    }),
  });

  const clonedResponse = response.clone();

  return clonedResponse.json();
};
