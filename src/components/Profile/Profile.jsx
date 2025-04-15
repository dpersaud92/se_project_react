import ClothesSection from "../ClothesSection/ClothesSection";
import { defaultClothingItems } from "../../utils/constants";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";

function Profile({ handleAddClick, onCardClick, clothingItems }) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          handleAddClick={handleAddClick}
          onCardClick={onCardClick}
          defaultItems={defaultClothingItems}
          newItems={clothingItems}
        />
      </section>
    </div>
  );
}

export default Profile;
