import type { TreeNode } from "cp-react-tree-table"

export type DemoDataItem = {
  id: string
  name: string
  contact: string
}

export const mockData: TreeNode<DemoDataItem>[] = [
  {
    data: { id: "0", name: "Company A", contact: "Nicholas Watson" },
    height: 32,
  },
  {
    data: { id: "1", name: "Company B", contact: "Dani Hopkinson" },
    height: 32,
  },
  {
    data: { id: "2", name: "Company C", contact: "Jacob Ellery" },
    height: 32,
  },
  {
    data: { id: "3", name: "Company D", contact: "Kate Stewart" },
    height: 32,
  },
  {
    data: { id: "4", name: "Company E", contact: "Louise Fall" },
    height: 32,
  },
  {
    data: { id: "5", name: "Company F", contact: "Owen Thompson" },
    height: 32,
  },
  {
    data: { id: "6", name: "Company G", contact: "Fred Wilton" },
    height: 32,
  },
  {
    data: { id: "7", name: "Company H", contact: "William Dallas" },
    height: 32,
  },
  {
    data: { id: "8", name: "Company I", contact: "Makenzie Higgs" },
    children: [
      {
        data: { id: "9", name: "Department 1", contact: "Florence Carter" },
        children: [
          {
            data: { id: "10", name: "Group alpha", contact: "Doug Moss" },
          },
          {
            data: { id: "11", name: "Group beta", contact: "Camila Devonport" },
          },
          {
            data: { id: "12", name: "Group gamma", contact: "Violet Curtis" },
          },
        ],
      },
      {
        data: { id: "13", name: "Department 2", contact: "Selena Rycroft" },
        height: 32,
      },
    ],
  },
  {
    data: { id: "14", name: "Company J", contact: "Ron Douglas" },
    height: 32,
  },
  {
    data: { id: "15", name: "Company K", contact: "Michael Jacobs" },
    height: 32,
  },
  {
    data: { id: "16", name: "Company L", contact: "Stephanie Egerton" },
    height: 32,
  },
  {
    data: { id: "17", name: "Company M", contact: "Michael Buckley" },
    height: 32,
  },
  {
    data: { id: "18", name: "Company N", contact: "Sabrina Rowlands" },
    height: 32,
  },
  {
    data: { id: "19", name: "Company O", contact: "Lana Watt" },
    height: 32,
  },
  {
    data: { id: "20", name: "Company P", contact: "Evelynn Calderwood" },
    height: 32,
  },
  {
    data: { id: "21", name: "Company Q", contact: "Jade Morley" },
    height: 32,
  },
]
