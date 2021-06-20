import { render, screen } from "@testing-library/svelte"
import userEvent from "@testing-library/user-event"
import { tick } from "svelte"

describe("file Field.svelte", () => {
  type renderParams = Parameters<typeof render>
  type ComponentOptions = renderParams[1]
  const setupAndGetButton = async (componentOptions?: ComponentOptions) => {
    // sandbox the component, so the tests dont share the store
    jest.resetModules()
    const Field = (await import("./Field.svelte")).default
    render(Field, componentOptions)

    return screen.getByRole("button", { name: "field" })
  }

  const leftClick = async (ele: HTMLElement) => await userEvent.click(ele)
  const rightClick = async (ele: HTMLElement) =>
    await userEvent.click(ele, { button: 2 })

  it("is disabled after clicking with left mouse button", async () => {
    expect.hasAssertions()
    const button = await setupAndGetButton()

    expect(button).toBeEnabled()

    await userEvent.click(button)

    expect(button).toBeDisabled()
  })

  it("has the correct number of neighboring bombs as text-content after click, if it is not a bomb", async () => {
    expect.hasAssertions()
    const num = Math.floor(Math.random() * 8 + 1)
    const button = await setupAndGetButton({ neighborBombs: num })

    expect(button).toBeEmptyDOMElement()

    await leftClick(button)

    expect(button).toHaveTextContent(num.toString())
  })

  it("shows an empty string instead of zero after click, if it has no neighboring bombs", async () => {
    expect.hasAssertions()
    const button = await setupAndGetButton()

    await leftClick(button)

    expect(button).toBeEmptyDOMElement()
  })

  it("gets the class 'bomb' after click, if it is a bomb", async () => {
    expect.hasAssertions()
    const button = await setupAndGetButton({ isBomb: true })

    expect(button).not.toHaveClass("bomb")

    await leftClick(button)

    expect(button).toHaveClass("bomb")
  })

  it("does show '💣' instead of a number after click, if it is a bomb", async () => {
    expect.hasAssertions()

    const button = await setupAndGetButton({ isBomb: true, neighborBombs: 1 })

    expect(button).toBeEmptyDOMElement()

    await leftClick(button)

    expect(button).toHaveTextContent("💣")
  })

  it("does show '💣' if it is a bomb and the game is lost", async () => {
    expect.hasAssertions()

    const button = await setupAndGetButton({ isBomb: true })
    const { gamestate } = await import("../../gamestate")

    gamestate.update((state) => ({
      ...state,
      status: "Lost",
    }))
    await tick()

    expect(button).toBeDisabled()
    expect(button).toHaveTextContent("💣")
  })

  it("does not show a number after winning the game if it is a bomb", async () => {
    expect.hasAssertions()
    const button = await setupAndGetButton({ isBomb: true, neighborBombs: 3 })
    const { gamestate } = await import("../../gamestate")

    gamestate.update((state) => ({
      ...state,
      status: "Won",
    }))
    await tick()

    expect(button).not.toHaveTextContent("3")
  })

  it("does show a number after winning the game if it is not a bomb", async () => {
    expect.hasAssertions()
    const button = await setupAndGetButton({ neighborBombs: 3 })
    const { gamestate } = await import("../../gamestate")

    gamestate.update((state) => ({
      ...state,
      status: "Won",
    }))
    await tick()

    expect(button).toHaveTextContent("3")
  })

  it("gets the class 'flagged' after right mouse click", async () => {
    expect.hasAssertions()
    const button = await setupAndGetButton()

    expect(button).not.toHaveClass("flagged")

    await rightClick(button)

    expect(button).toHaveClass("flagged")
  })

  it("does show '🚩' after right click while active", async () => {
    expect.hasAssertions()
    const button = await setupAndGetButton()

    await rightClick(button)

    expect(button).toHaveTextContent("🚩")
  })

  it("does show '❓' after 2 right clicks while active", async () => {
    expect.hasAssertions()
    const button = await setupAndGetButton()

    await rightClick(button)
    await rightClick(button)

    expect(button).toHaveTextContent("❓")
  })

  it("does not allow field to be activated after 1 or 2 rights click, only after 3", async () => {
    expect.hasAssertions()
    const button = await setupAndGetButton()

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
