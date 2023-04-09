import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faCalendarPlus,
} from "@fortawesome/free-regular-svg-icons";
import axios from "axios";

function MeetupDetails() {
  const [meetupSelected, setMeetup] = useState("");
  const [attendMeetup, setAttendMeetup] = useState(false);

  const { meetupId } = useParams();
  const { user } = useContext(AuthContext);
  console.log(user);

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/meetup/${meetupId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((result) => {
        // console.log("The result is", result.data);
        setMeetup(result.data);
      })
      .catch((err) =>
        console.log("Error while retrieving meetup details:", err)
      );
  }, [meetupId]);

  console.log(meetupSelected);

  const handleSave = () => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .post(
        `${API_URL}/meetup/${meetupId}/attend`,
        { user },
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      )
      .then(() => setAttendMeetup(!attendMeetup))
      .catch((err) => console.log("Error while trying to save resource:", err));
  };

  if (meetupSelected) {
    return (
      <div className="meetup-details">
        <img src={meetupSelected.eventImage} alt={meetupSelected.eventName} />
        <h1>{meetupSelected.eventName}</h1>
        <p>Created by: {meetupSelected.author}</p>
        <h3>{meetupSelected.eventType}</h3>
        <p>{meetupSelected.eventCountry}</p>
        <p>{meetupSelected.eventCity}</p>
        <p>{meetupSelected.eventAddress}</p>
        <p>{meetupSelected.eventLink}</p>
        <p>{meetupSelected.eventDateAndTime}</p>
        {/* add mapping over the array of attendees once atendees are added to the data  */}

        <button
          value={attendMeetup}
          onClick={() => handleSave(meetupSelected._id)}
        >
          {attendMeetup === true && (
            <FontAwesomeIcon
              icon={faCalendar}
              size="lg"
              style={{ color: "#32612d" }}
            />
          )}

          {attendMeetup === false && (
            <FontAwesomeIcon
              icon={faCalendarPlus}
              size="lg"
              style={{ color: "#32612d" }}
            />
          )}
        </button>
        <p>{meetupSelected.attendees}</p>
        {user._id === meetupSelected.author && (
          <Link to={`/meetup/edit/${meetupSelected._id}`}>
            <button>Edit Meetup</button>
          </Link>
        )}
      </div>
    );
  }
}

export default MeetupDetails;
