import { calculateSubTotal } from "./calculators";

describe("test calculators", () => {
  it("calculate items", () => {
    const items = [
      { price: 45, quantity: 2 },
      { price: 45, quantity: 2 },
    ];

    const total = calculateSubTotal(items);
    expect(total).toEqual(180);
  });
});
