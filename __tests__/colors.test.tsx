import Colors from "../src/constants/colors";

describe("Checking Colors are valid or not", () => {
    test("golden", () => {
        expect(Colors.golden).toBeDefined();
        expect(Colors.golden).toBe("#e6b30b");
    });

    test("primary100", () => {
        expect(Colors.primary100).toBeDefined();
        expect(Colors.primary100).toBe("#c6affc");
    });

    test("warning", () => {
        expect(Colors.warning).toBeDefined();
        expect(Colors.warning).toBe("#ffc107");
    });

    test("yellow", () => {
        expect(Colors.yellow).toBeDefined();
        expect(Colors.yellow).toBe("#ff0");
    });

    test("gray", () => {
        expect(Colors.gray).toBeDefined();
        expect(Colors.gray).toBe("#ccc");
    });

    test("gray500", () => {
        expect(Colors.gray500).toBeDefined();
        expect(Colors.gray500).toBe("#39324a");
    });

    test("navy", () => {
        expect(Colors.navy).toBeDefined();
        expect(Colors.navy).toBe("#008");
    });

    test("primary", () => {
        expect(Colors.primary).toBeDefined();
        expect(Colors.primary).toBe("#0d6efd");
    });

    test("aqua", () => {
        expect(Colors.aqua).toBeDefined();
        expect(Colors.aqua).toBe("#0ff");
    });

    test("secondary", () => {
        expect(Colors.secondary).toBeDefined();
        expect(Colors.secondary).toBe("#0ff");
    });

    test("blue", () => {
        expect(Colors.blue).toBeDefined();
        expect(Colors.blue).toBe("#00f");
    });

    test("error500", () => {
        expect(Colors.error500).toBeDefined();
        expect(Colors.error500).toBe("#f00");
    });

    test("danger", () => {
        expect(Colors.danger).toBeDefined();
        expect(Colors.danger).toBe("#f00");
    });

    test("appleRed", () => {
        expect(Colors.appleRed).toBeDefined();
        expect(Colors.appleRed).toBe("#da4343");
    });

    test("normalRed", () => {
        expect(Colors.normalRed).toBeDefined();
        expect(Colors.normalRed).toBe("#da4343");
    });

    test("lightRed", () => {
        expect(Colors.lightRed).toBeDefined();
        expect(Colors.lightRed).toBe("#fa8e8e");
    });

    test("success", () => {
        expect(Colors.success).toBeDefined();
        expect(Colors.success).toBe("#28a745");
    });

    test("green", () => {
        expect(Colors.green).toBeDefined();
        expect(Colors.green).toBe("#0f0");
    });

    test("default", () => {
        expect(Colors.default).toBeDefined();
        expect(Colors.default).toBe("#000");
    });

    test("dark", () => {
        expect(Colors.dark).toBeDefined();
        expect(Colors.dark).toBe("#000");
    });

    test("white", () => {
        expect(Colors.white).toBeDefined();
        expect(Colors.white).toBe("#fff");
    });

    test("purple", () => {
        expect(Colors.purple).toBeDefined();
        expect(Colors.purple).toBe("#f0f");
    });

    test("pink", () => {
        expect(Colors.pink).toBeDefined();
        expect(Colors.pink).toBe("#f1a9f1");
    });

    test("coffee", () => {
        expect(Colors.coffee).toBeDefined();
        expect(Colors.coffee).toBe("#dada");
    });

    test("brown", () => {
        expect(Colors.brown).toBeDefined();
        expect(Colors.brown).toBe("#840");
    });

    test("gray700", () => {
        expect(Colors.gray700).toBeDefined();
        expect(Colors.gray700).toBe("#221c30");
    });

    test("error50", () => {
        expect(Colors.error50).toBeDefined();
        expect(Colors.error50).toBe("#fcc4e4");
    });
});
