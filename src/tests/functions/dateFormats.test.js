import { formatDate } from "../../functions/dateFormats";

describe("formatDate", () => {
  it("should format a date into a human-readable string", () => {
    const dateStr = "2025-05-1";
    const formattedDate = formatDate(dateStr);

    expect(formattedDate).toBe("1 May 2025");
  });
});
