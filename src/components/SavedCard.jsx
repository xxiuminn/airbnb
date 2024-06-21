import React from "react";
import styles from "./CheapestFlights.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const SavedCard = (props) => {
  const queryClient = useQueryClient();
  //remove saved flights
  const removeSavedFlights = async () => {
    const res = await fetch(import.meta.env.VITE_AIRTABLE + "/" + props.id, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + import.meta.env.VITE_ATTOKEN,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("error saving flights");
    }
  };

  const mutation = useMutation({
    mutationFn: removeSavedFlights,
    onSuccess: () => {
      // to change color & change to save instead of saved
      queryClient.invalidateQueries(["removeflight"]);
    },
  });

  return (
    <>
      <div className={styles.searchResult}>
        <div className={styles.container}>
          <div className={styles.flightdetails}>
            <div className={styles.flight}>
              <div className={styles.carrier}>{props.item.carrier}</div>
              <div className={styles.tofro}>
                {props.item.departure} - {props.item.arrival}
              </div>
              <div className={styles.duration}>{props.item.duration}</div>
              <div className={styles.stops}>{props.item.stops}</div>
            </div>
            <div className={styles.flight}>
              <div className={styles.carrier}>Airline</div>
              <div className={styles.from}>
                {props.item.origin} - {props.item.destination}
              </div>
              <div className={styles.duration}>Duration</div>
              <div className={styles.to}>Stops</div>
            </div>

            <div className={styles.flight}>
              <div className={styles.carrier}>{props.item.carrier1}</div>
              <div className={styles.tofro}>
                {props.item.departure1} - {props.item.arrival1}
              </div>
              <div className={styles.duration}>{props.item.duration1}</div>
              <div className={styles.stops}>{props.item.stops1}</div>
            </div>
            <div className={styles.flight}>
              <div className={styles.carrier}>Airline</div>
              <div className={styles.from}>
                {props.item.origin1} - {props.item.destination1}
              </div>
              <div className={styles.duration}>Duration</div>
              <div className={styles.to}>Stops</div>
            </div>
          </div>
          <div className={styles.pricedetails}>
            <div>
              {props.item.currency} ${props.item.price}
            </div>
            <div>
              {props.item.oneWay === "true" ? "One Way" : "Return Trip"}
            </div>
            <button
              type="button"
              className={styles.buttonSaved}
              onClick={mutation.mutate}
            >
              Saved
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SavedCard;
