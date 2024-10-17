import { ListCategory } from "./ListCategory";
import { ListItem } from "./ListItems";
import { MostViewedList } from "./MostViewedList";

export const MarketContainer = () => {
  return (
    <div className="p-6 space-y-4">
      <MostViewedList />
      <ListCategory />
      <ListItem />
    </div>
  );
};
