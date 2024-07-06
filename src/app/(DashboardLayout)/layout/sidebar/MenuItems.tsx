import {
  IconAperture,
  IconBook,
  IconLayoutDashboard,
  IconLogin,
  IconMoodHappy,
  IconTypography,
  IconUserPlus,
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    navlabel: true,
    subheader: "Accueil",
  },

  {
    id: uniqueId(),
    title: "Ouvrage",
    icon: IconBook,
    href: "/",
  },


];

export default Menuitems;
