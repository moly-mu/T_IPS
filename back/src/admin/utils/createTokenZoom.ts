import dotenv from "dotenv";

dotenv.config(); 

const CLIENT_ID = process.env.ZOOM_CLIENT_ID ?? "";
const CLIENT_SECRET = process.env.ZOOM_CLIENT_SECRET ?? "";
const ACCOUNT_ID = process.env.ZOOM_ACCOUNT_ID ?? "";

const getAccessToken = async function() {
  const tokenUrl = "https://zoom.us/oauth/token";
  const auth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");

  const res = await fetch(
    `${tokenUrl}?grant_type=account_credentials&account_id=${ACCOUNT_ID}`,
    {
      method: "POST",
      headers: {
        "Authorization": `Basic ${auth}`,
      },
    }
  );

  if (!res.ok) {
    const errTxt = await res.text();
    throw new Error(`Error obteniendo token: ${res.status} ${res.statusText} - ${errTxt}`);
  }

  const data = await res.json();
  return data.access_token;
}

export { getAccessToken };