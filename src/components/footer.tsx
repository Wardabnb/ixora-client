import React from "react";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
type Props = {};

const Footer = (props: Props) => {
  return (
    <div
      className="bg-slate-950 flex justify-around items-center mt-5   h-[200px] "
      id="contact"
    >
      <div className="text-white flex flex-col gap-5">
        <span className="flex items-center gap-3">
          <Facebook /> Ixora Travel Services
        </span>
        <span className="flex items-center gap-3">
          <Instagram />
          ixora_.travel
        </span>
        <span className="flex items-center gap-3">
          <Mail />
          ixoratravelservices@gmail.com
        </span>
      </div>
      <div className="text-white flex flex-col gap-5">
        <span className="flex items-center gap-3">
          <Phone />
          0559 40 54 02
        </span>
        <span className="flex items-center gap-3 ">
          <MapPin />
          <span className="w-[400px]">
            {" "}
            cité daksi abdelsalem 60 bâtiment 01n°03 Constantine/Algérie ,
            Constantine, Algeria
          </span>
        </span>
      </div>
    </div>
  );
};

export default Footer;
