exports.handler = async (event) => {
  // Extract the YouTube sub-path from the original request
  // e.g. /api/youtube/videos → /videos
  const originalPath = event.headers["x-forwarded-for"]
    ? event.path
    : event.path;

  const ytPath = event.rawUrl
    ? new URL(event.rawUrl).pathname.replace(/^\/?api\/youtube/, "") || "/"
    : "/";

  const params = new URLSearchParams(event.rawQuery || "");
  params.set("key", process.env.YOUTUBE_API_KEY);

  const url = `https://youtube.googleapis.com/youtube/v3${ytPath}?${params}`;

  try {
    const response = await fetch(url);
    const body = await response.text();
    return {
      statusCode: response.status,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body,
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
