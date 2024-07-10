"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Transaction } from "@/stores/TransactionStore"
import { ArrowUpDown } from "lucide-react"
import { Button } from "../ui/button"

export const columns: ColumnDef<Transaction>[] = [
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
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("amount"))
            const formatted = new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
            }).format(amount)

            return <div className="font-medium">{formatted}</div>
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
        accessorKey: "createdAt",
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
        cell: ({row}) => {
            const date = new Date(row.getValue("createdAt"))
            const formatted = new Intl.DateTimeFormat("pt-BR", {
                dateStyle: 'short',
                timeStyle: 'short',
            }).format(date)

            return <div className="font-medium">{formatted}</div>
        },
    },
]