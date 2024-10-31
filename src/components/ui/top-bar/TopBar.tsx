import { TitleTopBar } from "./TitleTopBar";
import { CategoryTopBar } from "./CategoryTopBar";
import { MenuTopBar } from "./MenuTopBar";

export const TopBar = () => {
  return (
    <div className="font-mono h-14 border-b border-neutral-800 flex items-center">
      <div className="w-full max-w-6xl mx-auto px-5 flex items-center font-extralight justify-between tracking-widest">
        <TitleTopBar />
        <CategoryTopBar />
        <MenuTopBar />
      </div>
    </div>
  );
};
