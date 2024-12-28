import { Grid2, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { TurnedInNot } from "@mui/icons-material"
import { useDispatch } from "react-redux";
import { useMemo } from "react";
import PropTypes from 'prop-types';

import { setActiveNote } from "../../store/journal/journalSlice";

export const SideBarItem = ({ id, title = '', body, date, imageUrls }) => {
  const dispatch = useDispatch();

  const newTitle = useMemo(() => {
    return title.length > 17
      ? title.substring(0, 17) + "..."
      : title;
  }, [title]);

  const onClickNote = () => {
    dispatch(
      setActiveNote({id, title, body, date, imageUrls})
    )
  }

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={onClickNote}>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid2 container>
          <ListItemText primary={ newTitle } />
          <ListItemText secondary={ body } />
        </Grid2>
      </ListItemButton>
    </ListItem>
  )
}

SideBarItem.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  date: PropTypes.number.isRequired,
  imagesUrls: PropTypes.arrayOf(PropTypes.string),
  id: PropTypes.string.isRequired,
};
