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
    id: "menu",
    name: "наше меню",
    href: "#menu",
  },

  {
    id: "reservation",
    name: "Бронирование",
    href: "/reservation",
  },

  // {
  //   id: "menu",
  //   name: "Меню",
  //   href: "/menu",
  // },

  // {
  //   id: "blog",
  //   name: "Блог",
  //   href: "/blog",
  // },
];
