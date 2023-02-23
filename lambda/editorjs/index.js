exports.handler = async function(event) {
  console.log("StageName is:" + process.env.stage);
  console.log("request:", JSON.stringify(event, undefined, 2));
  return {
    statusCode: 200,
    headers: { "Content-Type": "text/plain" },
    
    body: `From Expample folder, CDK! You've hit ${event.path}\n`
  };
};