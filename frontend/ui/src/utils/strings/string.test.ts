import { expect } from "chai"
import { capitalizedToCamel } from "./index" // adjust the path as needed

describe("capitalizedToCamel", () => {
  it("should convert capitalized words to camelCase", () => {
    const input = "Hello World Example Test"
    const expectedOutput = "helloWorldExampleTest"
    expect(capitalizedToCamel(input)).to.equal(expectedOutput)
  })

  it("should handle single-word input", () => {
    const input = "Hello"
    const expectedOutput = "hello"
    expect(capitalizedToCamel(input)).to.equal(expectedOutput)
  })

  it("should handle input where all words are already camel case", () => {
    const input = "helloWorldExampleTest"
    const expectedOutput = "helloworldexampletest"
    expect(capitalizedToCamel(input)).to.equal(expectedOutput)
  })

  it("should handle an empty string", () => {
    const input = ""
    const expectedOutput = ""
    expect(capitalizedToCamel(input)).to.equal(expectedOutput)
  })

  it("should handle strings with multiple spaces between words", () => {
    const input = "Hello    World"
    const expectedOutput = "helloWorld"
    expect(capitalizedToCamel(input)).to.equal(expectedOutput)
  })

  it("should handle strings with leading and trailing spaces", () => {
    const input = " Hello World "
    const expectedOutput = "helloWorld"
    expect(capitalizedToCamel(input)).to.equal(expectedOutput)
  })

  it("should handle strings with mixed casing", () => {
    const input = "HeLLo WoRLd ExamPLe"
    const expectedOutput = "helloWorldExample"
    expect(capitalizedToCamel(input)).to.equal(expectedOutput)
  })

  it("should return lowercase if the word is in uppercase", () => {
    const input = "HELLO"
    const expectedOutput = "hello"
    expect(capitalizedToCamel(input)).to.equal(expectedOutput)
  })

  it("should correctly format input with non-letter characters", () => {
    const input = "Hello_World Example-Test"
    const expectedOutput = "hello_worldexample-test"
    expect(capitalizedToCamel(input)).to.equal(expectedOutput)
  })

  it("should handle numeric characters correctly", () => {
    const input = "Hello World 123"
    const expectedOutput = "helloWorld123"
    expect(capitalizedToCamel(input)).to.equal(expectedOutput)
  })
})
