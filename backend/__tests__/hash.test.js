const bcrypt = require("bcrypt");

test("password is hashed", async () => {
  const hash = await bcrypt.hash("secret", 10);
  expect(hash).not.toBe("secret");
});