import usersList from "@/data/users"
import { Avatar, Checkbox, Label, Table } from "@incmix/ui"
import type { Meta, StoryObj } from "@storybook/react"
usersList.length = 5
import { twMerge } from "tailwind-merge"
export interface User {
  email: string
  avatar: string
  country: string
  name: string
  position: string
  status: string
}

const meta = {
  title: "Atoms/Table",
  component: Table.Root,
  argTypes: {
  },
} satisfies Meta<typeof Table>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    return (
      <Table.Root>
        <Table.Header>
          <Table.ColumnHeaderCell>Product name</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Color</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Category</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Price</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>
            <span className="sr-only">Edit</span>
          </Table.ColumnHeaderCell>
        </Table.Header>
        <Table.Body className="divide-y">
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {'Apple MacBook Pro 17"'}
            </Table.Cell>
            <Table.Cell>Sliver</Table.Cell>
            <Table.Cell>Laptop</Table.Cell>
            <Table.Cell>$2999</Table.Cell>
            <Table.Cell>
              <a
                href="/tables"
                className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
              >
                Edit
              </a>
            </Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              Microsoft Surface Pro
            </Table.Cell>
            <Table.Cell>White</Table.Cell>
            <Table.Cell>Laptop PC</Table.Cell>
            <Table.Cell>$1999</Table.Cell>
            <Table.Cell>
              <a
                href="/tables"
                className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
              >
                Edit
              </a>
            </Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              Magic Mouse 2
            </Table.Cell>
            <Table.Cell>Black</Table.Cell>
            <Table.Cell>Accessories</Table.Cell>
            <Table.Cell>$99</Table.Cell>
            <Table.Cell>
              <a
                href="/tables"
                className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
              >
                Edit
              </a>
            </Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              Google Pixel Phone
            </Table.Cell>
            <Table.Cell>Gray</Table.Cell>
            <Table.Cell>Phone</Table.Cell>
            <Table.Cell>$799</Table.Cell>
            <Table.Cell>
              <a
                href="/tables"
                className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
              >
                Edit
              </a>
            </Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              Apple Watch 5
            </Table.Cell>
            <Table.Cell>Red</Table.Cell>
            <Table.Cell>Wearables</Table.Cell>
            <Table.Cell>$999</Table.Cell>
            <Table.Cell>
              <a
                href="/tables"
                className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
              >
                Edit
              </a>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
    )
  },
} as Story

export const UserTable: Story = {
  render: () => {
    return (
      <Table
        compact={true}
        className="min-w-full divide-y divide-gray-200 dark:divide-gray-600"
      >
        <Table.Head
          className="bg-gray-100 dark:bg-gray-700"
          theme={{
            cell: {
              base: "text-left text-xs font-medium uppercase text-gray-500 dark:text-gray-400",
            },
          }}
        >
          <Table.ColumnHeaderCell>
            <Label htmlFor="select-all" className="sr-only">
              Select all
            </Label>
            <Checkbox id="select-all" name="select-all" />
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Position</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Country</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell />
        </Table.Head>
        <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
          {usersList.map((user) => (
            <Table.Row
              key={user.email}
              className="hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Table.Cell className="w-4 ">
                <Checkbox aria-describedby="checkbox-1" id="checkbox-1" />
              </Table.Cell>
              <Table.Cell className="mr-12 flex items-center space-x-6 whitespace-nowrap lg:mr-0">
                <Avatar src={user.avatar} size="2" fallback={user.name[0]} />
                <div className="font-normal text-gray-500 text-sm dark:text-gray-400">
                  <div className="font-semibold text-base text-gray-900 dark:text-white">
                    {user.name}
                  </div>
                  <div className="font-normal text-gray-500 text-sm dark:text-gray-400">
                    {user.email}
                  </div>
                </div>
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap font-medium text-base text-gray-900 dark:text-white">
                {user.position}
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap font-medium text-base text-gray-900 dark:text-white">
                {user.country}
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap font-normal text-base text-gray-900 dark:text-white">
                <div className="flex items-center">
                  <div
                    className={twMerge(
                      "mr-2 h-2.5 w-2.5 rounded-full",
                      user.status === "Active" ? "bg-green-400" : "bg-red-500"
                    )}
                  />
                  {user.status}
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    )
  },
} as Story
