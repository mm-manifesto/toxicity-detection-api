// @ts-ignore: Deno global not recognized by TypeScript
Deno.test("toxicity model can be imported", async () => {
  // Test that we can import the toxicity model
  // @ts-ignore: Deno import map resolution not recognized by TypeScript
  const toxicity = await import("@tensorflow-models/toxicity");
  
  // Verify the import worked
  if (!toxicity) {
    throw new Error("Failed to import toxicity model");
  }
  
  // Test that the load function exists
  if (typeof toxicity.load !== "function") {
    throw new Error("toxicity.load is not a function");
  }
}); 