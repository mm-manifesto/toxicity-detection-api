// @ts-ignore: Deno import map resolution not recognized by TypeScript
import * as toxicity from "@tensorflow-models/toxicity";

let model: toxicity.ToxicityClassifier | null = null;

async function loadModel() {
  if (!model) {
    model = await toxicity.load(0.8, [
      "identity_attack", "insult", "obscene", "severe_toxicity",
      "sexual_explicit", "threat", "toxicity"
    ]); // 0.8 is the classification threshold
  }
  return model;
}

// @ts-ignore: Deno global not recognized by TypeScript
Deno.serve(async (req) => {
  const { searchParams } = new URL(req.url);
  const text = searchParams.get("text");

  if (!text) {
    return new Response("Missing `text` query parameter", { status: 400 });
  }

  try {
    const classifier = await loadModel();
    const results = await classifier.classify([text]);

    return Response.json({ text, results });
  } catch (err) {
    console.error("Error running toxicity model", err);
    return new Response("Internal Server Error", { status: 500 });
  }
});