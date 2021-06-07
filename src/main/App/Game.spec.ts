import { fireEvent, render, screen } from "@testing-library/svelte"
import userEvent from "@testing-library/user-event"
import Game from "./Game.svelte"

describe("file Game.svelte", () => {
  const getStartButton = () =>
    screen.getByRole("button", { name: "Start Game" })
  const getWidthInput = () => screen.getByRole("spinbutton", { name: "Width:" })
  const getHeightInput = () =>
    screen.getByRole("spinbutton", { name: "Height:" })
  const getFields = () =>
    screen.getAllByRole("button", { name: "field" }) as HTMLButtonElement[]
  const queryFields = () => screen.queryAllByRole("button", { name: "field" })
  const getBombInput = () => screen.getByRole("spinbutton", { name: "Bombs:" })

  it("does not show a Gameboard on opening the app", () => {
    expect.hasAssertions()
    render(Game)

    const fields = queryFields()

    expect(fields[0]).toBeUndefined()
  })

  describe("button to start game", () => {
    it("is visible on opening the app", () => {
      expect.hasAssertions()
      render(Game)
      const button = screen.getByRole("button", { name: "Start Game" })

      expect(button).toBeInTheDocument()
    })

    it("does render a gameboard on click", async () => {
      expect.hasAssertions()
      render(Game)
      const button = screen.getByRole("button", { name: "Start Game" })

      await userEvent.click(button)

      const fields = getFields()

      expect(fields[0]).toBeInTheDocument()
    })

    it("does preventDefault on click", async () => {
      expect.hasAssertions()
      render(Game)
      const button = screen.getByRole("button", { name: "Start Game" })

      const prevented = await fireEvent.click(button)

      expect(prevented).toBeFalsy()
    })
  })

  it("has input fields for setting the width and height on first start that have default values of 10", () => {
    expect.hasAssertions()
    render(Game)

    const widthInput = screen.getByRole("spinbutton", { name: "Width:" })
    expect(widthInput).toHaveValue(10)

    const heightInput = screen.getByRole("spinbutton", { name: "Height:" })
    expect(heightInput).toHaveValue(10)
  })

  it("starts a game with the correct number of fields", async () => {
    expect.hasAssertions()
    render(Game)

    const widthInput = getWidthInput()
    const heightInput = getHeightInput()
    const button = getStartButton()

    await userEvent.clear(widthInput)
    await userEvent.type(widthInput, "15")
    await userEvent.clear(heightInput)
    await userEvent.type(heightInput, "15")
    await userEvent.click(button)

    const fields = getFields()

    expect(fields).toHaveLength(15 * 15)
  })

  it("has an input field that sets the number of bombs and has a default value of 10", () => {
    expect.hasAssertions()
    render(Game)

    const bombInput = getBombInput()

    expect(bombInput).toHaveValue(10)
  })

  it("starts the game with the correct number of bombs", async () => {
    expect.hasAssertions()
    render(Game)
    const bombInput = getBombInput()
    const button = getStartButton()

    await userEvent.clear(bombInput)
    await userEvent.type(bombInput, "15")
    await userEvent.click(button)

    const fields = getFields()

    let bombCounter = 0

    await fields.forEach(async (field) => {
      if (!field.disabled) {
        await userEvent.click(field)
      }

      if (field.classList.contains("bomb")) bombCounter++
    })

    expect(bombCounter).toBe(15)
  })
})
