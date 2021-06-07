import { render, screen } from "@testing-library/svelte"
import Field from "./Field.svelte"
import userEvent from "@testing-library/user-event"

describe("file Field.svelte", () => {
  type renderParams = Parameters<typeof render>
  type ComponentOptions = renderParams[1]
  const setupAndGetButton = (componentOptions?: ComponentOptions) => {
    render(Field, componentOptions)
    return screen.getByRole("button", { name: "field" })
  }
  it("is disabled after clicking with left mouse button", async () => {
    expect.hasAssertions()
    const button = setupAndGetButton()

    expect(button).toBeEnabled()

    await userEvent.click(button)

    expect(button).toBeDisabled()
  })

  it("gets the class 'flagged' after right mouse click", async () => {
    expect.hasAssertions()
    const button = setupAndGetButton()

    expect(button).not.toHaveClass("flagged")

    await userEvent.click(button, {
      button: 2,
    })

    expect(button).toHaveClass("flagged")
  })

  it("gets the class 'bomb' after click, if it is a bomb", async () => {
    expect.hasAssertions()
    const button = setupAndGetButton({ isBomb: true })

    expect(button).not.toHaveClass("bomb")

    await userEvent.click(button)

    expect(button).toHaveClass("bomb")
  })

  it("has the correct number of neighboring bombs as text-content if it is not a bomb", async () => {
    expect.hasAssertions()
    const num = Math.floor(Math.random() * 9)
    const button = setupAndGetButton({ neighborBombs: num })

    expect(button).toHaveTextContent(num.toString())
  })

  it("has no visible text before click and visible text after click", async () => {
    expect.hasAssertions()
    const button = setupAndGetButton()

    expect(button).toHaveStyle("color: transparent")

    await userEvent.click(button)

    expect(button).not.toHaveStyle("color: transparent")
  })
})
