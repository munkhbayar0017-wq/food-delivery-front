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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { Calendar29 } from "./Calendar";
import { useFoodCategory } from "@/app/_provider/FoodCategory";
import { ChangeDeliveryState } from "@/app/_components/ChangeDeliveryState";
import Image from "next/image";
import { toast } from "react-toastify";

function formatDate(date) {
  if (!date) return "";
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export function Order() {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const { orders, fetchOrders, updateOrderStatus } = useFoodCategory();
  const [selectedIds, setSelectedIds] = useState([]);
  const [filterDate, setFilterDate] = useState(null);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

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

  useEffect(() => {
    if (filterDate) {
      const year = filterDate.getFullYear();
      const month = String(filterDate.getMonth() + 1).padStart(2, "0");
      const day = String(filterDate.getDate()).padStart(2, "0");
      const selectedDateString = `${year}-${month}-${day}`;

      const filtered = orders.filter((order) => {
        const orderDate = order.updatedAt.split("T")[0];
        return orderDate === selectedDateString;
      });

      if (filtered.length === 0) {
        toast.error(`No orders found for ${formatDate(filterDate)}`);
      }

      setFilteredOrders(filtered);
    } else {
      setFilteredOrders(orders);
    }
  }, [filterDate, orders]);

  const handleStatusChange = async (orderId, newStatus) => {
    const currentPageIndex = table.getState().pagination.pageIndex;

    setIsUpdatingStatus(true);

    try {
      setFilteredOrders((prevOrders) =>
        prevOrders.map((order) =>
          (order._id || order.id) === orderId
            ? { ...order, status: newStatus }
            : order
        )
      );

      await updateOrderStatus(orderId, newStatus);
      toast.success("Status updated successfully!");

      await fetchOrders();

      setTimeout(() => {
        table.setPageIndex(currentPageIndex);
        setIsUpdatingStatus(false);
      }, 0);
    } catch (error) {
      console.error("Failed to update order status:", error);
      setIsUpdatingStatus(false);
      await fetchOrders();
      setTimeout(() => {
        table.setPageIndex(currentPageIndex);
      }, 0);
    }
  };

  const handleDateSelect = (date) => {
    setFilterDate(date);
  };

  const handleClearFilter = () => {
    setFilterDate(null);
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
            row.toggleSelected(!!value);
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
                        <div className="text-[#09090B] font-inter text-[12px] font-normal leading-4">
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
            case "CANCELLED":
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
                  value="CANCELLED"
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
    data: filteredOrders,
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
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  const pageCount = table.getPageCount();
  const currentPage = table.getState().pagination.pageIndex;

  const renderPaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5;

    if (pageCount <= maxVisiblePages) {
      for (let i = 0; i < pageCount; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              onClick={() => table.setPageIndex(i)}
              isActive={currentPage === i}
              className="cursor-pointer"
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      items.push(
        <PaginationItem key={0}>
          <PaginationLink
            onClick={() => table.setPageIndex(0)}
            isActive={currentPage === 0}
            className="cursor-pointer"
          >
            1
          </PaginationLink>
        </PaginationItem>
      );

      if (currentPage > 2) {
        items.push(
          <PaginationItem key="ellipsis-start">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      const start = Math.max(1, currentPage - 1);
      const end = Math.min(pageCount - 2, currentPage + 1);

      for (let i = start; i <= end; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              onClick={() => table.setPageIndex(i)}
              isActive={currentPage === i}
              className="cursor-pointer"
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        );
      }

      if (currentPage < pageCount - 3) {
        items.push(
          <PaginationItem key="ellipsis-end">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      items.push(
        <PaginationItem key={pageCount - 1}>
          <PaginationLink
            onClick={() => table.setPageIndex(pageCount - 1)}
            isActive={currentPage === pageCount - 1}
            className="cursor-pointer"
          >
            {pageCount}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

  return (
    <div className="flex h-screen gap-6 items-start justify-center">
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
            <Calendar29
              onDateSelect={handleDateSelect}
              selectedDate={filterDate}
              onClear={handleClearFilter}
            />
            <ChangeDeliveryState selectedIds={selectedIds} />
          </div>
        </div>

        <div className="overflow-hidden border relative">
          {isUpdatingStatus && (
            <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center z-10">
              <div className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 border-4 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm text-gray-600 font-medium">
                  Updating...
                </span>
              </div>
            </div>
          )}
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

        <div className="flex items-center justify-between p-4 border rounded-b-md">
          <div className="text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>

          <div className="flex items-center gap-2">
            <div className="w-[100px] text-sm text-muted-foreground mr-4">
              Page {currentPage + 1} of {pageCount}
            </div>

            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => table.previousPage()}
                    className={
                      !table.getCanPreviousPage()
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>

                {renderPaginationItems()}

                <PaginationItem>
                  <PaginationNext
                    onClick={() => table.nextPage()}
                    className={
                      !table.getCanNextPage()
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </div>
  );
}
