
export async function safeExecute(fn: Function) {
  try {
    await fn();
  } catch (e) {
    console.error("Error:", e);
  }
}
