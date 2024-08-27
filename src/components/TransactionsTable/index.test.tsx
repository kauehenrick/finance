import { render } from "@testing-library/react";
import TransactionsTable from ".";

export enum SelectTestIds {
   SELECT = "SELECT",
}

describe("TransactionsTable", () => {
    test("should render a table with rows and columns", () => {
        const { getByText } = render(<TransactionsTable />)
        
        expect(getByText).toBeTruthy();
    });

    test("should render a select", () => {
        const { getByTestId } = render(<TransactionsTable />)
        
        expect(getByTestId(SelectTestIds.SELECT)).toBeDefined();
    })
})