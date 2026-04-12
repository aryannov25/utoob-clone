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

  const q = new URLSearchParams(event.rawQuery || "").get("q") || "";
  if (q.length > 100) {
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json", ...cors },
      body: JSON.stringify({ error: "query too long" }),
    };
  }

  const url = `https://clients1.google.com/complete/search?client=firefox&ds=yt&q=${encodeURIComponent(q)}`;

  try {
    const res = await fetch(url);
    const body = await res.text();
    return {
      statusCode: 200,
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
