exports.handler = async (event) => {
  const q = new URLSearchParams(event.rawQuery || "").get("q") || "";
  const url = `https://clients1.google.com/complete/search?client=firefox&ds=yt&q=${encodeURIComponent(q)}`;

  try {
    const res = await fetch(url);
    const body = await res.text();
    return {
      statusCode: 200,
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
