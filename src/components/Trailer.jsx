import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchMoviesTrailerAsync } from "../redux/slice/movieSlices";

export default function Trailer() {
  const [open, setOpen] = React.useState(false);
  const [trailerKey, setTrailerKey] = React.useState(null);
  const params = useParams();
  const dispatch = useDispatch();

  const trailer = useSelector((state) => state.movie.trailer?.results);

  React.useEffect(() => {
    dispatch(fetchMoviesTrailerAsync(params.id));
  }, [params.id]);

  React.useEffect(() => {
    // Update the trailerKey whenever the trailer results change
    if (trailer && trailer.length > 0) {
      const trailerID = trailer.find((item) => item.type === "Trailer");
      if (trailerID) {
        setTrailerKey(trailerID.key);
      }
    }
  }, [trailer]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="" onClick={handleClickOpen}>
        Watch Trailer
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${trailerKey}?si=i2XZclLtqmOl5zWh`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-[100%]"
            ></iframe>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
