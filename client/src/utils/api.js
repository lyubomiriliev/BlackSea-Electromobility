const URL = "https://tok-bg.com/API/get.php?t=status";

export const fetchDataByala1 = async (user, token, code) => {
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

export const fetchDataByala2 = async (user, token, code) => {
  const response = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      user: "vesso@raytex-bg.com",
      token: "tgrnc02YmExVtRiXIjzMpp10D44y2Hyc",
      code: "2946",
    }),
  });

  const clonedResponse = response.clone();

  return clonedResponse.json();
};

export const fetchDataPrimorsko1 = async (user, token, code) => {
  const response = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      user: "vesso@raytex-bg.com",
      token: "tgrnc02YmExVtRiXIjzMpp10D44y2Hyc",
      code: "3805",
    }),
  });

  const clonedResponse = response.clone();

  return clonedResponse.json();
};

export const fetchDataPrimorsko2 = async (user, token, code) => {
  const response = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      user: "vesso@raytex-bg.com",
      token: "tgrnc02YmExVtRiXIjzMpp10D44y2Hyc",
      code: "4380",
    }),
  });

  const clonedResponse = response.clone();

  return clonedResponse.json();
};
