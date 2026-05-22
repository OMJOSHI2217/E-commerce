import { useSyncExternalStore } from 'react';

let cartItems: any[] = [];
let orders: any[] = [];
let user: any = null;

if (typeof window !== 'undefined') {
  const savedUser = localStorage.getItem('noctura_user');
  if (savedUser) {
    user = JSON.parse(savedUser);
  }
  const savedCart = localStorage.getItem('noctura_cart');
  if (savedCart) {
    cartItems = JSON.parse(savedCart);
  } else if (localStorage.getItem('noctura_cart_cleared')) {
    cartItems = [];
  }
  
  const savedOrders = localStorage.getItem('noctura_orders');
  if (savedOrders) {
    orders = JSON.parse(savedOrders);
  }
}

const listeners = new Set<() => void>();

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}

export const store = {
  getCart() {
    return cartItems;
  },
  setCart(items: any[]) {
    cartItems = items;
    if (typeof window !== 'undefined') {
      localStorage.setItem('noctura_cart', JSON.stringify(items));
    }
    emitChange();
  },
  clearCart() {
    cartItems = [];
    if (typeof window !== 'undefined') {
      localStorage.removeItem('noctura_cart');
      localStorage.setItem('noctura_cart_cleared', 'true');
    }
    emitChange();
  },
  getOrders() {
    return orders;
  },
  addOrder(order: any) {
    orders = [order, ...orders];
    if (typeof window !== 'undefined') {
      localStorage.setItem('noctura_orders', JSON.stringify(orders));
    }
    emitChange();
  },
  getUser() {
    return user;
  },
  setUser(newUser: any) {
    user = newUser;
    if (typeof window !== 'undefined') {
      if (newUser) {
        localStorage.setItem('noctura_user', JSON.stringify(newUser));
      } else {
        localStorage.removeItem('noctura_user');
      }
    }
    emitChange();
  },
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }
};

export function useCart() {
  return useSyncExternalStore(store.subscribe, store.getCart, store.getCart);
}

export function useOrders() {
  return useSyncExternalStore(store.subscribe, store.getOrders, store.getOrders);
}

export function useUser() {
  return useSyncExternalStore(store.subscribe, store.getUser, store.getUser);
}
