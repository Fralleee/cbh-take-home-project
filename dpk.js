const crypto = require("crypto");

const hashDataWithSHA3 = data => (data ? crypto.createHash("sha3-512").update(data).digest("hex") : null);

exports.deterministicPartitionKey = event => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;

  let candidate = event?.partitionKey ?? hashDataWithSHA3(JSON.stringify(event));

  if (!candidate) {
    candidate = TRIVIAL_PARTITION_KEY;
  }

  const isCandidateNonString = typeof candidate !== "string";
  if (isCandidateNonString) {
    candidate = JSON.stringify(candidate);
  }

  const doesCandidateExceedMaxLength = candidate.length > MAX_PARTITION_KEY_LENGTH;
  if (doesCandidateExceedMaxLength) {
    candidate = hashDataWithSHA3(candidate);
  }

  return candidate;
};
