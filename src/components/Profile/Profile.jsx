import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";

function Profile({
  handleAddClick,
  onCardClick,
  onCardLike,
  clothingItems,
  onEditProfileClick,
  onSignOut,
  isLoggedIn,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar
          onEditProfileClick={onEditProfileClick}
          onSignOut={onSignOut}
        />
      </section>

      <section className="profile__main">
        <div className="profile__clothes-header">
          <h2 className="profile__clothes-title">Your items</h2>
          <button className="profile__add-new-button" onClick={handleAddClick}>
            + Add new
          </button>
        </div>

        <div className="profile__clothing-items">
          <ClothesSection
            handleAddClick={handleAddClick}
            onCardClick={onCardClick}
            clothingItems={clothingItems}
            onCardLike={onCardLike}
            isLoggedIn={isLoggedIn}
          />
        </div>
      </section>
    </div>
  );
}

export default Profile;
