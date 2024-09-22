"use client"

import { ColumnDef } from "@tanstack/react-table"
import { TransactionProps, useTransactionStore } from "@/stores/TransactionStore"
import { ArrowUpDown } from "lucide-react"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogClose,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react"
import UpdateTransactionModal from "../UpdateTransactionModal"

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
    accessorKey: "subcategory",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Subcategoria
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
      }).format(date)

      return <div className="font-medium">{formatted}</div>
    },
  },
  {
    id: "disable",
    header: () => <div>Desativar</div>,
    cell: ({ row }) => {
      let [open, setOpen] = useState(false);
      let transactionStore = useTransactionStore();

      let { disableTransaction } = transactionStore;

      const disableButton = () => {
        const transaction = row.original;

        disableTransaction({ ...transaction, isActive: false });

        setOpen(false);
      }

      return (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger>
            <Trash2 color="red" size={"18px"} className="ml-5"></Trash2>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Desativar Transação</DialogTitle>
            </DialogHeader>
            <DialogDescription>Deseja realmente desativar a transação?</DialogDescription>
            <DialogFooter>
              <div className="flex justify-end gap-4">
                <DialogClose><Button variant="ghost" className='border'>Cancelar</Button></DialogClose>
                <Button onClick={disableButton}>Desativar</Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )
    },
  },
  {
    id: "edit",
    header: () => <div>Editar</div>,
    cell: ({ row }) => {
      return (
        <UpdateTransactionModal {...row.original} />
      )
    }
  },
]
