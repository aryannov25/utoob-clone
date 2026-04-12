const buildCorsHeaders = (event) => {
  const allowed = (process.env.ALLOWED_ORIGIN || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const origin = event.headers?.origin || event.headers?.Origin || "";
  const allowOrigin =
    allowed.length === 0 || allowed.includes(origin) ? origin || allowed[0] || "" : "";
  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Vary": "Origin",
  };
};

exports.handler = async (event) => {
  const cors = buildCorsHeaders(event);

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: cors, body: "" };
  }

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
      headers: { "Content-Type": "application/json", ...cors },
      body,
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json", ...cors },
      body: JSON.stringify({ error: err.message }),
    };
  }
};
