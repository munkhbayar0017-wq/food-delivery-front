"use client";

import React, { useState, useEffect } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Calendar29 } from "./Calendar";
import { useFoodCategory } from "@/app/_provider/FoodCategory";
import { ChangeDeliveryState } from "@/app/_components/ChangeDeliveryState";
import Image from "next/image";

export function Order() {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const { orders, fetchOrders, updateOrderStatus } = useFoodCategory();
  const [selectedIds, setSelectedIds] = useState([]);
  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const selectedRows = table.getFilteredSelectedRowModel().rows;
    const ids = selectedRows.map((row) => row.original._id || row.original.id);
    setSelectedIds(ids);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowSelection]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      await fetchOrders();
    } catch (error) {
      console.error("Failed to update order status:", error);
    }
  };

  const columns = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            row.toggleSelected(!!value), console.log("here");
          }}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },

    //---Email
    {
      accessorKey: "email",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const email = row.original.user?.email;
        return <div className="lowercase">{email}</div>;
      },
    },

    //---Food
    {
      accessorKey: "foodOrderItems",
      header: () => <div className="text-left pl-7">Food</div>,
      cell: ({ row }) => {
        console.log("food222", row.original.foodOrderItems);
        return (
          <Select>
            <SelectTrigger className="border-none shadow-none w-30">
              <SelectValue />
              <div className="text-left font-medium">
                {row.original.foodOrderItems.reduce(
                  (sum, i) => sum + i.quantity,
                  0
                )}{" "}
                Foods
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <div className=" flex flex-col gap-3 w-[263px] p-3">
                  {row.original.foodOrderItems.map((item) => (
                    <div
                      key={item._id}
                      className="flex items-center justify-center h-8 gap-2.5"
                    >
                      <div className="w-8 h-8 overflow-hidden rounded-md">
                        <Image
                          src={item.food.image}
                          alt={item.food.foodName}
                          width={32}
                          height={32}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="w-full flex justify-between">
                        <div className="text-[#09090B] font-inter text-[12px] font-normal leading-4">
                          {item.food.foodName}
                        </div>
                        <div class="text-[#09090B] font-inter text-[12px] font-normal leading-4">
                          x {item.quantity}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </SelectGroup>
            </SelectContent>
          </Select>
        );
      },
    },
    //---Date
    {
      accessorKey: "Date",
      header: () => <div className="text-left">Date</div>,
      cell: ({ row }) => {
        return (
          <div className="text-left font-medium">
            {row.original.updatedAt.split("T")[0]}
          </div>
        );
      },
    },
    //---Total
    {
      accessorKey: "totalPrice",
      header: () => <div className="text-left">Total</div>,
      cell: ({ row }) => {
        return (
          <div className="text-left font-medium">
            {row.original.totalPrice}₮
          </div>
        );
      },
    },
    //---Delivery address
    {
      accessorKey: "Delivery address",
      header: () => <div className="text-left">Delivery address</div>,
      cell: ({ row }) => {
        return (
          <div className="text-left font-medium">{row.original.address}</div>
        );
      },
    },
    //---Delivery state
    {
      accessorKey: "status",
      header: "Delivery state",
      cell: ({ row }) => {
        const currentStatus = row.original.status || "PENDING";

        const getBorderColor = (status) => {
          switch (status) {
            case "DELIVERED":
              return "border-green-500";
            case "PENDING":
              return "border-red-500";
            case "CANCELED":
              return "border-gray-400";
            default:
              return "border-gray-300";
          }
        };
        return (
          <Select
            className="w-40"
            value={currentStatus}
            onValueChange={(newStatus) => {
              handleStatusChange(
                row.original._id || row.original.id,
                newStatus
              );
            }}
          >
            <SelectTrigger
              className={`w-[110px] text-[#09090B] text-[12px] font-semibold leading-4 rounded-full border ${getBorderColor(
                currentStatus
              )}`}
            >
              <SelectValue placeholder="Select a status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem
                  value="DELIVERED"
                  className="text-[#09090B] text-[12px] font-semibold leading-4"
                >
                  Delivered
                </SelectItem>
                <SelectItem
                  value="PENDING"
                  className="text-[#09090B] text-[12px] font-semibold leading-4"
                >
                  Pending
                </SelectItem>
                <SelectItem
                  value="CANCELED"
                  className="text-[#09090B] text-[12px] font-semibold leading-4"
                >
                  Cancelled
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        );
      },
    },
  ];

  const table = useReactTable({
    data: orders,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="flex h-screen gap-6 items-center justify-center">
      <div className="w-[1170px] bg-[#FFFFFF] rounded-md">
        <div className="flex items-center py-4 border-t border-r border-l rounded-t-md justify-between p-4">
          <div className="flex flex-col">
            <div className="font-bold text-xl leading-7 tracking-[-0.5px]">
              Orders
            </div>
            <div className="font-medium text-xs text-[#71717A]">
              {table.getFilteredRowModel().rows.length} items
            </div>
          </div>
          <div className="flex gap-3">
            <Calendar29 />
            <ChangeDeliveryState selectedIds={selectedIds} />
          </div>
        </div>

        <div className="overflow-hidden border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => {
                  return (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-end space-x-2 p-4 border rounded-b-md">
          <div className="text-muted-foreground flex-1 text-sm">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
