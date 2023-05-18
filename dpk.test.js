const { deterministicPartitionKey } = require("./dpk");
const crypto = require("crypto");

describe("deterministicPartitionKey", () => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;

  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe(TRIVIAL_PARTITION_KEY);
  });

  it("returns partitionKey from the event when it is present", () => {
    const partitionKey = "test-key";
    const event = { partitionKey };
    const result = deterministicPartitionKey(event);
    expect(result).toBe(partitionKey);
  });

  it("returns hash of the event when partitionKey is not present", () => {
    const event = { data: "test-data" };
    const data = JSON.stringify(event);
    const hash = crypto.createHash("sha3-512").update(data).digest("hex");
    const result = deterministicPartitionKey(event);
    expect(result).toBe(hash);
  });

  it("returns stringified candidate when candidate is not a string", () => {
    const event = { partitionKey: { complex: "object" } };
    const stringifiedCandidate = JSON.stringify(event.partitionKey);
    const result = deterministicPartitionKey(event);
    expect(result).toBe(stringifiedCandidate);
  });

  it("returns hash of candidate when its length is more than MAX_PARTITION_KEY_LENGTH", () => {
    let partitionKey = "a".repeat(MAX_PARTITION_KEY_LENGTH + 1);
    const event = { partitionKey };
    const hash = crypto.createHash("sha3-512").update(partitionKey).digest("hex");
    const result = deterministicPartitionKey(event);
    expect(result).toBe(hash);
  });
});
