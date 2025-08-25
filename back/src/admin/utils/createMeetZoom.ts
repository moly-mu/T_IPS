import { getAccessToken } from "../utils/createTokenZoom";

const createZoomMeeting = async function() {
  const token = await getAccessToken();

  const response = await fetch("https://api.zoom.us/v2/users/me/meetings", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      topic: "Reunión automática",
      type: 1, // 1 = reunión instantánea
      settings: {
        host_video: true,
        participant_video: true,
      },
    }),
  });

  const meeting = await response.json();
  return meeting.join_url; 
}
export default createZoomMeeting;