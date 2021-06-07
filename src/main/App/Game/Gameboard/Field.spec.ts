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

  const leftClick = async (ele: HTMLElement) => await userEvent.click(ele)
  const rightClick = async (ele: HTMLElement) =>
    await userEvent.click(ele, { button: 2 })

  it("is disabled after clicking with left mouse button", async () => {
    expect.hasAssertions()
    const button = setupAndGetButton()

    expect(button).toBeEnabled()

    await userEvent.click(button)

    expect(button).toBeDisabled()
  })

  it("has the correct number of neighboring bombs as text-content after click, if it is not a bomb", async () => {
    expect.hasAssertions()
    const num = Math.floor(Math.random() * 9)
    const button = setupAndGetButton({ neighborBombs: num })

    expect(button).toBeEmptyDOMElement()

    await leftClick(button)

    expect(button).toHaveTextContent(num.toString())
  })

  it("shows an empty string instead of zero after click, if it has no neighboring bombs", async () => {
    expect.hasAssertions()
    const button = setupAndGetButton()

    await leftClick(button)

    expect(button).toBeEmptyDOMElement()
  })

  it("gets the class 'bomb' after click, if it is a bomb", async () => {
    expect.hasAssertions()
    const button = setupAndGetButton({ isBomb: true })

    expect(button).not.toHaveClass("bomb")

    await leftClick(button)

    expect(button).toHaveClass("bomb")
  })

  it("does show '💣' instead of a number after lick, if it is a bomb", async () => {
    expect.hasAssertions()
    const button = setupAndGetButton({ isBomb: true, neighborBombs: 1 })

    expect(button).toBeEmptyDOMElement()

    await leftClick(button)

    expect(button).toHaveTextContent("💣")
  })

  it("gets the class 'flagged' after right mouse click", async () => {
    expect.hasAssertions()
    const button = setupAndGetButton()

    expect(button).not.toHaveClass("flagged")

    await rightClick(button)

    expect(button).toHaveClass("flagged")
  })

  it("does show '🚩' after right click while active", async () => {
    expect.hasAssertions()
    const button = setupAndGetButton()

    await rightClick(button)

    expect(button).toHaveTextContent("🚩")
  })

  it("does show '❓' after 2 right clicks while active", async () => {
    expect.hasAssertions()
    const button = setupAndGetButton()

    await rightClick(button)
    await rightClick(button)

    expect(button).toHaveTextContent("❓")
  })

  it("does not allow field to be activated after 1 or 2 rights click, only after 3", async () => {
    expect.hasAssertions()
    const button = setupAndGetButton()

    await rightClick(button)
    await leftClick(button)
    expect(button).toBeEnabled()

    await rightClick(button)
    await leftClick(button)
    expect(button).toBeEnabled()

    await rightClick(button)
    await leftClick(button)
    expect(button).toBeDisabled()
  })
})
