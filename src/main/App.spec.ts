import { render, screen } from "@testing-library/svelte"
import App from "./App.svelte"

describe("file App.svelte", () => {
  it("has a main tag", () => {
    expect.hasAssertions()
    render(App)

    const main = screen.getByRole("main")

    expect(main).toBeInTheDocument()
  })
})
