import React from "react";



export interface ItemInterface {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;

  title: string;
  quantity?: number;
  added?: boolean
}

export interface StateInterface {
  items: Array<ItemInterface>,
  filteredItems: Array<ItemInterface>,
  shoppingCart: Array<ItemInterface>,
  searching: string,
  categories: Array<string>,
  current: string,
  history: string,
  isSearching: boolean,
  filterAt: string,
  totalAmount: number,
  error: boolean,
  loading: boolean
}

export type ActionType = {
  type: string,
  payload?:
  | ItemInterface[]
  | string
  | number

}

export interface PageProps {
  state: StateInterface;
  dispatch?: React.Dispatch<ActionType>;
  ctx?: React.Context<StateInterface>
}