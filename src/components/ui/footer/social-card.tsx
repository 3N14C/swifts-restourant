import { MapPin, Phone, Mail, icons } from "lucide-react";
import { FC } from "react";

interface IProps {
  text: string | string[];
  icon: keyof typeof icons;
  size?: number;
  color?: string;
}

export const SocialCard: FC<IProps> = ({ text, icon, size, color }) => {
  const Icon = icons[icon];

  return (
    <div className="flex items-center gap-4">
      <Icon
        name={icon}
        size={size ?? 40}
        color={color}
        className="border-b border-white"
      />
      <div className="">
        {typeof text === "string" ? (
          <p className="text-base font-light text-white/50">{text}</p>
        ) : (
          <>
            {text.map((item, idx) => (
              <p key={idx} className="text-base font-light text-white/50">
                {item}
              </p>
            ))}
          </>
        )}
      </div>
    </div>
  );
};
