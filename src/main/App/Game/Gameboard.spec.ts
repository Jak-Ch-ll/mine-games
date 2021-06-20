import { render, screen, waitFor } from "@testing-library/svelte"
import userEvent from "@testing-library/user-event"
import type { BombCoordinates } from "./Gameboard.d"
// import Gameboard from "./Gameboard.svelte"

describe("file Gameboard.svelte", () => {
  interface SetupProps {
    columns?: number
    rows?: number
    bombCoordinates?: BombCoordinates
  }

  const setupAndReturnFields = async ({
    columns = 10,
    rows = 10,
    bombCoordinates,
  }: SetupProps) => {
    // sandbox the component, so the tests dont share the store
    jest.resetModules()
    const Gameboard = (await import("./Gameboard.svelte")).default
    render(Gameboard, {
      columns,
      rows,
      bombCoordinates,
    })

    return screen.getAllByRole("button", { name: "field" })
  }

  it("renders a number of fields depending on input", async () => {
    expect.hasAssertions()

    const columns = 21
    const rows = 23

    const fields = await setupAndReturnFields({ columns, rows })

    expect(fields).toHaveLength(columns * rows)
  })

  it("has a field with class 'bomb' after clicking on a bomb coordinate", async () => {
    expect.hasAssertions()
    const bombCoordinates: BombCoordinates = new Set(["0/0"])
    const fields = await setupAndReturnFields({ bombCoordinates })

    const firstField = fields[0]

    expect(firstField).not.toHaveClass("bomb")

    await userEvent.click(firstField)

    expect(firstField).toHaveClass("bomb")
  })

  it("has no field with class bomb after clicking on non-bomb-coordinates", async () => {
    expect.hasAssertions()
    const bombCoordinates: BombCoordinates = new Set(["0/0"])
    const fields = await setupAndReturnFields({ bombCoordinates })

    for (let i = 1; i < fields.length; i++) {
      const field = fields[i]

      await userEvent.click(field)
      expect(field).not.toHaveClass("bomb")
    }
  })

  it("renders fields with the correct number of bombs for non-bomb-fields", async () => {
    expect.hasAssertions()
    const bombCoordinates: BombCoordinates = new Set(["0/1", "1/0", "1/1"])
    const fields = await setupAndReturnFields({ bombCoordinates })

    const firstField = fields[0]

    await userEvent.click(firstField)

    expect(firstField).toHaveTextContent("3")
  })

  it("clicks on all neighboring fields if clicked on a field with 0 neighboring bombs", async () => {
    expect.hasAssertions()
    const fields = await setupAndReturnFields({})

    const firstField = fields[0]
    const lastField = fields[fields.length - 1]

    await userEvent.click(firstField)

    await waitFor(() => expect(lastField).toBeDisabled())
  })

  it("does not click on neighboring fields after click on field with more then 0 neighboring bombs", async () => {
    expect.hasAssertions()

    const bombCoordinates: BombCoordinates = new Set(["0/2"])
    const fields = await setupAndReturnFields({ bombCoordinates })

    const [first, second, third] = fields
    const lastField = fields[fields.length - 1]

    await userEvent.click(first)

    await waitFor(() => expect(lastField).toBeDisabled())
    expect(second).toBeDisabled()
    expect(third).toBeEnabled()
  })
})
