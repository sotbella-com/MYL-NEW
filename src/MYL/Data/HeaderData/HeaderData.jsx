import user from '../../assets/Icons/user.png'
import collections from '../../assets/Icons/collections.png'
import shoppingbag from '../../assets/Icons/shopping-basket.png'
import history from '../../assets/Icons/history.png'
import search from '../../assets/Icons/search.png'

export const navLinks = [
    { id: 1, label: "Home", route: "/" },
    { id: 2, label: "About", route: "#about-section" },
    { id: 3, label: "Services", route: "#parallax-section" },
    { id: 4, label: "Pricing", route: "/pricing" },
    { id: 5, label: "FAQ's", route: "/faq" },
  ];

  export const ProtectedNavlinks = [
    {
      id: 1,
      icon: search,
      label: "Search",
      route: "/search",
    },
    {
      id: 2,
      icon: collections,
      label: "Collection",
      route: "/collections",
    },
    {
      id: 3,
      icon: history,
      label: "History",
      route: "/history",
    },
    {
      id: 4,
      icon: shoppingbag,
      label: "Cart",
      route: "/cart",
    },
    {
      id: 5,
      icon: user,
      label: "Profile",
      route: "/profile",
    },
  ];
  

  