"use client"

import { ColumnDef } from "@tanstack/react-table"
import { TransactionProps } from "@/stores/TransactionStore"
import { ArrowUpDown } from "lucide-react"
import { Button } from "../ui/button"

export const columns: ColumnDef<TransactionProps>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Título
          <ArrowUpDown className="ml-3 h-3 w-3" />
        </Button>
      )
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Valor
          <ArrowUpDown className="ml-3 h-3 w-3" />
        </Button>
      )
    },
    cell: ({ row, cell }) => {
      const amount = parseFloat(row.getValue("amount"))
      const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(amount)

      return <div className={cell.row.original.type}>{formatted}</div>
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Categoria
          <ArrowUpDown className="ml-3 h-3 w-3" />
        </Button>
      )
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Data
          <ArrowUpDown className="ml-3 h-3 w-3" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"))
      const formatted = new Intl.DateTimeFormat("pt-BR", {
        dateStyle: 'short',
        timeStyle: 'short',
      }).format(date)

      return <div className="font-medium">{formatted}</div>
    },
  },
]