"use client"

import React, { useState, useCallback, useEffect } from "react"
import { DataTable } from "../components/DataTable"
import { registerCellRenderer, cellRendererRegistry } from "../cell-renderers"
import { RowAction, DataTableColumn, ColumnType } from "../types"
import { ColumnConfiguration } from "../components/ColumnConfigDialog"
import { Settings } from "lucide-react"

// Custom rating cell renderer
const RatingCell: React.FC<{ value: number }> = ({ value }) => {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map(star => (
        <svg
          key={star}
          className={`h-4 w-4 ${star <= value ? "text-yellow-400" : "text-gray-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

// Register the custom cell renderer (with idempotency check)
if (!cellRendererRegistry["Rating"]) {
  registerCellRenderer("Rating", (value) => <RatingCell value={value} />)
}

// Define product interface
interface Product {
  id: string
  name: string
  category: string
  price: number
  stock: number
  status: string
  tags: string[]
  rating: number
  lastUpdated: string
  image: string
}

// Sample data
const SAMPLE_PRODUCTS: Product[] = [
  {
    id: "prod1",
    name: "Premium Headphones",
    category: "Electronics",
    price: 199.99,
    stock: 45,
    status: "In Stock",
    tags: ["audio", "wireless"],
    rating: 4,
    lastUpdated: "2023-09-15",
    image: "https://placehold.co/100x100/333/FFF?text=Headphones"
  },
  {
    id: "prod2",
    name: "Ergonomic Chair",
    category: "Furniture",
    price: 349.99,
    stock: 12,
    status: "Low Stock",
    tags: ["office", "ergonomic"],
    rating: 5,
    lastUpdated: "2023-08-20",
    image: "https://placehold.co/100x100/333/FFF?text=Chair"
  },
  {
    id: "prod3",
    name: "Organic Coffee Beans",
    category: "Food & Beverage",
    price: 24.99,
    stock: 87,
    status: "In Stock",
    tags: ["organic", "coffee"],
    rating: 4,
    lastUpdated: "2023-09-01",
    image: "https://placehold.co/100x100/333/FFF?text=Coffee"
  },
  {
    id: "prod4",
    name: "Wireless Charger",
    category: "Electronics",
    price: 49.99,
    stock: 0,
    status: "Out of Stock",
    tags: ["charging", "wireless"],
    rating: 3,
    lastUpdated: "2023-07-05",
    image: "https://placehold.co/100x100/333/FFF?text=Charger"
  },
  {
    id: "prod5",
    name: "Smart Thermostat",
    category: "Smart Home",
    price: 129.99,
    stock: 23,
    status: "in_review",
    tags: ["smart", "energy"],
    rating: 5,
    lastUpdated: "2023-08-12",
    image: "https://placehold.co/100x100/333/FFF?text=Thermostat"
  },
  {
    id: "prod6",
    name: "Fitness Tracker",
    category: "Wearables",
    price: 89.99,
    stock: 5,
    status: "doing",
    tags: ["fitness", "wearable"],
    rating: 4,
    lastUpdated: "2023-09-10",
    image: "https://placehold.co/100x100/333/FFF?text=Tracker"
  },
  {
    id: "prod7",
    name: "Gaming Monitor",
    category: "Electronics",
    price: 299.99,
    stock: 15,
    status: "todo",
    tags: ["gaming", "display"],
    rating: 5,
    lastUpdated: "2023-09-05",
    image: "https://placehold.co/100x100/333/FFF?text=Monitor"
  },
  {
    id: "prod8",
    name: "Mechanical Keyboard",
    category: "Computer Accessories",
    price: 129.99,
    stock: 30,
    status: "done",
    tags: ["keyboard", "mechanical"],
    rating: 4,
    lastUpdated: "2023-08-15",
    image: "https://placehold.co/100x100/333/FFF?text=Keyboard"
  },
  {
    id: "prod9",
    name: "Wireless Earbuds",
    category: "Electronics",
    price: 149.99,
    stock: 18,
    status: "in_design",
    tags: ["audio", "wireless"],
    rating: 4,
    lastUpdated: "2023-09-20",
    image: "https://placehold.co/100x100/333/FFF?text=Earbuds"
  }
]

// Initial column definitions
const initialColumns: DataTableColumn<Product>[] = [
  {
    accessorKey: "name",
    id: "name",
    header: "Product Name",
    headingName: "Product Name", // Added for backward compatibility
    enableSorting: true,
    type: "String",
    // Simple renderer without images
    cell: ({ getValue }) => getValue()
  },
  {
    accessorKey: "category",
    id: "category",
    header: "Category",
    headingName: "Category", // Added for backward compatibility
    enableSorting: true,
    type: "String"
  },
  {
    accessorKey: "price",
    id: "price",
    header: "Price",
    headingName: "Price", // Added for backward compatibility
    enableSorting: true,
    type: "Currency",
    cell: ({ getValue }) => `$${(getValue() as number).toFixed(2)}`
  },
  {
    accessorKey: "stock",
    id: "stock",
    header: "Stock",
    headingName: "Stock", // Added for backward compatibility
    enableSorting: true,
    type: "Number"
  },
  {
    accessorKey: "status",
    id: "status",
    header: "Status",
    headingName: "Status", // Added for backward compatibility
    enableSorting: true,
    type: "Dropdown", // Change to Dropdown type for better configuration
    dropdownOptions: [
      // Stock statuses
      { value: "In Stock", label: "In Stock", color: "#4CAF50" },
      { value: "Low Stock", label: "Low Stock", color: "#FF9800" },
      { value: "Out of Stock", label: "Out of Stock", color: "#F44336" },
      // Task statuses
      { value: "todo", label: "Todo", color: "#9ca3af" },
      { value: "doing", label: "Doing", color: "#3b82f6" },
      { value: "in_review", label: "In Review", color: "#8b5cf6" },
      { value: "in_design", label: "In Design", color: "#ec4899" },
      { value: "done", label: "Done", color: "#10b981" }
    ]
  },

  {
    accessorKey: "tags",
    id: "tags",
    header: "Tags",
    headingName: "Tags", // Added for backward compatibility
    type: "Tag"
  },
  {
    accessorKey: "rating",
    id: "rating",
    header: "Rating",
    headingName: "Rating", // Added for backward compatibility
    enableSorting: true,
    type: "Rating"
  },
  {
    accessorKey: "lastUpdated",
    id: "lastUpdated",
    header: "Last Updated",
    headingName: "Last Updated", // Added for backward compatibility
    enableSorting: true,
    type: "Date",
    cell: ({ getValue }) => {
      const date = new Date(getValue() as string);
      return date.toLocaleDateString();
    }
  }
]

/**
 * Configurable Column Demo
 * Shows how columns can be configured via an edit interface
 */
const ConfigurableColumnDemo = () => {
  // State to store and manage columns
  const [columns, setColumns] = useState<DataTableColumn<Product>[]>(initialColumns);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  /**
   * Simulate data fetching
   */
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      setProducts(SAMPLE_PRODUCTS);
      setLoading(false);
    };

    fetchData();
  }, []);

  /**
   * Handle column configuration changes
   */
  const handleColumnConfigChange = useCallback((columnId: string, config: ColumnConfiguration) => {
    setColumns(prevColumns => 
      prevColumns.map(col => {
        if (col.id === columnId) {
          return {
            ...col,
            header: config.name || col.header,
            type: config.type as ColumnType || col.type,
            dropdownOptions: config.dropdownOptions
          };
        }
        return col;
      })
    );
  }, []);

  /**
   * Define row actions
   */
  const getRowActions = useCallback((row: Product): RowAction[] => [
    {
      label: "View Details",
      onClick: () => alert(`View details of ${row.name}`),
      icon: <span className="mr-2">👁️</span>
    },
    {
      label: "Edit Product",
      onClick: () => alert(`Edit product ${row.name}`),
      icon: <span className="mr-2">✏️</span>
    },
    {
      label: "Delete Product",
      onClick: () => alert(`Delete product ${row.name}`),
      icon: <span className="mr-2">🗑️</span>,
      color: "text-red-500",
      disabled: row.stock > 0 // Disable delete for products with stock
    },
  ], []);

  // Product detail component for expandable rows
  const renderProductDetails = useCallback((product: Product) => (
    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
      <div className="flex items-start">
        <img
          src={product.image}
          alt={product.name}
          className="h-20 w-20 rounded object-cover mr-4"
        />
        <div>
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="text-gray-600 dark:text-gray-300">Category: {product.category}</p>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <div>
              <span className="text-sm text-gray-500">Price:</span>
              <p>${product.price.toFixed(2)}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Stock:</span>
              <p>{product.stock} units</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Status:</span>
              <p>{product.status}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Rating:</span>
              <p>{product.rating}/5</p>
            </div>
          </div>
          <div className="mt-2">
            <span className="text-sm text-gray-500">Tags:</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {product.tags.map(tag => (
                <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  ), []);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Configurable Columns Demo</h1>
      <p className="mb-6 text-gray-600">
        Double-click on any column header to configure it. You can change the column name, type, and for dropdown columns, add custom options.
      </p>

      <DataTable
        columns={columns}
        data={products}
        enableRowSelection={true}
        enableSorting={true}
        enablePagination={true}
        enableColumnVisibility={true}
        filterColumn="name"
        filterPlaceholder="Filter by product name..."
        rowActions={getRowActions}
        isPaginationLoading={loading}

        // Column configuration feature
        enableColumnConfiguration={true}
        onColumnConfigChange={handleColumnConfigChange}

        // Expandable rows
        expandableRows={{
          render: renderProductDetails,
          expandOnClick: true,
          singleExpand: true
        }}

        // Export functionality
        export={{
          enabled: true,
          formats: ["csv", "excel"],
          filename: "products-data"
        }}
      />
    </div>
  )
}

export default ConfigurableColumnDemo
