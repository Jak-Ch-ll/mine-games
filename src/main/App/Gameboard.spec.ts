import { render, screen, waitFor } from "@testing-library/svelte"
import userEvent from "@testing-library/user-event"
import type { BombCoordinates } from "./Gameboard.d"
import Gameboard from "./Gameboard.svelte"

describe("file Game.svelte", () => {
  interface SetupProps {
    width?: number
    height?: number
    bombCoordinates?: BombCoordinates
  }

  const setupAndReturnFields = ({
    width = 10,
    height = 10,
    bombCoordinates,
  }: SetupProps) => {
    render(Gameboard, {
      width: width,
      height: height,
      bombCoordinates,
    })

    return screen.getAllByRole("button", { name: "field" })
  }

  it("renders a number of fields depending on input", () => {
    expect.hasAssertions()

    const width = 21
    const height = 23

    const fields = setupAndReturnFields({ width, height })

    expect(fields).toHaveLength(width * height)
  })

  it("has a field with class 'bomb' after clicking on a bomb coordinate", async () => {
    expect.hasAssertions()
    const bombCoordinates: BombCoordinates = new Set(["0/0"])
    const fields = setupAndReturnFields({ bombCoordinates })

    const firstField = fields[0]

    expect(firstField).not.toHaveClass("bomb")

    await userEvent.click(firstField)

    expect(firstField).toHaveClass("bomb")
  })

  it("has no field with class bomb after clicking on non-bomb-coordinates", async () => {
    expect.hasAssertions()
    const bombCoordinates: BombCoordinates = new Set(["0/0"])
    const fields = setupAndReturnFields({ bombCoordinates })

    for (let i = 1; i < fields.length; i++) {
      const field = fields[i]

      await userEvent.click(field)
      expect(field).not.toHaveClass("bomb")
    }
  })

  it("renders fields with the correct number of bombs for non-bomb-fields", () => {
    expect.hasAssertions()
    const bombCoordinates: BombCoordinates = new Set(["0/1", "1/0", "1/1"])
    const fields = setupAndReturnFields({ bombCoordinates })

    const firstField = fields[0]

    expect(firstField).toHaveTextContent("3")
  })

  it("clicks on all neighboring fields if clicked on a field with 0 neighboring bombs", async () => {
    expect.hasAssertions()
    const fields = setupAndReturnFields({})

    const firstField = fields[0]
    const lastField = fields[fields.length - 1]

    await userEvent.click(firstField)

    await waitFor(() => expect(lastField).toBeDisabled())
  })

  it("does not click on neighboring fields after click on field with more then 0 neighboring bombs", async () => {
    expect.hasAssertions()

    const bombCoordinates: BombCoordinates = new Set(["0/2"])
    const fields = setupAndReturnFields({ bombCoordinates })

    const [first, second, third] = fields
    const lastField = fields[fields.length - 1]

    await userEvent.click(first)

    await waitFor(() => expect(lastField).toBeDisabled())
    expect(second).toBeDisabled()
    expect(third).toBeEnabled()
  })
})
