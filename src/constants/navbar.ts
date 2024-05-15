interface INavbar {
  id: string;
  name: string;
  href: string;
}

export const navbar: INavbar[] = [
  {
    id: "home",
    name: "Главная",
    href: "/",
  },

  {
    id: "about",
    name: "О нас",
    href: "/about",
  },

  {
    id: "reservation",
    name: "Бронирование",
    href: "/reservation",
  },

  {
    id: "menu",
    name: "Меню",
    href: "/menu",
  },

  {
    id: "blog",
    name: "Блог",
    href: "/blog",
  },
];
