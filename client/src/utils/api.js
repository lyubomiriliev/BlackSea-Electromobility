const URL = "https://tok-bg.com/API/get.php?t=status";

export const fetchData = async (user, token, code) => {
  const response = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      user: "vesso@raytex-bg.com",
      token: "tgrnc02YmExVtRiXIjzMpp10D44y2Hyc",
      code: "3736",
    }),
  });

  const clonedResponse = response.clone();

  return clonedResponse.json();
};
