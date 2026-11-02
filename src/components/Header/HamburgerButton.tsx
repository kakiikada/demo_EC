type HamburgerButtonProps = {
  isOpen: boolean;
  onClick: () => void;
};

export default function HamburgerButton({ isOpen, onClick, }: HamburgerButtonProps) {
  return(
    <div className={`hamburgerButton ${isOpen ? "js-active" : ""}`} onClick={onClick}>
      <span className="hamburgerButton_navIcon1"></span>
      <span className="hamburgerButton_navIcon2"></span>
    </div>
  )
}