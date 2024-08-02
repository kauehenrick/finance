import { render } from "@testing-library/react";
import FormDialog from "."

describe("FormDialog", () => {
    test("should have a button as trigger to dialog", () => {
        const { getByRole } = render(<FormDialog inputValue="categoria"/>)
        const triggerButton = getByRole("button")


        expect(triggerButton).toBeTruthy();
    })
})