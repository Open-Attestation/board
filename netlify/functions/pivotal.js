const fetch = require("node-fetch");

exports.handler = async function (event, context) {
  // your server-side functionality
  const response = await fetch(
    "https://www.pivotaltracker.com/services/v5/projects/2424361/stories?with_label=open-attetation",
    {
      headers: {
        "X-TrackerToken": process.env.PIVOTAL_API_TOKEN,
      },
    }
  );
  if (!response.ok) {
    return {
      statusCode: 500,
      body: "Unable to retrieve stories",
    };
  }
  return {
    statusCode: 200,
    body: JSON.stringify(await response.json()),
  };
};
