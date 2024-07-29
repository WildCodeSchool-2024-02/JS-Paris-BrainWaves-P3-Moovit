import { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import PropTypes from "prop-types";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import "./cardmenu.css";
import DarkModeContext from "../../services/DarkModeContext";

const ITEM_HEIGHT = 48;

function CardMenu({ handleDelete, handleEdit, anchorEl, setAnchorEl }) {
  const { mode } = useContext(DarkModeContext);
  const open = Boolean(anchorEl);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <IoEllipsisVerticalSharp className={`three-point-${mode}`} />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        <MenuItem onClick={handleEdit}>Editer</MenuItem>
        <MenuItem onClick={handleDelete}>Supprimer</MenuItem>
      </Menu>
    </div>
  );
}
export default CardMenu;

CardMenu.propTypes = {
  handleDelete: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  anchorEl: PropTypes.instanceOf(Element),
  setAnchorEl: PropTypes.func,
};

CardMenu.defaultProps = {
  anchorEl: null,
  setAnchorEl: undefined,
};
