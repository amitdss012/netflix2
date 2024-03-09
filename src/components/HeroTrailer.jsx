import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { useDispatch, useSelector  } from "react-redux";
import { fetchMoviesTrailerAsync } from "../redux/slice/movieSlices";

export default function HeroTailer({movieId}) {
    const [open, setOpen] = React.useState(false);
    const [trailerKey, setTrailerKey] = React.useState(null);
    const HeroTailer = useSelector((state) => state.movie.trailer?.results);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchMoviesTrailerAsync(movieId));
  }, [movieId]);

  React.useEffect(() => {
    if (HeroTailer && HeroTailer.length > 0) {
      const trailerID = HeroTailer.find((item) => item.type === "Trailer");
      if (trailerID) {
        setTrailerKey(trailerID.key);
      }
    }
  }, [HeroTailer]);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="" className="w-10 text-sm" onClick={handleClickOpen}>
        Play
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
