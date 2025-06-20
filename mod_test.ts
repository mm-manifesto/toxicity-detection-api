// @ts-ignore: Deno global not recognized by TypeScript
Deno.test("toxicity model loads", async () => {
  // Import the loadModel function from mod.ts
  const mod = await import("./mod.ts");
  // Try to load the model
  const model = await mod["loadModel"]?.() ?? null;
  // The model should be an object (not null/undefined)
  if (!model) throw new Error("Model did not load");
}); 