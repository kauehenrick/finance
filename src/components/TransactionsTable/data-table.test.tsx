import { render } from "@testing-library/react";
import { DataTable } from "./data-table";
import { columns } from "./columns"

describe("DataTable", () => {
    test("should render a input field (filter)", () => {
        const { getByPlaceholderText } = render(
            <DataTable columns={columns} data={[]} />
        )
        const input = getByPlaceholderText("Filtrar transações...")
        
        expect(input).toBeTruthy();
    })
})