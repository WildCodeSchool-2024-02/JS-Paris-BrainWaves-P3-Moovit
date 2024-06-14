import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import PropTypes from "prop-types";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const ITEM_HEIGHT = 48;
const api = import.meta.env.VITE_API_URL;


function CardMenu({ set, handleOpen, id }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleEdit = () => {
    set(true);
    handleOpen();
  };

  const handleDelete = () => {
    fetch(`${api}/api/trainings/${id}`, {
      method: "DELETE",
    });
    navigate("/");
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
        <IoEllipsisVerticalSharp />
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
        <MenuItem onClick={handleEdit}>éditer</MenuItem>
        <MenuItem onClick={handleDelete}>supprimer</MenuItem>
      </Menu>
    </div>
  );
}
export default CardMenu;

CardMenu.propTypes = {
  set: PropTypes.func.isRequired,
  handleOpen: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired
};
