interface INavbar {
  id: string;
  name: string;
  href: string;
}

export const navbar: INavbar[] = [
  {
    id: "home",
    name: "Главная",
    href: "/?categoryId=clxendwbk0000x9qsngool13c",
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
];
